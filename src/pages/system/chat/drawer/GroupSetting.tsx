import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Drawer, Form, Input, List, message, Modal, Tabs, TabsProps, Tag } from 'antd';
import { FormProps } from 'antd/lib';
import { kickOutGroupApi, talkGetOneApi, transferGroupOwner, updateGroupNameApi } from '@/pages/system/chat/api/api.tsx';
import { TalkDetailVo, TalkUserDetailVo } from '@/pages/system/chat/api/ApiBo.ts';
import { OperateEnum } from '@/utils/enum.ts';
import AddMoreUser from '@/pages/system/chat/drawer/AddMoreUser.tsx';
import { DeleteOutlined, RetweetOutlined } from '@ant-design/icons';
import { checkApiRst } from '@/utils/utils.ts';
import { getUserInfo } from '@/store/userStore.ts';

type FieldType = {
  title?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const GroupSetting = (props: {
  close: () => void,
  talkId: number
}) => {
  const [form] = Form.useForm<FieldType>();
  const { close, talkId } = props;
  const [talk, setTalk] = useState<TalkDetailVo | undefined>(undefined);
  const [selectTalkUser, setSelectTalkUser] = useState<undefined | TalkUserDetailVo>();
  const [addMoreUserOpen, setAddMoreUserOpen] = useState(OperateEnum.close);
  const [title, setTitle] = useState('');
  const userInfo = getUserInfo();
  console.log(userInfo);

  const initData = () => {
    talkGetOneApi({ talkId }).then((res) => {
      setTalk(res.data);
      form.setFieldsValue(res.data);
      setTitle(res.data.title);
    });
  };
  const onChange = (key: string) => {
    console.log(key);
  };

  const transferGroupOwnerFn = () => {
    if (!selectTalkUser) {
      return;
    }
    Modal?.confirm({
      title: '是否确认转让群主',
      // content: item.account,
      icon: null,
      onOk: async () => {
        let rst = await transferGroupOwner({ talkId, userId: selectTalkUser?.userInfo.id });
        if (checkApiRst(rst)) return;
        message.success(rst.msg);
        initData();
      },
    });

  };
  const kickOutGroupFn = () => {
    if (!selectTalkUser) {
      return;
    }
    Modal?.confirm({
      title: '是否确认踢出群聊',
      // content: item.account,
      icon: null,
      onOk: async () => {
        let rst = await kickOutGroupApi({ talkId, userId: selectTalkUser?.userInfo.id });
        if (checkApiRst(rst)) return;
        message.success(rst.msg);
        initData();
      },
    });

  };


  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '群成员',
      children: (<div>
        <Button type={'primary'} style={{ marginBottom: '10px' }} onClick={() => {
          setAddMoreUserOpen(OperateEnum.add);
        }}>添加成员</Button>
        <List
          itemLayout="horizontal"
          dataSource={talk?.userList?.filter(item => item.type === '0')}
          renderItem={(item, index) => (
            <List.Item
              onClick={() => {
                setSelectTalkUser(item);
              }}
              style={{ cursor: 'pointer', backgroundColor: selectTalkUser?.talkUserId === item.talkUserId ? '#f0f0f0' : '' }}
            >
              <List.Item.Meta
                avatar={<div style={{ marginLeft: '5px' }}>
                  <Avatar style={{ backgroundColor: '#2b87db', verticalAlign: 'middle' }} size="large"
                          src={item.userInfo.avatar}>{item.userInfo.nickName}</Avatar>
                </div>}
                title={<div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{item.userInfo.nickName}</span>
                  <span>
                    {item.talkUserId === talk?.userList[0].talkUserId && <Tag color={'#108ee9'}>群主</Tag>}
                    {item.type === '0' && <Tag color={'#108ee9'}>前</Tag>}
                    {item.type === '1' && <Tag color={'#108ee9'}>后</Tag>}
                  </span>

                </div>}
                description={<div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div className="mmm-ellipsis">{item.userInfo.remarks}</div>
                  {userInfo?.accountId == talk?.userList[0].userId &&
                    <span>
                    {item.talkUserId !== talk?.userList[0].talkUserId && selectTalkUser?.talkUserId === item.talkUserId
                      && <Tag color={'#108ee9'}><RetweetOutlined onClick={() => {
                        transferGroupOwnerFn();
                      }} /></Tag>}
                      {selectTalkUser?.talkUserId === item.talkUserId &&
                        <Tag color={'#108ee9'}><DeleteOutlined
                          onClick={() => {
                            kickOutGroupFn();
                          }}
                        /></Tag>}
                  </span>
                  }
                </div>}
              />
            </List.Item>
          )}
        />
      </div>),
    },
    // {
    //   key: '2',
    //   label: '应用',
    //   children: 'Content of Tab Pane 2',
    // },
  ];

  useEffect(() => {
    initData();
  }, []);

  return (
    <div className={'mmm-bgcolor'}>
      <Card>
        <div>
          <Form
            name="basic"
            form={form}

            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="群名称"
              name="title"
              rules={[{ required: true, message: '请输入群名称' }]}
            >
              <Input onChange={(e) => {
                setTitle(e.target.value);
                updateGroupNameApi({ talkId, title: e.target.value });
              }} />
            </Form.Item>
          </Form>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />

        </div>
      </Card>
      <Drawer open={addMoreUserOpen !== OperateEnum.close}
              width={'800px'}
              onClose={() => setAddMoreUserOpen(OperateEnum.close)}
              destroyOnClose={true}
      >
        <AddMoreUser
          talkId={talkId}
          close={() => setAddMoreUserOpen(OperateEnum.close)}
          excludeUserIds={talk?.userList?.map(item => item.userInfo.id)}
        ></AddMoreUser>
      </Drawer>

    </div>

  );
};

export default GroupSetting;

