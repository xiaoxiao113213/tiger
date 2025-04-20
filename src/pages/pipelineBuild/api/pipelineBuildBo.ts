export type BuildDetailBo = {
  id: number;
  buildNo: number;
  pipelineId: number;
  name: string;
  buildStartTime: string;
  buildEndTime: string;
  buildStatus: number;
  softIds: number[];
  pipelineNodeId: string;
  pipelineNodeLabel: string;
  dockerFlag: number;
  dockerName: string;
  dockerParam: string;
  parallel: number;
  email: number;
  emailUser: number[];
  createTime: string;
  createBy: number;
  updateTime: string;
  updateBy: number;
  deleteFlag: number;
  workspacePath: string;
  pipelineBuildStageList: PipelineBuildStage[];
  globalParamList: PipelineBuildGlobalParam[];
  permissionList: [];
}


export type PipelineBuildStage = {
  id: number;
  pipelineBuildId: number;
  pipelineId: number;
  name: string;
  buildStartTime: string;
  buildEndTime: string;
  buildStatus: number;
  nodeDefault: number;
  nodeId: number;
  nodeLabel: string;
  dockerFlag: number;
  dockerName: string;
  dockerParam: string;
  parentId: number;
  waitAllParent: number;
  sort: number;
  stepList: PipelineBuildStep[];
  sonStageList: PipelineBuildStage[]; x: number; y: number
}

export type PipelineBuildStep = {
  id: number;
  pipelineId: number;
  pipelineBuildId: number;
  pipelineBuildStageId: number;
  name: string;
  buildStartTime: string;
  buildEndTime: string;
  buildStatus: number;
  pipelinePluginDetailId: number;
  pipelinePluginId: number;
  errorStop: number;
  script: string;
  sort: number;
  paramList: PipelineBuildStepParam[]; x: number; y: number
}
export type PipelineBuildStepParam = {
  id: number;
  pipelineId: number;
  pipelineBuildId: number;
  pipelineBuildStageId: number;
  pipelineBuildStepId: number;
  pipelinePluginDetailId: number;
  pipelinePluginId: number;
  name: string;
  keyName: string;
  type: number;
  optional: string;
  value: string;
  desc: string;
  notNull: number;
}
export type PipelineBuildGlobalParam = {
  id: number;
  pipelineId: number;
  pipelineBuildId: number;
  pipelinePluginDetailId: number;
  pipelinePluginId: number;
  name: string;
  keyName: string;
  type: number;
  optional: string;
  value: string;
  desc: string;
  notNull: number;
}
