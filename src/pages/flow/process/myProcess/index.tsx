import React, { useState } from 'react';
import { Tabs } from 'antd';
import Apply from '@/pages/flow/process/myProcess/apply';
import MySubmit from '@/pages/flow/process/myProcess/mySubmit';
import PendingApproval from '@/pages/flow/process/myProcess/pendingApproval';
import AlreadyApproval from '@/pages/flow/process/myProcess/AlreadyApproval';


const Index = () => {
  const [tabId, setTabId] = useState('1');
  const onChange = (key: string) => {
    console.log(key);
    setTabId(key);
  };

  return (
    <div className={'mmm-bgcolor'}>
      <Tabs
        onChange={onChange}
        type="card"
        activeKey={tabId}
        items={[{
          label: `待审批`,
          key: '1',
          children: <PendingApproval tabId={tabId} />,
        }, {
          label: `已审批`,
          key: '2',
          children: <AlreadyApproval tabId={tabId} />,
        }, {
          label: `申请`,
          key: '3',
          children: <Apply tabId={tabId} />,
        }, {
          label: `我的提交`,

          key: '4',
          children: <MySubmit tabId={tabId} />,
        }]}
      />
    </div>
  );
};

export default Index;