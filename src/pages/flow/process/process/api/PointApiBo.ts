export type ProcessPointRVo = {
  nodes: ProcessPointVo[];
  edges: ProcessPointRelationVo[];

};
export type ProcessPointVo = {
  processPointId: number;
  processId: number;
  processVersionId: number;
  name: string;
  type: string;
  approveCondition: number;
  pipelineId: number;
  pipelinePassCondition: number;
  script: string;
  userIds: number[];
  deptIds: number[];
  roleIds: number[];
  remarks: string;
};


export type ProcessPointDetailVo = {
  processPointId: number;
  processId: number;
  processVersionId: number;
  name: string;
  type: string;
  approveCondition: number;
  pipelineId: number;
  pipelinePassCondition: number;
  script: string;

};

export type ProcessPointListVo = {
  processPointId: number;
  processId: number;
  processVersionId: number;
  name: string;
  type: string;
  approveCondition: number;
  pipelineId: number;
  pipelinePassCondition: number;
  script: string;
};

export type ProcessPointRelationVo = {
  processPointRelationId: number;
  processId: number;
  processVersionId: number;
  source: number;
  target: number;
};