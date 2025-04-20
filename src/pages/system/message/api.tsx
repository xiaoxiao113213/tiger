import apiClient from '@/api/apiClient.ts';
import { MessageDetailVo, MessageListVo, MessageVo } from './ApiBo';
import { Page, Rst } from '@/utils/baseBo.ts';

const base = '/devops-server/b';

export async function messageSaveApi(data: MessageVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/message/insert`, data });
}

export async function messageUpdateApi(data: MessageVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/message/update`, data });
}

export async function messageUpdateReadApi(data: MessageVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/message/updateRead`, data });
}

export async function messageDeleteApi(data: { messageId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/message/del`, data });
}

// 查询详情
export async function messageGetOneApi(data: { messageId: number }) {
  return apiClient.post<Rst<MessageDetailVo>>({ url: `${base}/message/getOne`, data });
}

// page
export async function messagePageApi(data: MessageVo) {
  return apiClient.post<Rst<Page<MessageListVo>>>({ url: `${base}/message/getPage`, data });
}

export async function messageAllApi(data: MessageVo) {
  return apiClient.post<Rst<MessageListVo[]>>({ url: `${base}/message/getAll`, data });
}
            