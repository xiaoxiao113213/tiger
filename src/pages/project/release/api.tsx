import apiClient from '@/api/apiClient.ts';
import { ProjectReleaseDetailVo } from './ApiBo';
import { Page, Rst } from '@/utils/baseBo.ts';
import { DicVo } from '@/utils/DicVo.ts';

const base = '/devops-server';

export async function projectReleaseSaveApi(data: ProjectReleaseDetailVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/projectRelease/insert`, data });
}

export async function projectReleaseUpdateApi(data: ProjectReleaseDetailVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/projectRelease/update`, data });
}

export async function projectReleaseDeleteApi(data: { projectReleaseId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/projectRelease/del`, data });
}

export async function projectReleaseUpdateStatusApi(data: { projectReleaseId: number, status: string }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/projectRelease/updateStatus`, data });
}

// 查询详情
export async function projectReleaseGetOneApi(data: { projectReleaseId: number }) {
  return apiClient.post<Rst<ProjectReleaseDetailVo>>({ url: `${base}/projectRelease/getOne`, data });
}

// page
export async function projectReleasePageApi(data: ProjectReleaseDetailVo) {
  return apiClient.post<Rst<Page<ProjectReleaseDetailVo>>>({ url: `${base}/projectRelease/getPage`, data });
}

export async function projectReleaseAllApi(data: ProjectReleaseDetailVo) {
  return apiClient.post<Rst<DicVo[]>>({ url: `${base}/projectRelease/getAll`, data });
}
            