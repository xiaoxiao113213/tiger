import React from 'react';
import { ProDescriptions } from '@ant-design/pro-components';
import { Tabs, Tag } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { PipelineBuildStep } from '@/pages/pipelineBuild/api/pipelineBuildBo.ts';
import { PipelineBuildStatusMap } from '@/components/enums/PipelineBuildStatus.ts';
import ViewForm from '@/pages/flow/process/process/form/form/viewForm';


type Props = {
  stepDetail: PipelineBuildStep,
  pipelineNodeList: [],
  otherAccountList: [],
};
const Index = (props: Props) => {


  return (
    <div>
      <ProDescriptions
        column={2}
        title=""
        tooltip=""
      >
        <ProDescriptions.Item label="步骤名称" tooltip="" valueType="text" key={'name'}>
          {props.stepDetail.name}
        </ProDescriptions.Item>

        <ProDescriptions.Item label="构建状态" tooltip="" valueType="text" key={'buildStatus'}>
          <Tag>{PipelineBuildStatusMap.get(props.stepDetail.buildStatus)}</Tag>
        </ProDescriptions.Item>

        <ProDescriptions.Item label="插件" tooltip="" key={'pipelinePluginId'} valueEnum={{
          0: { text: '否' },
          1: { text: '是' },
        }}>
          {props.stepDetail.pipelinePluginId}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="版本" tooltip="" key={'pipelinePluginDetailId'} valueEnum={{
          0: { text: '否' },
          1: { text: '是' },
        }}>
          {props.stepDetail.pipelinePluginDetailId}
        </ProDescriptions.Item>

        <ProDescriptions.Item label="构建错误是否退出" tooltip="" key={'dockerFlag'} valueEnum={{
          0: { text: '不退' },
          1: { text: '退出' },
        }}>
          {props.stepDetail.errorStop}
        </ProDescriptions.Item>

        {/*<ProDescriptions.Item label="脚本" tooltip="" key={"nodeLabel"}  valueType="textarea"  >*/}
        {/*    {props.stepDetail.script}*/}
        {/*</ProDescriptions.Item>*/}
      </ProDescriptions>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: '脚本',
            key: '1',
            children: <TextArea autoSize value={props.stepDetail.script} readOnly>
            </TextArea>,
          },
          {
            label: '参数',
            key: '2',
            children: <div style={{ backgroundColor: 'rgb(176 225 128 / 13%)' }}>
              {props.stepDetail.paramList &&
                <ViewForm initFieldBoList={props.stepDetail.paramList}></ViewForm>
              }
            </div>,
          },
        ]}
      />


      {/* 插件id为0的时候 是pipeline自己添加的 不能进行编辑或者删除*/}


    </div>
  );
};

export default Index;