import { DatabaseBoardDetailVo, DatabaseBoardListVo, DatabaseBoardVo } from './ApiBo';
import apiClient from '@/api/apiClient.ts';
import { Page, Rst } from '@/utils/baseBo.ts';

const base = '/devops-server';

export async function databaseBoardSaveApi(data: DatabaseBoardVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/databaseBoard/insert`, data });

}

export async function databaseBoardUpdateApi(data: DatabaseBoardVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/databaseBoard/update`, data });
}

export async function databaseBoardDeleteApi(data: { databaseBoardId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/databaseBoard/del`, data });
}

// 查询详情
export async function databaseBoardGetOneApi(data: { databaseBoardId: number }) {
  return apiClient.post<Rst<DatabaseBoardDetailVo>>({ url: `${base}/databaseBoard/getOne`, data });

}

// page
export async function databaseBoardPageApi(data: DatabaseBoardVo) {
  return apiClient.post<Rst<Page<DatabaseBoardListVo>>>({ url: `${base}/databaseBoard/getPage`, data });
}

export async function databaseBoardAllApi(data: DatabaseBoardVo) {
  return apiClient.post<Rst<DatabaseBoardListVo[]>>({ url: `${base}/databaseBoard/getAll`, data });
}

export async function getDatabaseNameList(data: { databaseConfigId: number }) {
  return apiClient.post<Rst<string[]>>({ url: `${base}/databaseBoard/getDatabaseNameList`, data });
}

export async function syncDatabaseBoard(data: {
  databaseBoardId: number,
  databaseConfigId: number,
  databaseName: string,
  pointx: number,
  pointy: number,
}) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/databaseBoard/syncDatabaseBoard`, data });

}

export async function compareDatabaseBoard(data: {
  databaseBoardId: number,
  databaseConfigId: number,
  databaseName: string,
}) {
  return apiClient.post<Rst<string>>({ url: `${base}/databaseBoard/compare`, data });
}


export async function copyBoardApi(data: { databaseBoardId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/databaseBoard/copyBoard`, data });
}

