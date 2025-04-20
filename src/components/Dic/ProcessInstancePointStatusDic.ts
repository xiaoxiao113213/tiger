import { useEffect, useState } from 'react';
import { DicVo } from '@/utils/DicVo.ts';
import { ProSchemaValueEnumObj } from '@ant-design/pro-components';
import { dicValueApi } from '@/pages/system/dic/dicApi.tsx';
import { DicMap } from '@/utils/baseBo.ts';
/*

 */

const GetProcessInstancePointStatusDicList = () => {
  const [ProcessInstancePointStatusList, setList] = useState<DicVo[]>([]);
  // @ts-ignore
  const [ProcessInstancePointStatusMap, setMap] = useState<DicMap>();
  // column enum 使用  valueEnum
  const [ProcessInstancePointStatusValueEnum, setProcessInstancePointStatusValueEnum] = useState<ProSchemaValueEnumObj>({});

  const initData = async () => {
    // @ts-ignore
    let r = await dicValueApi({ code: 'process_instance_point_status' });
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
    setProcessInstancePointStatusValueEnum(valueEnumMap);
  };


  useEffect(() => {
    initData();
  }, []);
  return { ProcessInstancePointStatusList, ProcessInstancePointStatusMap, ProcessInstancePointStatusValueEnum };
};

export default GetProcessInstancePointStatusDicList;