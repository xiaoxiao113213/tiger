import { AccountVo } from '@/utils/baseBo.ts';

export type ProcessInstanceVo = {
  processInstanceId: number;
  processId: number;
  processVersionId: number;
  title: string;
  status: number;
  processPointId: number;
  processPointName: string;
  createTime: string;
  createBy: number;
  updateTime: string;
  updateBy: number;
  deleteFlag: number;
  endTime: string;
};


export type ProcessInstanceDetailVo = {
  processInstanceId: number;
  processId: number;
  processVersionId: number;
  title: string;
  status: number;
  processPointId: number;
  processPointName: string;
  createTime: string;
  createBy: number;
  updateTime: string;
  updateBy: number;
  deleteFlag: number;
  endTime: string;
  createByAccount: AccountVo;
  pointList: ProcessInstancePointDetailVo[];
  pointFormList: ProcessInstancePointFormDetailVo[];
  pointFieldList: ProcessInstancePointFormFieldDetailVo[];
  relationList: ProcessInstancePointRelationDetailVo[];
  approvalPeopleList: ProcessInstanceApprovalPeopleDetailVo[];
};

export type ProcessInstanceListVo = {
  processInstanceId: number;
  processId: number;
  processVersionId: number;
  title: string;
  status: number;
  processPointId: number;
  processPointName: string;
  createTime: string;
  createBy: number;
  updateTime: string;
  updateBy: number;
  deleteFlag: number;
  endTime: string;
};

export type ProcessInstancePointDetailVo = {
  processInstancePointId: number;
  processInstanceId: number;
  name: string;
  type: string;
  approveCondition: number;
  pipelineId: number;
  pipelinePassCondition: number;
  script: string;
  roleIds: string;
  deptIds: string;
  userIds: string;
  remarks: string;
  status: string;
  endTime: string;
  children: ProcessInstanceApprovalPeopleDetailVo[];
};
export type ProcessInstanceApprovalPeopleDetailVo = {
  processInstanceApprovalPeopleId: number;
  processInstancePointId: number;
  processInstanceId: number;
  status: string;
  reason: string;
  endTime: string;
  accountId: number;
  deptIds: string;
  roleIds: string;
  accountVo: AccountVo;
};

export type ProcessInstancePointFormDetailVo = {
  processInstancePointFormId: number;
  processInstanceId: number;
  name: string;
  code: string;
  processInstancePointId: number;
};
export type ProcessInstancePointFormFieldDetailVo = {
  processInstancePointFormFieldId: number;
  processInstanceId: number;
  processInstancePointFormId: number;
  name: string;
  keyName: string;
  type: number;
  optional: string;
  value: string;
  desc: string;
  editFlag: number;
  notNull: number;
  sort: number;
  processInstancePointId: number;
  dateType: number;
  unit: string;
};
export type ProcessInstancePointRelationDetailVo = {
  processInstancePointRelationId: number;
  processInstanceId: number;
  source: number;
  target: number;
};