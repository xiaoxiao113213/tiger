import { fileUploadVo } from '@/utils/baseBo.ts';

export type TaskVo = {
  taskId: number;
  userId: number;
  type: number;
  name: string;
  remarks: string;
  startTime: string;
  endTime: string;
  progress: number;
  dependencies: string;
  createBy: number;
  createTime: string;
  updateBy: number;
  updateTime: string;
  deleteFlag: number;
  sort: number;
  fileList?: fileUploadVo[];
};


export type TaskDetailVo = {
  taskId: number;
  userId: number;
  type: number;
  name: string;
  remarks: string;
  startTime: string;
  endTime: string;
  progress: number;
  dependencies: string;
  createBy: number;
  createTime: string;
  updateBy: number;
  updateTime: string;
  deleteFlag: number;
  sort: number;
  fileList?: fileUploadVo[];
};

export type TaskListVo = {
  taskId: number;
  userId: number;
  type: number;
  name: string;
  remarks: string;
  startTime: string;
  endTime: string;
  progress: number;
  dependencies: string;
  createBy: number;
  createTime: string;
  updateBy: number;
  updateTime: string;
  deleteFlag: number;
  sort: number;
  fileList?: fileUploadVo[];
};

