import apiClient from '@/api/apiClient.ts';
import { Page, Rst } from '@/utils/baseBo.ts';

const base = '/devops-server';

export async function aiChatSaveApi(data: AiChatDetailVo) {
  return apiClient.post<Rst<AiChatDetailVo>>({ url: `${base}/aiChat/insert`, data });
}

export async function aiChatUpdateApi(data: AiChatDetailVo) {
  return apiClient.post<Rst<AiChatDetailVo>>({ url: `${base}/aiChat/update`, data });
}

export async function aiChatDeleteApi(data: { aiChatId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/aiChat/del`, data });
}

// 查询详情
export async function aiChatGetOneApi(data: { aiChatId: number }) {
  return apiClient.post<Rst<AiChatDetailVo>>({ url: `${base}/aiChat/getOne`, data });
}

// page
export async function aiChatPageApi(data: AiChatDetailVo) {
  return apiClient.post<Rst<Page<AiChatDetailVo>>>({ url: `${base}/aiChat/getPage`, data });
}

export async function aiChatAllApi(data: AiChatDetailVo) {
  return apiClient.post<Rst<AiChatDetailVo[]>>({ url: `${base}/aiChat/getAll`, data });
}
export async function addModelChatMsg(data: {
  aiChatId: number;
  type: string;
  text: string;
  file: string;
}) {
  return apiClient.post<Rst<number>>({ url: `${base}/aiChat/addModelChatMsg`, data });
}

export type AiChatDetailVo = {
  aiChatId: number;
  type: string;
  createBy: number;
  createTime: string;
  updateBy: number;
  updateTime: string;
  deleteFlag: number;
  sort: number;
  remarks: string;
  title: string;
};