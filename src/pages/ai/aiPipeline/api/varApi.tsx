import apiClient from '@/api/apiClient.ts';
import { AiPipelinePointDetailVo, AiPipelinePointVarDetailVo } from './ApiBo';
import { Page, Rst } from '@/utils/baseBo.ts';
import { OptionVo } from '@/utils/DicVo.ts';

const base = '/devops-server';

export async function aiPipelinePointVarSaveApi(data: AiPipelinePointVarDetailVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/aiPipelinePointVar/insert`, data });
}

export async function aiPipelinePointVarUpdateApi(data: AiPipelinePointVarDetailVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/aiPipelinePointVar/update`, data });
}

export async function aiPipelinePointVarDeleteApi(data: { aiPipelinePointVarId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/aiPipelinePointVar/del`, data });
}

export async function aiPipelinePointVarAddSonApi(data: { aiPipelinePointVarId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/aiPipelinePointVar/insertSon`, data });
}

// 查询详情
export async function aiPipelinePointVarGetOneApi(data: { aiPipelinePointVarId: number }) {
  return apiClient.post<Rst<AiPipelinePointVarDetailVo>>({ url: `${base}/aiPipelinePointVar/getOne`, data });
}

// page
export async function aiPipelinePointVarPageApi(data: AiPipelinePointVarDetailVo) {
  return apiClient.post<Rst<Page<AiPipelinePointVarDetailVo>>>({ url: `${base}/aiPipelinePointVar/getPage`, data });
}

export async function getInputAllByPointApi(data: { aiPipelinePointId: number }) {
  return apiClient.post<Rst<OptionVo[]>>({ url: `${base}/aiPipelinePointVar/getInputAllByPoint`, data });
}

export async function getTextStartVarJsonSign(data: { aiPipelineId: number }) {
  return apiClient.post<Rst<AiPipelinePointVarDetailVo[]>>({ url: `${base}/aiPipelinePointVar/getTextStartVarJsonSign`, data });
}

export async function aiTextTest(data: { aiPipelineId: number, map: any }) {
  return apiClient.post<Rst<AiPipelinePointDetailVo[]>>({ url: `${base}/aiPipelinePointVar/aiTextTest`, data });
}
