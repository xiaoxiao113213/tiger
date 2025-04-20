import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Form, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { fileUploadVo } from '@/utils/baseBo.ts';
import { getUserToken } from '@/store/userStore.ts';


interface FileUploadComProps {
  initFileList?: fileUploadVo[];
  label: string;
  name: string;
  required: boolean;
  maxCount?: number;
  accept?: string;
}

export interface FileUploadComRef {
  getFileList: () => fileUploadVo[];
}

const FileUploadCom = forwardRef<FileUploadComRef, FileUploadComProps>((props: FileUploadComProps, ref) => {
  let userToken = getUserToken();
  const [fileList, setFileList] = useState(props.initFileList?.map((item) => {
    return {
      data: item,
      uid: item.fileKey,
      name: item.fileName,
      status: 'done',
      url: import.meta.env.VITE_APP_BASE_API + '/devops-server/public/biz/download/0/' + item.fileKey + '?token=' + userToken?.fileToken,
    };
  }) ?? []);
  useImperativeHandle(ref, () => ({
    getFileList: () => {
      return fileList.map((item) => {
        return item.data as fileUploadVo;
      });
    },

  }));
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
        label={props.label}
        name={props.name}
        rules={[{ required: props.required }]}
        // tooltip={props.initFieldBo.desc}
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
                maxCount={props.maxCount}
                onChange={onChange}
                accept={props.accept}
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

export default FileUploadCom;