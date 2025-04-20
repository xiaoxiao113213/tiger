import { useEffect, useState } from 'react';
import { DicVo } from '@/utils/DicVo.ts';
import { ProSchemaValueEnumObj } from '@ant-design/pro-components';
import { dicValueApi } from '@/pages/system/dic/dicApi.tsx';


/*

 */

const GetMysqlTypeDicList = () => {
  const [MysqlTypeList, setList] = useState<DicVo[]>();
  // @ts-ignore
  const [MysqlTypeMap, setMap] = useState<Map<any, DicVo>>(new Map());
  // column enum 使用  valueEnum
  const [MysqlTypeValueEnum, setMysqlTypeValueEnum] = useState<ProSchemaValueEnumObj>({});

  const initData = async () => {
    // @ts-ignore
    let r = await dicValueApi({ code: 'Mysql_type' });
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
    setMysqlTypeValueEnum(valueEnumMap);
  };


  useEffect(() => {
    initData();
  }, []);
  return { MysqlTypeList, MysqlTypeMap, MysqlTypeValueEnum };
};

export default GetMysqlTypeDicList;

