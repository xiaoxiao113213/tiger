import { useEffect, useState } from 'react';
import { DicVo } from '@/utils/DicVo.ts';
import { ProSchemaValueEnumObj } from '@ant-design/pro-components';
import { dicValueApi } from '@/pages/system/dic/dicApi.tsx';


/*

 */

const GetMenuTypeDicList = () => {
  const [MenuTypeList, setList] = useState<DicVo[]>([]);
  const [MenuTypeSearchMap, setSearchMap] = useState<ProSchemaValueEnumObj>({});

  const initData = async () => {
    // @ts-ignore
    let r = await dicValueApi({ code: 'menu-type' });
    // @ts-ignore
    r.data.forEach(item => item.value = parseInt(item.value));
    setList(r.data);
    let map = {};
    r.data.forEach(item => {
      // @ts-ignore
      map[item.value] = { text: item.label };
    });
    setSearchMap(map);
  };


  useEffect(() => {
    initData();
  }, []);
  return { MenuTypeList, MenuTypeSearchMap };
};


export default GetMenuTypeDicList;