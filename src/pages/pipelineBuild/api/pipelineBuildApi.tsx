import apiClient from '@/api/apiClient.ts';
import { Page, Rst } from '@/utils/baseBo.ts';
import { PipelineBuildBo } from '@/pages/pipeline/pipeline/api/bo.tsx';
import { AccountItemBo } from '@/pages/system/account/ApiBo.ts';


const base = '/devops-server';


// 下架
export async function pipelineBuildSaveApi(data: PipelineBuildBo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/pipelineBuild/insert`, data });
}


export async function pipelineBuildDeleteApi(data: AccountItemBo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/pipelineBuild/del`, data });
}


export async function pipelineBuildUpdateApi(data: PipelineBuildBo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/pipelineBuild/update`, data });
}

// 查询详情
export async function pipelineBuildGetOneApi(data: { id: number }) {
  return apiClient.post<Rst<PipelineBuildBo>>({ url: `${base}/pipelineBuild/getOne`, data });
}

// page
export async function pipelineBuildPageApi(data: any) {
  return apiClient.post<Rst<Page<PipelineBuildBo>>>({ url: `${base}/pipelineBuild/getPage`, data });
}

export async function pipelineBuildAllApi(data: any) {
  return apiClient.post<Rst<PipelineBuildBo[]>>({ url: `${base}/pipelineBuild/getAll`, data });
}

export async function pipelineBuildStopApi(data: { id: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/pipelineBuild/stop`, data });
}

export async function pipelineBuildApi(data: any) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/pipelineBuild/build`, data });
}

