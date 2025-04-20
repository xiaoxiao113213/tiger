import { ProDescriptions } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { getNullBo, oDateRemoveTime } from '@/utils/utils.ts';
import { projectGetOneApi } from './api';
import { ProjectDetailVo, projectStatusDic } from './ApiBo';
import FileView from '@/components/upload/FileView.tsx';
import projectTypeDic from '@/components/Dic/projectTypeDic.ts';
import { Tag } from 'antd';
import ViewForm from '@/pages/flow/process/process/form/form/viewForm';


type Props = {
  detailId: number
};
export default (props: Props) => {
  const [detail, setDetailFn] = useState<ProjectDetailVo>(getNullBo);
  const initMyDataFn = async () => {
    let rst = await projectGetOneApi({ projectId: props.detailId });
    setDetailFn(rst.data);
  };
  const { projectTypeMap } = projectTypeDic();
  useEffect(() => {
    initMyDataFn();
    return () => {
    };
  }, []); // 第二个参数表示依赖项


  return (
    <div>
      <ProDescriptions
        // column={1}
        title=""
        tooltip=""
      >
        <ProDescriptions.Item label="ID" tooltip="" valueType="text" key={'projectId'}>
          {detail.projectId}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="名称" tooltip="" valueType="text" key={'name'}>
          {detail.name}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="类型" tooltip="" valueType="text" key={'type'}>
          {projectTypeMap[detail.type]?.label}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="编码" tooltip="" valueType="text" key={'code'}>
          {detail.code}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="状态" tooltip="" valueType="text" key={'status'}>
          <Tag>{projectStatusDic.find(item => item.value === detail.status)?.label}</Tag>
        </ProDescriptions.Item>
        <ProDescriptions.Item label="计划开始时间" tooltip="" valueType="text" key={'planStartDate'}>
          {oDateRemoveTime(detail.planStartDate ?? '')}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="计划结束时间" tooltip="" valueType="text" key={'planEndDate'}>
          {oDateRemoveTime(detail.planEndDate ?? '')}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="实际开始时间" tooltip="" valueType="text" key={'startDate'}>
          {oDateRemoveTime(detail.startDate ?? '')}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="实际结束时间" tooltip="" valueType="text" key={'endDate'}>
          {oDateRemoveTime(detail.endDate ?? '')}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="描述" tooltip="" valueType="textarea" key={'remarks'}>
          {detail.remarks}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="负责人" tooltip="" valueType="text" key={'headUserId'}>
          {detail.headUser?.nickName}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="报告人" tooltip="" valueType="text" key={'reporterUserId'}>
          {detail.reporterUser?.nickName}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="创建人" tooltip="" valueType="text" key={'createBy'}>
          {detail.createByAccount?.nickName}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="创建时间" tooltip="" valueType="text" key={'createTime'}>
          {detail.createTime}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="附件" tooltip="" valueType="text" key={'fileList'}>
          <FileView fileList={detail?.fileList ?? []} />
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
      <ViewForm initFieldBoList={detail.customFieldList ?? []} column={1}></ViewForm>

    </div>
  );
};            