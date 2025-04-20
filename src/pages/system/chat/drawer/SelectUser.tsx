import React, { useEffect, useState } from 'react';
import { Avatar, Card, Form, Input, List, Pagination, Radio, RadioChangeEvent, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { AccountCacheVo } from '@/pages/system/account/ApiBo.ts';
import { getSelectUser } from '@/pages/system/account/accountApi.tsx';


const SelectUser = (props: {
  selectedUser: AccountCacheVo | undefined,
  setSelectedUser: (selectedUser: AccountCacheVo) => void
}) => {
  const [users, setUsers] = useState<AccountCacheVo[]>([]);
  const { selectedUser, setSelectedUser } = props;
  const [type, setType] = useState(1);
  const [pageNum, setPageNum] = useState(1);
  const [total, setTotal] = useState(0);
  const [nickName, setNickName] = useState('');

  const onChange = (e: RadioChangeEvent) => {
    getUsers({ type: e.target.value, pageNum: 1, nickName: nickName });
    setType(e.target.value);
  };

  const getUsers = async (data: { type?: number, nickName?: string, pageNum: number }) => {
    if (data.type === 2) {
      delete data.type;
    }
    // 获取用户列表
    getSelectUser(data).then((res) => {
      setUsers(res.data.list);
      setPageNum(res.data.pageNum);
      setTotal(res.data.total);
    });
  };


  useEffect(() => {
    getUsers({ type: type, pageNum: 1, nickName: nickName });
  }, []);


  return (
    <div style={{ backgroundColor: 'white' }}>
      <Form.Item label={'用户类型'}>
        <Radio.Group onChange={onChange} value={type}>
          <Radio value={1}>后台</Radio>
          <Radio value={0}>前台</Radio>
          <Radio value={2}>全部</Radio>
        </Radio.Group>
      </Form.Item>
      <Card>
        <div style={{ flex: 1, borderRight: '1px solid white', borderRadius: '10px', padding: '3px' }}>
          <Input suffix={<SearchOutlined onClick={() => {
            getUsers({ type: type, pageNum: 1, nickName: nickName });
          }} />}
                 style={{ marginTop: '10px' }}
                 onChange={(e) => {
                   setNickName(e.target.value);
                 }}
                 onPressEnter={(e) => {
                   getUsers({ type: type, pageNum: 1, nickName: nickName });
                 }}
                 allowClear={true}
          ></Input>
          <List
            itemLayout="horizontal"
            dataSource={users}
            renderItem={(item, index) => (
              <List.Item onClick={() => {
                setSelectedUser(item);
              }}
                         style={{ cursor: 'pointer', backgroundColor: selectedUser?.id === item.id ? '#f0f0f0' : 'white' }}
              >
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
          <Pagination defaultCurrent={pageNum} pageSize={8} total={total} onChange={(page) => {
            getUsers({ type: type, pageNum: page, nickName: nickName });
          }} />
        </div>
      </Card>
    </div>
  );
};

export default SelectUser;