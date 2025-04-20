import React, { useEffect, useRef, useState } from 'react';

import '@chatui/core/es/styles/index.less';
// 引入组件
import Chat, { Bubble, useMessages } from '@chatui/core';
// 引入样式
import '@chatui/core/dist/index.css';
import { checkApiRst, getRandomString } from '@/utils/utils.ts';
import { talkMsgPageApi, talkMsgSaveApi } from '@/pages/system/chat/api/talkMsgApi.tsx';
import dayjs from 'dayjs';
import { TalkUserListVo } from '@/pages/system/chat/api/ApiBo.ts';
import MAvatar from '@/components/MAvatar';
import { getUserInfo } from '@/store/userStore.ts';
import { MoreOutlined } from '@ant-design/icons';


const Index = (
  props: {
    nowTalk: TalkUserListVo;
  },
) => {
  const { messages, prependMsgs, appendMsg, setTyping, resetList, updateMsg } = useMessages([]);
  const userInfo = getUserInfo();
  const [loadingTitle, setLoadingTitle] = useState('加载更多');
  const handleSend = async (type, val) => {
    if (type === 'text' && val.trim()) {
      const rst = await talkMsgSaveApi({ talkId: props.nowTalk.talkId, text: val, type: '0' });
      if (checkApiRst(rst)) {
        return;
      } else {
      }
      const id = getRandomString();
      appendMsg({
        _id: id,
        type: 'text',
        content: { text: val, sourceNickName: userInfo?.nickName, sourceAvatar: userInfo?.avatar, sourceType: '0', sourceId: userInfo?.accountId },
        position: 'right',
        hasTime: false,
        createdAt: dayjs().valueOf(),
      });
      // 类型 0text  1file
      // setTyping(true);
    } else {
      console.log('发送', type, val);
    }

  };
  const observer = useRef<IntersectionObserver | undefined>(undefined);

  const renderMessageContent = (msg) => {
    const { content, position, createdAt } = msg;
    const [isHovered, setIsHovered] = useState(false);
    const msgRef = useRef(null);

    useEffect(() => {
      if (observer.current && msgRef.current) {
        observer.current.observe(msgRef.current);
      }
      return () => {
        if (observer.current && msgRef.current) {
          observer.current.unobserve(msgRef.current);
        }
      };
    }, [msgRef.current]);
    return (
      <div
        ref={msgRef}
        style={{ display: 'flex', alignItems: 'center' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        myid={msg._id}
      >
        {position === 'left' && (
          <MAvatar type={content.sourceType} avatar={content.sourceAvatar} nickName={content.sourceNickName} targetId={content.sourceId}></MAvatar>
        )}
        {position === 'right' && isHovered && (
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0)', color: '#b39696' }}>
            {dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}
          </div>
        )}
        <Bubble style={{ backgroundColor: 'lightgreen' }}>
          <div>{content.text}</div>
        </Bubble>
        {position === 'left' && isHovered && (
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0)', color: '#b39696' }}>
            {dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}
          </div>
        )}
        {position === 'right' && (
          <MAvatar type={content.sourceType} avatar={content.sourceAvatar} nickName={content.sourceNickName} targetId={content.sourceId}></MAvatar>
        )}
      </div>
    );
  };

  const loadMsg = async (talkMsgId?: number) => {
    const rst = await talkMsgPageApi({ talkId: props.nowTalk.talkId, talkMsgId: talkMsgId, pageSize: 30 });
    if (rst.data.length === 0) {
      setLoadingTitle('没有更多了');
    }
    rst.data.reverse().forEach((msg) => {
      prependMsgs([
        {
          _id: msg.talkMsgId,
          type: 'text',
          content: { text: msg.text, sourceNickName: msg.sourceNickName, sourceAvatar: msg.sourceAvatar, sourceType: msg.sourceType, sourceId: msg.sourceId },
          position: msg.targetId === msg.sourceId ? 'right' : 'left',
          hasTime: false,
          user: {},
          createdAt: dayjs(msg.createTime).valueOf(),
        },
      ]);
    });
    // prependMsgs(rst.data.map((msg) => {
    //   return {
    //     _id: msg.talkMsgId,
    //     type: 'text',
    //     content: { text: msg.text, sourceNickName: msg.sourceNickName, sourceAvatar: msg.sourceAvatar, sourceType: msg.sourceType, sourceId: msg.sourceId },
    //     position: msg.targetId === msg.sourceId ? 'right' : 'left',
    //     hasTime: false,
    //     user: {},
    //     createdAt: dayjs(msg.createTime).valueOf(),
    //   };
    // }));


  };

  useEffect(() => {
    setLoadingTitle('加载更多');
    resetList([]);
    loadMsg();
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('Target is visible:', entry.target);
        } else {
          console.log('Target is not visible:', entry.target);
        }
      });
    });

    return () => {
      observer.current?.disconnect(); // 停止观察所有元素
    };

  }, [props.nowTalk]);

  return (
    <div style={{ height: '100%' }}>
      <Chat
        // navbar={{ title: props.nowTalk.title, }}
        // messagesRef={actionRef}
        renderNavbar={() => <div style={{
          backgroundColor: '#cedbe1',
          width: 'calc(100% - 8px)',
          height: '48px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',  // 垂直居中
          justifyContent: 'space-between',  // 两端对齐
          // justifyContent: 'flex-start',  // 靠右对齐
          padding: '0 16px',  // 内边距
          fontSize: '16px',
          fontWeight: 'bold',
        }}
        >

          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
               <MAvatar type={props.nowTalk.talkType} targetId={props.nowTalk.targetId} avatar={props.nowTalk.targetAvatar} nickName={props.nowTalk.title}
                        size={'default'}
               ></MAvatar>
          </span>
            <div style={{ marginLeft: '20px' }}> {props.nowTalk.title}</div>
          </div>
          <div style={{ cursor: 'pointer' }}>

            <MoreOutlined />
            {/*
          群设置
          清空聊天记录
          查找聊天记录
          */}
          </div>
        </div>
        }
        messages={messages}
        renderMessageContent={renderMessageContent}
        onSend={handleSend}
        loadMoreText={<a onClick={() => {
          try {
            loadMsg(parseInt(messages[0]?._id ?? 'dsafd'));
          } catch (e) {
            console.log(e);
          } finally {
          }
        }}>{loadingTitle}</a>}
        onRefresh={async () => {
          console.log('onRefresh');
          // loadMsg(parseInt(messages[0]?._id ?? 'dsafd'));
        }}
        onScroll={(e: React.UIEvent<HTMLDivElement, UIEvent>) => {
          // console.log(e.currentTarget.scrollTop);

          // }
        }}
      />
    </div>

  );
};

export default Index;