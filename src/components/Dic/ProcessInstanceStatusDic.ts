import { useEffect, useState } from 'react';
import { DicVo } from '@/utils/DicVo.ts';
import { ProSchemaValueEnumObj } from '@ant-design/pro-components';
import { dicValueApi } from '@/pages/system/dic/dicApi.tsx';
import { DicMap } from '@/utils/baseBo.ts';

/*

 */

const GetProcessInstanceStatusDicList = () => {
  const [processInstanceStatusList, setList] = useState<DicVo[]>([]);
  // @ts-ignore
  const [processInstanceStatusMap, setMap] = useState<DicMap>({});
  // column enum 使用  valueEnum
  const [processInstanceStatusValueEnum, setprocessInstanceStatusValueEnum] = useState<ProSchemaValueEnumObj>({});

  const initData = async () => {
    // @ts-ignore
    let r = await dicValueApi({ code: 'process_instance_status' });
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
    setprocessInstanceStatusValueEnum(valueEnumMap);
  };


  useEffect(() => {
    initData();
  }, []);
  return { processInstanceStatusList, processInstanceStatusMap, processInstanceStatusValueEnum };
};

export default GetProcessInstanceStatusDicList;

