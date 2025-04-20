import { useEffect, useState } from 'react';
import { DicVo } from '@/utils/DicVo.ts';
import { ProSchemaValueEnumObj } from '@ant-design/pro-components';
import { dicValueApi } from '@/pages/system/dic/dicApi.tsx';


/*

 */

const GetPipelineUseStatusDicList = () => {
  const [PipelineUseStatusList, setList] = useState<DicVo[]>([]);
  // @ts-ignore
  const [PipelineUseStatusMap, setMap] = useState<Map<number | string, DicVo>>(new Map());
  // column enum 使用  valueEnum
  const [PipelineUseStatusValueEnum, setPipelineUseStatusValueEnum] = useState<ProSchemaValueEnumObj>({});

  const initData = async () => {
    // @ts-ignore
    let r = await dicValueApi({ code: 'pipeline_use_status' });
    // 是否需要转换成数字
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
    setPipelineUseStatusValueEnum(valueEnumMap);
  };


  useEffect(() => {
    initData();
  }, []);
  return { PipelineUseStatusList, PipelineUseStatusMap, PipelineUseStatusValueEnum };
};

export default GetPipelineUseStatusDicList;

