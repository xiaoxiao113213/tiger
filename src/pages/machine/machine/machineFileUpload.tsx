import React, { useEffect, useRef, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { getUserToken } from '@/store/userStore.ts';
import { UploadFile } from 'antd/es/upload/interface';
import { formatStorage, formatTime } from '@/utils/utils.ts';

export default (props: { machineId: number, remotePath: string }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const fileStartTimes = useRef<{ [key: string]: number }>({}); // 使用 useRef 存储文件的 startTime

  useEffect(() => {
    // 定时器 计算耗时时间
    const timer = setInterval(() => {
      setFileList(fileList => {
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
  }, []); // 定时器

  return (
    <div>
      <Upload
        multiple={true}
        fileList={fileList}
        action={import.meta.env.VITE_APP_BASE_API + '/devops-server/machineTask/fileUpload'}
        headers={{ Authorization: getUserToken()?.accessToken ?? '' }}
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
            remotePath: props.remotePath,
            isOnlySon: 1,
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
          showRemoveIcon: false,
          showPreviewIcon: false,
          extra: (file) => {
            const status = file.status;
            if (file.percent == 100 && status === 'uploading') {
              return (
                <span style={{ color: '#cccccc' }}>
                  <span style={{ color: '#cccccc' }}>
                    ({formatStorage(file.size ?? 0)})
                  </span>
                  上传中(文件已传递到本机服务，正在传输到远程机器上.....)(耗时 {file.totalTime})
                </span>
              );
            } else if (status === 'done') {
              return (
                <span style={{ color: '#66cc00' }}>
                  <span style={{ color: '#cccccc' }}>
                    ({formatStorage(file.size ?? 0)})
                  </span>
                  上传成功 (耗时 {file.totalTime})
                </span>
              );
            } else if (status === 'error') {
              return (
                <span style={{ color: '#ff3300' }}>
                  <span style={{ color: '#cccccc' }}>
                    ({formatStorage(file.size ?? 0)})
                  </span>
                  上传失败 (耗时 {file.totalTime})
                </span>
              );
            }
            return (
              <span style={{ color: '#cccccc' }}>
                ({formatStorage(file.size ?? 0)})
                (耗时 {file.totalTime})
              </span>
            );
          },
        }}
      >
        <Button icon={<UploadOutlined />}>选择文件</Button>
      </Upload>
    </div>
  );
};
