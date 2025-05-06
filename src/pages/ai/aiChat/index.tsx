import { Attachments, Bubble, Conversations, Sender, useXAgent, useXChat } from '@ant-design/x';
import { createStyles } from 'antd-style';
import React, { useEffect, useState } from 'react';

import {
  ClearOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
  PaperClipOutlined,
  PlusOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Badge, Button, Drawer, type GetProp, Image, Modal, Typography } from 'antd';
import { OperateEnum } from '@/utils/enum.ts';
import AddChat from '@/pages/ai/aiChat/addChat.tsx';
import {
  addModelChatMsg,
  aiChatAllApi,
  aiChatDeleteApi,
  AiChatDetailVo,
} from '@/pages/ai/aiChat/api/AiChatApi.tsx';
import { aiChatMsgAllApi, clearMsgApi } from '@/pages/ai/aiChat/api/AiChatMsgApi.tsx';
import { getUserInfo, getUserToken } from '@/store/userStore.ts';
import markdownit from 'markdown-it';
import UpdateChat from '@/pages/ai/aiChat/updateChat.tsx';
import { fileUploadVo } from '@/utils/baseBo.ts';
import { uploadFileApi } from '@/pages/system/account/accountApi.tsx';
import { bizTypeEnum } from '@/pages/system/account/ApiBo.ts';
import { getThinkMsg } from '@/pages/ai/aiChat/MsgUtils.ts';

const md = markdownit({ html: true, breaks: true });

const useStyle = createStyles(({ token, css }) => {
  return {
    layout: css`
      width: 100%;
      min-width: 1000px;
      //height: 722px;
      height: 100%;
      border-radius: ${token.borderRadius}px;
      display: flex;
      background: ${token.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${token.fontFamily}, sans-serif;

      .ant-prompts {
        color: ${token.colorText};
      }
    `,
    menu: css`
      background: ${token.colorBgLayout}80;
      width: 280px;
      height: 100%;
      display: flex;
      flex-direction: column;
    `,
    conversations: css`
      padding: 0 12px;
      flex: 1;
      overflow-y: auto;
    `,
    chat: css`
      height: 100%;
      width: 100%;
      //max-width: 700px;
      margin: 0 auto;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      //padding: ${token.paddingLG}px;
      padding: 5px;
      gap: 16px;
    `,
    messages: css`
      flex: 1;
    `,
    placeholder: css`
      padding-top: 32px;
    `,
    sender: css`
      box-shadow: ${token.boxShadow};
    `,
    logo: css`
      display: flex;
      height: 72px;
      align-items: center;
      justify-content: start;
      padding: 0 24px;
      box-sizing: border-box;

      img {
        width: 24px;
        height: 24px;
        display: inline-block;
      }

      span {
        display: inline-block;
        margin: 0 8px;
        font-weight: bold;
        color: ${token.colorText};
        font-size: 16px;
      }
    `,
    addBtn: css`
      background: #1677ff0f;
      border: 1px solid #1677ff34;
      width: calc(100% - 24px);
      margin: 0 12px 24px 12px;
    `,
  };
});

const roles: GetProp<typeof Bubble.List, 'roles'> = {
  ai: {
    placement: 'start',
    // typing: { step: 5, interval: 20 },
    styles: {
      content: {
        borderRadius: 16,
      },
    },
  },
  local: {
    placement: 'end',
    variant: 'shadow',
  },
};

const Independent: React.FC = () => {
  // ==================== Style ====================
  const { styles } = useStyle();
  // ==================== State ====================
  const [headerOpen, setHeaderOpen] = React.useState(false);
  const [content, setContent] = React.useState('');
  const [conversationsItems, setConversationsItems] = React.useState([]);
  const [activeKey, setActiveKey] = React.useState<number>();
  const [aiChat, setAiChat] = React.useState<AiChatDetailVo>();
  const [attachedFiles, setAttachedFiles] = React.useState<GetProp<typeof Attachments, 'items'>>(
    [],
  );
  const accountId = Number(getUserInfo().accountId);
  const token = getUserToken()?.accessToken;
  const [newChatModal, setNewChatModal] = useState(OperateEnum.close);
  const [updateChatModal, setUpdateChatModal] = useState(OperateEnum.close);
  const [senderLoading, setSenderLoading] = useState(false);

  // ==================== Runtime ====================
  const [agent] = useXAgent({
    request: async ({ message }, { onSuccess, onUpdate }) => {
      setActiveKey((pre) => {
        addModelChatMsg({ aiChatId: Number(pre), text: message, type: 'Text' }).then((msgId) => {
          // 使用 EventSource 连接到服务器事件流
          const eventSource = new EventSource(
            import.meta.env.VITE_APP_BASE_API +
              '/devops-server/aiChat/getModelChatSse/' +
              msgId.data +
              '/' +
              token,
          );
          let s = '';
          eventSource.onmessage = (event) => {
            console.log('Message from server:', event.data);
            const data = JSON.parse(event.data);
            s += data.msg;
            onUpdate(s);
          };
          eventSource.onerror = (error) => {
            console.error('Error with EventSource:', error);
            onSuccess(s);
            eventSource.close();
            setSenderLoading(false);
          };
        });
        return pre;
      });
    },
  });

  const addNewMsg = async (msg: string, fileList) => {
    const rst = await addModelChatMsg({
      aiChatId: Number(activeKey),
      text: msg,
      type: 'Text',
      file: fileList,
    });
    // 返回ai的消息id
    return rst.data;
  };

  const sendSse = (aiMsgId: number) => {
    // 使用 EventSource 连接到服务器事件流
    const eventSource = new EventSource(
      import.meta.env.VITE_APP_BASE_API +
        '/devops-server/aiChat/getModelChatSse/' +
        aiMsgId +
        '/' +
        token,
    );
    let s = '';
    eventSource.onmessage = (event) => {
      console.log('Message from server:', event.data);
      const data = JSON.parse(event.data);
      s += data.msg;
      setMessages((pre) => {
        let m = pre.find((it) => it.id == aiMsgId);
        m.message = s;
        if (data.fileList) {
          m.file = data.fileList;
        }
        return pre;
      });
    };
    eventSource.onerror = (error) => {
      console.error('Error with EventSource:', error);
      setMessages((pre) => {
        let m = pre.find((it) => it.id == aiMsgId);
        if (m) {
          m.status = 'Success';
          setSenderLoading(false);
        } else {
        }
        return pre;
      });
      eventSource.close();
    };
  };

  const { onRequest, messages, setMessages } = useXChat({
    agent,
  });

  const getNewMsgList = async (activeKey: number) => {
    const rst = await aiChatMsgAllApi({ aiChatId: Number(activeKey) });
    const messages = rst.data.map((it) => {
      return {
        id: `${it.aiChatMsgId}`,
        message: it.text,
        role: it.bizId == accountId ? 'local' : 'ai',
        status: it.status, // Wait Processing Success Fail
        file: it.file,
      };
    });
    setMessages(messages);
    //   如何message中的最后一个状态时 进行中的 那么输入框不能输入
    if (messages.length > 0 && messages[messages.length - 1].status == 'Processing') {
      setSenderLoading(true);
      sendSse(Number(messages[messages.length - 1].id));
    } else {
      setSenderLoading(false);
      return;
    }
  };

  useEffect(() => {
    aiChatAllApi({}).then((rst) => {
      const chats = rst.data.map((it) => {
        return {
          key: `${it.aiChatId}`,
          label: `${it.title}`,
        };
      });
      setConversationsItems(chats);
      if (rst.data.length > 0) {
        setActiveKey(rst.data[0].aiChatId);
      }
    });
  }, []);

  useEffect(() => {
    if (activeKey) {
      getNewMsgList(activeKey);
    } else {
      setMessages([]);
    }
  }, [activeKey]);

  // ==================== Event ====================
  const onSubmit = async (nextContent: string) => {
    if (!nextContent) return;
    // let nextContent1 = '【被告】：' + nextContent;
    let nextContent1 = nextContent;
    setSenderLoading(true);
    // onRequest(nextContent);
    const fileList = [];
    // 如果有附件 把附件中的文件，就和消息一起发送
    if (attachedFiles.length > 0) {
      for (let i = 0; i < attachedFiles.length; i++) {
        const file = attachedFiles[i];
        // 设置这个文件上传中
        file.status = 'uploading';
        const formData = new FormData();
        formData.append('file', file.originFileObj);
        const response = await uploadFileApi(formData, bizTypeEnum.Public, 0);
        fileList.push(response.data);
        file.status = 'done';
      }
    }

    addNewMsg(nextContent1, fileList)
      .then((aiMsgId) => {
        setContent('');
        setAttachedFiles([]);
        setHeaderOpen(false);
        setMessages([
          ...messages,
          {
            id: `${aiMsgId}_1`,
            message: nextContent1,
            role: 'local',
            status: 'Success',
            file: fileList,
          },
          {
            id: `${aiMsgId}`,
            message: '',
            role: 'ai',
            status: 'Processing',
          },
        ]);
        sendSse(aiMsgId);
        //   如果当前的key 在 conversationsItems不是第一个 要移动到第一个
        if (conversationsItems.length > 1) {
          const index = conversationsItems.findIndex((it) => it.key == `${activeKey}`);
          if (index != 0) {
            const item = conversationsItems[index];
            conversationsItems.splice(index, 1);
            conversationsItems.unshift(item);
            setConversationsItems([...conversationsItems]);
          }
        }
      })
      .catch(() => {
        setSenderLoading(false);
      });
  };

  const onAddConversation = async () => {
    setNewChatModal(OperateEnum.add);
    return;
  };

  const onConversationClick: GetProp<typeof Conversations, 'onActiveChange'> = (key) => {
    setActiveKey(key);
  };

  const handleFileChange: GetProp<typeof Attachments, 'onChange'> = (info) =>
    setAttachedFiles(info.fileList);

  const items: GetProp<typeof Bubble.List, 'items'> = messages.map(
    ({ id, message, role, status, file }) => {
      console.log('id', id, file);
      let loading = false;
      if (status == 'Processing' && message.length == 0) {
        loading = true;
      }
      let element = '';
      if (file) {
        element = file.map((item) => {
          item as fileUploadVo;
          //   如果是音频文件
          if (item.mimeType.startsWith('audio/')) {
            return (
              <audio controls>
                <source src={item.fullPath} type="audio/mpeg" />
              </audio>
            );
          }
          //   如果是图片文件
          else if (item.mimeType.startsWith('image/')) {
            return <Image width={200} src={item.fullPath} />;
          }
          //   如果是视频
          else if (item.mimeType.startsWith('video/')) {
            return (
              <video width="320" height="240" controls>
                <source src={item.fullPath} type="video/mp4" />
              </video>
            );
          } else {
            //  如果是文件就是a标签下载
            return (
              <a href={item.fullPath} download={item.fileName}>
                {item.fileName}
              </a>
            );
          }
        });
      }
      let data = getThinkMsg(message);
      return {
        key: id,
        loading: loading,
        role: role,
        // messageRender: renderMarkdown,
        content: (
          <>
            {element}
            <Typography>
              {/* biome-ignore lint/security/noDangerouslySetInnerHtml: used in demo */}
              <div dangerouslySetInnerHTML={{ __html: md.render(data.think + data.answer) }} />
            </Typography>
          </>
        ),
      };
    },
  );

  const attachmentsNode = (
    <Badge dot={attachedFiles.length > 0 && !headerOpen}>
      <Button type="text" icon={<PaperClipOutlined />} onClick={() => setHeaderOpen(!headerOpen)} />
    </Badge>
  );

  const senderHeader = (
    <Sender.Header
      title="Attachments"
      open={headerOpen}
      onOpenChange={setHeaderOpen}
      styles={{
        content: {
          padding: 0,
        },
      }}
    >
      <Attachments
        beforeUpload={() => false}
        items={attachedFiles}
        onChange={handleFileChange}
        placeholder={(type) =>
          type === 'drop'
            ? { title: 'Drop file here' }
            : {
                icon: <CloudUploadOutlined />,
                title: 'Upload files',
                description: 'Click or drag files to this area to upload',
              }
        }
      />
    </Sender.Header>
  );

  const clearMsgFn = async () => {
    Modal?.confirm({
      title: '是否确认清空聊天记录',
      // content: item.account,
      icon: null,
      onOk: async () => {
        let rst = await clearMsgApi({ aiChatId: Number(activeKey) });
        setMessages([]);
      },
    });
  };
  const delChatFn = async () => {
    Modal?.confirm({
      title: '是否确认删除此对话',
      // content: item.account,
      icon: null,
      onOk: async () => {
        let rst = await aiChatDeleteApi({ aiChatId: Number(activeKey) });
        const items = conversationsItems.filter((it) => it.key != `${activeKey}`);
        setConversationsItems(items);
        if (items.length > 0) {
          setActiveKey(items[0].key);
        } else {
          setActiveKey(undefined);
        }
      },
    });
  };

  // ==================== Render =================
  return (
    <div className={styles.layout}>
      <div className={styles.menu}>
        {/* 🌟 添加会话 */}
        <Button
          onClick={onAddConversation}
          type="link"
          className={styles.addBtn}
          icon={<PlusOutlined />}
        >
          新对话
        </Button>
        {/* 🌟 会话管理 */}
        <Conversations
          items={conversationsItems}
          className={styles.conversations}
          activeKey={activeKey}
          onActiveChange={onConversationClick}
        />
      </div>
      <div className={styles.chat} hidden={activeKey == undefined}>
        {/* 🌟 消息列表 */}
        <div style={{ textAlign: 'right', height: '15px' }}>
          <Button
            icon={<ClearOutlined />}
            type={'link'}
            onClick={() => {
              clearMsgFn();
            }}
          ></Button>
          <Button
            icon={<DeleteOutlined />}
            type={'link'}
            style={{ marginLeft: '10px' }}
            onClick={() => {
              delChatFn();
            }}
          ></Button>
          <Button
            icon={<SettingOutlined />}
            type={'link'}
            style={{ marginLeft: '10px' }}
            onClick={() => {
              setUpdateChatModal(OperateEnum.edit);
            }}
          ></Button>
        </div>
        <Bubble.List items={items} roles={roles} className={styles.messages} />
        {/* 🌟 输入框 */}
        <Sender
          value={content}
          header={senderHeader}
          onSubmit={onSubmit}
          onChange={setContent}
          prefix={attachmentsNode}
          loading={senderLoading}
          className={styles.sender}
        />
      </div>

      <Drawer
        title={'新对话'}
        open={newChatModal !== OperateEnum.close}
        width={'80%'}
        destroyOnClose={true}
        maskClosable={false}
        onClose={() => setNewChatModal(OperateEnum.close)}
        footer={null}
      >
        <AddChat
          callback={(chat: AiChatDetailVo) => {
            setNewChatModal(OperateEnum.close);
            setConversationsItems([
              ...conversationsItems,
              {
                key: `${chat.aiChatId}`,
                label: `${chat.title}`,
              },
            ]);
            setActiveKey(`${chat.aiChatId}`);
          }}
        ></AddChat>
      </Drawer>
      <Drawer
        title={'设置对话'}
        open={updateChatModal !== OperateEnum.close}
        width={'50%'}
        destroyOnClose={true}
        maskClosable={false}
        onClose={() => setUpdateChatModal(OperateEnum.close)}
        footer={null}
      >
        <UpdateChat
          aiChatId={Number(activeKey)}
          callback={(data) => {
            setUpdateChatModal(OperateEnum.close);
            const index = conversationsItems.findIndex((it) => it.key == `${activeKey}`);
            conversationsItems[index].label = data.title;
            if (conversationsItems.length > 1) {
              const index = conversationsItems.findIndex((it) => it.key == `${activeKey}`);
              if (index != 0) {
                const item = conversationsItems[index];
                conversationsItems.splice(index, 1);
                conversationsItems.unshift(item);
                setConversationsItems([...conversationsItems]);
              }
            } else {
              setConversationsItems([...conversationsItems]);
            }
          }}
        ></UpdateChat>
      </Drawer>
    </div>
  );
};

export default Independent;
