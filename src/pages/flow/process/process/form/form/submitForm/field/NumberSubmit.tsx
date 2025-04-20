import React from 'react';
import { CustomerFieldBo } from '@/pages/flow/process/process/form/form/Bo.tsx';
import { Form, InputNumber } from 'antd';

const NumberSubmit = (props: { initFieldBo: CustomerFieldBo }) => {

  let scopeName = '';
  if (props.initFieldBo.scope == 1) {
    scopeName = '（全局）';
  }
  return (
    <div>
      <Form.Item
        label={props.initFieldBo.name + scopeName}
        name={props.initFieldBo.id}
        rules={[{ required: props.initFieldBo.notNull == 1 }]}
        tooltip={props.initFieldBo.desc}
        initialValue={props.initFieldBo.value ?? ''}
      >
        <InputNumber
          placeholder="请输入"
          suffix={props.initFieldBo.unit}

        />
      </Form.Item>
    </div>
  );
};

export default NumberSubmit;

