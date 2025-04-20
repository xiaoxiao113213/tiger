import React, { useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import List from '@/pages/project/release/list.tsx';
import Sprint from '@/pages/project/release/sprint.tsx';

const Index = () => {
  const [tab, setTab] = useState('1');
  const onChange = (key: string) => {
    console.log(key);
    setTab(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '冲刺',
      children: <Sprint tab={tab} key={`sprint-${tab}`} />,
    },
    {
      key: '2',
      label: '列表',
      children: <List tab={tab} key={`sprint-${tab}`} />,
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default Index;