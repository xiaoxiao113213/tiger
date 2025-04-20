import { ProcessPointDetailVo, ProcessPointListVo, ProcessPointVo } from './PointApiBo';
import apiClient from '@/api/apiClient.ts';
import { Page, Rst } from '@/utils/baseBo.ts';

const base = '/devops-server';

export async function processPointSaveApi(data: ProcessPointVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/processPoint/insert`, data });
}

export async function processPointSaveEndApi(data: ProcessPointVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/processPoint/insertEnd`, data });
}

export async function processPointUpdateApi(data: ProcessPointVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/processPoint/updatePointName`, data });
}

export async function processPointDeleteApi(data: { processPointId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/processPoint/del`, data });
}

// 查询详情
export async function processPointGetOneApi(data: { processPointId: number }) {
  return apiClient.post<Rst<ProcessPointDetailVo>>({ url: `${base}/processPoint/getOne`, data });
}

// page
export async function processPointPageApi(data: ProcessPointVo) {
  return apiClient.post<Rst<Page<ProcessPointListVo>>>({ url: `${base}/processPoint/getPage`, data });
}

export async function processPointAllApi(data: ProcessPointVo) {
  return apiClient.post<Rst<ProcessPointListVo[]>>({ url: `${base}/processPoint/getAll`, data });
}
            