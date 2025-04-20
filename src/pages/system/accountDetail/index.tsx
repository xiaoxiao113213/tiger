import React from 'react';
import { Card, Tabs, TabsProps } from 'antd';
import BaseView from './components/base';
import SecurityView from './components/security';


const Settings: React.FC = () => {

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '基本设置',
      children: <BaseView />,
    },
    {
      key: '2',
      label: '安全设置',
      children: <SecurityView />,
    },
  ];


  const onChange = (key: string) => {
    console.log(key);
  };


  return (
    <div>
      <Card>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} tabPosition={'left'} />
      </Card>
    </div>

  );
};
export default Settings;
