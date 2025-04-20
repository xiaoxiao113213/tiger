import { TableDetailVo, TableListBordVo, TableListVo, TableVo } from './ApiBo';
import { TableFieldListVo } from '@/pages/database/databaseBoard/api/tableField/ApiBo';
import apiClient from '@/api/apiClient.ts';
import { Page, Rst } from '@/utils/baseBo.ts';

const base = '/devops-server';

export async function tableSaveApi(data: TableVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/table/insert`, data });
}

export async function tableSaveNewApi(data: TableVo | any) {
  return apiClient.post<Rst<TableDetailVo>>({ url: `${base}/table/insertNew`, data });
}

export async function tableSaveListApi(data: TableVo[]) {
  return apiClient.post<Rst<number>>({ url: `${base}/table/insertList`, data });
}

export async function tableSaveDefaultFieldListApi(data: { databaseBoardId: number, fieldList: TableFieldListVo[] }) {
  return apiClient.post<Rst<number>>({ url: `${base}/table/insertDefaultField`, data });
}

export async function tableUpdateApi(data: TableVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/table/update`, data });
}

export async function tableUpdateLocationApi(data: any) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/table/updateLocation`, data });
}

export async function tableBatchUpdateColorApi(data: any) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/table/batchUpdateColor`, data });
}

export async function tableUpdateGroupApi(data: { comboTableId: number, tableIds: number[] }[]) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/table/updateGroup`, data });
}

export async function tableDeleteApi(data: { tableId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/table/del`, data });
}

export async function tableCopyApi(data: { tableId: number }) {
  return apiClient.post<Rst<number>>({ url: `${base}/table/copyTable`, data });
}

// 查询详情
export async function tableGetOneApi(data: { tableId: number }) {
  return apiClient.post<Rst<TableDetailVo>>({ url: `${base}/table/getOne`, data });
}

// page
export async function tablePageApi(data: TableVo) {
  return apiClient.post<Rst<Page<TableListVo>>>({ url: `${base}/table/getPage`, data });
}

export async function tableAllApi(data: TableVo) {
  return apiClient.post<Rst<TableListBordVo>>({ url: `${base}/table/getAll`, data });
}

export async function tableDDlApi(data: TableVo) {
  return apiClient.post<Rst<string>>({ url: `${base}/table/getDDL`, data });
}

export async function tableDDlByIdApi(data: { tableId: number }) {
  return apiClient.post<Rst<string>>({ url: `${base}/table/getDDLByTableId`, data });
}

export async function getDefaultFieldListApi(data: { databaseBoardId: number }) {
  return apiClient.post<Rst<TableFieldListVo[]>>({ url: `${base}/table/getDefaultField`, data });
}

// 添加连线
export async function tableAddLineApi(data: any) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/databaseBoardEdge/insert`, data });
}

export async function tableDelLineApi(data: any) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/databaseBoardEdge/del`, data });
}
