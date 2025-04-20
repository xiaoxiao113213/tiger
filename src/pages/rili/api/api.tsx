import apiClient from '@/api/apiClient.ts';
import { RiliDetailVo, RiliListVo, RiliVo } from './ApiBo';
import { Rst } from '@/utils/baseBo.ts';

const base = '/devops-server';

export async function riliSaveApi(data: RiliVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/rili/insert`, data });
}

export async function riliUpdateApi(data: RiliVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/rili/update`, data });
}

export async function riliDeleteApi(data: { riliId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/rili/del`, data });
}

// 查询详情
export async function riliGetOneApi(data: { riliId: number }) {
  return apiClient.post<Rst<RiliDetailVo>>({ url: `${base}/rili/getOne`, data });
}


export async function riliAllApi(data: RiliVo) {
  return apiClient.post<Rst<RiliListVo[]>>({ url: `${base}/rili/getAll`, data });
}
            