import { DocDetailVo, DocListVo, DocVo } from './ApiBo';
import apiClient from '@/api/apiClient.ts';
import { Page, Rst } from '@/utils/baseBo.ts';

const base = '/devops-server';

export async function docSaveApi(data: DocVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/doc/insert`, data });
}


export async function docUpdateApi(data: DocVo) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/doc/update`, data });

}

export async function docDeleteApi(data: { docId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/doc/del`, data });
}

// 查询详情
export async function docGetOneApi(data: { docId: number }) {
  return apiClient.post<Rst<DocDetailVo>>({ url: `${base}/doc/getOne`, data });
}

// page
export async function docPageApi(data: DocVo) {
  return apiClient.post<Rst<Page<DocListVo>>>({ url: `${base}/doc/getPage`, data });
}

export async function docAllApi(data: DocVo) {
  return apiClient.post<Rst<DocListVo[]>>({ url: `${base}/doc/getAll`, data });
}
            