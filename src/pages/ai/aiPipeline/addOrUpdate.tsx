import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { AiPipelineDetailVo } from './api/ApiBo.ts';
import { aiPipelineGetOneApi, aiPipelineSaveApi, aiPipelineUpdateApi } from './api/api.tsx';
import { OperateEnum } from '@/utils/enum.ts';
import { getNullBo } from '@/utils/utils.ts';
import { Rst } from '@/utils/baseBo.ts';

type Props = {
  detailId: number
  operateEnum: OperateEnum
  setAddOrUpdateModalFn: React.Dispatch<React.SetStateAction<OperateEnum>>,
  reloadTable: () => void
};
const AddOrUpdate = (props: Props) => {
  const [formRef] = Form.useForm<AiPipelineDetailVo>();
  const [detail, setDetailFn] = useState<AiPipelineDetailVo>(getNullBo);

  const initMyDataFn = async () => {
    if (props.operateEnum === OperateEnum.edit) {
      let rst = await aiPipelineGetOneApi({ aiPipelineId: props.detailId });
      setDetailFn(rst.data);
      formRef.setFieldsValue(rst.data);
    } else {
      formRef.setFieldsValue(getNullBo());
    }
  };

  const saveFn = async () => {

    const isPass = await formRef.validateFields().catch(() => false);
    if (!isPass) return;

    const values = await formRef?.getFieldsValue();
    let res: Rst<any>;
    if (props.operateEnum === OperateEnum.edit) {
      res = await aiPipelineUpdateApi({ ...values, aiPipelineId: props.detailId });
    } else {
      res = await aiPipelineSaveApi({ ...values });
    }
    if (res.code !== 1000) return;
    message.success(res.msg);
    props.reloadTable();
    props.setAddOrUpdateModalFn(OperateEnum.close);

  };

  const closeModal = () => {
    props.setAddOrUpdateModalFn(OperateEnum.close);
  };


  useEffect(() => {
    initMyDataFn();
    return () => {
    };
  }, []); // 第二个参数表示依赖项


  return (
    <div>
      <Form form={formRef}
            labelCol={{ flex: '10%' }}
            wrapperCol={{ flex: '90%' }}>
        {/*<Form.Item label="type" name="type" rules={[{ required: true }]}>*/}
        {/*  <Input placeholder="请输入" maxLength={200} showCount />*/}
        {/*</Form.Item>*/}
        <Form.Item label="标题" name="name" rules={[{ required: true }]}>
          <Input placeholder="请输入" maxLength={200} showCount />
        </Form.Item>
        <Form.Item label="描述" name="remarks" rules={[{ required: true }]}>
          <Input.TextArea placeholder="请输入" maxLength={150} showCount
                          autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ textAlign: 'right' }}>
          <Button type="default" onClick={closeModal} style={{ marginRight: 20 }}>
            取消
          </Button>
          <Button type="primary" onClick={saveFn}>
            确定
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddOrUpdate;