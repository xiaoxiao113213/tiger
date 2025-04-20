import { Tree } from 'antd';

import React, { useEffect, useState } from 'react';

import { TreeProps } from 'antd/es/tree';
import { roleGetOneApi } from '@/pages/system/role/api.tsx';

export type Prop = {
  application: Map<string, any>,
  roleId?: number;
};
// application.menuList  菜单数组

const MenuComponent = (props: Prop) => {
  if (!props.roleId) return <div>loading</div>;
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [menuListKeys, setMenuListKeys] = useState<React.Key[]>([]);
  const onCheck: TreeProps['onCheck'] = (checkedKeysNew, info) => {
  };

  const initData = async () => {
    let rst = await roleGetOneApi({ id: props.roleId });
    setMenuListKeys(props.application.menuList);
    setCheckedKeys(rst.data.menu);
  };


  useEffect(() => {
    initData();
    return () => {
    };
  }, []); // 第二个参数表示依赖项


  return (
    <div>
      <Tree
        checkable
        defaultExpandedKeys={[]}
        // defaultCheckedKeys={props.checkMenuIds}
        // disabled={true}
        checkedKeys={checkedKeys}
        onCheck={onCheck}
        treeData={menuListKeys}
        fieldNames={{ title: 'name', key: 'id', children: 'children' }}
      />
    </div>
  );
};


export default MenuComponent;