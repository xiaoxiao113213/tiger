import apiClient from '@/api/apiClient.ts';
import { Rst } from '@/utils/baseBo.ts';


const base = '/devops-server';

export async function getDocTreeDetailApi(data: { docTreeId: number }): Promise<Rst<DocTreeVo>> {
  return apiClient.post<Rst<DocTreeVo>>({ url: `${base}/docTree/getOne`, data });

}

export async function getDocTreeListApi(data: { docId: number, docTreeId?: number }) {
  return apiClient.post<Rst<DocTreeVo>>({ url: `${base}/docTree/getAllTree`, data });
}

// 返回值是 docTreeId
export async function addDocTreeApi(data: { docId: number, parentId: number, name: string, type: number }) {
  return apiClient.post<Rst<number>>({ url: `${base}/docTree/insert`, data });
}

export async function delDocTreeApi(data: { docTreeId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/docTree/del`, data });
}

export async function existDocTreeApi(data: { docId: number, docTreeId: number }) {
  return apiClient.post<Rst<DocTreeExistVo>>({ url: `${base}/docTree/exitsDocTree`, data });
}


export async function updateDocTreeNameApi(data: { docTreeId: number, name: string }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/docTree/updateName`, data });
}

export async function updateTreeLocationApi(data: { docTreeId: number, preNodeId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/docTree/updateLocation`, data });
}

export async function updateLocationToFirstApi(data: { docTreeId: number, newParentId: number }) {
  return apiClient.post<Rst<undefined>>({ url: `${base}/docTree/updateLocationToFirst`, data });
}


export async function getDocTreeContentApi(data: { docTreeId: number }) {
  return apiClient.post<Rst<DocTreeContentDetailVo>>({ url: `${base}/docTreeContent/getOne`, data });
}

export async function updateDocTreeContentApi(data: { docTreeId: number, content: string }) {
  return apiClient.post<Rst<DocTreeContentDetailVo>>({ url: `${base}/docTreeContent/update`, data });
}


export type DocTreeListVo = {
  docTreeId: number;
  docId: number;
  name: string;
  parentId: number;
  parentPath: string;
  sort: number;
  children: DocTreeListVo[];
  type: number;
};
export type DocTreeVo = {
  selectTree?: DocSelectTreeVo;
  list: DocTreeListVo[];

};
export type DocSelectTreeVo = {
  docTreeId: number;
  docId: number;
  name: string;
  parentId: number;
  parentPath: string;
  sort: number;
  type: number;
};


export type DocTreeContentDetailVo = {
  createTime: string;
  createBy: number;
  updateTime: string;
  updateBy: number;
  deleteFlag: number;
  docId: number;
  docTreeId: number;
  content: string;
};
export type DocTreeExistVo = {
  exist: boolean;
  docTreeId?: number;

};
