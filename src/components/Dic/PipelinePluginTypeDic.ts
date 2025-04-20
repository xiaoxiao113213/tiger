import { useEffect, useState } from 'react';
import { DicVo } from '@/utils/DicVo.ts';
import { ProSchemaValueEnumObj } from '@ant-design/pro-components';
import { dicValueApi } from '@/pages/system/dic/dicApi.tsx';


/*

 */

const getPipelinePluginTypeDicList = () => {
  const [PipelinePluginTypeList, setList] = useState<DicVo[]>([]);
  const [PipelinePluginTypeSearchMap, setSearchMap] = useState<ProSchemaValueEnumObj>({});

  const initData = async () => {
    // @ts-ignore
    let r = await dicValueApi({ code: 'pipeline_plugin_type' });
    // @ts-ignore
    r.data.forEach(item => item.value = parseInt(item.value));
    setList(r.data);
    let map = {};
    r.data.forEach(item => {
      map[item.value] = { text: item.label };
    });
    setSearchMap(map);
  };


  useEffect(() => {
    initData();
  }, []);
  return { PipelinePluginTypeList, PipelinePluginTypeSearchMap };
};


export default getPipelinePluginTypeDicList;