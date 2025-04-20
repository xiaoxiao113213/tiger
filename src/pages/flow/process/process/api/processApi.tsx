import { ProcessDetailVo, ProcessListVo, ProcessVersionDetailVo, ProcessVo } from './ProcessApiBo.ts';
import apiClient from '@/api/apiClient.ts';
import { Page, Rst } from '@/utils/baseBo.ts';
import { ProcessPointVo } from '@/pages/flow/process/process/api/PointApiBo.ts';
import { ProcessPointFormFieldVo } from '@/pages/flow/process/process/api/ProcessPointFormFieldApiBo.ts';

const base = '/devops-server';

export async function processSaveApi(data: ProcessVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/process/insert`, data });
}

export async function processUpdateApi(data: ProcessVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/process/update`, data });
}

export async function processDeleteApi(data: { processId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/process/del`, data });
  ;
}

// 查询详情
export async function processGetOneApi(data: { processId: number }) {
  return apiClient.post<Rst<ProcessDetailVo>>({ url: `${base}/process/getOne`, data });
}

// page
export async function processPageApi(data: ProcessVo) {
  return apiClient.post<Rst<Page<ProcessListVo>>>({ url: `${base}/process/getPage`, data });
}

export async function processAllApi(data: ProcessVo) {
  return apiClient.post<Rst<ProcessListVo[]>>({ url: `${base}/process/getAll`, data });
}

export async function getStartSetApi(data: { processPointId: number }) {
  return apiClient.post<Rst<ProcessVersionDetailVo>>({ url: `${base}/process/getStartSet`, data });
}


export async function updateStartSetApi(data: { processPointId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/process/updateStartSet`, data });
}

export async function getPointSetApi(data: { processPointId: number }) {
  return apiClient.post<Rst<ProcessPointVo>>({ url: `${base}/process/getPointSet`, data });
}

export async function updatePointSetApi(data: { processPointId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/process/updatePointSet`, data });
}

export async function getStartFormField(data: { processPointId: number }) {
  return apiClient.post<Rst<ProcessPointFormFieldVo[]>>({ url: `${base}/process/getStartFormField`, data });
}

export async function updatePointScript(data: { processPointId: number, script: { uniqueCode: string, sign: string, rightValue: string } }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/process/updatePointScript`, data });
}

export async function processPublish(data: { processId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/process/publish`, data });
}

//获取个人可用流程
export async function getMyUseProcess() {
  return apiClient.post<Rst<ProcessListVo[]>>({ url: `${base}/process/getUseProcess` });
}

//  获取能够提交的流程
export async function getCanSubmitProcessApi(data: { processId: number }) {
  return apiClient.post<Rst<ProcessVersionDetailVo>>({ url: `${base}/process/getCanSubmitProcess`, data });
}