import apiClient from '@/api/apiClient.ts';
import { AiPipelineDetail1Vo, AiPipelineDetailVo } from './ApiBo.ts';
import { Page, Rst } from '@/utils/baseBo.ts';

const base = '/devops-server';

export async function aiPipelineSaveApi(data: AiPipelineDetailVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/aiPipeline/insert`, data });
}

export async function aiPipelineUpdateApi(data: AiPipelineDetailVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/aiPipeline/update`, data });
}

export async function aiPipelineDeleteApi(data: { aiPipelineId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/aiPipeline/del`, data });
}

// 查询详情
export async function aiPipelineGetOneApi(data: { aiPipelineId: number }) {
  return apiClient.post<Rst<AiPipelineDetailVo>>({ url: `${base}/aiPipeline/getOne`, data });
}

// page
export async function aiPipelinePageApi(data: AiPipelineDetailVo) {
  return apiClient.post<Rst<Page<AiPipelineDetailVo>>>({ url: `${base}/aiPipeline/getPage`, data });
}

export async function aiPipelineAllApi(data: AiPipelineDetailVo) {
  return apiClient.post<Rst<AiPipelineDetailVo[]>>({ url: `${base}/aiPipeline/getAll`, data });
}

export async function getPointAndEdgeApi(data: { aiPipelineId: number }) {
  return apiClient.post<Rst<AiPipelineDetail1Vo>>({ url: `${base}/aiPipeline/getPointAndEdge`, data });
}

export async function delEdgeApi(data: { aiPipelineId: number, source: number, target: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/aiPipeline/delEdge`, data });
}

export async function checkApi(data: { aiPipelineId: number }) {
  return apiClient.post<Rst<{ isPass: boolean, errorMsg: string }>>({ url: `${base}/aiPipeline/check`, data });
}


