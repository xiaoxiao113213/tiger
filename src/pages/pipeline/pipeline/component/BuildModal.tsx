import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, Card, Form, message } from 'antd';
import { OperateEnum } from '@/utils/enum.ts';
import { OtherAccountBo, PipelineBo } from '@/pages/pipeline/pipeline/api/bo.tsx';
import { otherAccountAllApi } from '@/pages/pipeline/otherAccount/api.tsx';
import { pipelineGetOneApi } from '@/pages/pipeline/pipeline/api/pipeline.tsx';
import { checkApiRst, oFormatForm } from '@/utils/utils.ts';
import { clientToServerValueItem, CustomerFieldBo, serverToClientValue } from '@/pages/flow/process/process/form/form/Bo.tsx';
import { pipelineBuildApi } from '@/pages/pipelineBuild/api/pipelineBuildApi.tsx';
import SubmitNowform from '@/pages/flow/process/process/form/form/submitForm/submitNowform.tsx';


export type Props = {

  setBuildModalFn: Dispatch<SetStateAction<OperateEnum>>,
  detailId: number
  reloadTable: () => void
};
const BuildModal = (props: Props) => {
  const [otherAccountList, setOtherAccountListFn] = useState<OtherAccountBo[]>([]);
  const [detail, setDetailFn] = useState<PipelineBo>();
  const [globalFieldList, setGlobalFieldList] = useState<CustomerFieldBo[]>([]);
  const [formFieldRef] = Form.useForm();
  const initData = async () => {
    otherAccountAllApi({}).then(rst => {
      // 由于 参数选择 过程中 都是字符串最为默认值 因此 把id number 改成字符串
      rst.data.forEach(item => item.id = item.id + '');
      setOtherAccountListFn(rst.data);
    });
    const rst = await pipelineGetOneApi({ id: props.detailId });
    if (rst?.code !== 1000) return;
    setDetailFn(rst.data);
    if (rst.data.globalParamList) {
      rst.data.globalParamList.forEach(item => {
        serverToClientValue(item);
      });
      setGlobalFieldList(rst.data.globalParamList);
    }
  };


  const submit = async () => {
    try {

      const isPass1 = await formFieldRef.validateFields().catch(() => false);
      if (!isPass1) {
        message.error('请填写必填项');
        return;
      }
      const fieldValues = await formFieldRef?.getFieldsValue();
      oFormatForm(fieldValues);
      let tmp = globalFieldList.map(item => {
        const i = { ...item };
        i.value = fieldValues[item.id];
        clientToServerValueItem(i);
        return { 'keyName': i.keyName, value: i.value };
      });
      const formData = {};
      formData.pipelineId = detail?.id;
      formData.params = tmp;
      const s = await pipelineBuildApi(formData);
      if (checkApiRst(s)) return;
      message.info('触发成功');
      props.reloadTable();
    } catch (e) {

    }

  };

  useEffect(() => {
    // 在组件挂载或更新后执行操作
    initData();
    return () => {
      // 在组件卸载前执行清理操作

    };
  }, [props.detailId]); // 第二个参数表示依赖项


  return (
    <div>
      {detail && detail.globalParamList &&
        <Card title={<div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>表单</span></div>}>
          <Form form={formFieldRef}>
            {
              globalFieldList.map((item) => {
                return <SubmitNowform
                  key={item.id}
                  initFieldBo={item}
                ></SubmitNowform>;
              })
            }
          </Form>
        </Card>

      }
      <Form.Item wrapperCol={{ offset: 12, span: 12 }} style={{ marginTop: 10 }}>
        <Button type="default" onClick={() => props.setBuildModalFn(OperateEnum.close)}>
          取消
        </Button>
        <Button type="primary" htmlType="submit" onClick={submit} style={{ marginLeft: 20 }}>
          确认
        </Button>
      </Form.Item>
    </div>
  )
    ;
};

export default BuildModal;