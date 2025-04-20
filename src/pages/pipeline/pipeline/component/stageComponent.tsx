import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, Form, Input, Radio, RadioChangeEvent, Select } from 'antd';

import { getStage } from '@/pages/pipeline/pipeline/pipelineUtil';
import { PipelineBo, PipelineStageBo } from '@/pages/pipeline/pipeline/api/bo.tsx';
import { OperateEnum } from '@/utils/enum.ts';
import { getRandomNumber, oFormatForm } from '@/utils/utils.ts';
import { usePipelineContext } from '@/pages/pipeline/pipeline/pipelineUtil/context.tsx';

type Props = {
  // 初始化的查询参数 可插入一些 写死的参数值
  detail: PipelineBo,
  stageComponentOpenType: OperateEnum,
  setStageComponentOpenTypeFn: Dispatch<SetStateAction<OperateEnum>>,
  pipelineNodeList: [],
  id: number, // 点击节点 所触发弹框的id
  setDetailFn: Dispatch<SetStateAction<PipelineBo>>
};
const StageComponent = (props: Props) => {
  const [dockerFlag, setDockerFlagFn] = useState<number>(0);
  const [nodeDefaultFlag, nodeDefaultFlagFn] = useState<number>(0);
  const [formRef] = Form.useForm<PipelineStageBo>();
  const { pipelineOpenType } = usePipelineContext();

  const dockerFlagChangeFn = (e: RadioChangeEvent) => {
    setDockerFlagFn(parseInt(e.target.value));
  };
  const nodeDefaultChangeFn = (e: RadioChangeEvent) => {
    nodeDefaultFlagFn(parseInt(e.target.value));
  };

  const submit = async () => {
    const isPass = await formRef.validateFields().catch(() => false);
    if (!isPass) return;
    const values = await formRef?.getFieldsValue();
    oFormatForm(values);
    // 修改逻辑
    if (props.stageComponentOpenType === OperateEnum.edit) {
      let stage = getStage(props.id, props.detail.pipelineStageList)!!;
      stage.name = values.name;
      stage.disabled = values.disabled;
      stage.nodeDefault = values.nodeDefault;
      stage.nodeLabel = values.nodeLabel;
      stage.dockerFlag = values.dockerFlag;
      stage.dockerName = values.dockerName;
      stage.dockerParam = values.dockerParam;
      props.setDetailFn(JSON.parse(JSON.stringify(props.detail)));
      props.setStageComponentOpenTypeFn(OperateEnum.close);
    }
    //     新增逻辑
    if (props.stageComponentOpenType === OperateEnum.add) {

      let stage = { ...values, id: getRandomNumber() };
      if (props.id === 0) {
        props.detail.pipelineStageList.push(stage);
      } else {
        let stageParent = getStage(props.id, props.detail.pipelineStageList)!!;
        if (stageParent.sonStageList) {
          stageParent.sonStageList.push(stage);
        } else {
          stageParent['sonStageList'] = [stage];
        }
      }
      props.setDetailFn(JSON.parse(JSON.stringify(props.detail)));
      props.setStageComponentOpenTypeFn(OperateEnum.close);
    }
  };

  useEffect(() => {
    // 在组件挂载或更新后执行操作
    if (props.stageComponentOpenType === OperateEnum.edit || props.stageComponentOpenType === OperateEnum.detail) {
      // let stage = props.detail.pipelineStageList.find((item) => item.id === props.id)!!
      let stage = getStage(props.id, props.detail.pipelineStageList);
      formRef.setFieldsValue(stage);
      setDockerFlagFn(stage?.dockerFlag ?? 0);
    } else if (props.stageComponentOpenType === OperateEnum.add) {
      formRef.setFieldsValue({ disabled: 0, dockerFlag: 0, nodeDefault: 1 });
    }
    return () => {
      // 在组件卸载前执行清理操作
    };
  }, []); // 第二个参数表示依赖项

  return (
    <div>
      <div className={'mySpace'}>
        <Form form={formRef} autoComplete={'off'}
              disabled={pipelineOpenType === OperateEnum.detail}
        >

          <div className={'myLine'}>
            <Form.Item label="阶段名称" name="name" rules={[{ required: true }]}>
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item label="是否禁用" name="disabled" rules={[{ required: true }]}>
              <Radio.Group>
                <Radio value={0}> 启用 </Radio>
                <Radio value={1}> 禁用 </Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          <div className={'myLine'}>
            <Form.Item label="是否使用默认执行机" name="nodeDefault" rules={[{ required: true }]} tooltip={'当不使用默认执行机的时候 要从新选择执行机'}>
              <Radio.Group onChange={nodeDefaultChangeFn}>
                <Radio value={1}> 使用 </Radio>
                <Radio value={0}> 不使用 </Radio>
              </Radio.Group>
            </Form.Item>
            {formRef?.getFieldValue('nodeDefault') === 0
              &&
              <Form.Item label="执行机标签" name="nodeLabel" rules={[{ required: true }]}>
                <Select
                  options={props.pipelineNodeList}
                  fieldNames={{ label: 'label', value: 'label' }}
                />
              </Form.Item>
            }

          </div>
          <div className={'myLine'}>
            <Form.Item label="是否使用镜像" name="dockerFlag" rules={[{ required: true }]}>
              <Radio.Group onChange={dockerFlagChangeFn}>
                <Radio value={0}> 不用 </Radio>
                <Radio value={1}> 使用 </Radio>
              </Radio.Group>
            </Form.Item>
            {dockerFlag === 1 &&
              <Form.Item label="镜像名称" name="dockerName" rules={[{ required: true }]}>
                <Input placeholder="请输入" />
              </Form.Item>
            }
          </div>
          <div className={'myLine'}>
            {dockerFlag === 1 &&
              <Form.Item label="镜像参数" name="dockerParam" rules={[{ required: false }]}>
                <Input.TextArea placeholder="请输入"
                                autoComplete="new-password"
                                autoSize={{ minRows: 2 }}
                />
              </Form.Item>
            }
          </div>
          {pipelineOpenType !== OperateEnum.detail &&
            <Form.Item wrapperCol={{ offset: 12, span: 12 }}>
              <Button type="primary" htmlType="submit" onClick={submit}>
                确认
              </Button>
            </Form.Item>
          }

        </Form>
      </div>
    </div>
  );
};

export default StageComponent;