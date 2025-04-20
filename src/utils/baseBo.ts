// @ts-ignore
/* eslint-disable */

import { DicVo } from '@/utils/DicVo.ts';

export type Rst<T> = {
  timer: number;
  code: number;
  msg: string;
  data: T;
};


export type Page<T> = {
  list: T[];
  pageNum: number;
  pageSize: number;
  pages: number;
  total: number;
}

export type fileUploadVo = {
  'fullPath': string,
  'fileKey': string,
  'fileName': string,
  'size': number,
  'suffix': string,
  'sort': number
  mimeType: string
}
export type AccountVo = {
  'id': number,
  'account': string,
  nickName: string,
  'email': string,
  'phone': number,
  'avatar': string,
  'disabled': number,
  'roleList': RoleListVo[],
  'deptList': DeptVo[]

}

export type RoleListVo = {
  'id': number,
  'name': string,
  'code': string,
}

export type DeptVo = {
  'id': number,
  'name': string,
  'disabled': number,
  'parentId': number
}


export interface DicMap {
  [key: string | number]: DicVo;
}


