import React, { useEffect, useState } from 'react';
import { Button, Card, Divider, Drawer, Form, Input, message, Select } from 'antd';
import { getStage, getStageId, getStageParent, getStep, getStepId, getStepStage, isStage, isStart, isStep } from '@/pages/pipeline/pipeline/pipelineUtil';
import StageComponent from '@/pages/pipeline/pipeline/component/stageComponent';
import StepComponent from '@/pages/pipeline/pipeline/component/stepComponent';
import { OtherAccountBo, PipelineBo } from '@/pages/pipeline/pipeline/api/bo.tsx';
import { OperateEnum, showOperateName } from '@/utils/enum.ts';
import { PipelineParamBo } from '@/pages/pipeline/plugin/ApiBo.ts';
import { changeBo, oFormatForm, oGetAllStep } from '@/utils/utils.ts';
import { pipelinePluginDetailGlobalParamApi } from '@/pages/pipeline/plugin/api.tsx';
import { clientToServerValueItem, CustomerFieldBo, serverToClientValue } from '@/pages/flow/process/process/form/form/Bo.tsx';
import PipelineFlow from '../flow/PipelineFlow';
import { PipelineContext } from '@/pages/pipeline/pipeline/pipelineUtil/context.tsx';
import SubmitForm from '@/pages/flow/process/process/form/form/submitForm';
import FormComponent, { FormBuilderRef } from '@/pages/flow/process/process/form/form/addForm/formComponent.tsx';
import { pipelineGetOneApi, pipelineSaveApi, pipelineUpdateApi } from '@/pages/pipeline/pipeline/api/pipeline.tsx';
import { pipelineNodeAllApi } from '@/pages/pipeline/node/api.tsx';
import { otherAccountAllApi } from '@/pages/pipeline/otherAccount/api.tsx';
import { Rst } from '@/utils/baseBo.ts';

type Props = {
  // 初始化的查询参数 可插入一些 写死的参数值
  pipelineId?: number,
  openType: OperateEnum,
  reloadTable: () => void
};
const PipelineMainAdd = (props: Props) => {
  const [detailFormRef] = Form.useForm<PipelineBo>();
  const [detail, setDetailFn] = useState<PipelineBo>();
  const [stageId, setStageIdFn] = useState<number>(0);
  const [stepId, setStepIdFn] = useState<number>(0);
  const [stageComponentOpenType, setStageComponentOpenTypeFn] = useState<OperateEnum>(OperateEnum.close);
  const [stepComponentOpenType, setStepComponentOpenTypeFn] = useState<OperateEnum>(OperateEnum.close);
  const [formDesignOpen, setFormDesignOpen] = useState(false);
  const formBuilderRef = React.useRef<FormBuilderRef>(null);
  const [formFieldRef] = Form.useForm();
  const [globalFieldList, setGlobalFieldList] = useState<CustomerFieldBo[]>([]);
  const [softList, setSoftListFn] = useState([]);
  const [pipelineNodeList, setPipelineNodeListFn] = useState();
  const [otherAccountList, setOtherAccountListFn] = useState<OtherAccountBo[]>();

  const getDetailAndSetDetailFn = async (id: number) => {
    const res = await pipelineGetOneApi({ id });
    if (res?.code !== 1000) return;
    setDetailFn({ ...res.data });
    const fieldList = res.data.globalParamList ?? [];
    fieldList.forEach(item => {
      serverToClientValue(item);
    });
    setGlobalFieldList(fieldList);
    detailFormRef?.setFieldsValue({ ...res.data });
    let detail1: PipelineBo = res.data;
    if (!detail1.permissionList) return;
  };


  const initData = () => {
    if (props.pipelineId) {
      getDetailAndSetDetailFn(props.pipelineId);
    } else {
      setDetailFn({pipelineStageList:[]} as PipelineBo);
    }
    setSoftListFn([{ id: 1, name: '软件1' }, { id: 3, name: '软件2' }, { id: 2, name: '软件3' }]);
    pipelineNodeAllApi({}).then(rst => {
      setPipelineNodeListFn(rst.data);
    });
    otherAccountAllApi({}).then(rst => {
      // 由于 参数选择 过程中 都是字符串最为默认值 因此 把id number 改成字符串
      rst.data.forEach(item => item.id = item.id + '');
      setOtherAccountListFn(rst.data);
    });

  };

  // 当插件变更的时候 设置全局参数
  useEffect(() => {
    // 在组件挂载或更新后执行操作
    let stepList = oGetAllStep(detail?.pipelineStageList ?? []);
    let globalStepParamList: PipelineParamBo[] = [];
    pipelinePluginDetailGlobalParamApi(stepList.map(item => item.pipelinePluginDetailId)).then(rst => {
      globalStepParamList = globalStepParamList.concat(rst.data);
      let globalParamList: PipelineParamBo[] = [];
      // 先遍历之前的全局参数  是0的 直接加入 是现在还有插件的id下的key名称存在的 加入 其他的不要
      if (globalFieldList) {
        globalFieldList.forEach(param => {
          if (param.pipelinePluginDetailId === 0) {
            globalParamList.push(param);
          } else {
            // 筛选属于当前的阶段的 全局变量
            let stepParam = globalStepParamList.find(item => item.keyName === param.keyName &&
              item.pipelinePluginDetailId === param.pipelinePluginDetailId);
            if (stepParam) {
              globalParamList.push(param);
            }
          }
        });
      }
      // 然后遍历插件里面的全局参数  没有keyName的则加入 有的告警下
      globalStepParamList.forEach(param => {
        let globalParam = globalParamList.find(item => item.keyName === param.keyName);
        if (globalParam) {
          //     alert 下
        } else {
          globalParamList.push(param);
        }
      });
      // 把插件的参数添加到前面
      let tmp = globalParamList.filter(item => item.pipelinePluginDetailId !== 0);
      tmp.push(...globalParamList.filter(item => item.pipelinePluginDetailId === 0));
      setGlobalFieldList(tmp);
    });
    return () => {
      // 在组件卸载前执行清理操作
    };
  }, [stepComponentOpenType, detail]); // 监听detail的变化 设置全局参数


  useEffect(() => {
    initData();
  }, []);
  if (!detail || !pipelineNodeList || !otherAccountList || !softList || !globalFieldList) {
    return <div></div>;
  }

  // 点击节点 展示可操作项
  const nodeClickFn = (buttonName: string, nodeId: string) => {
    console.log('按钮名称', buttonName, '节点id', nodeId);
    if (buttonName === '详情') {
      if (isStage(nodeId)) {
        setStageIdFn(parseInt(getStageId(nodeId)));
        setStageComponentOpenTypeFn(OperateEnum.detail);
      } else if (isStep(nodeId)) {
        setStepIdFn(parseInt(getStepId(nodeId)));
        setStepComponentOpenTypeFn(OperateEnum.detail);
      }
    } else if (buttonName === '修改') {
      if (isStage(nodeId)) {
        setStageIdFn(parseInt(getStageId(nodeId)));
        setStageComponentOpenTypeFn(OperateEnum.edit);
      } else if (isStep(nodeId)) {
        setStepIdFn(parseInt(getStepId(nodeId)));
        setStepComponentOpenTypeFn(OperateEnum.edit);
      }
    } else if (buttonName === '添加子阶段') {
      if (isStage(nodeId)) {
        setStageIdFn(parseInt(getStageId(nodeId)));
        setStageComponentOpenTypeFn(OperateEnum.add);
      } else if (isStep(nodeId)) {
      } else if (isStart(nodeId)) {
        setStageIdFn(0);
        setStageComponentOpenTypeFn(OperateEnum.add);
      }
    } else if (buttonName === '添加步骤') {
      if (isStage(nodeId)) {
        setStageIdFn(parseInt(getStageId(nodeId)));
        setStepComponentOpenTypeFn(OperateEnum.add);
      }
    } else if (buttonName === '删除') {
      if (isStage(nodeId)) {
        setDetailFn(detail1 => {
          let stageId = parseInt(getStageId(nodeId));
          let stage = getStage(stageId, detail1.pipelineStageList)!!;

          let parentStage = getStageParent(stageId, detail1.pipelineStageList, null);
          if (parentStage) {
            const index = parentStage.sonStageList.indexOf(stage);
            if (index !== -1) {
              parentStage.sonStageList.splice(index, 1);
            }
          } else {
            //     说明顶级是开始
            const index = detail1.pipelineStageList.indexOf(stage);
            if (index !== -1) {
              detail1.pipelineStageList.splice(index, 1);
            }
          }
          return JSON.parse(JSON.stringify(detail1));
        });
      } else if (isStep(nodeId)) {
        setDetailFn(detail1 => {
          let stepId = parseInt(getStepId(nodeId));
          let step = getStep(stepId, detail1.pipelineStageList)!!;
          let stage = getStepStage(stepId, detail1.pipelineStageList)!!;
          const index = stage.stepList.indexOf(step)!!;
          if (index !== -1) {
            stage.stepList.splice(index, 1);
          }
          return JSON.parse(JSON.stringify(detail1));
        });
      }

    } else {

    }
  };


  const saveFn = async () => {
    const isPass = await detailFormRef.validateFields().catch(() => false);
    if (!isPass) return;
    const values = await detailFormRef?.getFieldsValue();
    oFormatForm(values);

    const fieldList = globalFieldList.map(item => {
      const i = { ...item };
      clientToServerValueItem(i);
      return i;
    });

    let res: Rst<any>;
    if (detail?.id) {
      let param = { ...detail,...values, globalParamList: fieldList };
      res = await pipelineUpdateApi(changeBo(param));
    } else {
      let param = { ...detail, ...values, globalParamList: fieldList };
      res = await pipelineSaveApi(changeBo(param));
    }
    if (res?.code !== 1000) return;
    message.success(res?.msg);
    props.reloadTable();
  };


  const handleOk = () => {
    const list = formBuilderRef.current?.getFieldList();
    if (!list) return;
    // 如果list中 key为空 或者有重复的key 都报错
    list.forEach((item) => {
      if (item.keyName === '') {
        message.error('有字段的唯一标识为空');
        throw new Error('有字段的唯一标识为空');
      }
      const tmpList = list.filter((i) => i.keyName === item.keyName);
      if (tmpList.length > 1) {
        message.error(`有重复的唯一标识【${tmpList[0].keyName}】`);
        throw new Error(`有重复的唯一标识【${tmpList[0].keyName}】`);
      }
    });
    setGlobalFieldList(list);
    const value = {};
    list.forEach((item) => {
      value[item.id] = item.value;
    });
    formFieldRef.setFieldsValue(value);
    setFormDesignOpen(false);
  };
  return (
    <div>
      <div style={{ textAlign: 'right' }}><Button type={'primary'} onClick={saveFn}>保存</Button></div>
      <PipelineContext.Provider value={{ nodeClickFn: nodeClickFn, pipelineOpenType: props.openType }}>
        <div className={'mySpace mmm-bgcolor'}>
          <Card>
            <Form form={detailFormRef} autoComplete={'off'} disabled={props.openType === OperateEnum.detail}
                  labelCol={{ flex: '23%' }}
                  wrapperCol={{ flex: '77%' }}
            >
              <div className={'myLine'}>
                <Form.Item label="流水线名称" name="name" rules={[{ required: true }]}>
                  <Input placeholder="请输入" autoComplete="new-password" />
                </Form.Item>
                <Form.Item label="所属软件" name="softIds" rules={[{ required: true }]}>
                  <Select
                    mode="multiple"
                    options={softList}
                    fieldNames={{ label: 'name', value: 'id' }}
                  />
                </Form.Item>
              </div>
              <div className={'myLine'} style={{ width: '50%' }}>
                <Form.Item label="执行机标签" name="pipelineNodeLabel" rules={[{ required: true }]}>
                  <Select
                    options={pipelineNodeList}
                    fieldNames={{ label: 'label', value: 'label' }}
                  />
                </Form.Item>
                {/*<Form.Item label='是否使用镜像' name='dockerFlag' rules={[{required: true}]}>*/}
                {/*    <Select*/}
                {/*        options={[*/}
                {/*            {*/}
                {/*                value: 0,*/}
                {/*                label: '不用',*/}
                {/*            },*/}
                {/*            {*/}
                {/*                value: 1,*/}
                {/*                label: '启用',*/}
                {/*            }*/}
                {/*        ]}*/}
                {/*        onChange={(value) => {*/}
                {/*            setDockerFlagFn(value)*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</Form.Item>*/}
              </div>
              {/*<div className={"myLine"}>*/}
              {/*    {dockerFlag === 1 &&*/}
              {/*        <Form.Item label='镜像名称' name='dockerName' rules={[{required: true}]}>*/}
              {/*            <Input placeholder="请输入" autoComplete="new-password"/>*/}
              {/*        </Form.Item>*/}
              {/*    }*/}
              {/*    {dockerFlag === 1 &&*/}
              {/*        <Form.Item label='启动参数' name='dockerParam' rules={[{required: true}]}>*/}
              {/*            <TextArea placeholder="请输入" autoComplete="new-password"*/}
              {/*                      autoSize={{minRows: 3, maxRows: 5}}/>*/}
              {/*        </Form.Item>*/}
              {/*    }*/}
              {/*</div>*/}

            </Form>
          </Card>
        </div>
        <Divider>全局参数</Divider>

        <Card title={<div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>表单设计</span><Button type={'link'} onClick={() => setFormDesignOpen(true)}>设计表单</Button></div>}>
          <Form form={formFieldRef}
                validateTrigger="false"
                onValuesChange={(changedValues, allValues) => {
                  // console.log('变动值了', changedValues, allValues);
                  const fieldList = globalFieldList;
                  fieldList.forEach((item) => {
                    // 如何验证是否有这个key
                    if (changedValues.hasOwnProperty(item.id)) {
                      item.value = changedValues[item.id];
                    }
                  });
                  setGlobalFieldList(fieldList);
                }
                }>
            {
              globalFieldList.map((item) => {
                return <SubmitForm
                  key={item.id}
                  initFieldBo={item}
                ></SubmitForm>;
              })
            }
          </Form>
        </Card>

        <Divider>构建视图</Divider>
        <div className={'mmm-bgcolor'}>
          <Card>
            <div>
              <PipelineFlow
                detail={detail} nodeClickFn={nodeClickFn}
                openType={props.openType}
              ></PipelineFlow>
            </div>
          </Card>
        </div>


        <Drawer
          title={showOperateName(stageComponentOpenType) + '-阶段'}
          open={stageComponentOpenType !== OperateEnum.close}
          width={'50%'}
          destroyOnClose={true}
          maskClosable={false}
          onClose={() => setStageComponentOpenTypeFn(OperateEnum.close)}
          footer={null}
        >
          <div>
            <StageComponent detail={detail}
                            stageComponentOpenType={stageComponentOpenType}
                            setStageComponentOpenTypeFn={setStageComponentOpenTypeFn}
                            pipelineNodeList={pipelineNodeList}
                            id={stageId}
                            setDetailFn={setDetailFn}
            />
          </div>
        </Drawer>
        <Drawer
          title={showOperateName(stepComponentOpenType) + '-步骤'}
          open={stepComponentOpenType !== OperateEnum.close}
          width={'70%'}
          destroyOnClose={true}
          maskClosable={false}
          onClose={() => setStepComponentOpenTypeFn(OperateEnum.close)}
          footer={null}
        >
          <div>
            <StepComponent detail={detail}
                           stepComponentOpenType={stepComponentOpenType}
                           setStepComponentOpenTypeFn={setStepComponentOpenTypeFn}
                           pipelineNodeList={pipelineNodeList}
                           stepId={stepId}
                           stageId={stageId}
                           setDetailFn={setDetailFn}
                           otherAccountList={otherAccountList}
            />
          </div>
        </Drawer>
        <Drawer title={'表单设计'} open={formDesignOpen} onClose={() => setFormDesignOpen(false)}
                extra={<Button onClick={handleOk} type={'primary'}>确定</Button>}
                width={'100%'}
                key={'formDesign'}
                destroyOnClose={true}
                keyboard={false}
        >
          <FormComponent ref={formBuilderRef} initFormDesign={globalFieldList} showScope={false} isEditScope={false}></FormComponent>
        </Drawer>
      </PipelineContext.Provider>
    </div>
  );
};

export default PipelineMainAdd;