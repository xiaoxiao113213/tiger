import React, { useEffect, useState } from 'react';
import { OperateEnum } from '@/utils/enum.ts';
import { Button, Form, Input, message } from 'antd';
import { DicDetailVo } from '@/pages/system/dic/ApiBo.ts';
import { getNullBo, oFormatForm } from '@/utils/utils.ts';
import { dicEditApi, dicGetOne, dicSaveApi } from '@/pages/system/dic/dicApi.tsx';

type Props = {
  detailId: number
  operateEnum: OperateEnum
  setAddOrUpdateModalFn: React.Dispatch<React.SetStateAction<OperateEnum>>,
  reloadTable: () => void
};
const AddOrUpdate = (props: Props) => {
  const [formRef] = Form.useForm<DicDetailVo>();
  const [detail, setDetailFn] = useState<DicDetailVo>(getNullBo);

  const initMyDataFn = async () => {


    if (props.operateEnum === OperateEnum.edit) {
      let rst = await dicGetOne({ id: props.detailId });
      setDetailFn(rst.data);
      formRef.setFieldsValue(rst.data);
    } else {
      formRef.setFieldsValue({ sort: 0, disabled: 0 });
    }
  };

  const saveFn = async () => {
    if (props.operateEnum === OperateEnum.detail) {
      return;
    }
    const isPass = await formRef.validateFields().catch(() => false);
    if (!isPass) return;

    const values = await formRef?.getFieldsValue();
    oFormatForm(values);
    let res = {};
    if (props.operateEnum === OperateEnum.edit) {
      res = await dicEditApi({ ...values, id: props.detailId });
    } else if (props.operateEnum === OperateEnum.add) {
      res = await dicSaveApi({ ...values });
    }
    if (res?.code !== 1000) return;
    message.success(res?.msg);
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
        <Form.Item label="名称" name="name" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="编码" name="code" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="备注"
          name="remarks"
        >
          <Input.TextArea allowClear />
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