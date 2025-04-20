import React, { useEffect, useRef, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Radio, RadioChangeEvent, Upload } from 'antd';
import { getUserToken } from '@/store/userStore.ts';
import { formatStorage, formatTime } from '@/utils/utils.ts';
import { UploadFile } from 'antd/es/upload/interface';

export default (props: { machineId: number, remotePath: string }) => {
  const [isOnlySon, setIsOnlySon] = useState(1);

  const [fileList, setFileList] = useState<UploadFile[]>();
  const fileStartTimes = useRef<{ [key: string]: number }>({}); // 使用 useRef 存储文件的 startTime

  useEffect(() => {
    //   定时器 计算耗时时间
    const timer = setInterval(() => {
      setFileList(fileList => {
        // console.log('fileList', fileList);
        if (fileList) {
          fileList.forEach((file) => {
            if (file.status === 'uploading') {
              // 获取文件的 startTime
              const startTime = fileStartTimes.current[file.uid];
              if (startTime) {
                file.totalTime = formatTime(new Date().getTime() - startTime);
              }
            }
          });
          return [...fileList];
        } else {
          return [];
        }

      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []); // 第二个参数表示依赖项

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setIsOnlySon(e.target.value);
  };

  return (
    <div>
      <Form
      >
        <Form.Item label="只上传子文件" name="host" rules={[{ required: true }]}
                   tooltip={'如果是否，会在远程中建立选中的文件夹，并上传'}
                   initialValue={1}
        >
          <Radio.Group onChange={onChange} value={isOnlySon}>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
      <Upload directory
              fileList={fileList}
              action={import.meta.env.VITE_APP_BASE_API + '/devops-server/machineTask/fileUpload'}
              headers={{
                Authorization: getUserToken()?.accessToken ?? '',
              }}
              beforeUpload={(file, fileList) => {
                // 在文件上传前，记录文件的 startTime
                if (!fileStartTimes.current[file.uid]) {
                  fileStartTimes.current[file.uid] = new Date().getTime();
                }
                return true;
              }}
              data={(file) => {
                return {
                  machineId: props.machineId,
                  webkitRelativePath: file.webkitRelativePath,
                  isOnlySon: isOnlySon,
                  remotePath: props.remotePath,
                };
              }}
              onChange={({ file, fileList }) => {
                let webkitRelativePath = file.originFileObj?.webkitRelativePath;
                if (webkitRelativePath && webkitRelativePath.length > 0) {
                  file.name = webkitRelativePath;
                }
                if (file.status === 'done') {
                  // 获取文件的 startTime
                  const startTime = fileStartTimes.current[file.uid];
                  if (startTime) {
                    file.totalTime = formatTime(new Date().getTime() - startTime);
                  }
                }
                setFileList(fileList);
              }}
              showUploadList={{
                showRemoveIcon: false, // 隐藏删除按钮
                showPreviewIcon: false, // 保留预览按钮（可选）
                extra: (file) => {
                  const status = file.status;
                  if (file.percent == 100 && status === 'uploading') {
                    return <span style={{ color: '#2b87db' }}>
                      <span style={{ color: '#2b87db' }}>({formatStorage((file.size ?? 0))})</span>
                      (耗时 {file.totalTime}) 上传中(文件已传递到本机服务，正在传输到远程机器上(请勿关闭页面 关闭页面并不会阻止服务器上传).....)
                    </span>;
                  } else if (status === 'done') {
                    return <span style={{ color: '#66cc00' }}>
                      <span style={{ color: '#cccccc' }}>({formatStorage((file.size ?? 0))})</span>
                      上传成功
                      (耗时 {file.totalTime})
                    </span>;
                  } else if (status === 'error') {
                    return <span style={{ color: '#ff3300' }}>
                      <span style={{ color: '#cccccc' }}>({formatStorage((file.size ?? 0))})</span>
                      上传失败
                      (耗时 {file.totalTime})
                    </span>;
                  }
                  return <span style={{ color: '#cccccc' }}>
                    ({formatStorage((file.size ?? 0))})
                    (耗时 {file.totalTime})
                  </span>;
                },
              }}
      >
        <Button icon={<UploadOutlined />}>选择文件夹</Button>
      </Upload>
    </div>
  );
};

