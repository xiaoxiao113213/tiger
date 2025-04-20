import { AccountCacheVo } from '@/pages/system/account/ApiBo.ts';
import { fileUploadVo } from '@/utils/baseBo.ts';

export type RiliVo = {
  riliId: number;
  type: number;
  name: string;
  status: string;
  remarks: string;
  startTime: string;
  endTime: string;
  createBy: number;
  createTime: string;
  deleteFlag: number;
  fileList?: fileUploadVo[];
  userList?: AccountCacheVo[];
  userIds?: number[];
};


export type RiliDetailVo = {
  riliId: number;
  type: number;
  name: string;
  status: string; //状态 0待开始 1进行中  2结束
  remarks: string;
  startTime: string;
  endTime: string;
  createBy: number;
  createTime: string;
  deleteFlag: number;
  fileList?: fileUploadVo[];
  userList?: AccountCacheVo[];
  userIds?: number[];
  commentList: {
    content: string;
    createTime: string;
    createByAccount: AccountCacheVo;
  }[];
};

export type RiliListVo = {
  riliId: number;
  type: number;
  name: string;
  status: string;
  remarks: string;
  startTime: string;
  endTime: string;
  createBy: number;
  createTime: string;
  deleteFlag: number;
  fileList?: fileUploadVo[];
  userList?: AccountCacheVo[];
  userIds?: number[];
  commentList: {
    content: string;
    createTime: string;
    createByAccount: AccountCacheVo;
  }[];
};

