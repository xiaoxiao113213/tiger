import React from 'react';
import { Upload } from 'antd';
import { fileUploadVo } from '@/utils/baseBo.ts';
import { getUserToken } from '@/store/userStore.ts';

const FileView = (props: {
  fileList: fileUploadVo[]
}) => {
  const token = getUserToken()?.fileToken ?? '';
  const fileList = props.fileList.map((item) => {
    return {
      uid: item.fileKey,
      name: item.fileName,
      status: 'done',
      url: item.fullPath + '?token=' + token,
    };
  });


  return (
    <div>
      <Upload action="/upload.do" listType="picture-card" disabled={true}
              fileList={fileList}>
      </Upload>
    </div>
  );
};

export default FileView;