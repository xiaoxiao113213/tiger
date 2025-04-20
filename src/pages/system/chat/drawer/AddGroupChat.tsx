import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import SelectGroupUser from '@/pages/system/chat/drawer/SelectGroupUser.tsx';
import { talkSaveApi } from '@/pages/system/chat/api/api.tsx';
import { AccountCacheVo } from '@/pages/system/account/ApiBo.ts';
import { checkApiRst } from '@/utils/utils.ts';

interface RecordType {
  key: string;
  title: string;
  description: string;
  disabled: boolean;
}


const AddGroupChat = (
  props: {
    close: () => void;
    setNowTalkId: (nowTalkId: number) => void;
  },
) => {
  const [title, setTitle] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<AccountCacheVo[]>([]);

  const save = () => {
    talkSaveApi({ title: title, type: '1', userIds: selectedUsers.map(item => item.id) }).then((res) => {
      console.log(res);
      if (checkApiRst(res)) {
        return;
      }
      props.setNowTalkId(res.data);
      props.close();
    });
  };


  return (
    <div>
      <Form.Item>
        <Button type="primary" onClick={save}>
          确定
        </Button>
      </Form.Item>
      <Form
        name="basic"
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="群名称"
          name="title"
          rules={[{ required: true, message: '' }]}
        >
          <Input placeholder={''} onChange={(e) => {
            setTitle(e.target.value);
          }} />
        </Form.Item>
      </Form>
      <SelectGroupUser
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
      ></SelectGroupUser>


    </div>
  );
};
type FieldType = {
  title?: string;
  userIds?: number[];
};
export default AddGroupChat;