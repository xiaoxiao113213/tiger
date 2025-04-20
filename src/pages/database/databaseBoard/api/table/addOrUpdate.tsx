import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message } from 'antd';

import { TableDetailVo, TableVo } from './ApiBo';
import { tableGetOneApi, tableSaveApi, tableUpdateApi } from './api';
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
  const [formRef] = Form.useForm<TableDetailVo>();
  const [detail, setDetailFn] = useState<TableDetailVo>(getNullBo);

  const initMyDataFn = async () => {
    if (props.operateEnum === OperateEnum.edit) {
      let rst = await tableGetOneApi({ tableId: props.detailId });
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
      res = await tableUpdateApi({ ...values, tableId: props.detailId } as TableVo);
    } else {
      res = await tableSaveApi({ ...values } as TableVo);
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
        <Form.Item label="tableId" name="tableId" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="code" name="code" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="desc" name="desc" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="indexList" name="indexList" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="databaseBoardId" name="databaseBoardId" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="y" name="y" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="x" name="x" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="createTime" name="createTime" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="createBy" name="createBy" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="updateTime" name="updateTime" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="updateBy" name="updateBy" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="deleteFlag" name="deleteFlag" rules={[{ required: true }]}>
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