import apiClient from '@/api/apiClient.ts';
import { AccountVo, Page, Rst } from '@/utils/baseBo.ts';

const base = '/devops-server';

export async function machineTaskSaveApi(data: MachineTaskDetailVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/machineTask/insert`, data });
}

export async function machineTaskUpdateApi(data: MachineTaskDetailVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/machineTask/update`, data });
}

export async function machineTaskDeleteApi(data: { machineTaskId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/machineTask/del`, data });
}

// 查询详情
export async function machineTaskGetOneApi(data: { machineTaskId: number }) {
  return apiClient.post<Rst<MachineTaskDetailVo>>({ url: `${base}/machineTask/getOne`, data });
}

// page
export async function machineTaskPageApi(data: MachineTaskDetailVo) {
  return apiClient.post<Rst<Page<MachineTaskDetailVo>>>({ url: `${base}/machineTask/getPage`, data });
}

export async function machineTaskAllApi(data: MachineTaskDetailVo) {
  return apiClient.post<Rst<MachineTaskDetailVo[]>>({ url: `${base}/machineTask/getAll`, data });
}


export type MachineTaskDetailVo = {
  machineTaskId: number;
  machineId: number;
  type: string;
  createBy: number;
  createTime: string;
  deleteFlag: number;
  remotePath: string;
  localPath: string;
  localZipPath: string;
  errorLog: string;
  endTime: string;

  startTime: string,
  isFile: number,
  status: string,
  createByAccount: AccountVo
};