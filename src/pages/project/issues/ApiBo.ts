import { fileUploadVo } from '@/utils/baseBo.ts';
import { Dayjs } from 'dayjs';
import { ProjectCustomFieldVo } from '@/pages/project/project/ApiBo.ts';

export type ProjectIssueVo = {
  projectIssueId: number;
  projectId: number;
  projectReleaseId: number;
  type: string;
  name: string;
  status: string;
  planStartDate: string;
  planEndDate: string;
  startDate: string;
  endDate: string;
  remarks: string;
  headUserId: number;
  reporterUserId: number;
  priority: number;
  createBy: number;
  createTime: string;
  deleteFlag: number;
  sort: number;
  fileList: fileUploadVo[];
};


export type ProjectIssueDetailVo = {
  projectIssueId: number;
  projectId: number;
  projectReleaseId: number;
  type: string;
  name: string;
  status: string;
  planStartDate?: string | Dayjs;
  planEndDate?: string | Dayjs;
  startDate?: string | Dayjs;
  endDate?: string | Dayjs;
  remarks: string | Dayjs;
  headUserId: number;
  reporterUserId?: number;
  priority: number;
  createBy: number;
  createTime: string;
  deleteFlag: number;
  sort: number;
  fileList?: fileUploadVo[];
  customValues?: object;
  customFieldList?: ProjectCustomFieldVo[];
};

export type ProjectIssueListVo = {
  projectIssueId: number;
  projectId: number;
  projectReleaseId: number;
  type: string;
  name: string;
  status: string;
  planStartDate: string;
  planEndDate: string;
  startDate: string;
  endDate: string;
  remarks: string;
  headUserId: number;
  reporterUserId: number;
  priority: number;
  createBy: number;
  createTime: string;
  deleteFlag: number;
  sort: number;
  fileList: fileUploadVo[];
};

