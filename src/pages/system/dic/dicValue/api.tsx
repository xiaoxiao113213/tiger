import apiClient from '@/api/apiClient.ts';
import { R_BO, R_List, R_Page, Rst } from '@/utils/baseBo.ts';
import { DicValueDetailVo, DicValueListVo, DicValueVo } from './ApiBo';

const base = '/devops-server/b';

export async function dicValueSaveApi(data: DicValueVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/dicValue/insert`, data });
}

export async function dicValueUpdateApi(data: DicValueVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/dicValue/update`, data });
}

export async function dicValueDeleteApi(data: { id: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/dicValue/del`, data });
}

// 查询详情
export async function dicValueGetOneApi(data: { id: number }) {
  return apiClient.post<R_BO<DicValueDetailVo>>({ url: `${base}/dicValue/getOne`, data });
}

// page
export async function dicValuePageApi(data: DicValueVo) {
  return apiClient.post<R_Page<DicValueListVo>>({ url: `${base}/dicValue/getPage`, data });
}

export async function dicValueAllApi(data: DicValueVo) {
  return apiClient.post<R_List<DicValueListVo>>({ url: `${base}/dicValue/getAll`, data });
}
            