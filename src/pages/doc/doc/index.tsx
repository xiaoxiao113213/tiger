import React, { useEffect, useState } from 'react';
import { DocDetailVo } from '@/pages/doc/ApiBo.ts';
import { docGetOneApi } from '@/pages/doc/api.tsx';
import { checkApiRst } from '@/utils/utils.ts';
import { addDocTreeApi, existDocTreeApi, getDocTreeDetailApi, updateDocTreeNameApi } from '@/pages/doc/doc/api/docTreeApi.tsx';
import { Button, Input, message, Popover } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import EditContent from '@/pages/doc/doc/EditContent.tsx';
import ExcelContent from '@/pages/doc/doc/excel/ExcelContent.tsx';
import Left from '@/pages/doc/doc/Left.tsx';
import { Resizable } from 're-resizable';

export enum DocTreeTypeEnum {
  doc = 0,   // 文档
  excel = 1, // 表格
}


const Index = () => {
  const [docId, setDocId] = useState<number | undefined>(undefined);
  const [docTreeId, setDocTreeId] = useState<number | undefined>(undefined);
  const [doc, setDoc] = useState<DocDetailVo | undefined>(undefined);
  const [ifReloadTree, setIfReloadTree] = useState(true);
  const [docTreeName, setDocTreeName] = useState('');
  const [docTreeType, setDocTreeType] = useState<number | undefined>(undefined);
  const [leftWidth, setLeftWidth] = useState(200);

  // 获取URL参数并初始化状态
  useEffect(() => {
    const url = new URL(window.location.href);
    const docIdFromUrl = url.searchParams.get('docId');
    const docTreeIdFromUrl = url.searchParams.get('docTreeId');

    if (docIdFromUrl) setDocId(parseInt(docIdFromUrl));
    if (docTreeIdFromUrl) setDocTreeId(parseInt(docTreeIdFromUrl));
  }, []);

  // 根据docId和docTreeId加载数据
  useEffect(() => {
    const initData = async () => {
      if (docId) {
        try {
          const rst = await docGetOneApi({ docId });
          if (!checkApiRst(rst)) {
            setDoc(rst.data);
          }
        } catch (error) {
          console.error('Failed to fetch doc:', error);
        }
      }
      if (docTreeId) {
        setDocTreeNameFn(docTreeId);
      }
    };

    initData();
  }, [docId, docTreeId]);

  // 设置文档树名称及类型
  const setDocTreeNameFn = async (docTreeId: number) => {
    try {
      const rst = await getDocTreeDetailApi({ docTreeId });
      if (!checkApiRst(rst)) {
        setDocTreeName(rst.data.name);
        setDocTreeType(rst.data.type);
        setDocTreeId(rst.data.docTreeId);
      }
    } catch (error) {
      console.error('Failed to set doc tree name:', error);
    }
  };

  // 添加新文档或表格
  const addDoc = async (type: DocTreeTypeEnum) => {
    try {
      const rst = await addDocTreeApi({ docId: docId!!, parentId: 0, name: '未命名文档', type });
      if (!checkApiRst(rst)) {
        message.success(rst.msg);
        setDocTreeNameFn(rst.data);
      }
    } catch (error) {
      console.error('Failed to add doc:', error);
    }
  };

  // 选择文档树节点
  const selectDocTree = async (docTreeId: number, isCheckTree?: boolean) => {
    if (isCheckTree) {
      try {
        const rst = await existDocTreeApi({ docId: 1, docTreeId });
        if (!checkApiRst(rst) && !rst.data.exist && rst.data.docTreeId) {
          setDocTreeNameFn(rst.data.docTreeId);
        }
      } catch (error) {
        console.error('Failed to check doc tree existence:', error);
      }
    } else {
      setDocTreeNameFn(docTreeId);
    }
  };

  // 更新文档树名称
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocTreeName(e.target.value);
  };

  const onBlurName = async () => {
    if (docTreeId) {
      try {
        const rst = await updateDocTreeNameApi({ docTreeId, name: docTreeName });
        if (!checkApiRst(rst)) {
          setIfReloadTree(!ifReloadTree);
        }
      } catch (error) {
        console.error('Failed to update doc tree name:', error);
      }
    }
  };


  // 若doc或docId为空，早期返回避免渲染空界面
  if (!doc || !docId) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: '100vh', width: '100%', display: 'flex', backgroundColor: '#f0f0f0', padding: '10px' }}>
      <Resizable
        style={{
          backgroundColor: '#f0f0f0',
          border: '1px solid #f0f0f0',
          borderRadius: '10px',
          // padding: '10px',
        }}
        enable={{
          top: false,
          right: true,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}
        defaultSize={{ width: leftWidth, height: '100%' }}
        // onResize={(e, direction, ref, d) => {
        //   lastXRef.current = d.width;
        // console.log(`Width increased by ${d.width}px, Height increased by ${d.height}px`);
        // }}
        onResizeStop={(e, direction, ref, d) => {
          setLeftWidth(leftWidth + d.width);
        }}
      >
        <div style={{ width: leftWidth, height: '100%' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center',
            backgroundColor: '#ffffff', height: '50px', marginBottom: '10px', borderRadius: '10px',
          }}>
            <div className={'mmm-ellipsis'} style={{ width: `calc(${leftWidth}px - 40px)` }}>{doc.name}</div>

            <div style={{ width: '40px', alignItems: 'center' }}>
              <Popover
                trigger={'hover'}
                placement={'rightTop'}
                content={
                  <div>
                    <div><Button type={'link'} onClick={() => addDoc(DocTreeTypeEnum.doc)}>文档</Button></div>
                    <div><Button type={'link'} onClick={() => addDoc(DocTreeTypeEnum.excel)}>表格</Button></div>
                  </div>
                }
              >
                <PlusOutlined style={{ marginLeft: '10px' }} />
              </Popover>
            </div>

          </div>

          <Left
            key={'left'}
            docId={docId}
            selectDocTree={selectDocTree}
            docTreeId={docTreeId}
            ifReloadTree={ifReloadTree}
            doc={doc}
          />
        </div>
      </Resizable>
      {docTreeId && <div style={{ width: `calc(100% - ${leftWidth}px)` }}>
        <div style={{ display: 'flex', height: '50px', backgroundColor: '#ffffff', marginBottom: '10px', borderRadius: '10px', marginLeft: '6px' }}>
          <div style={{ flex: '1' }}>
            <Input
              style={{
                marginLeft: '10px',
                marginRight: '20px',
                height: '40px',
                width: '300px',
                border: 'none',
                fontSize: '22px',
                fontWeight: 'bold',
              }}
              placeholder="请输入标题"
              value={docTreeName}
              onChange={onChangeName}
              onBlur={onBlurName}
            />
          </div>
          <div style={{ flex: '1', textAlign: 'right' }}>
            <Button type={'link'}>分享</Button>
          </div>
        </div>
        <div
          style={{
            marginLeft: '6px',
            height: 'calc(100% - 70px)',
            overflowY: 'auto',
          }}
        >
          {docTreeType === DocTreeTypeEnum.doc && (
            <EditContent key={docTreeId} docTreeId={docTreeId} docTreeType={docTreeType} />
          )}
          {docTreeType === DocTreeTypeEnum.excel && (
            <ExcelContent key={docTreeId} docTreeId={docTreeId} />
          )}
        </div>
      </div>}
    </div>
  );
};

export default Index;
