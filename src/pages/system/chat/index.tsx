import React, { useEffect, useState } from 'react';

import '@chatui/core/es/styles/index.less';
// 引入组件
import '@chatui/core/dist/index.css';
import { Badge, Button, Drawer, Input, Layout, List, message, Modal, Tooltip } from 'antd';
import { MoreOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import Chat from '@/pages/system/chat/chat.tsx';
import AddGroupChat from '@/pages/system/chat/drawer/AddGroupChat.tsx';
import { OperateEnum } from '@/utils/enum.ts';
import { talkAllApi } from '@/pages/system/chat/api/api.tsx';
import { TalkUserListVo } from '@/pages/system/chat/api/ApiBo.ts';
import AddChat from '@/pages/system/chat/drawer/AddChat.tsx';
import MAvatar from '@/components/MAvatar';
import { checkApiRst } from '@/utils/utils.ts';
import { delTalkApi } from '@/pages/system/chat/api/talkMsgApi.tsx';
import { useAppContext } from '@/AppContext.tsx';

const Index = () => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [addChatGroupIs, setAddChatGroupIs] = useState(OperateEnum.close);
  const [addChatIs, setAddChatIs] = useState(OperateEnum.close);
  const [search, setSearch] = useState('');
  const [nowTalk, setNowTalk] = useState<TalkUserListVo | undefined>();
  const [talkList, setTalkList] = useState<TalkUserListVo[]>([]);
  const { userMsg, setChat } = useAppContext();

  const setTalk = (talk: TalkUserListVo | undefined) => {
    setNowTalk(talk);
  };

  const getAllTalks = async (talkId?: number) => {
    talkAllApi({ search: search }).then(data => {
      setTalkList(data.data);
      if (talkId) {
        setNowTalk(data.data.find(item => item.talkId == talkId));
      } else if (data.data.length > 0) {
        if (!nowTalk) {
          setNowTalk(data.data[0]);
        } else {
          const talk = data.data.find(item => item.talkId == nowTalk?.talkId);
          if (talk) {
            setNowTalk(talk);
          } else {
            setNowTalk(data.data[0]);
          }
        }
      }
    });
  };

  const setNowTalkId = (talkId: number) => {
    getAllTalks(talkId);
  };
  const delMsgFn = async (talkId: number) => {
    Modal.confirm({
      title: '确认删除',
      content: '确认删除该聊天吗？',
      icon: null,
      onOk: async () => {
        let rst = await delTalkApi({ talkId: talkId });
        if (checkApiRst(rst)) return;
        message.success(rst.msg);
        getAllTalks();
      },
    });
  };
  useEffect(() => {
    getAllTalks();
  }, [userMsg]);
  useEffect(() => {
    // 把这个聊天的未读消息置为0
    setTalkList(talkList.map(item => {
      if (item.talkId === nowTalk?.talkId) {
        item.unReadCount = 0;
      }
      return item;
    }));
  }, [nowTalk]);
  const getMenu = () => {
    return <div>
      <div>
        <Button type={'link'}
                onClick={() => setAddChatIs(OperateEnum.add)}
        >发起聊天</Button>
      </div>
      <div>
        <Button type={'link'}
                onClick={() => setAddChatGroupIs(OperateEnum.add)}
        >发起群聊</Button>
      </div>
    </div>;
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('Target is visible:', entry.target);
          setChat(true);
        } else {
          console.log('Target is not visible:', entry.target);
          setChat(false);
        }
      });
    });
    if (divRef.current) {
      observer.observe(divRef.current); // 观察每个目标元素
    }

    return () => {
      observer.disconnect(); // 停止观察所有元素
      setChat(false);
    };
  }, [divRef]);

  return (
    <div style={{ height: '100%' }} ref={divRef}>
      <Layout style={{ height: '100%' }} hasSider={true}>
        <Layout.Sider style={{ backgroundColor: '#cccccc', height: '100%' }}
                      width={300}
        >
          <div style={{ backgroundColor: 'white', textAlign: 'right', height: '48px' }}>
            <Input
              style={{ width: '265px' }}
              suffix={<SearchOutlined onClick={() => {
                getAllTalks();
              }} />}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onPressEnter={(e) => {
                getAllTalks();
              }}
              allowClear={true}
            ></Input>
            <Tooltip placement={'rightTop'} trigger={'click'} title={getMenu}>
              <Button type={'link'} icon={<PlusCircleOutlined />}></Button>
            </Tooltip>
          </div>
          <div style={{ height: 'calc(100% - 48px)', overflowY: 'scroll' }} className={'mmm-bgcolor'}>
            <List
              itemLayout="horizontal"
              dataSource={talkList}
              renderItem={(item, index) => (
                <List.Item className={'mmm-hover-pointer'}
                           onClick={() => {
                             setTalk(item);
                           }}
                           style={{ backgroundColor: nowTalk?.talkId === item.talkId ? '#d7e4ef' : 'white', borderRadius: '10px' }}>
                  <List.Item.Meta
                    avatar={<div>
                      <Badge count={nowTalk?.talkId === item.talkId ? 0 : item.unReadCount} showZero={false}>
                        <MAvatar type={item.talkType} avatar={item.targetAvatar} nickName={item.title} targetId={item.targetId}></MAvatar>
                      </Badge>
                    </div>}
                    title={<div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div
                        style={{ cursor: 'pointer', width: 'calc(100% - 20px)' }}
                      >
                        {item.title}
                      </div>
                      <div style={{ width: '20px' }}
                           className={'mmm-hover-pointer'}
                           onClick={(event) => {
                             event.stopPropagation(); // 阻止事件冒泡，避免触发父级的 onClick 事件
                           }}
                      >
                        <Tooltip trigger={'hover'} placement={'rightTop'}
                                 title={<div>
                                   <div>
                                     <Button type={'link'} onClick={() => {
                                       delMsgFn(item.talkId);
                                     }}>删除聊天</Button>
                                   </div>
                                 </div>}
                        >
                          <MoreOutlined />
                        </Tooltip>
                      </div>
                    </div>}
                    description={<div className={'mmm-ellipsis'}>
                      {item.text}
                    </div>}
                  />

                </List.Item>
              )}
            />
          </div>
        </Layout.Sider>
        <Layout.Content style={{ height: '100%' }}>
          <div style={{ color: 'black', height: '100%' }}>
            {nowTalk && <Chat key={nowTalk.talkId} nowTalk={nowTalk} reloadTalkList={() => {
              getAllTalks();
            }}></Chat>}
          </div>
        </Layout.Content>
      </Layout>


      <Drawer open={addChatGroupIs !== OperateEnum.close}
              width={'800px'}
              onClose={() => setAddChatGroupIs(OperateEnum.close)}
              destroyOnClose={true}
      >
        <AddGroupChat close={() => setAddChatGroupIs(OperateEnum.close)}
                      setNowTalkId={setNowTalkId}
        ></AddGroupChat>
      </Drawer>
      <Drawer open={addChatIs !== OperateEnum.close}
              width={'800px'}
              onClose={() => setAddChatIs(OperateEnum.close)}
              destroyOnClose={true}
      >
        <AddChat close={() => setAddChatIs(OperateEnum.close)}
                 setNowTalkId={setNowTalkId}
        ></AddChat>
      </Drawer>

    </div>
  );
};

export default Index;