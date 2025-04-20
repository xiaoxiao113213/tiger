import { useEffect, useState } from 'react';
import { DicVo } from '@/utils/DicVo.ts';
import { ProSchemaValueEnumObj } from '@ant-design/pro-components';
import { DicMap } from '@/utils/baseBo.ts';
import { aiModelAllApi } from '@/pages/ai/aiModel/api.tsx';
/*

 */

const ChatModelDic = (
  props: {
    type?: string
  },
) => {
  const [ChatModelList, setList] = useState<DicVo[]>([]);
  // @ts-ignore
  const [ChatModelMap, setMap] = useState<DicMap>({});
  // column enum 使用  valueEnum
  const [ChatModelValueEnum, setChatModelValueEnum] = useState<ProSchemaValueEnumObj>({});

  const initData = async () => {
    const params = {};
    if (props.type) {
      params.type = [props.type];
    }
    // @ts-ignore
    let r = await aiModelAllApi(params);
    let data = r.data.map((item) => {
      return { label: item.name, value: item.code };
    });
    // 是否需要转换成数字
    // r.data.forEach(item => item.value = parseInt(item.value))
    setList(data);
    let valueEnumMap = {};
    let map = {};
    data.forEach(item => {
      // @ts-ignore
      valueEnumMap[item.value] = { text: item.label };
      // @ts-ignore
      map[item.value] = item;
    });
    // @ts-ignore
    setMap(map);
    setChatModelValueEnum(valueEnumMap);
  };


  useEffect(() => {
    initData();
  }, []);
  return { ChatModelList, ChatModelMap, ChatModelValueEnum };
};

export default ChatModelDic;
