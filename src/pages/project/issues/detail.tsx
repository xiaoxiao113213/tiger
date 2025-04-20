import { ProDescriptions } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { getNullBo, oDateRemoveTime } from '@/utils/utils.ts';
import { projectIssueGetOneApi } from './api';
import { ProjectIssueDetailVo } from './ApiBo';
import FileView from '@/components/upload/FileView.tsx';
import ViewForm from '@/pages/flow/process/process/form/form/viewForm';
import { Tag } from 'antd';
import issueTypeDic from '@/components/Dic/IssueTypeDic.ts';


type Props = {
  detailId: number
};
export default (props: Props) => {
  const [detail, setDetailFn] = useState<ProjectIssueDetailVo>(getNullBo);
  const { IssueTypeMap } = issueTypeDic();
  const initMyDataFn = async () => {
    let rst = await projectIssueGetOneApi({ projectIssueId: props.detailId });
    setDetailFn(rst.data);
  };
  useEffect(() => {
    initMyDataFn();
    return () => {
    };
  }, []); // 第二个参数表示依赖项

  const getStatus = (status: string) => {
    if (status === '0') {
      return <Tag color={'#d9d9d9'}>未开始</Tag>;
    } else if (status === '1') {
      return <Tag color={'#87d068'}>进行中</Tag>;
    } else if (status === '2') {
      return <Tag color={'#108ee9'}>已完成</Tag>;
    }
    return <Tag color={'#f50'}>已关闭</Tag>;
  };
  //         '0': { text: '一般', status: 'Success' },
  //         '1': { text: '重要', status: 'Processing' },
  //         '2': { text: '紧急', status: 'Error' },
  const getPriority = (priority: number) => {
    if (priority === 0) {
      return <Tag color={'#87d068'}>一般</Tag>;
    } else if (priority === 1) {
      return <Tag color={'#108ee9'}>重要</Tag>;
    }
    return <Tag color={'#f50'}>紧急</Tag>;

  };


  return (
    <div>
      <ProDescriptions
        title=""
        tooltip=""
        bordered={false}
      >
        <ProDescriptions.Item label="版本" tooltip="" valueType="text" key={'projectReleaseId'}>
          {detail.projectReleaseVersion}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="类型" tooltip="" valueType="text" key={'type'}>
          <Tag color={IssueTypeMap[detail.type]?.color}>{IssueTypeMap[detail.type]?.label}</Tag>
        </ProDescriptions.Item>
        <ProDescriptions.Item label="标题" tooltip="" valueType="text" key={'name'}>
          {detail.name}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="状态" tooltip="" valueType="text" key={'status'}>
          {getStatus(detail.status)}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="计划开始时间" tooltip="" valueType="text" key={'planStartDate'}>
          {oDateRemoveTime(detail.planStartDate)}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="计划结束时间" tooltip="" valueType="text" key={'planEndDate'}>
          {oDateRemoveTime(detail.planEndDate)}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="实际开始时间" tooltip="" valueType="text" key={'startDate'}>
          {oDateRemoveTime(detail.startDate)}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="实际结束时间" tooltip="" valueType="text" key={'endDate'}>
          {oDateRemoveTime(detail.endDate)}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="描述" tooltip="" valueType="textarea" key={'remarks'}>
          {detail.remarks}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="责任人" tooltip="" valueType="text" key={'headUserId'}>
          {detail?.headUserInfo?.nickName}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="报告人" tooltip="" valueType="text" key={'reporterUserId'}>
          {detail.reporterUserInfo?.nickName}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="优先级" tooltip="" valueType="text" key={'priority'}>
          {getPriority(detail.priority)}
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
      </ProDescriptions>
      <ViewForm initFieldBoList={detail.customFieldList ?? []} bordered={false}></ViewForm>


    </div>
  );
};            