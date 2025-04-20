import React, { useState } from 'react';
import { AccountCacheVo } from '@/pages/system/account/ApiBo.ts';
import { Avatar, Card, Input, List, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';


const UserView = (props: {
  userList: AccountCacheVo[],
}) => {
  const [users, setUsers] = useState<AccountCacheVo[]>(props.userList);
  const [nickName, setNickName] = useState('');


  return (
    <div style={{ backgroundColor: 'white', width: '100%' }}>
      <Card>
        <div style={{ flex: 1, borderRight: '1px solid white', borderRadius: '10px', padding: '3px' }}>
          <Input suffix={<SearchOutlined onClick={() => {
            setUsers(props.userList.filter((item) => {
              return item.nickName.includes(nickName);
            }));
          }} />}
                 style={{ marginTop: '10px' }}
                 onChange={(e) => {
                   setNickName(e.target.value);
                 }}
                 onPressEnter={(e) => {
                   setUsers(props.userList.filter((item) => {
                     return item.nickName.includes(nickName);
                   }));
                 }}
                 allowClear={true}
          ></Input>
          <List
            itemLayout="horizontal"
            dataSource={users}
            renderItem={(item, index) => (
              <List.Item className={'mmm-hover-pointer'}>
                <List.Item.Meta
                  avatar={<div style={{ marginLeft: '5px' }}>
                    <Avatar style={{ backgroundColor: '#2b87db', verticalAlign: 'middle' }} size="large"
                            src={item.avatar}>{item.nickName}</Avatar>
                  </div>}
                  title={<div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{item.nickName}</span>
                    {item.type === 0 && <Tag color={'blue'}>前</Tag>}
                    {item.type === 1 && <Tag color={'blue'}>后</Tag>}
                  </div>}
                  description={<div className="mmm-ellipsis">{item.remarks}</div>}
                />
              </List.Item>
            )}
          />
        </div>
      </Card>
    </div>
  );
};

export default UserView;