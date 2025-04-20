import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Radio } from 'antd';

import { PipelineNodeDetailVo } from './ApiBo';
import { pipelineNodeGetOneApi, pipelineNodeSaveApi, pipelineNodeUpdateApi } from './api';
import { OperateEnum } from '@/utils/enum.ts';
import { getNullBo, oFormatForm } from '@/utils/utils.ts';
import { Rst } from '@/utils/baseBo.ts';

type Props = {
  detailId: number
  operateEnum: OperateEnum
  setAddOrUpdateModalFn: React.Dispatch<React.SetStateAction<OperateEnum>>,
  reloadTable: () => void
};
const AddOrUpdate = (props: Props) => {
  const [formRef] = Form.useForm<PipelineNodeDetailVo>();
  const [detail, setDetailFn] = useState<PipelineNodeDetailVo>(getNullBo);

  const initMyDataFn = async () => {
    if (props.operateEnum === OperateEnum.edit) {
      let rst = await pipelineNodeGetOneApi({ id: props.detailId });
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
    oFormatForm(values);
    let res: Rst<any>;
    if (props.operateEnum === OperateEnum.edit) {
      res = await pipelineNodeUpdateApi({ ...values, id: props.detailId });
    } else {
      res = await pipelineNodeSaveApi({ ...values });
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
        <Form.Item label="name" name="name" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="标签" name="label" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="工作目录" name="workDir" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="描述" name="desc" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="是否禁用" name="disabled" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value={0}> 启用 </Radio>
            <Radio value={1}> 禁用 </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="并行工作数量" name="workNum" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="优先级" name="priority" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>


        {/*<Form.Item label='状态' name='disabled' rules={[{required: true}]}>*/}
        {/*    <Radio.Group>*/}
        {/*        <Radio value={0}> 启用 </Radio>*/}
        {/*        <Radio value={1}> 禁用 </Radio>*/}
        {/*    </Radio.Group>*/}
        {/*</Form.Item>*/}

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