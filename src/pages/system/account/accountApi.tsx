import apiClient from '@/api/apiClient.ts';
import { fileUploadVo, Page, Rst } from '@/utils/baseBo.ts';
import { DicVo } from '@/utils/DicVo.ts';
import { AccountCacheVo, AccountItemBo, bizTypeEnum } from '@/pages/system/account/ApiBo.ts';
import { LoginInfo } from '#/entity.ts';


const base = '/devops-server/b';

// 下架
export async function accountSaveApi(data: {}) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/account/insert`, data });
}

export async function accountUpdateDisabledApi(data: {}) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/account/updateDisabled`, data });
}

export async function accountDeleteApi(data: {}) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/account/del`, data });
}

export async function restPasswordByAdminApi(data: {}) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/account/updatePasswordByAdmin`, data });
}


export async function accountUpdateApi(data: {}) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/account/update`, data });
}

export async function accountUpdateSelfApi(data: {}) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/account/updateBySelf`, data });
}

export async function accountUpdatePasswordSelfApi(data: {}) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/account/updatePasswordSelf`, data });
}

// 查询详情
export async function accountGetOneApi(data: { id: number }) {
  return apiClient.post<Rst<AccountItemBo>>({ url: `${base}/account/getOne`, data });
}

export async function accountSelfApi() {
  return apiClient.post<Rst<LoginInfo>>({ url: `${base}/systemVit/getUserInfo` });
}

// page
export async function accountPageApi(
  data: {},
) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/account/getPage`, data });
}

export async function accountAllApi(
  data: {},
) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/account/getAll`, data });
}

export async function getAllRoleAndPermission(
  data: {},
) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/account/getAllRoleAndPermission`, data });
}

export async function getAllRoleAndPermissionByRole(data: number[]) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/account/getAllRoleAndPermissionByRole`, data });
}

export async function getMyMenuList() {
  return apiClient.post<Rst<undefined>>({ url: `${base}/system/getMenuList` });
}

export async function getAccountDic() {
  return apiClient.post<Rst<DicVo[]>>({ url: `${base}/account/accountDic` });
}

export async function getSelectUser(data: { type?: number, nickName?: string, pageNum?: number, pageSize?: number, excludeUserIds?: number[] }) {
  return apiClient.post<Rst<Page<AccountCacheVo>>>({ url: `${base}/account/getSelectUser`, data });
}

export async function uploadFileApi(data: FormData, bizType: bizTypeEnum, bizId: number): Promise<Rst<fileUploadVo>> {
  return apiClient.request({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: 'POST',
    url: `${base}/fileStore/upload/${bizType}/${bizId}`,
    data,
  });
}


export async function loginOutApi() {
  return apiClient.post<Rst<undefined>>({ url: `${base}/systemVit/outLogin` });
}

export async function getUserInfoBySsoCodeApi(data: { ssoCode: string }) {
  return apiClient.post<Rst<LoginInfo>>({ url: `${base}/systemVit/getUserInfoBySsoCode`, data });
}

