import { Badge, Drawer, Tabs, Tag } from 'antd';
import Color from 'color';
import { CSSProperties, ReactNode, useEffect, useState } from 'react';

import CyanBlur from '@/assets/images/background/cyan-blur.png';
import RedBlur from '@/assets/images/background/red-blur.png';
import { IconButton, Iconify, SvgIcon } from '@/components/icon';
import ProTag from '@/theme/antd/components/tag';
import { useThemeToken } from '@/theme/hooks';
import { messagePageApi, messageUpdateReadApi } from '@/pages/system/message/api.tsx';
import { MessageListVo, MessageVo } from '@/pages/system/message/ApiBo.ts';

export default function NoticeButton() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const themeToken = useThemeToken();
  const [count, setCount] = useState(0);

  const style: CSSProperties = {
    backdropFilter: 'blur(20px)',
    backgroundImage: `url("${CyanBlur}"), url("${RedBlur}")`,
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundColor: Color(themeToken.colorBgContainer).alpha(0.9).toString(),
    backgroundPosition: 'right top, left bottom',
    backgroundSize: '50, 50%',
  };


  const initData = async () => {
    messagePageApi({ status: '0' } as MessageVo).then(rst => {
      setCount(rst.data.total);
    });
  };
  useEffect(() => {
    initData();
  }, []);

  return (
    <div>
      <IconButton onClick={() => setDrawerOpen(true)}>
        <Badge
          count={count}
          styles={{
            root: { color: 'inherit' },
            indicator: { color: '#fff' },
          }}
        >
          <Iconify icon="solar:bell-bing-bold-duotone" size={24} />
        </Badge>
      </IconButton>
      <Drawer
        placement="right"
        title="消息通知"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        closable={false}
        width={420}
        styles={{
          body: { padding: 0 },
          mask: { backgroundColor: 'transparent' },
        }}
        style={style}
        extra={
          <IconButton
            style={{ color: themeToken.colorPrimary }}
            onClick={() => {
              setCount(0);
              setDrawerOpen(false);
            }}
          >
            <Iconify icon="solar:check-read-broken" size={20} />
          </IconButton>
        }
      >
        <NoticeTab />
      </Drawer>
    </div>
  );
}

function NoticeTab() {
  const themeToken = useThemeToken();
  const [unreadList, setUnreadList] = useState<ReactNode>();
  const [readList, setReadList] = useState<ReactNode>();
  const [list, setList] = useState<ReactNode>();
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [readCount, setReadCount] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const setRead = async (messageId: number) => {
    await messageUpdateReadApi({ messageId: messageId } as MessageVo);
  };


  const getList = (list: MessageListVo[]) => {
    const tabChildren: ReactNode = (
      <div>
        {list.map((item, index) => {

          return <div className="text-sm" onClick={() => {
            setRead(item.messageId);
          }}>
            <div className="mt-8 flex">
              <IconButton>
                <SvgIcon icon="ic_chat" size={30} />
              </IconButton>
              <div className="ml-2">
                <div style={{ display: 'flex' }}>
                  <div style={{ flex: 10 }}><h2>{item.title}</h2></div>
                  <div style={{ flex: 1, marginLeft: '10px' }}>
                    {item.status === '0' ? <Tag color="red">未读</Tag> : <Tag color="green">已读</Tag>}
                  </div>
                </div>
                <div>
                  <span className="font-light">{item.msg}</span>
                </div>
                <span className="text-xs font-light opacity-60">{item.createTime}</span>
              </div>
            </div>
          </div>;
        })}
      </div>

    );
    return tabChildren;
  };

  const initData = async () => {
    messagePageApi({ status: '0' } as MessageVo).then(rst => {
      console.log('消息通知', rst.data);
      setUnreadCount(rst.data.total);
      setUnreadList(getList(rst.data.list));

    });
    messagePageApi({ status: '1' } as MessageVo).then(rst => {
      console.log('消息通知', rst.data);
      setReadCount(rst.data.total);
      setReadList(getList(rst.data.list));
    });
    messagePageApi({} as MessageVo).then(rst => {
      console.log('消息通知', rst.data);
      setCount(rst.data.total);
      setList(getList(rst.data.list));
    });
  };

  useEffect(() => {
    initData();
  }, []);


  return (
    <div className="flex flex-col px-6">
      <Tabs defaultActiveKey="2" items={[
        {
          key: '1',
          label: (
            <div className="flex">
              <span>全部</span>
              <ProTag color="processing">{count}</ProTag>
            </div>
          ),
          children: list,
        },
        {
          key: '2',
          label: (
            <div className="flex">
              <span>未读</span>
              <ProTag color="error">{unreadCount}</ProTag>
            </div>
          ),
          children: unreadList,
        },
        {
          key: '3',
          label: (
            <div className="flex">
              <span>已读</span>
              <ProTag color="green">{readCount}</ProTag>
            </div>
          ),
          children: readList,
        },
      ]} />
    </div>
  );
}
