import React, { useEffect, useState } from 'react';

import TextArea from 'antd/lib/input/TextArea';
import { getUserToken } from '@/store/userStore.ts';

export enum LogTypeEnum {
  pipeline = 0,//pipeline 添加全局参数使用
  step = 1,// 插件添加使用

}

type Props = {
  pipelineId: number
  buildDetailId: number,
  buildStepId: number,
  type: LogTypeEnum,
};
const Index = (props: Props) => {
  // const logRef = React.useRef<HTMLDivElement>(null);
  const [log, setLog] = useState<string>('');


  useEffect(() => {
    // 在组件挂载或更新后执行操作
    // 建立连接
    const Authorization = getUserToken()?.accessToken ?? '';
    let logUrl = '/devops-server/pipelineBuild';
    if (props.type === LogTypeEnum.pipeline) {
      logUrl = logUrl + '/getAllLog/' + props.buildDetailId + '/0/' + Authorization;
    } else {
      logUrl += `/getStepLog/${props.buildDetailId}/${props.buildStepId}/0/${Authorization}`;
    }
    // let url1 = "http://localhost:8082/devops-server/pipelineBuild/getAllLog/28/0"
    let url2 = import.meta.env.VITE_APP_BASE_API + logUrl;
    // const evtSource = new EventSource(url + logUrl)
    const evtSource = new EventSource(url2);

    /**
     * 连接一旦建立，就会触发open事件
     * 另一种写法：source.onopen = function (event) {}
     */
    evtSource.addEventListener('open', function(e) {
      // setMessageInnerHTML("建立连接。。。");
      console.log('建立成功');
    }, false);
    /*
    * message：后端返回信息，格式可以和后端协商
    */
    // @ts-ignore
    evtSource.addEventListener('message', function(e) {
      console.log('接收到消息');
      // console.log("接收内容", e)
      // 在这里处理从服务器接收的消息
      const newLog = JSON.parse(e.data); // 假设日志以JSON格式发送
      // console.log(newLog.msg)
      setLog((prevLogs) => prevLogs + newLog.msg);
      // setMessageInnerHTML(newLog.msg)
    });
    /*
    * error：错误（可能是断开，可能是后端返回的信息）
    */
    // @ts-ignore
    evtSource.addEventListener('error', function(err) {
      console.log(err);
      // 类似的返回信息验证，这里是实例
      // err && err.status === 401 && console.log('not authorized')
    });

    return () => {
      evtSource.close(); // 在组件卸载时关闭EventSource连接
    };
  }, []);

  return (
    <div>
      <TextArea autoSize value={log} readOnly style={{
        // backgroundColor:"#f0f0f0",
        backgroundColor: 'black',
        fontFamily: 'Courier New',
        fontSize: '14px',
        padding: '10px',
        color: 'white',
        border: '1px solid white',
      }}>
      </TextArea>
    </div>
  );
};

export default Index;

