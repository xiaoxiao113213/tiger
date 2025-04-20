import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { OperateEnum } from '@/utils/enum.ts';
import { AccountItemBo } from '@/pages/system/account/ApiBo.ts';
import { accountUpdatePasswordSelfApi } from '@/pages/system/account/accountApi.tsx';
import { oFormatForm } from '@/utils/utils.ts';

type Props = {
  operateEnum: OperateEnum
  setAddOrUpdateModalFn: React.Dispatch<React.SetStateAction<OperateEnum>>,
};
const AddOrUpdate = (props: Props) => {
  const [formRef] = Form.useForm<AccountItemBo>();

  const [newPassword, setNewPasswordFn] = useState<string>('');


  const passwordChangeFn = (value) => {
    setNewPasswordFn(value.target.value);
  };

  const saveFn = async () => {
    if (props.operateEnum === OperateEnum.detail) {
      return;
    }
    const isPass = await formRef.validateFields().catch(() => false);
    if (!isPass) return;

    const values = await formRef?.getFieldsValue();
    oFormatForm(values);
    if (values.passwordNew !== values.passwordNew1) {
      message.error('两次密码输入不一致');
      return;
    }
    let res = await accountUpdatePasswordSelfApi({ ...values });

    if (res?.code !== 1000) return;
    message.success(res?.msg);
    props.setAddOrUpdateModalFn(OperateEnum.close);

  };

  const closeModal = () => {
    props.setAddOrUpdateModalFn(OperateEnum.close);
  };


  return (
    <div>
      <Form form={formRef}
            labelCol={{ flex: '15%' }}
            wrapperCol={{ flex: '85%' }}>
        <Form.Item label="旧密码" name="passwordOld" rules={[{ required: true }]}>
          <Input.Password placeholder="请输入" />
        </Form.Item>
        <Form.Item label="新密码" name="passwordNew" rules={[{ required: true }]} tooltip={'至少一个大写字母、一个小写字母、一个数字和一个特殊字符'}>
          <Input.Password placeholder="请输入" onChange={passwordChangeFn} />
          {/*<PasswordStrengthIndicator password={newPassword}/>*/}
        </Form.Item>
        <Form.Item label="确认新密码" name="passwordNew1" rules={[{ required: true }]}>
          <Input.Password placeholder="请输入确认新密码" />
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