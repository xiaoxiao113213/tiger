import apiClient from '@/api/apiClient.ts';
import { Page, Rst } from '@/utils/baseBo.ts';
import { PipelineBo } from '@/pages/pipeline/pipeline/api/bo.tsx';
import { AccountItemBo } from '@/pages/system/account/ApiBo.ts';

const base = '/devops-server';


// 下架
export async function pipelineSaveApi(data: PipelineBo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/pipeline/insert`, data });
}

export async function pipelineUpdateDisabledApi(data: { id: number, disabled: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/pipeline/disabled`, data });
}

export async function pipelineDeleteApi(data: AccountItemBo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/pipeline/del`, data });
}


export async function pipelineUpdateApi(data: PipelineBo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/pipeline/update`, data });
}
export async function pipelineUpdateOtherApi(data: PipelineBo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/pipeline/updateOtherSetting`, data });
}

// 查询详情
export async function pipelineGetOneApi(data: { id: number }) {
  return apiClient.post<Rst<PipelineBo>>({ url: `${base}/pipeline/getOne`, data });
}

// page
export async function pipelinePageApi(data: any) {
  return apiClient.post<Rst<Page<PipelineBo>>>({ url: `${base}/pipeline/getPage`, data });
}

export async function pipelineAllApi(data: any) {
  return apiClient.post<Rst<PipelineBo[]>>({ url: `${base}/pipeline/getAll`, data });
}

export async function pipelinePermissionUpdateApi(data: {
  projectId: number;
  accountIds: number[];
  roleIds: number[];
  deptIds: number[];
}) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/pipelinePermission/update`, data });
}

export async function pipelinePermissionGetApi(data: { projectId: number }) {
  return apiClient.post<Rst<{ accountIds: number[]; roleIds: number[]; deptIds: number[] }>>({ url: `${base}/pipelinePermission/getOne`, data });
}