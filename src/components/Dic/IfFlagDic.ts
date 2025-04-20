import { useEffect, useState } from 'react';
import { dicValueApi } from '@/pages/system/dic/dicApi.tsx';
import { DicVo } from '@/utils/DicVo.ts';
import { DicTypeEnum } from '@/components/enums/DicType.ts';


const getIfFlag = () => {
  const [ifFlagList, setList] = useState<DicVo[]>([]);

  const initData = async () => {
    let r = await dicValueApi({ code: DicTypeEnum.ifFlag });

    // @ts-ignore
    r.data.forEach(item => item.value = parseInt(item.value));
    setList(r.data);
  };
  useEffect(() => {
    initData();
  }, []);
  return ifFlagList;
};


export default getIfFlag;