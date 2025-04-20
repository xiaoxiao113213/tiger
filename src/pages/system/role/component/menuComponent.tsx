import { Tree } from 'antd';
import type { TreeProps } from 'antd/es/tree';
import React, { useEffect, useState } from 'react';
import { OperateEnum } from '@/utils/enum.ts';

export type Prop = {
  checkMenuIds: number[];
  application: Map<string, any>,
  setDetailApplicationCheckKeysFn: Promise,
  applicationIndex: number,
  openType: OperateEnum
};
// application.menuList  菜单数组

const MenuComponent = (props: Prop) => {
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);

  const extractIds = (menuList) => {
    const ids = [];
    for (const item of menuList) {
      ids.push(item.id);
      if (item.children) {
        ids.push(...extractIds(item.children));
      }
    }
    return ids;
  };

  function findIntersection(arr1, arr2) {
    return arr1.filter((element) => arr2.includes(element));
  }

  // 初始化数据 把数据赋予到application中
  const initData = () => {
    console.log('props:', props);
    let allMenuIds = extractIds(props.application.menuList);
    let oldCheckIds = findIntersection(props.checkMenuIds, allMenuIds);
    setCheckedKeys(oldCheckIds);
    if (props.openType != OperateEnum.detail) {
      props.setDetailApplicationCheckKeysFn(oldCheckIds, props.applicationIndex);
    }

  };

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);

  };
  const onCheck: TreeProps['onCheck'] = (checkedKeysNew, info) => {
    console.log('onCheck', checkedKeysNew, info);
    if (props.openType == OperateEnum.detail) {
      // 当是详情的是 不能修改 这样省的diabled 显示了黑色
      return;
    }
    setCheckedKeys(checkedKeysNew);
    props.setDetailApplicationCheckKeysFn(checkedKeysNew, props.applicationIndex);
  };

  useEffect(() => {
    console.log('props', props);
    initData();
    return () => {
    };
  }, []);

  return (
    <div>
      <Tree
        checkable
        defaultExpandedKeys={[]}
        // defaultSelectedKeys={props.checkMenuIds}
        // defaultCheckedKeys={props.checkMenuIds}
        // disabled={props.openType == OperateEnum.detail}
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        onCheck={onCheck}
        treeData={props.application.menuList}
        fieldNames={{ title: 'name', key: 'id', children: 'children' }}
      />
    </div>
  );
};


export default MenuComponent;