import apiClient from '@/api/apiClient.ts';
import { Rst } from '@/utils/baseBo.ts';


const base = '/devops-server';

// export async function docSaveApi(data: DocVo) {
//     return request<R>(`${base}/doc/insert`, {
//         method: 'POST',
//         data
//     });
// }
//
// export async function docUpdateApi(data: DocVo) {
//     return request<R>(`${base}/doc/update`, {
//         method: 'POST',
//         data
//     });
// }


export async function docGetOneApi(data: { docId: number }) {
  return apiClient.post<Rst<DocDetailVo>>({ url: `${base}/doc/getOne`, data });
}

export type DocDetailVo = {
  docId: number;
  name: string;
  remarks: string;
  createTime: string;
  createBy: number;
  updateTime: string;
  updateBy: number;
  deleteFlag: number;
};
