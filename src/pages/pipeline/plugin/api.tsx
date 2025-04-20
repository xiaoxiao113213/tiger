import { PipelineParamBo, PipelinePluginDetailVo, PipelinePluginListVo, PipelinePluginVo } from './ApiBo';
import apiClient from '@/api/apiClient.ts';
import { Page, Rst } from '@/utils/baseBo.ts';
import { PipelinePluginDetailBo } from '@/pages/pipeline/pipeline/api/bo.tsx';

const base = '/devops-server';

export async function pipeline_pluginSaveApi(data: PipelinePluginVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/pipelinePlugin/insert`, data });
}

export async function pipeline_pluginUpdateApi(data: PipelinePluginVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/pipelinePlugin/update`, data });
}

export async function pipeline_pluginDeleteApi(data: { id: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/pipelinePlugin/del`, data });
}

// 查询详情
export async function pipeline_pluginGetOneApi(data: { id: number }) {
  return apiClient.post<Rst<PipelinePluginDetailVo>>({ url: `${base}/pipelinePlugin/getOne`, data });
}

// page
export async function pipeline_pluginPageApi(data: PipelinePluginVo) {
  return apiClient.post<Rst<Page<PipelinePluginListVo>>>({ url: `${base}/pipelinePlugin/getPage`, data });
}

export async function pipeline_pluginAllApi(data: PipelinePluginVo) {
  return apiClient.post<Rst<PipelinePluginDetailVo[]>>({ url: `${base}/pipelinePlugin/getAll`, data });
}


export async function pipelinePluginDetailAllApi(data: any) {
  return apiClient.post<Rst<PipelinePluginDetailVo[]>>({ url: `${base}/pipelinePluginDetail/getAll`, data });
}

export async function pipelinePluginDetailGetOneApi(data: { pipelinePluginDetailId: number }) {
  return apiClient.post<Rst<PipelinePluginDetailVo>>({ url: `${base}/pipelinePluginDetail/getOne`, data });
}

export async function pipelinePluginDetailGlobalParamApi(data: number[]) {
  return apiClient.post<Rst<PipelineParamBo[]>>({ url: `${base}/pipelinePluginDetail/getGlobalParamListByDetailId`, data });
}

export async function pipelinePluginAllApi(data: any) {
  return apiClient.post<Rst<PipelinePluginDetailBo[]>>({ url: `${base}/pipelinePlugin/getAll`, data });

}