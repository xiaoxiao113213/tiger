import apiClient from '@/api/apiClient.ts';
import { R_BO, R_List, R_Page, Rst } from '@/utils/baseBo.ts';
import { SystemConfigDetailVo, SystemConfigListVo, SystemConfigVo } from './ApiBo';

const base = '/devops-server/b';

export async function systemConfigSaveApi(data: SystemConfigVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/systemConfig/insert`, data });
}

export async function systemConfigUpdateApi(data: SystemConfigVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/systemConfig/update`, data });
}

export async function systemConfigDeleteApi(data: { id: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/systemConfig/del`, data });
}

// 查询详情
export async function systemConfigGetOneApi(data: { id: number }) {
  return apiClient.post<R_BO<SystemConfigDetailVo>>({ url: `${base}/systemConfig/getOne`, data });
}

// page
export async function systemConfigPageApi(data: SystemConfigVo) {
  return apiClient.post<R_Page<SystemConfigListVo>>({ url: `${base}/systemConfig/getPage`, data });
}

export async function systemConfigAllApi(data: SystemConfigVo) {
  return apiClient.post<R_List<SystemConfigListVo>>({ url: `${base}/systemConfig/getAll`, data });
}


export async function systemConfigByKeyPublic(key: string) {
  return apiClient.post<R_List<SystemConfigListVo>>({ url: `/devops-server/public/biz/getValueByKey`, data: { key } });

}
