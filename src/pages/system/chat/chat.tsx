import React, { useCallback, useEffect, useRef, useState } from 'react';

import '@chatui/core/es/styles/index.less';
// 引入组件
import Chat, { Bubble, useMessages } from '@chatui/core';
// 引入样式
import '@chatui/core/dist/index.css';
import { checkApiRst, getRandomNumber } from '@/utils/utils.ts';
import { clearMsgApi, talkMsgPageApi, talkMsgSaveApi } from '@/pages/system/chat/api/talkMsgApi.tsx';
import dayjs from 'dayjs';
import { TalkUserListVo } from '@/pages/system/chat/api/ApiBo.ts';
import MAvatar from '@/components/MAvatar';
import { getUserInfo, getUserToken } from '@/store/userStore.ts';
import { MoreOutlined, PlusCircleOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Drawer, Dropdown, Image, Input, MenuProps, message, Modal, Popover } from 'antd';
import { useAppContext } from '@/AppContext.tsx';
import { OperateEnum } from '@/utils/enum.ts';
import GroupSetting from '@/pages/system/chat/drawer/GroupSetting.tsx';
import './chat.css';
import { exitGroupApi } from '@/pages/system/chat/api/api.tsx';
import { uploadFileApi } from '@/pages/system/account/accountApi.tsx';
import { bizTypeEnum } from '@/pages/system/account/ApiBo.ts';
import { MsgTypeEnum } from '@/pages/system/chat/api/TalkMsgApiBo.ts';
import { fileUploadVo } from '@/utils/baseBo.ts';
import ReactPlayer from 'react-player';
import { MessageContainerHandle } from '@chatui/core/lib/components/MessageContainer';

const num = 30;
console.log('测试是否 全局只会执行一次');
let lastRequest = Promise.resolve();

const Index = (
  props: {
    nowTalk: TalkUserListVo;
    reloadTalkList: () => void;
  },
) => {
  const { userMsg } = useAppContext();
  const { messages, prependMsgs, appendMsg, setTyping, resetList, updateMsg, deleteMsg } = useMessages([]);
  const userInfo = getUserInfo();
  const token = getUserToken();
  const [loadingTitle, setLoadingTitle] = useState('');
  const [groupSettingOpen, setGroupSettingOpen] = useState(OperateEnum.close);
  const [groupSettingPopover, setGroupSettingPopover] = useState(false);
  const [hoveredMessageId, setHoveredMessageId] = useState(null);
  const msgRef = useRef<MessageContainerHandle>(null);
  const handleSend = async (type, val: string | fileUploadVo, id?: any) => {
    if (type === 'text') {
      const text = val as string;
      if (text.length > 1000) {
        message.error('消息长度不能超过1000');
        return;
      } else if (text.length === 0) {
        message.error('消息不能为空');
        return;
      }
      const rst = await talkMsgSaveApi({ talkId: props.nowTalk.talkId, text: text, type: MsgTypeEnum.Text });
      if (checkApiRst(rst)) {
        return;
      } else {
      }
      if (id) {
        updateMsg(id, {
          _id: rst.data,
          type: 'text',
          content: {
            text: text,
            type: MsgTypeEnum.Text,
            sourceNickName: userInfo?.nickName,
            sourceAvatar: userInfo?.avatar,
            sourceType: '0',
            sourceId: userInfo?.accountId,
          },
          position: 'right',
          hasTime: false,
          createdAt: dayjs().valueOf(),
        });
      } else {
        appendMsg({
          _id: rst.data,
          type: 'text',
          content: {
            text: text,
            type: MsgTypeEnum.Text,
            sourceNickName: userInfo?.nickName,
            sourceAvatar: userInfo?.avatar,
            sourceType: '0',
            sourceId: userInfo?.accountId,
          },
          position: 'right',
          hasTime: false,
          createdAt: dayjs().valueOf(),
        });
      }

      // 类型 0text  1file
      // setTyping(true);

    } else if (type === 'file') {
      // 上传文件
      const rst = await talkMsgSaveApi({ talkId: props.nowTalk.talkId, file: val, type: MsgTypeEnum.File });
      if (checkApiRst(rst)) {
        return;
      } else {
      }
      if (id) {
        updateMsg(id, {
          _id: rst.data,
          type: 'text',
          content: {
            text: val,
            type: MsgTypeEnum.File,
            sourceNickName: userInfo?.nickName,
            sourceAvatar: userInfo?.avatar,
            sourceType: '0',
            sourceId: userInfo?.accountId,
          },
          position: 'right',
          hasTime: false,
          createdAt: dayjs().valueOf(),
        });
      } else {
        appendMsg({
          _id: rst.data,
          type: 'text',
          content: {
            text: val,
            type: MsgTypeEnum.File,
            sourceNickName: userInfo?.nickName,
            sourceAvatar: userInfo?.avatar,
            sourceType: '0',
            sourceId: userInfo?.accountId,
          },
          position: 'right',
          hasTime: false,
          createdAt: dayjs().valueOf(),
        });
      }
    }
    props.reloadTalkList();
  };
  const renderMessageContent = (msg) => {
    const { content, position, createdAt } = msg;
    const isHovered = hoveredMessageId === msg._id;
    let fileType = 'other';
    if (content.type === MsgTypeEnum.File) {
      if (content.text.mimeType?.startsWith('image/') === true) {
        fileType = 'image';
      } else if (content.text.mimeType?.startsWith('video/') === true) {
        fileType = 'video';
      } else if (content.text.mimeType?.startsWith('audio/') === true) {
        fileType = 'audio';
      }
    }
    return (
      <div
        style={{ display: 'flex', alignItems: 'center' }}
        onMouseEnter={() => setHoveredMessageId(msg._id)}
        onMouseLeave={() => setHoveredMessageId(null)}
      >
        {position === 'left' && (
          <MAvatar type={content.sourceType} avatar={content.sourceAvatar} nickName={content.sourceNickName} targetId={content.sourceId}></MAvatar>
        )}
        {position === 'right' && isHovered && (
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0)', color: '#b39696' }}>
            {dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}
          </div>
        )}
        {content.type === MsgTypeEnum.File && fileType === 'image' && <Image src={content.text.fullPath + '?token=' + token?.fileToken} width={100}></Image>}
        {content.type === MsgTypeEnum.File && fileType === 'other' && <a href={content.text.fullPath + '?token=' + token?.fileToken}>{content.text.fileName}</a>}
        {content.type === MsgTypeEnum.File && fileType === 'video' && <div style={{ width: 200, height: 200 }}>
          <ReactPlayer
            url={content.text.fullPath + '?token=' + token?.fileToken}
            width="100%"
            height="100%"
            controls={true}
            id={msg._id + 'id'}
            key={msg._id + 'key'}
            pip={false}
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload',
                },
              },
              soundcloud: {
                options: {
                  show_artwork: false,
                },
              },
            }}
          />
        </div>}
        {content.type === MsgTypeEnum.File && fileType === 'audio' && <div style={{ width: 300, height: 50 }}>
          <ReactPlayer
            url={content.text.fullPath + '?token=' + token?.fileToken}
            width="100%"
            height="100%"
            controls={true}
            id={msg._id + 'id'}
            key={msg._id + 'key'}
            pip={false}
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload',
                },
              },
              soundcloud: {
                options: {
                  show_artwork: false,
                },
              },
            }}
          />
        </div>
        }
        {content.type === MsgTypeEnum.Text && <Bubble style={{ backgroundColor: 'lightgreen' }}>
          <div>{content.text}</div>
        </Bubble>}

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

  const loadBeforeMsg = async (talkMsgId?: number) => {
    const rst = await talkMsgPageApi({ talkId: props.nowTalk.talkId, talkMsgId: talkMsgId, pageSize: num });
    if (rst.data.length === 0) {
      setLoadingTitle('没有更多了');
      return;
    }
    if (rst.data.length < num) {
      setLoadingTitle('没有更多了');
    }
    let list = rst.data.map((msg) => {
      let position = 'left';
      if (msg.sourceType == '2') {
      } else if (msg.sourceId === userInfo?.accountId) {
        position = 'right';
      }
      return {
        _id: msg.talkMsgId,
        type: msg.type === MsgTypeEnum.System ? 'system' : 'text',
        content: {
          text: msg.text ?? msg.file,
          type: msg.type,
          sourceNickName: msg.sourceNickName,
          sourceAvatar: msg.sourceAvatar,
          sourceType: msg.sourceType,
          sourceId: msg.sourceId,
        },
        position: position,
        hasTime: false,
        user: {},
        createdAt: dayjs(msg.createTime).valueOf(),
      };
    });
    prependMsgs(list);
  };


  const loadAfterMsg = async () => {
    let talkMsgIdAfter = null;
    if (messages.length > 0) talkMsgIdAfter = messages[messages.length - 1]._id;
    debugger
    const rst = await talkMsgPageApi({ talkId: props.nowTalk.talkId, talkMsgIdAfter: talkMsgIdAfter, pageSize: num });
    if (rst.data.length === 0) {
      setLoadingTitle('没有更多了');
    }
    rst.data.forEach((msg) => {
      deleteMsg(msg.talkMsgId);
      let position = 'left';
      if (msg.sourceType == '2') {

      } else if (msg.sourceId === userInfo?.accountId) {
        position = 'right';
      }
      appendMsg(
        {
          _id: msg.talkMsgId,
          type: msg.type === MsgTypeEnum.System ? 'system' : 'text',
          content: {
            text: msg.text ?? msg.file,
            type: msg.type,
            sourceNickName: msg.sourceNickName,
            sourceAvatar: msg.sourceAvatar,
            sourceType: msg.sourceType,
            sourceId: msg.sourceId,
          },
          position: position,
          hasTime: false,
          user: {},
          createdAt: dayjs(msg.createTime).valueOf(),
        },
      );
    });

  };

  const clearMsgFn = async () => {
    Modal.confirm({
      title: '确认清除',
      content: '清除后将无法恢复',
      icon: null,
      onOk: async () => {
        let rst = await clearMsgApi({ talkId: props.nowTalk.talkId });
        if (checkApiRst(rst)) return;
        message.success(rst.msg);
        resetList([]);
        props.reloadTalkList();
      },
    });
  };
  const exitGroupFn = () => {

    Modal?.confirm({
      title: '是否确认退出',
      // content: item.account,
      icon: null,
      onOk: async () => {
        let rst = await exitGroupApi({ talkId: props.nowTalk.talkId });
        if (checkApiRst(rst)) return;
        message.success(rst.msg);
        props.reloadTalkList();
      },
    });

  };


  useEffect(() => {
    setLoadingTitle('');
    resetList([]);
    loadBeforeMsg();
    return () => {

    };
  }, [props.nowTalk.talkId]);


  useEffect(() => {
    if (userMsg.type !== 1) return;
    lastRequest = lastRequest.then(async () => {
      await loadAfterMsg();
    });
  }, [userMsg]);

  const handleClick = useCallback(() => {
    return inputArea();
  }, [props.nowTalk.talkId]); // 没有依赖项

  // https://github.com/alibaba/ChatUI/issues/128
// InputArea组件
  const inputArea = () => {
    const [inputValue, setInputValue] = useState('');
    const sendMsg = async (e) => {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();  // Prevent new line on Enter
        if (inputValue.trim()) {
          await handleSend('text', inputValue.trim());
          setInputValue('');  // Clear the input after sending the message
        }
      }
    };
    const sendMsgBt = async () => {
      if (inputValue.trim()) {
        await handleSend('text', inputValue.trim());
        setInputValue('');  // Clear the input after sending the message
      }
    };
    const inputChange = (e) => {
      setInputValue(e.target.value);
    };


    const items: MenuProps['items'] = [
      {
        label: '上传文件',
        key: '1',
      },
    ];
    const onClickItem: MenuProps['onClick'] = ({ key }) => {
      // message.info(`Click on item ${key}`);
      if (key === '1') {
        uploadFile();
      }
    };
    return (
      <div className="input-area">
        <div style={{ width: '100%' }}>
          <Input.TextArea value={inputValue}
                          className={'Input Input--outline Composer-input'}
                          autoFocus={true}
                          variant={'outlined'}
                          placeholder="请输入消息 最多1000字"
                          autoSize={{ minRows: 1, maxRows: 6 }}
                          onPressEnter={sendMsg}
                          onChange={inputChange}
                          maxLength={1000}

          />
        </div>
        <div style={{ width: '30px', textAlign: 'center', alignContent: 'center' }}>
          <Dropdown menu={{ items, onClick: onClickItem }}>
            <a>
              <PlusCircleOutlined />
            </a>
          </Dropdown>
        </div>
        <div style={{ textAlign: 'center', alignContent: 'center' }}>
          <Button type="primary" onClick={sendMsgBt}>
            <SendOutlined />
          </Button>
        </div>
      </div>
    );
  };

  const uploadFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '*/*';
    input.click();
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        uploadFileFn(file);
      }
    };
  };

  const uploadFileFn = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const id = getRandomNumber();
    appendMsg({
      _id: id,
      type: 'text',
      content: {
        text: file.name + '-上传中...',
        type: MsgTypeEnum.Text,
        sourceNickName: userInfo?.nickName,
        sourceAvatar: userInfo?.avatar,
        sourceType: '0',
        sourceId: userInfo?.accountId,
      },
      position: 'right',
      hasTime: false,
      createdAt: dayjs().valueOf(),
    });
    try {
      const response = await uploadFileApi(formData, bizTypeEnum.TempConvertFile, props.nowTalk.talkId);
      if (response && response.data.fullPath) {
        // deleteMsg(id);
        await handleSend('file', response.data, id);
      } else {
        message.error('发送文件失败');
      }
    } catch (e) {
      updateMsg(id, {
        _id: id,
        type: 'text',
        content: {
          text: file.name + '-上传失败',
          type: MsgTypeEnum.Text,
          sourceNickName: userInfo?.nickName,
          sourceAvatar: userInfo?.avatar,
          sourceType: '0',
          sourceId: userInfo?.accountId,
        },
        position: 'right',
        hasTime: false,
        createdAt: dayjs().valueOf(),
      });
    }
  };
  const handlePaste = async (event: ClipboardEvent) => {
    const clipboardItems = event.clipboardData?.items;
    if (clipboardItems) {
      for (const item of clipboardItems) {
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (file) {
            uploadFileFn(file);
          }
          // 阻止默认的粘贴行为（如粘贴文件路径或其他内容）
          event.preventDefault();
          break;
        }
      }
    }
  };
  useEffect(() => {
    // 在组件挂载时添加事件监听
    window.addEventListener('paste', handlePaste);
    return () => {
      // 在组件卸载时移除事件监听
      window.removeEventListener('paste', handlePaste);
    };
  }, []);


  return (
    <div style={{ height: '100%' }}>
      <Chat
        // navbar={{ title: props.nowTalk.title, }}
        messagesRef={msgRef}
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

            <Popover trigger={['hover']} placement={'leftTop'}
                     open={groupSettingPopover}
                     onOpenChange={setGroupSettingPopover}
                     content={<div style={{ textAlign: 'right' }}>
                       {props.nowTalk.talkType === '1' &&
                         <div>
                           <div><Button type={'link'} onClick={() => {
                             setGroupSettingOpen(OperateEnum.add);
                             setGroupSettingPopover(false);
                           }}>群设置</Button></div>
                           <div><Button type={'link'}
                                        onClick={() => {
                                          exitGroupFn();
                                          setGroupSettingPopover(false);
                                        }}
                           >退出群聊</Button></div>
                         </div>
                       }
                       <div>
                         <Button type={'link'} onClick={() => {
                           clearMsgFn();
                           setGroupSettingPopover(false);
                         }}>清空聊天记录</Button>
                       </div>
                       {/*<div>*/}
                       {/*  <Button type={'link'}>查找聊天记录</Button>*/}
                       {/*</div>*/}
                     </div>}
            >
              <MoreOutlined />
            </Popover>

          </div>
        </div>
        }
        messages={messages}
        renderMessageContent={renderMessageContent}
        onSend={handleSend}
        loadMoreText={loadingTitle}
        onRefresh={async () => {
        }}
        onScroll={(e: React.UIEvent<HTMLDivElement, UIEvent>) => {
          // console.log(e.currentTarget.scrollTop);
          if (e.currentTarget.scrollTop === 0) {
            if (messages.length) {
              const id = messages[0]?._id;
              loadBeforeMsg(id).then(() => {
                setTimeout(() => {
                  document.querySelector(`.Message[data-id='${id}']`)?.scrollIntoView({ behavior: 'auto', block: 'center' });
                }, 300);
              });
            }
          }
        }}
        Composer={handleClick}
      />
      <Drawer open={groupSettingOpen !== OperateEnum.close}
              width={'800px'}
              onClose={() => {
                setGroupSettingOpen(OperateEnum.close);
                props.reloadTalkList();
              }}
              destroyOnClose={true}
      >
        <GroupSetting close={() => {
          setGroupSettingOpen(OperateEnum.close);
          props.reloadTalkList();
        }}
                      talkId={props.nowTalk.talkId}
        ></GroupSetting>
      </Drawer>

    </div>

  );
};

export default Index;

