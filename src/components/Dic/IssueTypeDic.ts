
import { useEffect, useState } from 'react';
import { DicVo } from '@/utils/DicVo.ts';
import { ProSchemaValueEnumObj } from '@ant-design/pro-components';
import { dicValueApi } from '@/pages/system/dic/dicApi.tsx';
import { DicMap } from '@/utils/baseBo.ts';
/*

 */

const IssueTypeDic = () => {
  const [IssueTypeList, setList] = useState<DicVo[]>([]);
  // @ts-ignore
  const [IssueTypeMap, setMap] = useState<DicMap>({});
  // column enum 使用  valueEnum
  const [IssueTypeValueEnum, setIssueTypeValueEnum] = useState<ProSchemaValueEnumObj>({});

  const initData = async () => {
    // @ts-ignore
    let r = await dicValueApi({code: "issue-type"})
    // 是否需要转换成数字
    // r.data.forEach(item => item.value = parseInt(item.value))
    setList(r.data)
    let valueEnumMap = {}
    let map = {};
    r.data.forEach(item => {
      // @ts-ignore
      valueEnumMap[item.value] = {text: item.label}
      // @ts-ignore
      map[item.value] = item;
    })
    // @ts-ignore
    setMap(map);
    setIssueTypeValueEnum(valueEnumMap)
  }


  useEffect(() => {
    initData()
  }, []);
  return {IssueTypeList, IssueTypeMap, IssueTypeValueEnum}
}

export default IssueTypeDic

