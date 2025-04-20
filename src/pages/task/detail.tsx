import { ProDescriptions } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { getNullBo } from '@/utils/utils.ts';
import { taskGetOneApi } from './api';
import { TaskDetailVo } from './ApiBo';
import { Progress } from 'antd';
import FileView from '@/components/upload/FileView.tsx';


type Props = {
  detailId: number
};
export default (props: Props) => {
  const [detail, setDetailFn] = useState<TaskDetailVo>(getNullBo);
  const initMyDataFn = async () => {
    let rst = await taskGetOneApi({ taskId: props.detailId });
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
        column={1}
        title=""
        tooltip=""
      >

        {/*<ProDescriptions.Item label="userId" tooltip="" valueType="text" key={'userId'}>*/}
        {/*  {detail.userId}*/}
        {/*</ProDescriptions.Item>*/}
        {/*<ProDescriptions.Item label="type" tooltip="" valueType="text" key={'type'}>*/}
        {/*  {detail.type}*/}
        {/*</ProDescriptions.Item>*/}
        <ProDescriptions.Item label="名称" tooltip="" valueType="text" key={'name'}>
          {detail.name}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="描述" tooltip="" valueType="text" key={'remarks'}>
          {detail.remarks}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="开始时间" tooltip="" valueType="date" key={'startTime'}>
          {detail.startTime}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="结束时间" tooltip="" valueType="date" key={'endTime'}>
          {detail.endTime}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="进度" tooltip="" valueType="text" key={'progress'}>
          <Progress type="circle" percent={detail.progress} size={'small'} />
        </ProDescriptions.Item>
        <ProDescriptions.Item label="附件" tooltip="" valueType="text" key={'progress'}>
          <FileView fileList={detail.fileList ?? []}></FileView>
        </ProDescriptions.Item>


        {/*<ProDescriptions.Item label="dependencies" tooltip="" valueType="text" key={'dependencies'}>*/}
        {/*  {detail.dependencies}*/}
        {/*</ProDescriptions.Item>*/}
        {/*<ProDescriptions.Item label="createBy" tooltip="" valueType="text" key={'createBy'}>*/}
        {/*  {detail.createBy}*/}
        {/*</ProDescriptions.Item>*/}
        {/*<ProDescriptions.Item label="createTime" tooltip="" valueType="text" key={'createTime'}>*/}
        {/*  {detail.createTime}*/}
        {/*</ProDescriptions.Item>*/}
        {/*<ProDescriptions.Item label="updateBy" tooltip="" valueType="text" key={'updateBy'}>*/}
        {/*  {detail.updateBy}*/}
        {/*</ProDescriptions.Item>*/}
        {/*<ProDescriptions.Item label="updateTime" tooltip="" valueType="text" key={'updateTime'}>*/}
        {/*  {detail.updateTime}*/}
        {/*</ProDescriptions.Item>*/}
        {/*<ProDescriptions.Item label="deleteFlag" tooltip="" valueType="text" key={'deleteFlag'}>*/}
        {/*  {detail.deleteFlag}*/}
        {/*</ProDescriptions.Item>*/}
        {/*<ProDescriptions.Item label="sort" tooltip="" valueType="text" key={'sort'}>*/}
        {/*  {detail.sort}*/}
        {/*</ProDescriptions.Item>*/}

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