import { useEffect, useState } from 'react';

const WebSocketComponent = ({ url, onMessage, onOpen, onClose, onError, retryInterval = 5000 }) => {
  const [socket, setSocket] = useState<WebSocket | undefined>(undefined);

  useEffect(() => {
    console.log('开始连接', url);
    let ws;
    let retryTimeout;

    const connect = () => {
      ws = new WebSocket(url);

      ws.onopen = (event) => {
        onOpen && onOpen(event);
        console.log('WebSocket connected');
      };

      ws.onmessage = (event) => {
        onMessage && onMessage(event);
      };

      ws.onclose = (event) => {
        onClose && onClose(event);
        console.log('WebSocket closed. Reconnecting...');
        retryTimeout = setTimeout(connect, retryInterval); // 自动重连
      };

      ws.onerror = (event) => {
        onError && onError(event);
        console.error('WebSocket error', event);
        ws.close(); // 关闭连接以触发 onClose 并启动重连机制
      };

      setSocket(ws);
    };

    connect();

    return () => {
      if (retryTimeout) clearTimeout(retryTimeout);
      if (ws) ws.close();
      console.log('关闭连接');
    };
  }, []);

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    } else {
      console.error('WebSocket is not open. Unable to send message.');
    }
  };

  return {
    sendMessage,
    socket,
  };
};

export default WebSocketComponent;
