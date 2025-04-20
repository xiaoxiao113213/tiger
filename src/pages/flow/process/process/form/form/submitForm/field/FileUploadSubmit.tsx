import React, { useEffect, useState } from 'react';
import { CustomerFieldBo } from '@/pages/flow/process/process/form/form/Bo.tsx';
import { Form, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getUserToken } from '@/store/userStore.ts';
import { fileUploadVo } from '@/utils/baseBo.ts';

const FileSubmit = React.memo((props: { initFieldBo: CustomerFieldBo }) => {
  const [fileList, setFileList] = useState([]);
  let scopeName = '';
  if (props.initFieldBo.scope == 1) {
    scopeName = '（全局）';
  }

  useEffect(() => {
    if (props.initFieldBo.value != null && Array.isArray(props.initFieldBo.value)) {
      setFileList(props.initFieldBo.value);
    }
  }, [props.initFieldBo.value]);

  const onChange = ({ file, fileList }) => {
    console.log(file, fileList, file.status);
    setFileList(fileList);
    if (file.status === 'done') {
      console.log('done');
      const data = (file.response.data as fileUploadVo);
      file.data = data;
      file.url = data.fullPath;
    }
  };

  return (
    <div>
      <Form.Item
        label={props.initFieldBo.name + scopeName}
        name={props.initFieldBo.id}
        rules={[{ required: props.initFieldBo.notNull == 1 }]}
        tooltip={props.initFieldBo.desc}
        valuePropName="fileList"
        getValueFromEvent={e => {
          if (Array.isArray(e)) {
            return e;
          }
          return e && e.fileList;
        }}
      >
        <Upload action={import.meta.env.VITE_APP_BASE_API + '/devops-server/b/fileStore/upload/4/0'}
                headers={{ Authorization: getUserToken()?.accessToken ?? '' }}
                method={'POST'}
                fileList={fileList}
                onChange={onChange}
                listType="picture-card">
          <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        </Upload>
      </Form.Item>
    </div>
  );
});

export default FileSubmit;