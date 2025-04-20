import { ProDescriptions } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';

import { processGetOneApi } from './api/processApi.tsx';
import { ProcessDetailVo } from './api/ProcessApiBo.ts';
import { getNullBo } from '@/utils/utils.ts';


type Props = {
  detailId: number
};
export default (props: Props) => {
  const [detail, setDetailFn] = useState<ProcessDetailVo>(getNullBo);
  const initMyDataFn = async () => {
    let rst = await processGetOneApi({ processId: props.detailId });
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
        <ProDescriptions.Item label="processId" tooltip="" valueType="text" key={'processId'}>
          {detail.processId}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="name" tooltip="" valueType="text" key={'name'}>
          {detail.name}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="version" tooltip="" valueType="text" key={'version'}>
          {detail.version}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="processVersionId" tooltip="" valueType="text" key={'processVersionId'}>
          {detail.processVersionId}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="disabled" tooltip="" valueType="text" key={'disabled'}>
          {detail.disabled}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="createTime" tooltip="" valueType="text" key={'createTime'}>
          {detail.createTime}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="createBy" tooltip="" valueType="text" key={'createBy'}>
          {detail.createBy}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="updateTime" tooltip="" valueType="text" key={'updateTime'}>
          {detail.updateTime}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="updateBy" tooltip="" valueType="text" key={'updateBy'}>
          {detail.updateBy}
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