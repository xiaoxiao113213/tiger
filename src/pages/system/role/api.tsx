import apiClient from '@/api/apiClient.ts';
import { R_BO, R_List, R_Page, Rst } from '@/utils/baseBo.ts';
import { RoleDetailVo, RoleListVo, RoleVo } from './ApiBo';

const base = '/devops-server/b';

export async function roleSaveApi(data: RoleVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/role/insert`, data });
}

export async function roleUpdateApi(data: RoleVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/role/update`, data });
}

export async function roleDeleteApi(data: { id: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/role/del`, data });
}

// 查询详情
export async function roleGetOneApi(data: { id: number }) {
  return apiClient.post<R_BO<RoleDetailVo>>({ url: `${base}/role/getOne`, data });
}

// page
export async function rolePageApi(data: RoleVo) {
  return apiClient.post<R_Page<RoleListVo>>({ url: `${base}/role/getPage`, data });
}

export async function roleAllApi(data: RoleVo) {
  return apiClient.post<R_List<RoleListVo>>({ url: `${base}/role/getAll`, data });
}

export async function roleUpdateDisabledApi(data: RoleVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/role/updateDisabled`, data });
}