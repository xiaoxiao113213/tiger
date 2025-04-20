import { useEffect, useState } from 'react';
import { DicVo } from '@/utils/DicVo.ts';
import { ProSchemaValueEnumObj } from '@ant-design/pro-components';
import { dicValueApi } from '@/pages/system/dic/dicApi.tsx';


/*

 */

const GetMysqlTableTypeDicList = () => {
  const [MysqlTableTypeList, setList] = useState<DicVo[]>([]);
  // @ts-ignore
  const [MysqlTableTypeMap, setMap] = useState<Map<number | string, DicVo>>(new Map());
  // column enum 使用  valueEnum
  const [MysqlTableTypeValueEnum, setMysqlTableTypeValueEnum] = useState<ProSchemaValueEnumObj>({});

  const initData = async () => {
    // @ts-ignore
    let r = await dicValueApi({ code: 'mysql_table_type' });
    // 是否需要转换成数字
    // r.data.forEach(item => item.value = parseInt(item.value))
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
    setMysqlTableTypeValueEnum(valueEnumMap);
  };


  useEffect(() => {
    initData();
  }, []);
  return { MysqlTableTypeList, MysqlTableTypeMap, MysqlTableTypeValueEnum };
};

export default GetMysqlTableTypeDicList;

