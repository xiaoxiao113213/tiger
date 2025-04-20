import apiClient from '@/api/apiClient.ts';
import { TaskDetailVo, TaskListVo, TaskVo } from './ApiBo';
import { Page, Rst } from '@/utils/baseBo.ts';

const base = '/devops-server';

export async function taskSaveApi(data: TaskVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/task/insert`, data });
}

export async function taskUpdateApi(data: TaskVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/task/update`, data });
}

export async function taskDeleteApi(data: { taskId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/task/del`, data });
}

// 查询详情
export async function taskGetOneApi(data: { taskId: number }) {
  return apiClient.post<Rst<TaskDetailVo>>({ url: `${base}/task/getOne`, data });
}

// page
export async function taskPageApi(data: TaskVo) {
  return apiClient.post<Rst<Page<TaskListVo>>>({ url: `${base}/task/getPage`, data });
}

export async function taskAllApi(data: TaskVo) {
  return apiClient.post<Rst<TaskListVo[]>>({ url: `${base}/task/getAll`, data });
}

export async function updateSortApi(data: { previousId: number | string, taskId: number | string }) {
  return apiClient.post<Rst<TaskListVo[]>>({ url: `${base}/task/updateSort`, data });
}
