import React, { useState } from 'react';
import { Button, Form } from 'antd';
import { talkSaveApi } from '@/pages/system/chat/api/api.tsx';
import { AccountCacheVo } from '@/pages/system/account/ApiBo.ts';
import { checkApiRst } from '@/utils/utils.ts';
import SelectUser from '@/pages/system/chat/drawer/SelectUser.tsx';

interface RecordType {
  key: string;
  title: string;
  description: string;
  disabled: boolean;
}


const AddChat = (
  props: {
    close: () => void;
    setNowTalkId: (nowTalkId: number) => void;
  },
) => {
  const [selectedUser, setSelectedUser] = useState<AccountCacheVo | undefined>(undefined);

  const save = () => {
    if (selectedUser === undefined) {
      return;
    }
    talkSaveApi({ title: '', type: '0', userIds: [selectedUser?.id] }).then((res) => {
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
      <SelectUser
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      ></SelectUser>


    </div>
  );
};
export default AddChat;