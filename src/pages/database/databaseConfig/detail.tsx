import { ProDescriptions } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { databaseConfigGetOneApi } from './api';
import { DatabaseConfigDetailVo } from './ApiBo';

import { getNullBo } from '@/utils/utils.ts';
import { DicVo } from '@/utils/DicVo.ts';


type Props = {
  detailId: number,
  DatabaseTypeMap: Map<number | string, DicVo>
};
export default (props: Props) => {
  const [detail, setDetailFn] = useState<DatabaseConfigDetailVo>(getNullBo);
  const initMyDataFn = async () => {
    let rst = await databaseConfigGetOneApi({ databaseConfigId: props.detailId });
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
        <ProDescriptions.Item label="名称" tooltip="" valueType="text" key={'name'}>
          {detail.name}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="类型" tooltip="" valueType="text" key={'type'}>
          {props.DatabaseTypeMap.get(detail.type)?.label}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="连接地址" tooltip="" valueType="text" key={'ip'}>
          {detail.ip}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="端口号" tooltip="" valueType="text" key={'port'}>
          {detail.port}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="用户名" tooltip="" valueType="text" key={'username'}>
          {detail.username}
        </ProDescriptions.Item>

        <ProDescriptions.Item label="备注" tooltip="" valueType="text" key={'remarks'}>
          {detail.remarks}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="创建时间" tooltip="" valueType="text" key={'createTime'}>
          {detail.createTime}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="创建人" tooltip="" valueType="text" key={'createBy'}>
          {detail?.createByAccount?.account}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="更新时间" tooltip="" valueType="text" key={'updateTime'}>
          {detail.updateTime}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="更新人" tooltip="" valueType="text" key={'updateBy'}>
          {detail?.updateByAccount?.account}
        </ProDescriptions.Item>


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