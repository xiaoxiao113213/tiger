import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message } from 'antd';

import { TableFieldDetailVo } from './ApiBo';
import { tableFieldGetOneApi, tableFieldSaveApi, tableFieldUpdateApi } from './api';
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
  const [formRef] = Form.useForm<TableFieldDetailVo>();
  const [detail, setDetailFn] = useState<TableFieldDetailVo>(getNullBo);

  const initMyDataFn = async () => {
    if (props.operateEnum === OperateEnum.edit) {
      let rst = await tableFieldGetOneApi({ tableFieldId: props.detailId });
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
      res = await tableFieldUpdateApi({ ...values, tableFieldId: props.detailId });
    } else {
      res = await tableFieldSaveApi({ ...values });
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
        <Form.Item label="tableFieldId" name="tableFieldId" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="tableId" name="tableId" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="databaseBoardId" name="databaseBoardId" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="code" name="code" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="desc" name="desc" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="type" name="type" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="length" name="length" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="decimal" name="decimal" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="flagNotNull" name="flagNotNull" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="flagKey" name="flagKey" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="defaultValue" name="defaultValue" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="flagAutoIncrement" name="flagAutoIncrement" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="flagUnsigned" name="flagUnsigned" rules={[{ required: true }]}>
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