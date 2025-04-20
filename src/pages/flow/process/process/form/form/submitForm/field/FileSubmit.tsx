import React from 'react';
import { CustomerFieldBo } from '@/pages/flow/process/process/form/form/Bo.tsx';
import { Form, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const FileSubmit = (props: { initFieldBo: CustomerFieldBo }) => {

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
        <Upload action="/upload.do" listType="picture-card" disabled={true}>
          <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        </Upload>
      </Form.Item>
    </div>
  );
};

export default FileSubmit;

