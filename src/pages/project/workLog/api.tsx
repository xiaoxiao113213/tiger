import apiClient from '@/api/apiClient.ts';
import { WorkLogDetailVo } from './ApiBo';
import { Page, Rst } from '@/utils/baseBo.ts';

const base = '/devops-server';

export async function workLogSaveApi(data: WorkLogDetailVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/workLog/insert`, data });
}

export async function workLogUpdateApi(data: WorkLogDetailVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/workLog/update`, data });
}

export async function workLogDeleteApi(data: { workLogId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/workLog/del`, data });
}

// 查询详情
export async function workLogGetOneApi(data: { workLogId: number }) {
  return apiClient.post<Rst<WorkLogDetailVo>>({ url: `${base}/workLog/getOne`, data });
}

// page
export async function workLogPageApi(data: WorkLogDetailVo) {
  return apiClient.post<Rst<Page<WorkLogDetailVo>>>({ url: `${base}/workLog/getPage`, data });
}

export async function workLogAllApi(data: { startDay: string, endDay: string, createBy?: number }) {
  return apiClient.post<Rst<WorkLogDetailVo[]>>({ url: `${base}/workLog/getAll`, data });
}
            