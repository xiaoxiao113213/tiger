import { getUserToken } from '@/store/userStore.ts';

async function createEventSourceWithPost(data) {

  // 使用 POST 请求向服务器发送数据
  const response = await fetch(import.meta.env.VITE_APP_BASE_API + '/api/initiate-stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getUserToken()?.accessToken ?? '',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to initiate stream');
  }

  // 从服务器响应中获取 SSE 的 URL
  const { streamUrl } = await response.json();

  // 使用 EventSource 连接到服务器事件流
  const eventSource = new EventSource(import.meta.env.VITE_APP_BASE_API + streamUrl);

  eventSource.onmessage = (event) => {
    console.log('Message from server:', event.data);
  };

  eventSource.onerror = (error) => {
    console.error('Error with EventSource:', error);
    eventSource.close();
  };

  return eventSource;

}

// 示例调用
createEventSourceWithPost({ key: 'value' });
