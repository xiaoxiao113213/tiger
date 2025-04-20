import { ProDescriptions } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { getNullBo } from '@/utils/utils.ts';
import { projectReleaseGetOneApi } from './api';
import { ProjectReleaseDetailVo } from './ApiBo';
import FileView from '@/components/upload/FileView.tsx';
import ViewForm from '@/pages/flow/process/process/form/form/viewForm';
import { getStatus } from '@/pages/project/release/list.tsx';


type Props = {
  detailId: number
};
export default (props: Props) => {
  const [detail, setDetailFn] = useState<ProjectReleaseDetailVo>(getNullBo);
  const initMyDataFn = async () => {
    let rst = await projectReleaseGetOneApi({ projectReleaseId: props.detailId });
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
        title=""
        tooltip=""
      >
        <ProDescriptions.Item label="ID" tooltip="" valueType="text" key={'projectReleaseId'}>
          {detail.projectReleaseId}
        </ProDescriptions.Item>
        {/*<ProDescriptions.Item label="项目" tooltip="" valueType="text" key={'projectId'}>*/}
        {/*  {detail.projectId}*/}
        {/*</ProDescriptions.Item>*/}
        <ProDescriptions.Item label="status" tooltip="" valueType="text" key={'status'}>
          {getStatus(detail.status)}
        </ProDescriptions.Item>
        {/*<ProDescriptions.Item label="sort" tooltip="" valueType="text" key={'sort'}>*/}
        {/*  {detail.sort}*/}
        {/*</ProDescriptions.Item>*/}
        <ProDescriptions.Item label="version" tooltip="" valueType="text" key={'version'}>
          {detail.version}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="remarks" tooltip="" valueType="textarea" key={'remarks'}>
          {detail.remarks}
        </ProDescriptions.Item>
        {/*<ProDescriptions.Item label="progress" tooltip="" valueType="text" key={'progress'}>*/}
        {/*  {detail.progress}*/}
        {/*</ProDescriptions.Item>*/}
        <ProDescriptions.Item label="createBy" tooltip="" valueType="text" key={'createBy'}>
          {detail.createByAccount?.nickName}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="createTime" tooltip="" valueType="text" key={'createTime'}>
          {detail.createTime}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="附件" tooltip="" valueType="text" key={'fileList'}>
          <FileView fileList={detail?.fileList ?? []} />
        </ProDescriptions.Item>
      </ProDescriptions>
      <ViewForm initFieldBoList={detail.customFieldList ?? []}></ViewForm>

    </div>
  );
};            