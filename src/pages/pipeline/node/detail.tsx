import { ProDescriptions } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { pipelineNodeGetOneApi } from './api';
import { PipelineNodeDetailVo } from './ApiBo';
import { Tag } from 'antd';
import { getNullBo } from '@/utils/utils.ts';


type Props = {
  detailId: number
};
export default (props: Props) => {
  const [detail, setDetailFn] = useState<PipelineNodeDetailVo>(getNullBo);
  const initMyDataFn = async () => {
    let rst = await pipelineNodeGetOneApi({ id: props.detailId });
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
        <ProDescriptions.Item label="id" tooltip="" valueType="text" key={'id'}>
          {detail.id}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="名称" tooltip="" valueType="text" key={'name'}>
          {detail.name}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="工作目录" tooltip="" valueType="text" key={'workDir'}>
          {detail.workDir}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="描述" tooltip="" valueType="text" key={'desc'}>
          {detail.desc}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="状态" tooltip="" key={'disabled'}>
          {(() => {
            if (detail.status === 0) {
              return <Tag color={'red'}>未在线</Tag>;
            } else {
              return <Tag color={'green'}>已在线</Tag>;
            }
          })()}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="disabled" tooltip="" valueType="text" key={'disabled'}>
          {detail.disabled}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="是否禁用" tooltip="" key={'disabled'}>
          {(() => {
            if (detail.disabled === 0) {
              return <Tag color={'green'}>启用中</Tag>;
            } else {
              return <Tag color={'red'}>禁用中</Tag>;
            }
          })()}
        </ProDescriptions.Item>

        <ProDescriptions.Item label="创建时间" tooltip="" valueType="text" key={'createTime'}>
          {detail.createTime}
        </ProDescriptions.Item>
        {/*<ProDescriptions.Item label="createBy" tooltip="" valueType="text" key={"createBy"}>*/}
        {/*    {detail.createBy}*/}
        {/*</ProDescriptions.Item>*/}
        {/*<ProDescriptions.Item label="updateTime" tooltip="" valueType="text" key={"updateTime"}>*/}
        {/*    {detail.updateTime}*/}
        {/*</ProDescriptions.Item>*/}
        {/*<ProDescriptions.Item label="updateBy" tooltip="" valueType="text" key={"updateBy"}>*/}
        {/*    {detail.updateBy}*/}
        {/*</ProDescriptions.Item>*/}
        <ProDescriptions.Item label="errorLog" tooltip="" valueType="text" key={'errorLog'}>
          {detail.errorLog}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="token" tooltip="" valueType="text" key={'token'}>
          {detail.token}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="标签" tooltip="" valueType="text" key={'label'}>
          {detail.label}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="并发工作数量" tooltip="" valueType="text" key={'workNum'}>
          {detail.workNum}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="优先级" tooltip="" valueType="text" key={'priority'}>
          {detail.priority}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="ip" tooltip="" valueType="text" key={'ip'}>
          {detail.ip}
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
      <ProDescriptions
        column={1}
        title=""
        tooltip=""
      >
        <ProDescriptions.Item label="连接地址" tooltip="" valueType="text" key={'connectUrl'} copyable={true} contentStyle={{ backgroundColor: 'lightcyan' }}>
          {detail.connectUrl}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="连接地址" tooltip="" valueType="text" key={'connectUrl1'} copyable={true} contentStyle={{ backgroundColor: 'lightcyan' }}>
          {detail.connectUrl1}
        </ProDescriptions.Item>
      </ProDescriptions>
    </div>
  );
};            