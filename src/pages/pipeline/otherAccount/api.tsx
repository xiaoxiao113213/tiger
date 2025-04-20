import { OtherAccountDetailVo, OtherAccountListVo, OtherAccountVo } from './ApiBo';
import apiClient from '@/api/apiClient.ts';
import { Page, Rst } from '@/utils/baseBo.ts';

const base = '/devops-server';

export async function otherAccountSaveApi(data: OtherAccountVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/otherAccount/insert`, data });
}

export async function otherAccountUpdateApi(data: OtherAccountVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/otherAccount/update`, data });
}

export async function otherAccountDeleteApi(data: { id: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/otherAccount/del`, data });
}

// 查询详情
export async function otherAccountGetOneApi(data: { id: number }) {
  return apiClient.post<Rst<OtherAccountDetailVo>>({ url: `${base}/otherAccount/getOne`, data });
}

// page
export async function otherAccountPageApi(data: OtherAccountVo) {
  return apiClient.post<Rst<Page<OtherAccountListVo>>>({ url: `${base}/otherAccount/getPage`, data });
}

export async function otherAccountAllApi(data: OtherAccountVo | any) {
  return apiClient.post<Rst<OtherAccountListVo[]>>({ url: `${base}/otherAccount/getAll`, data });
}
            