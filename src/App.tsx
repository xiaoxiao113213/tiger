import { App as AntdApp, FloatButton, message } from 'antd';
import { Helmet } from 'react-helmet-async';

import Logo from '@/assets/images/tiger.svg';
import Router from '@/router/index';
import AntdConfig from '@/theme/antd';
import { MotionLazy } from './components/animate/motion-lazy';
import { MessageTwoTone } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { AppContext, DefaultUserMsg, UserMsg } from '@/AppContext.tsx';
import { getTotalUnReadApi } from '@/pages/system/chat/api/talkMsgApi.tsx';
import { getUserToken } from '@/store/userStore.ts';
import WebSocketComponent from '@/components/mmmwebsocket';

const chatPath = '/chat';

function App() {
  const [userMsg, setUserMsg] = useState<UserMsg>({ type: 0 });
  const [chat, setChat] = useState(false);
  const [unreadNum, setUnreadNum] = useState(0);

  const setMsg = (msg: UserMsg) => {
    setUserMsg(msg);
    // 重置消息 防止下面的监听重复触发
    setUserMsg(DefaultUserMsg);

  };


  const handleOpen = () => {
    // console.log('WebSocket connection opened');
  };
  const handleMessage = (event) => {
    console.log('Received message:', event.data);
    const msg = JSON.parse(event.data);
    setMsg(msg);
    reloadUnreadTotal();
    setChat((currentChat) => {
      if (!currentChat) {
        console.log('您有一条新消息!!', chatPath, event.data);
        const img = '/icons/聊天.svg';
        const text = `您有一条新消息!!`;
        const notification = new Notification('消息列表', { body: text, icon: img });
        setTimeout(() => {
          notification.close();
        }, 5000);
      }
      return currentChat;
    });


  };

  const handleClose = () => {
    // console.log('WebSocket connection closed');
  };

  const handleError = (event) => {
    // console.error('WebSocket error:', event);
  };

  const getWsPrefix = () => {
    const baseApi = import.meta.env.VITE_APP_BASE_API;
    if (baseApi && baseApi.length > 0) {
      return import.meta.env.VITE_APP_BASE_API
        .replace('http://', 'ws://')
        .replace('https://', 'wss://');
    } else {
      return (window.location.protocol === 'https:' ? 'wss://' : 'ws://') + window.location.host;
    }
  };

  const url = getWsPrefix() + '/devops-server/wsUser/' + getUserToken()?.accessToken ?? '';

  const { sendMessage, socket } = WebSocketComponent({
    url,
    onOpen: handleOpen,
    onMessage: handleMessage,
    onClose: handleClose,
    onError: handleError,
  });


  const reloadUnreadTotal = () => {
    getTotalUnReadApi().then((res) => {
      setUnreadNum(res.data);
    });
  };

  useEffect(() => {
    const token = getUserToken()?.accessToken;
    if (token && token.length > 0) {
      reloadUnreadTotal();
    }
  }, [chat]);
  useEffect(() => {
    Notification.requestPermission().then((result) => {
      console.log(result);
      if (result === 'granted') {
        console.log('通知权限已授予');
      } else if (result === 'denied') {
        message.error('您已拒绝通知权限。请点击浏览器地址栏左侧的锁图标（🔒），然后在“通知”设置中选择“允许”，并刷新页面。必须https哦');
      }
    });
  }, []);

  return (
    <AntdConfig>
      <AntdApp>
        <MotionLazy>
          <Helmet>
            <title>小虎</title>
            <link rel="icon" href={Logo} />
          </Helmet>
          <AppContext.Provider value={{ userMsg, setChat }}>
            <Router />
          </AppContext.Provider>
          {!chat &&
            <FloatButton.Group shape="circle" style={{ marginBottom: '100px' }}>
              <FloatButton badge={{ count: unreadNum }} icon={<MessageTwoTone />} />
            </FloatButton.Group>
          }
        </MotionLazy>
      </AntdApp>
    </AntdConfig>
  );
}

export default App;
