import React from 'react';
import { Button, Form, Input, message, Radio } from 'antd';
import { FormProps } from 'antd/lib';
import { approvalApi } from '@/pages/flow/process/myProcess/api/processInstanceApi.tsx';
import { checkApiRst } from '@/utils/utils.ts';

const Approval = (props: {
  onClose: () => void;
  processInstanceApprovalPeopleId?: number | string;
}) => {

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    if (!props.processInstanceApprovalPeopleId) {
      return;
    }
    if (!values.status) {
      message.error('请选择类别');
      return;
    }
    console.log('Success:', values);
    const rst = await approvalApi({ processInstanceApprovalPeopleId: props.processInstanceApprovalPeopleId, status: values.status, reason: values.reason });
    if (checkApiRst(rst)) {
      return;
    }
    props.onClose();
  };

  return (
    <div>
      <Form
        name="basic"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        // style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        clearOnDestroy={true}
      >
        <Form.Item name="status" label="类别"
                   required={true}
                   rules={[{ required: false, message: '请选择类别' }]}
                   initialValue={'2'}
        >
          <Radio.Group>
            <Radio value="2">同意</Radio>
            <Radio value="3">拒绝</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item<FieldType>
          label="原因"
          name="reason"
          rules={[{ required: false, message: 'Please input your username!' }]}
        >
          <Input.TextArea placeholder={'请输入原因'} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Approval;

type FieldType = {
  reason?: string;
  status: string;
};