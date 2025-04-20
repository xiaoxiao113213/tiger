import { TableFieldDetailVo, TableFieldListVo, TableFieldVo } from './ApiBo';
import apiClient from '@/api/apiClient.ts';
import { Page, Rst } from '@/utils/baseBo.ts';

const base = '/devops-server';

export async function tableFieldSaveApi(data: TableFieldVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/tableField/insert`, data });
}

export async function tableFieldUpdateApi(data: TableFieldVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/tableField/update`, data });
}

export async function tableFieldDeleteApi(data: { tableFieldId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/tableField/del`, data });
}

// 查询详情
export async function tableFieldGetOneApi(data: { tableFieldId: number }) {
  return apiClient.post<Rst<TableFieldDetailVo>>({ url: `${base}/tableField/getOne`, data });
}

// page
export async function tableFieldPageApi(data: TableFieldVo) {
  return apiClient.post<Rst<Page<TableFieldListVo>>>({ url: `${base}/tableField/getPage`, data });
}

export async function tableFieldAllApi(data: TableFieldVo) {
  return apiClient.post<Rst<TableFieldListVo[]>>({ url: `${base}/tableField/getAll`, data });
}
            