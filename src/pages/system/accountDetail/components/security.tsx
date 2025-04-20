import React, { useEffect, useState } from 'react';
import { Drawer, List } from 'antd';
import { OperateEnum } from '@/utils/enum.ts';
import { getNullBo } from '@/utils/utils.ts';
import { accountSelfApi } from '@/pages/system/account/accountApi.tsx';
import UpdatePassword from '@/pages/system/accountDetail/components/updatePassword.tsx';
import { UserInfo } from '#/entity.ts';

type Unpacked<T> = T extends (infer U)[] ? U : T;

const passwordStrength = {
  strong: <span className="strong">强</span>,
  medium: <span className="medium">中</span>,
  weak: <span className="weak">弱 Weak</span>,
};

const SecurityView: React.FC = () => {
  const [addOrUpdateModal, setAddOrUpdateModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [detail, setDetailFn] = useState<UserInfo>(getNullBo);

  const getData = () => [
    {
      title: '账户密码',
      description: (
        <>

        </>
      ),
      // description: (
      //     <>
      //         当前密码强度：
      //         {passwordStrength[detail.passwordStrength]}
      //     </>
      // ),
      actions: [<a key="Modify" onClick={() => {
        setAddOrUpdateModalFn(OperateEnum.edit);
      }}>修改</a>],
    },
    // {
    //   title: '密保手机',
    //   description: `已绑定手机：138****8293`,
    //   actions: [<a key="Modify">修改</a>],
    // },
  ];

  const data = getData();
  const initMyDataFn = async () => {
    let bo = await accountSelfApi();
    setDetailFn(bo.data.user);
  };


  useEffect(() => {
    initMyDataFn();
    return () => {
    };
  }, []); // 第二个参数表示依赖项

  return (
    <>
      <List<Unpacked<typeof data>>
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
      <Drawer
        title={'修改密码'}
        open={addOrUpdateModal !== OperateEnum.close}
        width={'50%'}
        destroyOnClose={true}
        maskClosable={false}
        onClose={() => setAddOrUpdateModalFn(OperateEnum.close)}
        footer={null}
      >
        <div>
          <UpdatePassword operateEnum={addOrUpdateModal}
                          setAddOrUpdateModalFn={setAddOrUpdateModalFn}
          />
        </div>
      </Drawer>
    </>
  );
};

export default SecurityView;
