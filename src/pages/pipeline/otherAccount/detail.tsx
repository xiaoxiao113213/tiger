import { ProDescriptions } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { otherAccountGetOneApi } from './api';
import { OtherAccountDetailVo } from './ApiBo';
import GetOtherAccountTypeDicList from '@/components/Dic/OtherAccountTypeDic';
import { getNullBo } from '@/utils/utils.ts';


type Props = {
  detailId: number
};
export default (props: Props) => {
  const [detail, setDetailFn] = useState<OtherAccountDetailVo>(getNullBo);
  const { OtherAccountTypeMap, OtherAccountTypeValueEnum } = GetOtherAccountTypeDicList();
  const initMyDataFn = async () => {
    let rst = await otherAccountGetOneApi({ id: props.detailId });
    setDetailFn(rst.data);
  };
  useEffect(() => {
    initMyDataFn();
    return () => {
    };
  }, []); // 第二个参数表示依赖项


  return (
    <div>
      <ProDescriptions
        column={2}
        title=""
        tooltip=""
      >

        <ProDescriptions.Item label="type" tooltip="" valueType="text" key={'type'}>
          {OtherAccountTypeMap.get(detail.type)?.label}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="账号" tooltip="" valueType="text" key={'accountName'}>
          {detail.accountName}
        </ProDescriptions.Item>

        <ProDescriptions.Item label="备注" tooltip="" valueType="text" key={'remarks'}>
          {detail.remarks}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="创建时间" tooltip="" valueType="text" key={'createTime'}>
          {detail.createTime}
        </ProDescriptions.Item>
        {/*<ProDescriptions.Item label="createBy" tooltip="" valueType="text" key={"createBy"}>*/}
        {/*    {detail.createBy}*/}
        {/*</ProDescriptions.Item>*/}
        <ProDescriptions.Item label="更新时间" tooltip="" valueType="text" key={'updateTime'}>
          {detail.updateTime}
        </ProDescriptions.Item>
        {/*<ProDescriptions.Item label="updateBy" tooltip="" valueType="text" key={"updateBy"}>*/}
        {/*    {detail.updateBy}*/}
        {/*</ProDescriptions.Item>*/}


        {/*<ProDescriptions.Item label="状态" tooltip="" key={"disabled"}>*/}
        {/*    {(() => {*/}
        {/*        if (detail.disabled === 0) {*/}
        {/*            return <Tag color={"green"}>启用中</Tag>;*/}
        {/*        } else {*/}
        {/*            return <Tag color={"red"}>禁用中</Tag>;*/}
        {/*        }*/}
        {/*    })()}*/}
        {/*</ProDescriptions.Item>*/}

      </ProDescriptions>


    </div>
  );
};            