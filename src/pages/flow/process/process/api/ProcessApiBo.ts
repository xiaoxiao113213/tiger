import { ProcessPointFormFieldVo } from '@/pages/flow/process/process/api/ProcessPointFormFieldApiBo.ts';

export type ProcessVo = {
  processId: number;
  name: string;
  version: number;
  processVersionId: number;
  disabled: number;
  createTime: string;
  createBy: number;
  updateTime: string;
  updateBy: number;
  deleteFlag: number;
};


export type ProcessDetailVo = {
  processId: number;
  name: string;
  version: number;
  processVersionId: number;
  disabled: number;
  createTime: string;
  createBy: number;
  updateTime: string;
  updateBy: number;
  deleteFlag: number;
  remarks: string;
};

export type ProcessListVo = {
  processId: number;
  name: string;
  version: number;
  processVersionId: number;
  disabled: number;
  createTime: string;
  createBy: number;
  updateTime: string;
  updateBy: number;
  deleteFlag: number;
  remarks: string;
};


export type ProcessVersionDetailVo = {
  processVersionId: number;
  processId: number;
  name: string;
  version: number;
  flagSubmit: string;
  deptIds: number[];
  userIds: number[];
  fieldList: ProcessPointFormFieldVo[];

};