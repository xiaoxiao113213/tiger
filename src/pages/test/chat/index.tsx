import React from 'react';

import '@chatui/core/es/styles/index.less';
// 引入组件
// 引入样式
import '@chatui/core/dist/index.css';

import { Avatar, Layout, List } from 'antd';
import Chat from '@/pages/test/chat/chat.tsx';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 4',
  },

  {
    title: 'Ant Design Title 4',
  },
];

const Index = () => {


  return (
    <div>
      <Layout style={{ height: '500px' }}>
        <Layout.Sider style={{ backgroundColor: '#cccccc' }}>
          <div style={{ height: '500px', overflowY: 'scroll' }} className={'mmm-bgcolor'}>
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item className={'mmm-hover-pointer'}>
                  <List.Item.Meta
                    avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                    title={item.title}
                    description={<div className={'mmm-ellipsis'}>Ant Design, a design language for background applications, is refined by Ant UED Team</div>}
                  />
                </List.Item>
              )}
            />
          </div>
        </Layout.Sider>
        <Layout.Content>
          <div style={{ color: 'black' }}>
            <Chat></Chat>
          </div>
        </Layout.Content>
      </Layout>

    </div>
  );
};

export default Index;