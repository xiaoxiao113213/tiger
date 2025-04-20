import apiClient from '@/api/apiClient.ts';
import { TalkDetailVo, TalkListVo, TalkUserListVo, TalkVo } from './ApiBo';
import { Page, Rst } from '@/utils/baseBo.ts';

const base = '/devops-server';

export async function talkSaveApi(data: { type: string, title: string, userIds: number[] }) {
  return apiClient.post<Rst<number>>({ url: `${base}/talk/insert`, data });
}

export async function addGroupUser(data: { talkId: number, userIds: number[] }) {
  return apiClient.post<Rst<number>>({ url: `${base}/talk/addGroupUser`, data });
}

export async function transferGroupOwner(data: { talkId: number, userId: number }) {
  return apiClient.post<Rst<number>>({ url: `${base}/talk/transferGroupOwner`, data });
}

export async function kickOutGroupApi(data: { talkId: number, userId: number }) {
  return apiClient.post<Rst<number>>({ url: `${base}/talk/kickOutGroup`, data });
}

export async function exitGroupApi(data: { talkId: number }) {
  return apiClient.post<Rst<number>>({ url: `${base}/talk/exitGroup`, data });
}

export async function updateGroupNameApi(data: { talkId: number, title: string }) {
  return apiClient.post <Rst<undefined>>({ url: `${base}/talk/updateGroupName`, data });
}

export async function talkDeleteApi(data: { talkId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/talk/del`, data });
}

// 查询详情
export async function talkGetOneApi(data: { talkId: number }) {
  return apiClient.post<Rst<TalkDetailVo>>({ url: `${base}/talk/getOne`, data });
}

// page
export async function talkPageApi(data: TalkVo) {
  return apiClient.post<Rst<Page<TalkListVo>>>({ url: `${base}/talk/getPage`, data });
}

export async function talkAllApi(data: any) {
  return apiClient.post<Rst<TalkUserListVo[]>>({ url: `${base}/talk/getAll`, data });
}
            