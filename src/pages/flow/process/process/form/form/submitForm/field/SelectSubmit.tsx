import React from 'react';
import { CustomerFieldBo } from '@/pages/flow/process/process/form/form/Bo.tsx';
import { Form, Select } from 'antd';

const SelectSubmit = (props: { initFieldBo: CustomerFieldBo }) => {
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
        <Select
          options={props.initFieldBo.optional}
          placeholder="请选择"
          allowClear={true}
        />
      </Form.Item>
    </div>
  );
};

export default SelectSubmit;

