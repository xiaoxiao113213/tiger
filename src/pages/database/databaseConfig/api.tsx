import apiClient from '@/api/apiClient.ts';


import { DatabaseConfigDetailVo, DatabaseConfigListVo, DatabaseConfigVo } from './ApiBo';
import { R_BO, R_List, R_Page, Rst } from '@/utils/baseBo.ts';

const base = '/devops-server';

export async function databaseConfigSaveApi(data: DatabaseConfigVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/databaseConfig/insert`, data });
}

export async function databaseConfigUpdateApi(data: DatabaseConfigVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/databaseConfig/update`, data });

}

export async function databaseConfigDeleteApi(data: { databaseConfigId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/databaseConfig/del`, data });
}

// 查询详情
export async function databaseConfigGetOneApi(data: { databaseConfigId: number }) {
  return apiClient.post<R_BO<DatabaseConfigDetailVo>>({ url: `${base}/databaseConfig/getOne`, data });
}

// page
export async function databaseConfigPageApi(data: DatabaseConfigVo) {
  return apiClient.post<R_Page<DatabaseConfigListVo>>({ url: `${base}/databaseConfig/getPage`, data });
}

export async function databaseConfigAllApi(data: DatabaseConfigVo) {
  return apiClient.post<R_List<DatabaseConfigListVo>>({ url: `${base}/databaseConfig/getAll`, data });
}
            