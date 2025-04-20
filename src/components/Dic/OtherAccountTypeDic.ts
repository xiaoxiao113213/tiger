import { useEffect, useState } from 'react';
import { DicVo } from '@/utils/DicVo.ts';
import { ProSchemaValueEnumObj } from '@ant-design/pro-components';
import { dicValueApi } from '@/pages/system/dic/dicApi.tsx';


/*

 */

const GetOtherAccountTypeDicList = () => {
  const [OtherAccountTypeList, setList] = useState<DicVo[]>([]);
  // @ts-ignore
  const [OtherAccountTypeMap, setMap] = useState<Map<any, DicVo>>(new Map());
  // column enum 使用  valueEnum
  const [OtherAccountTypeValueEnum, setOtherAccountTypeValueEnum] = useState<ProSchemaValueEnumObj>({});

  const initData = async () => {
    // @ts-ignore
    let r = await dicValueApi({ code: 'other_account_type' });
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
    setOtherAccountTypeValueEnum(valueEnumMap);
  };


  useEffect(() => {
    initData();
  }, []);
  return { OtherAccountTypeList, OtherAccountTypeMap, OtherAccountTypeValueEnum };
};

export default GetOtherAccountTypeDicList;

