import { ProDescriptions } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { messageGetOneApi } from './api';
import { MessageDetailVo } from './ApiBo';
import { getNullBo } from '@/utils/utils.ts';


type Props = {
  detailId: number
};
export default (props: Props) => {
  const [detail, setDetailFn] = useState<MessageDetailVo>(getNullBo);
  const initMyDataFn = async () => {
    let rst = await messageGetOneApi({ messageId: props.detailId });
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
        <ProDescriptions.Item label="messageId" tooltip="" valueType="text" key={'messageId'}>
          {detail.messageId}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="type" tooltip="" valueType="text" key={'type'}>
          {detail.type}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="status" tooltip="" valueType="text" key={'status'}>
          {detail.status}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="title" tooltip="" valueType="text" key={'title'}>
          {detail.title}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="msg" tooltip="" valueType="text" key={'msg'}>
          {detail.msg}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="createBy" tooltip="" valueType="text" key={'createBy'}>
          {detail.createBy}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="remarks" tooltip="" valueType="text" key={'remarks'}>
          {detail.remarks}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="bizId" tooltip="" valueType="text" key={'bizId'}>
          {detail.bizId}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="toAccountId" tooltip="" valueType="text" key={'toAccountId'}>
          {detail.toAccountId}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="createTime" tooltip="" valueType="text" key={'createTime'}>
          {detail.createTime}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="updateBy" tooltip="" valueType="text" key={'updateBy'}>
          {detail.updateBy}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="updateTime" tooltip="" valueType="text" key={'updateTime'}>
          {detail.updateTime}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="deleteFlag" tooltip="" valueType="text" key={'deleteFlag'}>
          {detail.deleteFlag}
        </ProDescriptions.Item>

        {/*<Form.Item label='type' name='type' rules={[{required: true}]}>*/}
        {/*    <Select placeholder="请输入"*/}
        {/*            options={DatabaseTypeList}*/}
        {/*    />*/}
        {/*</Form.Item>*/}

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