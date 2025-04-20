import { useEffect, useState } from 'react';
import { DicVo } from '@/utils/DicVo.ts';
import { ProSchemaValueEnumObj } from '@ant-design/pro-components';
import { applicationAllApi } from '@/pages/system/application/api.tsx';


/*
{
all: {text: '全部'},
close: {text: '关闭'},
running: {text: '运行中'},
online: {text: '已上线'},
error: {text: '异常'},
}
 */

const getApplicationList = () => {
  const [applicationList, setList] = useState<DicVo[]>([]);
  const [applicationSearchMap, setSearchMap] = useState<ProSchemaValueEnumObj>({});

  const initData = async () => {
    // @ts-ignore
    let r = await applicationAllApi({});
    setList(r.data.map(item => {
      return { label: item.name, value: item.id };
    }));
    let map = {};
    r.data.forEach(item => {
      map[item.id] = { text: item.name };
    });
    setSearchMap(map);
  };
  useEffect(() => {
    initData();
  }, []);
  return { applicationList, applicationSearchMap };
};


export default getApplicationList;