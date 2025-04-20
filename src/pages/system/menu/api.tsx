import apiClient from '@/api/apiClient.ts';
import { R_BO, R_List, R_Page, Rst } from '@/utils/baseBo.ts';
import { ModuleDetailVo, ModuleListVo, ModuleVo } from './ApiBo';

const base = '/devops-server/b';

export async function moduleSaveApi(data: ModuleVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/module/insert`, data });
}

export async function moduleUpdateApi(data: ModuleVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/module/update`, data });
}

export async function moduleDeleteApi(data: { id: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/module/del`, data });
}

// 查询详情
export async function moduleGetOneApi(data: { id: number }) {
  return apiClient.post<R_BO<ModuleDetailVo>>({ url: `${base}/module/getOne`, data });
}

// page
export async function modulePageApi(data: ModuleVo) {
  return apiClient.post<R_Page<ModuleListVo>>({ url: `${base}/module/getPage`, data });
}

export async function moduleAllApi(data: ModuleVo) {
  return apiClient.post<R_List<ModuleListVo>>({ url: `${base}/module/getAll`, data });
}

export async function menuApplicationTreeApi(
  data: { applicationId?: number },
) {
  return apiClient.post<R_List<ModuleListVo>>({ url: `${base}/module/getApplicationTree`, data });
}
