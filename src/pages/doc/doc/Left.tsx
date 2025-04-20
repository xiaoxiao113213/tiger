import React, { useEffect, useState } from 'react';
import { Button, message, Modal, Popover, Tree, TreeDataNode, TreeProps } from 'antd';


import { PlusOutlined } from '@ant-design/icons';
import { DocDetailVo } from '@/pages/doc/ApiBo.ts';
import { addDocTreeApi, delDocTreeApi, DocTreeListVo, getDocTreeListApi, updateLocationToFirstApi, updateTreeLocationApi } from '@/pages/doc/doc/api/docTreeApi.tsx';
import { checkApiRst } from '@/utils/utils.ts';
import { DocTreeTypeEnum } from '@/pages/doc/doc/index.tsx';


const App: React.FC<{
  docId: number,
  selectDocTree: (docTreeId: number, isCheckTree?: boolean) => void,
  docTreeId: number,
  ifReloadTree: boolean,
  doc: DocDetailVo
}> = (props) => {
  const { doc } = props;
  const [gData, setGData] = useState<DocTreeListVo[]>();
  const [expandedKeys, setExpandedKeys] = useState<number[] | undefined>();
  const [selectKeys, setSelectKeys] = useState<number[]>([]);
  const [isHoveredKey, setIsHoveredKey] = useState(0);
  const onDragEnter: TreeProps['onDragEnter'] = (info) => {
    // console.log(info);
  };
  const onDrop: TreeProps['onDrop'] = (info) => {
    console.log(info);
    const dropKey = info.node.docTreeId;
    const dragKey = info.dragNode.docTreeId;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]); // the drop position relative to the drop node, inside 0, top -1, bottom 1

    const loop = (
      data: DocTreeListVo[],
      key: React.Key,
      callback: (node: DocTreeListVo, i: number, data: DocTreeListVo[]) => void,
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].docTreeId === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };
    const data = [...gData];

    // Find dragObject
    let dragObj: TreeDataNode;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
        item.children.unshift(dragObj);
      });
    } else {
      let ar: TreeDataNode[] = [];
      let i: number;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        // Drop on the top of the drop node
        ar.splice(i!, 0, dragObj!);
      } else {
        // Drop on the bottom of the drop node
        ar.splice(i! + 1, 0, dragObj!);
      }
    }
    setGData(data);
    //   调用接口
    if (info.dropToGap) {
      // 拖拽到两个节点的中间
      updateTreeLocationApi({ docTreeId: Number(dragKey), preNodeId: Number(dropKey) });
    } else {
      // 拖拽到父节点的下面
      updateLocationToFirstApi({ docTreeId: Number(dragKey), newParentId: Number(dropKey) });
    }
  };
  const initData = async () => {
    const rst = await getDocTreeListApi({ docId: props.docId, docTreeId: props.docTreeId });
    if (checkApiRst(rst)) return;
    setGData(rst.data.list);
    if (rst.data.selectTree) {
      let path = rst.data.selectTree.parentPath.split(',').filter(item => item.length > 0)
        .map(item => Number(item));
      // 截取path的第二个元素开始
      path = path.slice(1);
      console.log('path = ', path);
      setSelectKeys([rst.data.selectTree.docTreeId]);
      setExpandedKeys(path);
      if (!props.docTreeId) {
        props.selectDocTree(rst.data.selectTree.docTreeId);
      }
      // 改变浏览器地址栏中 url地址 地址栏中 docTreeId参数的值 当不等于当前文档的时候  修改成当前文档的docTreeId
      const url = new URL(window.location.href);
      const docTreeId = url.searchParams.get('docTreeId');
      if (docTreeId != rst.data.selectTree.docTreeId) {
        url.searchParams.set('docTreeId', rst.data.selectTree.docTreeId.toString());
        window.history.pushState({}, 0, url.toString());
      }
    }
  };
  const addDoc = async (docTreeId: number, type: DocTreeTypeEnum) => {
    const rst = await addDocTreeApi({ docId: props.docId, parentId: docTreeId, name: '未命名文档', type: type });
    if (checkApiRst(rst)) return;
    message.success(rst.msg);
    props.selectDocTree(rst.data);
  };

  const deleteDocFn = async (docTreeId: number) => {
    Modal?.confirm({
      title: '是否确认删除!! 会把子文档一起删除。',
      // content: item.account,
      icon: null,
      onOk: async () => {
        let rst = await delDocTreeApi({ docTreeId: docTreeId });
        if (checkApiRst(rst)) return;
        message.success(rst.msg);
        props.selectDocTree(docTreeId, true);
      },
    });
  };

  const renderTitle = (nodeData) => (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}
         onMouseEnter={() => setIsHoveredKey(nodeData.docTreeId)}
      // onMouseLeave={() => setIsHoveredKey(0)}
    >
      <span>{nodeData.name}</span>
      {isHoveredKey === nodeData.docTreeId &&
        <Popover trigger={'hover'}
                 placement={'rightTop'}
                 content={<div>
                   <div><Button type={'link'} onClick={() => {
                     addDoc(nodeData.docTreeId, DocTreeTypeEnum.doc);
                   }}>新建子文档</Button>
                   </div>
                   <div>
                     <Button type={'link'} onClick={() => {
                       addDoc(nodeData.docTreeId, DocTreeTypeEnum.excel);
                     }}>新建子表格</Button>
                   </div>
                   <div>
                     <Button type={'link'} onClick={() => {
                       deleteDocFn(nodeData.docTreeId);
                     }}>删除</Button>
                   </div>
                 </div>
                 }
        >
          <PlusOutlined />&nbsp;&nbsp;&nbsp;
        </Popover>}
    </div>


  );


  useEffect(() => {
    console.log('props.docTreeId = ', props.docTreeId);
    initData();
    return () => {
    };
  }, [props.docTreeId, props.ifReloadTree]);

  return (
    <div style={{ backgroundColor: '#ffffff', height: 'calc(100% - 70px)', overflowY: 'auto', borderRadius: '10px' }}>
      {
        <Tree
          className="draggable-tree"
          defaultExpandedKeys={expandedKeys}
          defaultSelectedKeys={selectKeys}
          selectedKeys={selectKeys}
          expandedKeys={expandedKeys}
          draggable={true}
          blockNode={true}
          onDragEnter={onDragEnter}
          onDrop={onDrop}
          icon={true}
          showLine={true}
          fieldNames={{ title: 'name', key: 'docTreeId', children: 'children' }}
          showIcon={false}
          treeData={gData}
          titleRender={renderTitle}
          onSelect={(selectedKeys, info) => {
            if (selectedKeys.length === 0) {
              return;
            }
            // console.log("selectedKeys = ", selectedKeys)
            props.selectDocTree(Number(selectedKeys[0]));
            setSelectKeys(selectedKeys);
          }}
          onExpand={(expandedKeys) => {
            setExpandedKeys(expandedKeys);
          }}
        />
      }
    </div>
  );
};

export default App;