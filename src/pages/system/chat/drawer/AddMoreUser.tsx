import React, { useState } from 'react';
import { Button, Form } from 'antd';
import SelectGroupUser from '@/pages/system/chat/drawer/SelectGroupUser.tsx';
import { addGroupUser } from '@/pages/system/chat/api/api.tsx';
import { AccountCacheVo } from '@/pages/system/account/ApiBo.ts';
import { checkApiRst } from '@/utils/utils.ts';

interface RecordType {
  key: string;
  title: string;
  description: string;
  disabled: boolean;
}


const AddMoreUser = (
  props: {
    talkId: number;
    close: () => void;
    excludeUserIds?: number[]
  },
) => {
  const [title, setTitle] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<AccountCacheVo[]>([]);

  const save = () => {
    if (selectedUsers.length === 0) {
      return;
    }
    addGroupUser({ talkId: props.talkId, userIds: selectedUsers.map(item => item.id) }).then((res) => {
      console.log(res);
      if (checkApiRst(res)) {
        return;
      }
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
      <SelectGroupUser
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        excludeUserIds={props.excludeUserIds}
      ></SelectGroupUser>


    </div>
  );
};
type FieldType = {
  title?: string;
  userIds?: number[];
};
export default AddMoreUser;