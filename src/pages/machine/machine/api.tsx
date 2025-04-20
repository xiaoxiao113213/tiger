import apiClient from '@/api/apiClient.ts';
import { FileInfoVo, MachineDetailVo } from './ApiBo';
import { Page, Rst } from '@/utils/baseBo.ts';

const base = '/devops-server';

export async function machineSaveApi(data: MachineDetailVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/machine/insert`, data });
}

export async function machineUpdateApi(data: MachineDetailVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/machine/update`, data });
}

export async function machineDeleteApi(data: { machineId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/machine/del`, data });
}

// 查询详情
export async function machineGetOneApi(data: { machineId: number }) {
  return apiClient.post<Rst<MachineDetailVo>>({ url: `${base}/machine/getOne`, data });
}

// page
export async function machinePageApi(data: MachineDetailVo) {
  return apiClient.post<Rst<Page<MachineDetailVo>>>({ url: `${base}/machine/getPage`, data });
}

export async function machineAllApi(data: MachineDetailVo) {
  return apiClient.post<Rst<MachineDetailVo[]>>({ url: `${base}/machine/getAll`, data });
}

export async function getFileList(data: { machineId: number, dir?: string }) {
  return apiClient.post<Rst<FileInfoVo[]>>({ url: `${base}/machine/getFileList`, data });
}
