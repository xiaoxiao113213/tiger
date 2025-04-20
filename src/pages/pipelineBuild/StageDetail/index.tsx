import React from 'react';
import { ProDescriptions } from '@ant-design/pro-components';
import { Tag } from 'antd';
import { PipelineBuildStage } from '@/pages/pipelineBuild/api/pipelineBuildBo.ts';
import { PipelineBuildStatusMap } from '@/components/enums/PipelineBuildStatus.ts';


type Props = {
  stageDetail?: PipelineBuildStage,
  pipelineNodeList: []
};
const Index = (props: Props) => {


  return (
    <div>
      <ProDescriptions
        column={2}
        title=""
        tooltip=""
      >
        <ProDescriptions.Item label="阶段名称" tooltip="" valueType="text" key={'name'}>
          {props.stageDetail?.name}
        </ProDescriptions.Item>

        <ProDescriptions.Item label="构建状态" tooltip="" valueType="text" key={'buildStatus'}>
          <Tag>{PipelineBuildStatusMap.get(props.stageDetail?.buildStatus ?? 0)}</Tag>
        </ProDescriptions.Item>

        <ProDescriptions.Item label="是否使用默认执行机" tooltip="" key={'dockerFlag'} valueEnum={{
          0: { text: '否' },
          1: { text: '是' },
        }}>
          {props.stageDetail?.nodeDefault}
        </ProDescriptions.Item>
        {props.stageDetail?.nodeDefault === 0 &&
          <ProDescriptions.Item label="执行机标签" tooltip="" key={'nodeLabel'}>
            {props.stageDetail?.nodeLabel}
          </ProDescriptions.Item>
        }
        {props.stageDetail?.nodeDefault === 0 &&
          <ProDescriptions.Item label="执行机名称" tooltip="" key={'nodeId'} valueEnum={props.pipelineNodeList}>
            {props.stageDetail.nodeId}
          </ProDescriptions.Item>
        }
        <ProDescriptions.Item label="是否使用镜像" tooltip="" key={'dockerFlag'} valueEnum={{
          0: { text: '否' },
          1: { text: '是' },
        }}>
          {props.stageDetail?.dockerFlag}
        </ProDescriptions.Item>


        {props.stageDetail?.dockerFlag === 1 &&
          <ProDescriptions.Item label="镜像名称" tooltip="" valueType="text" key={'dockerName'}>
            {props.stageDetail.dockerName}
          </ProDescriptions.Item>
        }
        {props.stageDetail?.dockerFlag === 1 &&
          <ProDescriptions.Item label="镜像参数" tooltip="" valueType="textarea" key={'dockerParam'}>
            {props.stageDetail.dockerParam}
          </ProDescriptions.Item>
        }

      </ProDescriptions>

    </div>
  );
};

export default Index;