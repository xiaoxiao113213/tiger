import apiClient from '@/api/apiClient.ts';
import { fileUploadVo, Page, Rst } from '@/utils/baseBo.ts';

const base = '/devops-server';

export async function aiChatMsgSaveApi(data: AiChatMsgDetailVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/aiChatMsg/insert`, data });
}

export async function aiChatMsgUpdateApi(data: AiChatMsgDetailVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/aiChatMsg/update`, data });
}

export async function aiChatMsgDeleteApi(data: { aiChatMsgId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/aiChatMsg/del`, data });
}

// 查询详情
export async function aiChatMsgGetOneApi(data: { aiChatMsgId: number }) {
  return apiClient.post<Rst<AiChatMsgDetailVo>>({ url: `${base}/aiChatMsg/getOne`, data });
}

// page
export async function aiChatMsgPageApi(data: AiChatMsgDetailVo) {
  return apiClient.post<Rst<Page<AiChatMsgDetailVo>>>({ url: `${base}/aiChatMsg/getPage`, data });
}

export async function aiChatMsgAllApi(data: AiChatMsgDetailVo) {
  return apiClient.post<Rst<AiChatMsgDetailVo[]>>({ url: `${base}/aiChatMsg/getAll`, data });
}

export async function clearMsgApi(data: { aiChatId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/aiChatMsg/clear`, data });
}

export type AiChatMsgDetailVo = {
  aiChatMsgId: number;
  aiChatId: number;
  type: string;
  createTime: string;
  deleteFlag: number;
  deleteTime: string;
  text: string;
  file: fileUploadVo[];
  bizType: string;
  bizId: number;
  status: string;
};
