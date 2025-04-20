import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, Card, Form, FormInstance, Input, message, Radio, Select } from 'antd';
import { getStage, getStep } from '@/pages/pipeline/pipeline/pipelineUtil';
import { OtherAccountBo, PipelineBo, PipelinePluginBo, PipelineStepBo } from '@/pages/pipeline/pipeline/api/bo.tsx';
import { OperateEnum } from '@/utils/enum.ts';
import { PipelineParamBo } from '@/pages/pipeline/plugin/ApiBo.ts';
import { pipelinePluginAllApi, pipelinePluginDetailAllApi, pipelinePluginDetailGetOneApi } from '@/pages/pipeline/plugin/api.tsx';
import { checkApiRst, getRandomNumber, oFormatForm } from '@/utils/utils.ts';
import { clientToServerValueItem, serverToClientValue } from '@/pages/flow/process/process/form/form/Bo.tsx';
import { usePipelineContext } from '@/pages/pipeline/pipeline/pipelineUtil/context.tsx';
import CodeMirrorEditor from '@/components/CodeEidtor';
import SubmitNowform from '@/pages/flow/process/process/form/form/submitForm/submitNowform.tsx';


type Props = {
  // 初始化的查询参数 可插入一些 写死的参数值
  detail: PipelineBo,
  stepComponentOpenType: OperateEnum,
  setStepComponentOpenTypeFn: Dispatch<SetStateAction<OperateEnum>>,
  pipelineNodeList: [],
  stepId: number, //
  stageId: number, //
  setDetailFn: Dispatch<SetStateAction<PipelineBo>>,
  otherAccountList: OtherAccountBo[]
};
const StepComponent = (props: Props) => {
  const [formRef] = Form.useForm<FormInstance<PipelineStepBo>>();
  const [pluginId, setPluginIdFn] = useState<number>(0);
  const [pluginDetailId, setPluginDetailIdFn] = useState<number>(0);
  const [stepState, setStepStateFn] = useState<PipelineStepBo>();
  const [pluginList, setPluginListFn] = useState<PipelinePluginBo[]>([]);
  const [pluginDetailList, setPluginDetailListFn] = useState<PipelinePluginBo[]>([]);
  const [pluginDetailParamList, setPluginDetailParamListFn] = useState<PipelineParamBo[]>([]);
  const { pipelineOpenType } = usePipelineContext();
  const [code, setCode] = useState<string>('');
  const [readOnly, setReadOnly] = useState(true);
  const [reloadCode, setReloadCode] = useState(0);
  const [formFieldRef] = Form.useForm();

  const reloadScript = (script: string, readOnly: boolean) => {
    setCode(script);
    if (pipelineOpenType === OperateEnum.detail) {
      setReadOnly(true);
    } else {
      setReadOnly(readOnly);
    }
    setReloadCode(prevState => prevState + 1);
  };

  // 设置参数 当进来  或者 插件详情变更的时候  都要调用此方法 去动态变更显示 下面的参数 即插件的参数
  // 当 修改的时候 如果 detail 中的 此步骤中 已经设置了默认值 要先显示它的默认值
  const setParamFn = async (pluginDetailId: number) => {
    let rst = await pipelinePluginDetailGetOneApi({ pipelinePluginDetailId: pluginDetailId });
    if (checkApiRst(rst)) return null;
    let params = rst.data.params.filter((item) => item.scope === 0);
    if (props.stepComponentOpenType !== OperateEnum.add) {
      params.forEach(item => {
        let oldParam = stepState?.paramList.find(oldItem => item.keyName === oldItem.keyName);
        if (oldParam) {
          item.value = oldParam.value;
        }
      });
    }
    params.forEach(item => {
      serverToClientValue(item);
    });
    setPluginDetailParamListFn(params);
    const fields = {};
    params.forEach(item => {
      fields[item.id] = item.value;
    });
    formFieldRef?.setFieldsValue(fields);
  };

  const pluginDetailChangeFn = async (pipelinePluginDetailId: number) => {
    let pipelinePluginDetail = pluginDetailList.find((item) => item.id === pipelinePluginDetailId);
    // 当大类型 为1 或者2的时候  由于pluginId 的set是异步的 导致读取不及时
    if (pluginId === 1 || pluginId === 2) {
      reloadScript('', false);
      setParamFn(pipelinePluginDetailId);
      return;
    }
    if (pipelinePluginDetail) {
      reloadScript(pipelinePluginDetail.script, true);
      setParamFn(pipelinePluginDetailId);
    }
  };

  const pluginChangeFn = async (pipelinePluginId: number) => {
    setPluginIdFn(parseInt(pipelinePluginId));
    let rst = await pipelinePluginDetailAllApi({ pipelinePluginId: pipelinePluginId });
    if (checkApiRst(rst)) return null;
    setPluginDetailListFn(rst.data);
    if (rst.data.length > 0) {
      let pipelinePluginDetailId = rst.data[0].id;
      let pluginDetail = rst.data.find(item => item.id === pluginDetailId);
      if (pluginDetail) {
        pipelinePluginDetailId = pluginDetailId;
      }
      // useState 上面设置 是异步的 导致直接直接用 pluginDetailChangeFn使用会有问题
      if (pipelinePluginId === 1 || pipelinePluginId === 2) {
        formRef.setFieldsValue({ pipelinePluginDetailId: pipelinePluginDetailId });
        reloadScript('', false);
      } else {
        formRef.setFieldsValue({ pipelinePluginDetailId: pipelinePluginDetailId });
        reloadScript(rst.data[0].script, true);
      }
      setParamFn(pipelinePluginDetailId);
    }
  };
  // 当一开始进入的时候调用
  const initPluginChangeFn = async (pipelinePluginId: number, oldScript?: string) => {
    setPluginIdFn(parseInt(pipelinePluginId));
    let rst = await pipelinePluginDetailAllApi({ pipelinePluginId: pipelinePluginId });
    if (checkApiRst(rst)) return null;
    setPluginDetailListFn(rst.data);
    if (rst.data.length > 0) {
      let pipelinePluginDetailId = rst.data[0].id;
      let pluginDetail = rst.data.find(item => item.id === pluginDetailId);
      if (pluginDetail) {
        pipelinePluginDetailId = pluginDetailId;
      }
      // useState 上面设置 是异步的 导致直接直接用 pluginDetailChangeFn使用会有问题
      if (pipelinePluginId === 1 || pipelinePluginId === 2) {
        formRef.setFieldsValue({ 'pipelinePluginDetailId': pipelinePluginDetailId });
        reloadScript(oldScript ?? '', false);
      } else {
        formRef.setFieldsValue({ 'pipelinePluginDetailId': pipelinePluginDetailId });
        reloadScript(rst.data[0].script, true);
      }
      setParamFn(pipelinePluginDetailId);
    }
  };


  // pipelinePluginId 当传递这个值的时候 是详情 或者编辑 不传递的时候 是新增
  const initData = async (pipelinePluginId?: number | undefined, oldScript?: string) => {
    let rst = await pipelinePluginAllApi({});
    if (checkApiRst(rst)) return null;
    setPluginListFn(rst.data);
    if (pipelinePluginId) { // 更新或者详情
      initPluginChangeFn(pipelinePluginId, oldScript);

    } else if (rst.data.length > 0) { //新增
      formRef.setFieldsValue({ 'pipelinePluginId': rst.data[0].id });
      initPluginChangeFn(rst.data[0].id);
    }
  };


  const submit = async () => {
    const isPass = await formRef.validateFields().catch(() => false);
    if (!isPass) return;
    const values = await formRef?.getFieldsValue();
    oFormatForm(values);
    const isPass1 = await formFieldRef.validateFields().catch(() => false);
    if (!isPass1) {
      message.error('请填写必填项');
      return;
    }
    const fieldValues = await formFieldRef?.getFieldsValue();
    oFormatForm(values);
    const fieldList = pluginDetailParamList.map(item => {
      const i = { ...item };
      if (fieldValues[item.id]) {
        i.value = fieldValues[item.id];
      }
      clientToServerValueItem(i);
      return i;
    });
    const nullItem = fieldList.find(item => item.notNull === 1 && !item.value && item.value === '');
    if (nullItem) {
      message.error(`请填写必填项【${nullItem.name}】`);
      return;
    }
    // 修改逻辑
    if (props.stepComponentOpenType === OperateEnum.edit) {
      let step = getStep(props.stepId, props.detail.pipelineStageList)!!;
      step.name = values.name;
      step.disabled = values.disabled;
      step.pipelinePluginId = values.pipelinePluginId;
      step.pipelinePluginDetailId = values.pipelinePluginDetailId;
      step.errorStop = values.errorStop;
      step.script = code;
      step.dockerName = values.dockerName;
      step.paramList = fieldList;
    }
    //     新增逻辑
    if (props.stepComponentOpenType === OperateEnum.add) {
      let step = { ...values, id: getRandomNumber(), script: code };
      step.paramList = fieldList;
      let stageParent = getStage(props.stageId, props.detail.pipelineStageList)!!;
      if (stageParent.stepList) {
        stageParent.stepList.push(step);
      } else {
        stageParent['stepList'] = [step];
      }
    }
    props.setDetailFn(JSON.parse(JSON.stringify(props.detail)));
    props.setStepComponentOpenTypeFn(OperateEnum.close);
  };


  useEffect(() => {
    // 在组件挂载或更新后执行操作
    // 初始化表单
    if (props.stepComponentOpenType === OperateEnum.add) {
      formRef.setFieldsValue({ 'errorStop': 1, disabled: 0 });
      initData();
    } else {
      let step = getStep(props.stepId, props.detail.pipelineStageList)!!;
      setPluginIdFn(step.pipelinePluginId);
      setPluginDetailIdFn(step.pipelinePluginDetailId);
      setStepStateFn(step);
      formRef.setFieldsValue({ ...step });
    }
    return () => {

    };
  }, []); // 第二个参数表示依赖项
  useEffect(() => {
    if (stepState) {
      initData(stepState.pipelinePluginId, stepState.script);
    }
    return () => {
    };
  }, [stepState]); // 第二个参数表示依赖项

  return (
    <div>
      <div className={'mySpace'}>
        <Form form={formRef}
              autoComplete={'off'}
              disabled={pipelineOpenType === OperateEnum.detail}
        >

          <div className={'myLine'}>
            <Form.Item label="步骤名称" name="name" rules={[{ required: true }]}>
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
            <Form.Item label="插件" name="pipelinePluginId" rules={[{ required: true }]}>
              <Select

                options={pluginList}
                fieldNames={{ label: 'name', value: 'id' }}
                onChange={pluginChangeFn}
              />
            </Form.Item>
            <Form.Item label="版本" name="pipelinePluginDetailId" rules={[{ required: true }]}>
              <Select
                options={pluginDetailList}
                fieldNames={{ label: 'number', value: 'id' }}
                onChange={pluginDetailChangeFn}
              />
            </Form.Item>
          </div>
          <div className={'myLine'}>
            <Form.Item label="构建错误是否退出" name="errorStop" rules={[{ required: true }]}>
              <Radio.Group>
                <Radio value={1}> 退出 </Radio>
                <Radio value={0}> 不退出 </Radio>
              </Radio.Group>
            </Form.Item>
          </div>

          <CodeMirrorEditor
            value={code}
            language="shell"
            onChange={setCode}
            readOnly={readOnly}
            reloadValue={reloadCode}
          ></CodeMirrorEditor>

          <Card title={<div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>表单</span></div>}>
            <Form form={formFieldRef}>
              {
                pluginDetailParamList.map((item) => {
                  return <SubmitNowform
                    key={item.id}
                    initFieldBo={item}
                  ></SubmitNowform>;
                })
              }
            </Form>
          </Card>

          {pipelineOpenType !== OperateEnum.detail &&
            <Form.Item wrapperCol={{ offset: 12, span: 12 }} style={{ marginTop: 10 }}>
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

export default StepComponent;