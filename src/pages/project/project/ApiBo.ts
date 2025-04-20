import { fileUploadVo } from '@/utils/baseBo.ts';
import { Dayjs } from 'dayjs';
import { AccountCacheVo } from '@/pages/system/account/ApiBo.ts';

export enum projectStatusEnum {
  // 未开始
  NotStarted = '0',
  // 进行中
  Underway = '1',
  // 已完成
  Completed = '2',
  // 已关闭
  Closed = '3',
}

export const projectStatusDic = [
  { value: '0', label: '未开始' },
  { value: '1', label: '进行中' },
  { value: '2', label: '已完成' },
  { value: '3', label: '已关闭' },
];


export type ProjectDetailVo = {
  projectId: number;
  type: number;
  name: string;
  code: string;
  status: string;
  planStartDate?: string | Dayjs;
  planEndDate?: string | Dayjs;
  startDate?: string | Dayjs;
  endDate?: string | Dayjs;
  remarks?: string;
  headUserId?: number;
  reporterUserId?: number;
  createBy: number;
  createTime: string;
  deleteFlag: number;
  fileList: fileUploadVo[];
  createByAccount?: AccountCacheVo;
  headUser?: AccountCacheVo;
  reporterUser?: AccountCacheVo;
  customValues?: object;
  customFieldList?: ProjectCustomFieldVo[];

};

export type ProjectCustomFieldVo = {
  projectCustomFieldId: number;
  bizType: string;
  name: string;
  keyName: string;
  type: number;
  optional: string;
  value: string;
  desc: string;
  notNull: number;
  dateType: number;
  unit: string;
  sort: number;
  deleteFlag: number;
};