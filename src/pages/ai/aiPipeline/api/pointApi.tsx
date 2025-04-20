import apiClient from '@/api/apiClient.ts';
import { AiPipelinePointDetailVo } from './ApiBo';
import { Page, Rst } from '@/utils/baseBo.ts';

const base = '/devops-server';

export async function aiPipelinePointSaveApi(data: AiPipelinePointDetailVo) {
  return apiClient.post<Rst<AiPipelinePointDetailVo>>({ url: `${base}/aiPipelinePoint/insert`, data });
}

export async function aiPipelinePointUpdateApi(data: AiPipelinePointDetailVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/aiPipelinePoint/update`, data });
}

export async function aiPipelinePointDeleteApi(data: { aiPipelinePointId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/aiPipelinePoint/del`, data });
}

// 查询详情
export async function aiPipelinePointGetOneApi(data: { aiPipelinePointId: number }) {
  return apiClient.post<Rst<AiPipelinePointDetailVo>>({ url: `${base}/aiPipelinePoint/getOne`, data });
}

// page
export async function aiPipelinePointPageApi(data: AiPipelinePointDetailVo) {
  return apiClient.post<Rst<Page<AiPipelinePointDetailVo>>>({ url: `${base}/aiPipelinePoint/getPage`, data });
}

export async function aiPipelinePointAllApi(data: AiPipelinePointDetailVo) {
  return apiClient.post<Rst<AiPipelinePointDetailVo[]>>({ url: `${base}/aiPipelinePoint/getAll`, data });
}

export async function updatePositionApi(data: {
  aiPipelinePointId: number,
  x: number,
  y: number,
}) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/aiPipelinePoint/updatePosition`, data });
}
