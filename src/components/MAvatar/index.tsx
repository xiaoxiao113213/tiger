import React from 'react';
import { Avatar } from 'antd';

const Index = (props: {
  avatar?: string,
  nickName?: string,
  // 类型 0个人对话  1群聊 2应用通知
  type: string,
  // 单聊的时候，对方的id  群聊的时候，是群id 应用通知的时候，是应用id
  targetId: number,
  size?: string
}) => {
  let avatar = props.avatar;
  if (props.type === '1') {
    avatar = '/icons/群聊.svg';
  } else if (props.type === '2') {
    avatar = '/icons/应用聊天.svg';
  }
  // 先不做点击头像的功能

  return (

    <Avatar.Group shape="circle">
      {/*<Tooltip trigger={'click'}*/}
      {/*         overlayClassName={'mmm-custom-tooltip'}*/}
      {/*         title={<div>*/}
      {/*           <Descriptions*/}
      {/*             items={[*/}
      {/*               { key: 'NickName', label: '昵称', children: props.nickName },*/}
      {/*             ]} />*/}
      {/*         </div>} placement={'rightTop'}*/}
      {/*>*/}
      <Avatar
        className={'mmm-hover-pointer'}
        style={{ backgroundColor: '#6fb3f1', verticalAlign: 'middle' }}
        size={props.size ?? 'large'}
        src={avatar}
      >
        {props.nickName}
      </Avatar>

      {/*</Tooltip>*/}
    </Avatar.Group>

  );
};

export default Index;