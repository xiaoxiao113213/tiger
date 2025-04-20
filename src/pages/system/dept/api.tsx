import apiClient from '@/api/apiClient.ts';
import { R_BO, R_List, R_Page, Rst } from '@/utils/baseBo.ts';
import { DeptDetailVo, DeptListVo, DeptVo } from './ApiBo';

const base = '/devops-server/b';

export async function deptSaveApi(data: DeptVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/dept/insert`, data });
}

export async function deptUpdateApi(data: DeptVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/dept/update`, data });
}

export async function deptDeleteApi(data: { id: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/dept/del`, data });
}

// 查询详情
export async function deptGetOneApi(data: { id: number }) {
  return apiClient.post<R_BO<DeptDetailVo>>({ url: `${base}/dept/getOne`, data });
}

// page
export async function deptPageApi(data: DeptVo) {
  return apiClient.post<R_Page<DeptListVo>>({ url: `${base}/dept/getPage`, data });
}
export async function deptPageAndAccountApi(data: DeptVo) {
  return apiClient.post<R_Page<DeptListVo>>({ url: `${base}/dept/getPageAndAccount`, data });
}

export async function deptAllApi(data: DeptVo) {
  return apiClient.post<R_List<DeptListVo>>({ url: `${base}/dept/getAll`, data });
}
            