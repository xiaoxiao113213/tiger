import React from 'react';
import { Button, Form, Input } from 'antd';
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
    const rst = await approvalApi({
      processInstanceApprovalPeopleId: props.processInstanceApprovalPeopleId,
      status: '2', reason: values.reason,
    });
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
        <Form.Item<FieldType>
          label="备注"
          name="reason"
          rules={[{ required: false, message: '' }]}
        >
          <Input.TextArea placeholder={'请输入备注'} />
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