import apiClient from '@/api/apiClient.ts';

import { ProcessInstanceDetailVo, ProcessInstanceListVo, ProcessInstanceVo } from './ApiBo';
import { Page, Rst } from '@/utils/baseBo.ts';

const base = '/devops-server';

export async function processInstanceSaveApi(data: ProcessInstanceVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/processInstance/insert`, data });
}

export async function processMySubmitApi(data: any) {
  return apiClient.post<Rst<Page<ProcessInstanceListVo>>>({ url: `${base}/processInstance/mySubmit`, data });
}

export async function listOfPendingApprovals(data: any) {
  return apiClient.post<Rst<Page<ProcessInstanceListVo>>>({ url: `${base}/processInstance/listOfPendingApprovals`, data });
}

export async function listOfApprovals(data: any) {
  return apiClient.post<Rst<Page<ProcessInstanceListVo>>>({ url: `${base}/processInstance/listOfApprovals`, data });
}


export async function processInstanceUpdateApi(data: ProcessInstanceVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/processInstance/update`, data });
}

export async function processInstanceDeleteApi(data: { processInstanceId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/processInstance/revoke`, data });
}

// 查询详情
export async function processInstanceGetOneApi(data: { processInstanceId: number }) {
  return apiClient.post<Rst<ProcessInstanceDetailVo>>({ url: `${base}/processInstance/getOne`, data });
}

// page
export async function processInstancePageApi(data: ProcessInstanceVo) {
  return apiClient.post<Rst<Page<ProcessInstanceListVo>>>({ url: `${base}/processInstance/getPage`, data });
}

export async function processInstanceAllApi(data: ProcessInstanceVo) {
  return apiClient.post<Rst<ProcessInstanceListVo[]>>({ url: `${base}/processInstance/getAll`, data });
}

export async function approvalApi(data: { processInstanceApprovalPeopleId: number | string, status: string, reason?: string }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/processInstance/approval`, data });
}
