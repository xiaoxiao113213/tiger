import { AccountCacheVo } from '@/pages/system/account/ApiBo.ts';
import { ApplicationCacheVo } from '@/pages/system/application/ApiBo.ts';

export type TalkVo = {
  talkId: number;
  type: string;
  createBy: number;
  createTime: string;
  deleteFlag: number;
  title: string;
};


export type TalkDetailVo = {
  talkId: number;
  type: string;
  createBy: number;
  createTime: string;
  deleteFlag: number;
  title: string;
  userList: TalkUserDetailVo[];
};
export type TalkUserDetailVo = {

  talkUserId: number;
  talkId: number;
  type: string;
  userId: number;
  showIs: string;
  userInfo: AccountCacheVo;
  applicationInfo: ApplicationCacheVo
}


export type TalkListVo = {
  talkId: number;
  type: string;
  createBy: number;
  createTime: string;
  deleteFlag: number;
  title: string;
};

export type TalkUserListVo = {
  talkUserId: number;
  talkId: number;
  type: string;
  userId: number;
  showIs: string;
  //
  title: string; //对话标题  个人对话的时候，是对方的昵称  应用对话的时候，是应用的名称
  // 类型 0个人对话  1群聊 2应用通知
  talkType: string;
  // 单聊的时候，对方的id  群聊的时候，是群id 应用通知的时候，是应用id
  targetId: number;
  targetAvatar: string;
  // 类型 0text  1file
  itemType: string;
  text: string;
  unReadCount: number;

};
