import { useEffect, useState } from 'react';
import { DicVo } from '@/utils/DicVo.ts';
import { ProSchemaValueEnumObj } from '@ant-design/pro-components';
import { DicMap } from '@/utils/baseBo.ts';
import { projectAllApi } from '@/pages/project/project/api.tsx';
/*

 */

const ProjectDic = () => {
  const [ProjectList, setList] = useState<DicVo[]>([]);
  // @ts-ignore
  const [ProjectMap, setMap] = useState<DicMap>({});
  // column enum 使用  valueEnum
  const [ProjectValueEnum, setProjectValueEnum] = useState<ProSchemaValueEnumObj>({});

  const refreshData = async () => {
    // @ts-ignore
    let r = await projectAllApi({});
    // 是否需要转换成数字
    // r.data.forEach(item => item.value = parseInt(item.value))
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
    setProjectValueEnum(valueEnumMap);
  };


  useEffect(() => {
    refreshData();
  }, []);
  return { ProjectList, ProjectMap, ProjectValueEnum, refreshData };
};

export default ProjectDic;
