import React from 'react';

import '@chatui/core/es/styles/index.less';
// 引入组件
import Chat, { Bubble, useMessages } from '@chatui/core';
// 引入样式
import '@chatui/core/dist/index.css';
import { getRandomString } from '@/utils/utils.ts';


const Index = () => {
  const { messages, prependMsgs, appendMsg, setTyping } = useMessages([]);

  function handleSend(type, val) {
    if (type === 'text' && val.trim()) {
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
        hasTime: true,
        user: {},
      });

      setTyping(true);

      setTimeout(() => {
        appendMsg({
          type: 'text',
          content: { text: <div>dsafds</div> },
          hasTime: true,
        });
      }, 1000);
    }
  }

  function renderMessageContent(msg) {
    const { content } = msg;
    return <Bubble content={content.text} />;
  }

  return (
    <div style={{ height: '100%' }}>
      <Chat
        navbar={{ title: '聊天' }}
        messages={messages}
        renderMessageContent={renderMessageContent}
        onSend={handleSend}
        onScroll={(e: React.UIEvent<HTMLDivElement, UIEvent>) => {
          console.log(e.currentTarget.scrollTop);
          if (e.currentTarget.scrollTop === 0) {

            prependMsgs([{
              _id: getRandomString(),
              type: 'text',
              content: { text: 'dsd' + getRandomString() },
              position: 'right',
              hasTime: true,
              user: {},
            }]);
          }
        }}
      />
    </div>

  );
};

export default Index;