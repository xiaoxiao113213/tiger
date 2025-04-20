import apiClient from '@/api/apiClient.ts';
import { ProjectCustomFieldVo, ProjectDetailVo } from './ApiBo';
import { Page, Rst } from '@/utils/baseBo.ts';
import { DicVo } from '@/utils/DicVo.ts';

const base = '/devops-server';

export async function projectSaveApi(data: ProjectDetailVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/project/insert`, data });
}

export async function projectUpdateApi(data: ProjectDetailVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/project/update`, data });
}

export async function projectDeleteApi(data: { projectId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/project/del`, data });
}

// 查询详情
export async function projectGetOneApi(data: { projectId: number }) {
  return apiClient.post<Rst<ProjectDetailVo>>({ url: `${base}/project/getOne`, data });
}

// page
export async function projectPageApi(data: ProjectDetailVo) {
  return apiClient.post<Rst<Page<ProjectDetailVo>>>({ url: `${base}/project/getPage`, data });
}

export async function projectAllApi(data: ProjectDetailVo) {
  return apiClient.post<Rst<DicVo[]>>({ url: `${base}/project/getAll`, data });
}

export async function projectCustomFieldAllApi(data: ProjectCustomFieldVo) {
  return apiClient.post<Rst<ProjectCustomFieldVo[]>>({ url: `${base}/projectCustomField/getAll`, data });
}

export async function projectCustomFieldSaveApi(data: { bizType: string, list: ProjectCustomFieldVo[] }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/projectCustomField/insert`, data });
}

export async function projectPermissionUpdateApi(data: {
  bizType: number;
  bizTypeId: number;
  accountIds: number[];
  roleIds: number[];
  deptIds: number[];
}) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/projectPermission/update`, data });
}

export async function projectPermissionGetApi(data: { bizType: number, bizTypeId: number }) {
  return apiClient.post<Rst<{ accountIds: number[]; roleIds: number[]; deptIds: number[] }>>({ url: `${base}/projectPermission/getOne`, data });
}