import { PipelineNodeDetailVo, PipelineNodeListVo, PipelineNodeVo } from './ApiBo';

import apiClient from '@/api/apiClient.ts';
import { Page, Rst } from '@/utils/baseBo.ts';

const base = '/devops-server';


export async function pipelineNodeSaveApi(data: PipelineNodeVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/pipelineNode/insert`, data });
}

export async function pipelineNodeUpdateApi(data: PipelineNodeVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/pipelineNode/update`, data });
}

export async function pipelineNodeDeleteApi(data: { id: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/pipelineNode/del`, data });
}

// 查询详情
export async function pipelineNodeGetOneApi(data: { id: number }) {
  return apiClient.post<Rst<PipelineNodeDetailVo>>({ url: `${base}/pipelineNode/getOne`, data });
}

// page
export async function pipelineNodePageApi(data: PipelineNodeVo) {
  return apiClient.post<Rst<Page<PipelineNodeListVo>>>({ url: `${base}/pipelineNode/getPage`, data });
}

export async function pipelineNodeAllApi(data: PipelineNodeVo | any) {
  return apiClient.post<Rst<PipelineNodeListVo[]>>({ url: `${base}/pipelineNode/getAll`, data });
}
            