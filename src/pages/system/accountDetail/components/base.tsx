import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Descriptions, Form, message, Upload } from 'antd';

import { queryCurrent } from '../service';
import './style.css';

import { ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { AccountItemBo } from '@/pages/system/account/ApiBo.ts';
import { accountUpdateSelfApi } from '@/pages/system/account/accountApi.tsx';
import { getUserToken } from '@/store/userStore.ts';
import { UserInfo } from '#/entity.ts';
import { UploadAvatar } from '@/components/upload/upload-avatar';
import { oFormatForm } from '@/utils/utils.ts';


// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ oldKey, setNewKeyFn }: { oldKey: string, setNewKeyFn: (key: string) => void }) => {
  const [url, setUrlFn] = useState('');
  const onChange = ({ file, fileList }) => {
    if (file.status !== 'uploading') {
      // console.log("1111", file, fileList);
      if (file?.response?.data?.fileKey) {
        let newUrl = file?.response?.data?.fullPath;
        setUrlFn(newUrl);
        setNewKeyFn(file?.response?.data?.fileKey);
      }
    }
  };


  useEffect(() => {
    // 在组件挂载或更新后执行操作
    // console.log(oldKey)
    setUrlFn(oldKey);
    return () => {
      // 在组件卸载前执行清理操作
    };
  }, []); // 第二个参数表示依赖项

  return (
    <>
      <div>头像</div>
      <div>
        <img src={url} alt="avatar" />
      </div>
      <Upload showUploadList={false} action={import.meta.env.VITE_APP_BASE_API + '/devops-server/b/fileStore/upload/0/0'}
              headers={{ 'Authorization': getUserToken()?.accessToken ?? '' }}
              onChange={onChange}
      >
        <div>
          <Button>
            <UploadOutlined />
            更换头像
          </Button>
        </div>
      </Upload>
    </>
  );
};

const BaseView: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserInfo>();

  const [avatarKey, setAvatarKeyFn] = useState();
  const [formRef] = Form.useForm<AccountItemBo>();
  const setNewKeyFn = (newKey: string) => {
    setAvatarKeyFn(newKey);
  };

  const handleFinish = async () => {
    const isPass = await formRef.validateFields().catch(() => false);
    if (!isPass) return;

    const values = await formRef?.getFieldsValue();
    oFormatForm(values);
    if (avatarKey) {
      values.avatar = avatarKey;
    }
    let res = await accountUpdateSelfApi({ ...values });
    if (res?.code !== 1000) return;
    message.success(res?.msg);

  };
  const initMyDataFn = async () => {
    const rst = await queryCurrent();
    setCurrentUser(rst.data.user);
    formRef.setFieldsValue(rst.data.user);
    console.log('data', rst.data.user);
  };
  useEffect(() => {
    initMyDataFn();
    return () => {
    };
  }, []);


  return (
    <div>
      <>
        <div>
          <Descriptions items={[
            {
              key: '4',
              label: '角色',
              children: <p>{currentUser?.roles.map((item) => item.name + '   /   ')}</p>,
            },
          ]}
          style={{ marginBottom: 32 }}
          />
          <ProForm
            form={formRef}
            layout="vertical"
            onFinish={handleFinish}
            submitter={{
              resetButtonProps: {
                style: {
                  display: 'none',
                },
              },
              submitButtonProps: {
                children: '更新基本信息',
              },
            }}
            initialValues={{
              ...currentUser,
            }}
            requiredMark={false}
          >
            <ProFormText
              width="md"
              name="account"
              label="账号"
              disabled={true}
              rules={[
                {
                  required: true,
                  message: '请输入您的账号!',
                },
              ]}
            />
            <ProFormText
              width="md"
              name="nickName"
              label="昵称"
              rules={[
                {
                  required: true,
                  message: '请输入您的昵称!',
                },
              ]}
            />
            <ProFormText
              width="md"
              name="email"
              label="邮箱"
              rules={[
                {
                  required: true,
                  message: '请输入您的邮箱!',
                },
              ]}
            />
            <ProFormText
              width="md"
              name="phone"
              label="手机号"
              rules={[
                {
                  required: true,
                  message: '请输入您的手机号',
                },
              ]}
            />
            <ProFormTextArea
              name="remarks"
              label="个人简介"
              rules={[
                {
                  required: false,
                  message: '请输入个人简介!',
                },
              ]}
              placeholder="个人简介"
            />
            <div>
              <UploadAvatar defaultAvatar={currentUser?.avatar} setNewKeyFn={setNewKeyFn} />
            </div>
          </ProForm>
        </div>

      </>

    </div>
  );
};

export default BaseView;
