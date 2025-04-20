import { useEffect, useState } from 'react';
import { DicVo } from '@/utils/DicVo.ts';
import { ProSchemaValueEnumObj } from '@ant-design/pro-components';
import { dicValueApi } from '@/pages/system/dic/dicApi.tsx';
import { DicMap } from '@/utils/baseBo.ts';
/*

 */

const projectTypeDic = () => {
  const [projectTypeList, setList] = useState<DicVo[]>([]);
  // @ts-ignore
  const [projectTypeMap, setMap] = useState<DicMap>({});
  // column enum 使用  valueEnum
  const [projectTypeValueEnum, setprojectTypeValueEnum] = useState<ProSchemaValueEnumObj>({});

  const initData = async () => {
    // @ts-ignore
    let r = await dicValueApi({ code: 'project_type' });
    // 是否需要转换成数字
    r.data.forEach(item => item.value = parseInt(item.value));
    setList(r.data);
    let valueEnumMap = {};
    let map = {};
    r.data.forEach(item => {
      // @ts-ignore
      valueEnumMap[item.value] = { text: item.label };
      // @ts-ignore
      map[item.value] = item;
    });
    // @ts-ignore
    setMap(map);
    setprojectTypeValueEnum(valueEnumMap);
  };


  useEffect(() => {
    initData();
  }, []);
  return { projectTypeList, projectTypeMap, projectTypeValueEnum };
};

export default projectTypeDic;