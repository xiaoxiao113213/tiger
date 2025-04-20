import React, { useState } from 'react';
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import Page from '@/pages/task/page.tsx';
import Gan from './gan';

const Index = () => {
  const [tagNum, setTagNum] = useState('2');

  const onChange = (key: string) => {
    setTagNum(key);
  };

  const items: TabsProps['items'] = [
      {
        key: '1',
        label: '列表',
        children: <Page tagNum={tagNum} />,
      },
      {
        key: '2',
        label: '甘特图',
        children: <Gan tagNum={tagNum} />,
      }
      ,
    ]
  ;
  return (
    <Tabs defaultActiveKey="2" items={items} onChange={onChange} tabPosition={'left'} />
  );
};

export default Index;