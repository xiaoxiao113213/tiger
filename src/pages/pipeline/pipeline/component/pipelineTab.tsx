import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, Form, FormInstance, message, Tabs, TabsProps } from 'antd';
import PipelineMainAdd from '@/pages/pipeline/pipeline/component/pipelineMainAdd';
import PipelinePermissionAdd from '@/pages/pipeline/pipeline/component/pipelinePermissionAdd';
import PipelineOtherAdd, { OtherBo } from '@/pages/pipeline/pipeline/component/pipelineOtherAdd';
import { OperateEnum } from '@/utils/enum.ts';
import { pipelineNodeAllApi } from '@/pages/pipeline/node/api.tsx';
import { otherAccountAllApi } from '@/pages/pipeline/otherAccount/api.tsx';
import { clientToServerValueItem, CustomerFieldBo, FormFieldTypeEnum, serverToClientValue } from '@/pages/flow/process/process/form/form/Bo.tsx';
import { changeBo, oFormatForm, oGetAllStep } from '@/utils/utils.ts';
import { pipelineGetOneApi, pipelineSaveApi, pipelineUpdateApi } from '@/pages/pipeline/pipeline/api/pipeline.tsx';
import { OtherAccountBo, PipelineBo, PipelinePermissionBo } from '@/pages/pipeline/pipeline/api/bo.tsx';
import { Rst } from '@/utils/baseBo.ts';

export type PermissionParentBo = {
  list: PermissionBo[],
}

export type PermissionBo = {
  bizId: number,
  permissions: string[]
}

export type Props = {
  openType: OperateEnum,
  setOpenTypeFn: Dispatch<SetStateAction<OperateEnum>>,
  detailId: number
  reloadTable: () => void
};
const PipelineTab = (props: Props) => {
  const [detailFormRef] = Form.useForm<PipelineBo>();
  // detail 中加入一个  应用列表 applicationList  然后应用列表下有选中的菜单id  checkedKeys
  const [detail, setDetailFn] = useState<PipelineBo>();
  // 应用列表和应用列表下的菜单数据
  const [pipelineNodeList, setPipelineNodeListFn] = useState([]);
  const [softList, setSoftListFn] = useState([]);
  const [otherAccountList, setOtherAccountListFn] = useState<OtherAccountBo[]>([]);
  const [otherForm] = Form.useForm<OtherBo>();

  const [globalFieldList, setGlobalFieldList] = useState<CustomerFieldBo[]>([]);
  const onChange = (key: string) => {
    // console.log(key);
  };
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `主配置`,
      children: <div>
        {detail !== undefined && <PipelineMainAdd
          detail={detail}
          setDetailFn={setDetailFn}
          pipelineNodeList={pipelineNodeList}
          detailFormRef={detailFormRef}
          openType={props.openType}
          softList={softList}
          otherAccountList={otherAccountList}
          globalFieldList={globalFieldList}
          setGlobalFieldList={setGlobalFieldList}
        />}
      </div>,
    },
  ];
  const initMyDataFn = async () => {
    pipelineNodeAllApi({}).then(rst => {
      setPipelineNodeListFn(rst.data);
    });
    //     todo 设置软件  等软件那块写好了
    setSoftListFn([{ id: 1, name: '软件1' }, { id: 3, name: '软件2' }, { id: 2, name: '软件3' }]);
    otherAccountAllApi({}).then(rst => {
      // 由于 参数选择 过程中 都是字符串最为默认值 因此 把id number 改成字符串
      rst.data.forEach(item => item.id = item.id + '');
      setOtherAccountListFn(rst.data);
    });
  };

  // 当这个参数是select的时候 要进行逗号隔开 当是密码的时候 要进行判断是否是加密后的 如果没有加密 就进行加密
  const changeSelectParam = (detail: PipelineBo) => {
    detail.globalParamList?.forEach(item => {
      if (Array.isArray(item.value)) {
        item.value = item.value.join(',');
      }
      if (item.type === FormFieldTypeEnum.password) {
      }
    });
    let stepList = oGetAllStep(detail.pipelineStageList ?? []);
    stepList.forEach(step => {
      step?.paramList.forEach(item => {
        if (Array.isArray(item.value)) {
          item.value = item.value.join(',');
        }
      });
    });
  };



  const saveFn = async () => {
    if (props.openType === OperateEnum.detail) {
      props.setOpenTypeFn(OperateEnum.close);
      return;
    }
    const isPass = await detailFormRef.validateFields().catch(() => false);
    if (!isPass) return;

    const values = await detailFormRef?.getFieldsValue();
    oFormatForm(values);

    // 获取其他的配置
    const isPassOtherForm = await otherForm.validateFields().catch(() => false);
    if (!isPassOtherForm) {
      message.warning('有必填项未填');
      return;
    }


    const fieldList = globalFieldList.map(item => {
      const i = { ...item };
      clientToServerValueItem(i);
      return i;
    });

    let res: Rst<any>;
    if (detail?.id) {
      let param = { ...detail, globalParamList: fieldList };
      changeSelectParam(changeBo(param));
      res = await pipelineUpdateApi(changeBo(param));
    } else {
      let param = { ...detail, ...values,  globalParamList: fieldList };
      changeSelectParam(changeBo(param));
      res = await pipelineSaveApi(changeBo(param));
    }
    if (res?.code !== 1000) return;
    message.success(res?.msg);
    props.reloadTable();
    props.setOpenTypeFn(OperateEnum.close);
  };

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


  const operations = <div>
    {props.openType !== OperateEnum.detail
      && <Button type="primary" onClick={saveFn}>
        确认
      </Button>
    }
    <Button type="default" style={{ marginLeft: 10 }} onClick={() => props.setOpenTypeFn(OperateEnum.close)}>
      取消
    </Button>
  </div>;


  useEffect(() => {
    // 在组件挂载或更新后执行操作
    initMyDataFn();
    if (props.openType === OperateEnum.add) {
      // 初始化一下 新增的表单数据
      // const detail1: PipelineBo = {disabled: 0, parallel: 0}
      // detailFormRef?.setFieldsValue(detail1);
      setDetailFn(changeBo({
        parallel: 0, timer: 0, timerCron: 0,
        email: 0, pipelineStageList: [],
      }));
    } else if (props.openType === OperateEnum.edit || props.openType === OperateEnum.detail) {
      getDetailAndSetDetailFn(props.detailId);
    }
    return () => {
      // 在组件卸载前执行清理操作
    };
  }, [props.openType]); // 第二个参数表示依赖项

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} tabBarExtraContent={operations} />
    </div>
  );
};

export default PipelineTab;