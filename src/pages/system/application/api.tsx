import apiClient from '@/api/apiClient.ts';
import { R_BO, R_List, R_Page, Rst } from '@/utils/baseBo.ts';
import { ApplicationDetailVo, ApplicationListVo, ApplicationVo } from './ApiBo';

const base = '/devops-server/b';

export async function applicationSaveApi(data: ApplicationVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/application/insert`, data });
}

export async function applicationUpdateApi(data: ApplicationVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/application/update`, data });
}

export async function applicationDeleteApi(data: { id: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/application/del`, data });
}

// 查询详情
export async function applicationGetOneApi(data: { id: number }) {
  return apiClient.post<R_BO<ApplicationDetailVo>>({ url: `${base}/application/getOne`, data });
}

// page
export async function applicationPageApi(data: ApplicationVo) {
  return apiClient.post<R_Page<ApplicationListVo>>({ url: `${base}/application/getPage`, data });
}

export async function applicationAllApi(data: ApplicationVo) {
  return apiClient.post<R_List<ApplicationListVo>>({ url: `${base}/application/getAll`, data });
}
            