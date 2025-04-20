import apiClient from '@/api/apiClient.ts';
import { ProjectIssueDetailVo, ProjectIssueListVo, ProjectIssueVo } from './ApiBo';
import { Page, Rst } from '@/utils/baseBo.ts';
import { DicVo } from '@/utils/DicVo.ts';

const base = '/devops-server';

export async function projectIssueSaveApi(data: ProjectIssueVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/projectIssue/insert`, data });
}

export async function projectIssueUpdateApi(data: ProjectIssueVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/projectIssue/update`, data });
}

export async function projectIssueDeleteApi(data: { projectIssueId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/projectIssue/del`, data });
}

// 查询详情
export async function projectIssueGetOneApi(data: { projectIssueId: number }) {
  return apiClient.post<Rst<ProjectIssueDetailVo>>({ url: `${base}/projectIssue/getOne`, data });
}

// page
export async function projectIssuePageApi(data: ProjectIssueVo) {
  return apiClient.post<Rst<Page<ProjectIssueListVo>>>({ url: `${base}/projectIssue/getPage`, data });
}

export async function projectIssueListForReleaseApi(data: ProjectIssueVo) {
  return apiClient.post<Rst<ProjectIssueListVo[]>>({ url: `${base}/projectIssue/getListForRelease`, data });
}

export async function projectIssueDicApi(data: ProjectIssueVo) {
  return apiClient.post<Rst<DicVo[]>>({ url: `${base}/projectIssue/getDic`, data });
}

export async function projectIssueUpdateStatusApi(data: { projectIssueId: number, status: string }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/projectIssue/updateStatus`, data });
}

export async function projectIssueUpdateStatusSortApi(data: { projectIssueId: number, status: string, preProjectIssueId?: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/projectIssue/updateStatusSort`, data });
}

export async function projectIssueHeadUserListApi(data: { projectReleaseId: number }) {
  return apiClient.post<Rst<DicVo[]>>({ url: `${base}/projectIssue/getHeadUserList`, data });
}
