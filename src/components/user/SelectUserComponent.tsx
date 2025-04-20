import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Avatar, Checkbox, Form, Input, List, Pagination, Radio, RadioChangeEvent, Tag } from 'antd';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { AccountCacheVo } from '@/pages/system/account/ApiBo.ts';
import { getSelectUser } from '@/pages/system/account/accountApi.tsx';

export interface SelectUserComponentRef {
  getSelectedUsers: () => AccountCacheVo[];

}

interface ComponentProps {
  initSelectedUsers: AccountCacheVo[],
  // callBackSelectedUsers: (selectedUsers: AccountCacheVo[]) => void,
//   排除的用户列表
  excludeUserIds?: number[]
}


const SelectUserComponent = forwardRef<SelectUserComponentRef, ComponentProps>((props, ref) => {
  const [users, setUsers] = useState<AccountCacheVo[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<AccountCacheVo[]>(props.initSelectedUsers);
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
    getSelectUser({ ...data, excludeUserIds: props.excludeUserIds }).then((res) => {
      setUsers(res.data.list);
      setPageNum(res.data.pageNum);
      setTotal(res.data.total);
    });
  };

  useImperativeHandle(ref, () => ({
    getSelectedUsers: () => {
      return selectedUsers;
    },

  }));

  useEffect(() => {
    getUsers({ type: type, pageNum: 1, nickName: nickName });
  }, []);


  return (
    <div style={{ border: '1px solid #cccccc', borderRadius: '10px' }}>
      <Form.Item label={'用户类型'}>
        <Radio.Group onChange={onChange} value={type}>
          <Radio value={1}>后台</Radio>
          <Radio value={0}>前台</Radio>
          <Radio value={2}>全部</Radio>
        </Radio.Group>
      </Form.Item>
      <div style={{ display: 'flex', height: '700px', borderRadius: '10px', border: '1px solid #cccccc' }}>
        <div style={{ flex: 1, borderRight: '1px solid #cccccc', borderRadius: '10px', padding: '3px' }}>
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
              <List.Item className={'mmm-hover-pointer'}>
                <List.Item.Meta
                  avatar={<div style={{ marginLeft: '5px' }}>
                    <Checkbox style={{ marginRight: '5px', marginTop: '10px' }}
                              checked={selectedUsers.some((u) => u.id === item.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedUsers([...selectedUsers, item]);
                                } else {
                                  setSelectedUsers(selectedUsers.filter((u) => u.id !== item.id));
                                }
                              }} />
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
        <div style={{ flex: 1, borderRadius: '10px', overflowY: 'auto' }}>
          <List
            itemLayout="horizontal"
            dataSource={selectedUsers}

            renderItem={(item, index) => (
              <List.Item
                className={'mmm-hover-pointer'}
              >
                <List.Item.Meta
                  avatar={<div style={{ marginLeft: '5px' }}>
                    <Avatar style={{ backgroundColor: '#2b87db', verticalAlign: 'middle' }} size="large"
                            src={item.avatar}>{item.nickName}</Avatar>
                  </div>}
                  title={<div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{item.nickName}</span>
                    <div>
                      {item.type === 0 && <Tag color={'blue'}>前</Tag>}
                      {item.type === 1 && <Tag color={'blue'}>后</Tag>}
                      <DeleteOutlined style={{ marginRight: '5px' }} className={'mmm-hover-pointer'}
                                      onClick={() => {
                                        setSelectedUsers(selectedUsers.filter((u) => u.id !== item.id));
                                      }}
                      />
                    </div>
                  </div>}
                  description={<div className="mmm-ellipsis">{item.remarks}</div>}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
});

export default SelectUserComponent;