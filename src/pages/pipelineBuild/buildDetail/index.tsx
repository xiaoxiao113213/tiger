import { ProDescriptions } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { Card, Divider, Drawer } from 'antd';
import { getStageId, getStep, getStepId, isStage, isStep } from '@/pages/pipeline/pipeline/pipelineUtil';
import StageDetail from '@/pages/pipelineBuild/StageDetail';
import StepDetail from '@/pages/pipelineBuild/StepDetail';
import Log, { LogTypeEnum } from '@/pages/pipelineBuild/Log';
import { BuildDetailBo, PipelineBuildStage, PipelineBuildStep } from '@/pages/pipelineBuild/api/pipelineBuildBo.ts';
import { OperateEnum } from '@/utils/enum.ts';
import { OtherAccountBo } from '@/pages/pipeline/pipeline/api/bo.tsx';
import { pipelineNodeAllApi } from '@/pages/pipeline/node/api.tsx';
import { otherAccountAllApi } from '@/pages/pipeline/otherAccount/api.tsx';
import { pipelineBuildGetOneApi } from '@/pages/pipelineBuild/api/pipelineBuildApi.tsx';
import { PipelineBuildStatusMap } from '@/components/enums/PipelineBuildStatus.ts';
import ViewForm from '@/pages/flow/process/process/form/form/viewForm';
import BuildFlow from './flow/buildFlow';
import { PipelineBuildContext } from '@/pages/pipelineBuild/buildDetail/context.tsx';

type Props = {
  pipelineId: number
  buildDetailId: number
};
export default (props: Props) => {
  const [stepId, setStepIdFn] = useState<number>(0);
  const [buildDetail, setBuildDetailFn] = useState<BuildDetailBo>({} as BuildDetailBo);
  const [stageDetail, setStageDetailFn] = useState<PipelineBuildStage>({} as PipelineBuildStage);
  const [stageModal, setStageModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [stepDetail, setStepDetailFn] = useState<PipelineBuildStep>({} as PipelineBuildStep);
  const [stepModal, setStepModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [buildLogModal, setBuildLogModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [pipelineNodeList, setPipelineNodeListFn] = useState({});
  const [softList, setSoftListFn] = useState({});
  const [otherAccountList, setOtherAccountListFn] = useState<OtherAccountBo[]>([]);

  const initMyDataFn = async () => {
    pipelineNodeAllApi({}).then(rst => {
      let map = { null: { text: '没有执行' } };
      rst.data.forEach(item => {
        map[item.id] = { text: item.name };
      });
      setPipelineNodeListFn(map);
    });
    //     todo 设置软件  等软件那块写好了
    let softList1 = [{ id: 1, name: '软件1' }, { id: 3, name: '软件2' }, { id: 2, name: '软件3' }];
    let map = {};
    softList1.forEach(item => {
      map[item.id] = { text: item.name };
    });
    setSoftListFn(map);

    otherAccountAllApi({}).then(rst => {
      // 由于 参数选择 过程中 都是字符串最为默认值 因此 把id number 改成字符串
      rst.data.forEach(item => item.id = item.id + '');
      setOtherAccountListFn(rst.data);
    });
  };

  function getStage(id: number, pipelineStageList: PipelineBuildStage []): null | PipelineBuildStage {
    if (!pipelineStageList || pipelineStageList.length === 0) return null;
    for (let pipelineStageBo of pipelineStageList) {
      if (pipelineStageBo.id === id) {
        return pipelineStageBo;
      }
      let tmp = getStage(id, pipelineStageBo.sonStageList);
      if (tmp !== null && tmp !== undefined) return tmp;
    }
    return null;
  }

  const logStepFn = () => {
  };

  // 点击节点 展示可操作项
  const nodeClickFn = (buttonName: string, nodeId: string) => {
    if (buttonName === '详情') {
      if (isStage(nodeId)) {
        setBuildDetailFn((pre) => {
          let stage = getStage(parseInt(getStageId(nodeId)), pre.pipelineBuildStageList);
          setStageDetailFn(stage!!);
          setStageModalFn(OperateEnum.detail);
          return pre;
        });
      } else if (isStep(nodeId)) {
        setBuildDetailFn((pre) => {
          let step = getStep(parseInt(getStepId(nodeId)), pre.pipelineBuildStageList);
          setStepDetailFn(step!!);
          setStepModalFn(OperateEnum.detail);
          return pre;
        });
      }
    } else if (buttonName === '日志') {
      if (isStage(nodeId)) {
        // setStageIdFn(parseInt(getStageId(nodeId)))
        // setStageComponentOpenTypeFn(OperateEnum.edit)
      } else if (isStep(nodeId)) {
        let stepId = parseInt(getStepId(nodeId));
        setStepIdFn(stepId);
        setBuildLogModalFn(OperateEnum.detail);
      }
    } else {

    }
  };


  useEffect(() => {
    pipelineBuildGetOneApi({ id: props.buildDetailId }).then(rst => {
      setBuildDetailFn(rst.data);
    });
    initMyDataFn();
    const intervalId = setInterval(() => {
      pipelineBuildGetOneApi({ id: props.buildDetailId }).then(rst => {
        setBuildDetailFn(rst.data);
      });
    }, 3000);

    return () => {
      // 在组件卸载前执行清理操作
      clearInterval(intervalId);
    };

  }, []); // 第二个参数表示依赖项


  return (
    <PipelineBuildContext.Provider value={{ nodeClickFn }}>
      <div>
        {buildDetail !== undefined &&
          <div>
            <BuildFlow detail={buildDetail} nodeClickFn={nodeClickFn}></BuildFlow>
            <Card>
              <ProDescriptions
                column={2}
                title=""
                tooltip=""
              >
                <ProDescriptions.Item label="流水线名称" tooltip="" valueType="text" key={'name'}>
                  {buildDetail.name}
                </ProDescriptions.Item>
                <ProDescriptions.Item label="构建状态" tooltip="" valueType="text" key={'buildStatus'}>
                  {PipelineBuildStatusMap.get(buildDetail.buildStatus)}
                </ProDescriptions.Item>
                <ProDescriptions.Item label="所属软件" tooltip="" valueType="text" valueEnum={softList} key={'soft'}>
                  {buildDetail.softIds}
                </ProDescriptions.Item>
                <ProDescriptions.Item label="执行机标签" tooltip="" valueType="text" key={'pipelineNodeLabel'}>
                  {buildDetail.pipelineNodeLabel}
                </ProDescriptions.Item>
                <ProDescriptions.Item label="执行机" tooltip="" valueEnum={pipelineNodeList} key={'pipelineNodeId'}>
                  {buildDetail.pipelineNodeId}
                </ProDescriptions.Item>
                <ProDescriptions.Item label="镜像" tooltip="" key={'dockerFlag'} valueEnum={{
                  0: { text: '未使用镜像' },
                  1: { text: '使用了镜像' },
                }}>
                  {buildDetail.dockerFlag}
                </ProDescriptions.Item>
                {buildDetail.dockerFlag === 1 &&
                  <ProDescriptions.Item label="镜像名称" tooltip="" valueType="text" key={'dockerName'}>
                    {buildDetail.dockerName}
                  </ProDescriptions.Item>
                }
                {buildDetail.dockerFlag === 1 &&
                  <ProDescriptions.Item label="镜像参数" tooltip="" valueType="textarea" key={'dockerParam'}>
                    {buildDetail.dockerParam}
                  </ProDescriptions.Item>
                }
              </ProDescriptions>
            </Card>

            <Divider>全局参数</Divider>

            {buildDetail.globalParamList &&
              <ViewForm initFieldBoList={buildDetail.globalParamList}></ViewForm>
            }

            <Drawer
              title={'阶段详情'}
              open={stageModal !== OperateEnum.close}
              footer={false}
              width={'75%'}
              destroyOnClose={true}
              maskClosable={false}
              onClose={() => setStageModalFn(OperateEnum.close)}
            >
              <StageDetail
                stageDetail={stageDetail}
                pipelineNodeList={pipelineNodeList}
              />
            </Drawer>
            <Drawer
              title={'步骤详情'}
              open={stepModal !== OperateEnum.close}
              footer={false}
              width={'75%'}
              destroyOnClose={true}
              maskClosable={false}
              onClose={() => setStepModalFn(OperateEnum.close)}
            >
              <StepDetail
                stepDetail={stepDetail}
                pipelineNodeList={pipelineNodeList}
                otherAccountList={otherAccountList}
              />
            </Drawer>

            <Drawer
              title={'构建日志 '}
              open={buildLogModal !== OperateEnum.close}
              width={'75%'}
              destroyOnClose={true}
              maskClosable={false}
              onClose={() => setBuildLogModalFn(OperateEnum.close)}
              footer={null}
            >
              <div>
                <Log
                  pipelineId={props.pipelineId}
                  buildDetailId={props.buildDetailId}
                  type={LogTypeEnum.step}
                  buildStepId={stepId}
                />
              </div>
            </Drawer>


          </div>}
      </div>
    </PipelineBuildContext.Provider>
  );
};