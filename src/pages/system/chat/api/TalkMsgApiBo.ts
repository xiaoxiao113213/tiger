export type TalkMsgVo = {
  talkMsgId: number;
  talkId: number;
  status: string;
  type: string;
  sourceId: number;
  targetId: number;
  createTime: string;
  readTime: string;
  deleteFlag: number;
  deleteTime: string;
  text: string;
  file: string;
};


export type TalkMsgDetailVo = {
  talkMsgId: number;
  talkId: number;
  status: string;
  type: string;
  sourceId: number;
  targetId: number;
  createTime: string;
  readTime: string;
  deleteFlag: number;
  deleteTime: string;
  text: string;
  file: string;
};

export type TalkMsgListVo = {
  talkMsgId: number;
  talkId: number;
  status: string;
  type: string;
  sourceId: number;
  targetId: number;
  createTime: string;
  readTime: string;
  deleteFlag: number;
  deleteTime: string;
  text: string;
  file: string;
  sourceAvatar: string;
  sourceNickName: string;
  sourceType: string;
};

export enum MsgTypeEnum {
  Text = '0',
  File = '1',
  System = '2',
}
