import apiClient from '@/api/apiClient.ts';
import { TalkMsgDetailVo, TalkMsgListVo, TalkMsgVo } from './TalkMsgApiBo.ts';
import { fileUploadVo, Rst } from '@/utils/baseBo.ts';

const base = '/devops-server';

export async function talkMsgSaveApi(data: { talkId: number, text?: string, type: string, file?: fileUploadVo }) {
  return apiClient.post<Rst<number>>({ url: `${base}/talkMsg/insert`, data });
}

export async function talkMsgUpdateApi(data: TalkMsgVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/talkMsg/update`, data });
}

export async function talkMsgDeleteApi(data: { talkMsgId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/talkMsg/del`, data });
}

// 查询详情
export async function talkMsgGetOneApi(data: { talkMsgId: number }) {
  return apiClient.post<Rst<TalkMsgDetailVo>>({ url: `${base}/talkMsg/getOne`, data });
}

// page
export async function talkMsgPageApi(data: any) {
  return apiClient.post<Rst<TalkMsgListVo[]>>({ url: `${base}/talkMsg/getPage`, data });
}

export async function talkMsgAllApi(data: TalkMsgVo) {
  return apiClient.post<Rst<TalkMsgListVo[]>>({ url: `${base}/talkMsg/getAll`, data });
}

export async function clearMsgApi(data: { talkId: number }) {
  return apiClient.post<Rst<TalkMsgListVo[]>>({ url: `${base}/talkMsg/clearMsg`, data });
}

export async function delTalkApi(data: { talkId: number }) {
  return apiClient.post<Rst<TalkMsgListVo[]>>({ url: `${base}/talkMsg/delTalk`, data });
}

export async function getTotalUnReadApi() {
  return apiClient.post<Rst<number>>({ url: `${base}/talkMsg/getTotalUnRead` });
}
