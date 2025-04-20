import apiClient from '@/api/apiClient.ts';
import { R_BO, R_List, R_Page, Rst } from '@/utils/baseBo.ts';
import { DicDetailVo } from '@/pages/system/dic/ApiBo.ts';
import { DicVo } from '@/utils/DicVo.ts';


const base = '/devops-server/b';

// 下架

// 查询详情
export async function dicSaveApi(data: { id: number }) {
  return apiClient.post<R_Page<DicDetailVo>>({ url: `${base}/dic/insert`, data });
}

export async function dicEditApi(data: DicDetailVo) {
  return apiClient.post<R_Page<DicDetailVo>>({ url: `${base}/dic/update`, data });
}

export async function dicGetOne(data: { id: number }) {
  return apiClient.post<R_BO<DicDetailVo>>({ url: `${base}/dic/getOne`, data });
}

export async function dicDel(data: { id: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/dic/del`, data });
}

export async function dicAll(data: {}) {
  return apiClient.post<R_List<DicDetailVo>>({ url: `${base}/dic/getAll`, data });

}

// page
export async function dicPage(
  data: {},
) {
  return apiClient.post<R_Page<R_Page<DicDetailVo>>>(
    { url: `${base}/dic/getPage`, data },
  );
}

export async function dicValueApi(data: { code: string }) {
  return apiClient.post<R_List<DicVo>>({ url: `${base}/dicValue/getDicValue`, data });
}

