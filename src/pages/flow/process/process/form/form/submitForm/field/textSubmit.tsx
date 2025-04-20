import React, { useMemo } from 'react';
import { CustomerFieldBo } from '@/pages/flow/process/process/form/form/Bo.tsx';
import { Form, Input } from 'antd';

const TextSubmit = (props: { initFieldBo: CustomerFieldBo }) => {
  if (!props.initFieldBo) {
    return <div></div>;
  }
  console.log('input输入框  props.initFieldBo', props.initFieldBo);
  let scopeName = '';
  if (props.initFieldBo.scope == 1) {
    scopeName = '（全局）';
  }

  const getDD = useMemo(() => {
    return <>
      <Form.Item
        label={props.initFieldBo.name + scopeName}
        name={props.initFieldBo.id}
        rules={[{ required: props.initFieldBo.notNull == 1 }]}
        tooltip={props.initFieldBo.desc}
        initialValue={props.initFieldBo.value ?? ''}
      >
        <Input placeholder="请输入" />
      </Form.Item>
    </>;
  }, [props.initFieldBo]);
  return (
    getDD
  );
};

export default TextSubmit;

