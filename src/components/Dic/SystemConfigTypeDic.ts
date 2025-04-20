import { useEffect, useState } from 'react';
import { DicVo } from '@/utils/DicVo.ts';
import { ProSchemaValueEnumObj } from '@ant-design/pro-components';
import { dicValueApi } from '@/pages/system/dic/dicApi.tsx';


/*

 */

const GetSystemConfigTypeDicList = () => {
  const [SystemConfigTypeList, setList] = useState<DicVo[]>([]);
  // @ts-ignore
  const [SystemConfigTypeMap, setMap] = useState<Map<any, DicVo>>(new Map());
  // column enum 使用  valueEnum
  const [SystemConfigTypeValueEnum, setSystemConfigTypeValueEnum] = useState<ProSchemaValueEnumObj>({});

  const initData = async () => {
    // @ts-ignore
    let r = await dicValueApi({ code: 'system_config_type' });
    // @ts-ignore
    r.data.forEach(item => item.value = parseInt(item.value));
    setList(r.data);
    let valueEnumMap = {};
    let map = new Map<any, DicVo>();
    r.data.forEach(item => {
      // @ts-ignore
      valueEnumMap[item.value] = { text: item.label };
      // @ts-ignore
      map.set(item.value, item);
    });
    // @ts-ignore
    setMap(map);
    setSystemConfigTypeValueEnum(valueEnumMap);
  };


  useEffect(() => {
    initData();
  }, []);
  return { SystemConfigTypeList, SystemConfigTypeMap, SystemConfigTypeValueEnum };
};

export default GetSystemConfigTypeDicList;
