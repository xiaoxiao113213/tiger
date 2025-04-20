import { RcFile } from 'antd/es/upload';


export type PipelineBo = {
  id: number; name: string; useStatus: number; lastBuildTotalTime: number; lastBuildStatus: number; disabled: number;
  pipelineGroupId: number; softIds: number[]; pipelineNodeLabel: string; dockerFlag: number; dockerName: string;
  dockerParam: string; parallel: number; timer: number; timerCron: string; email: number; emailUser: number[];
  createTime: string; createBy: number; updateTime: string;
  updateBy: number; pipelineStageList: PipelineStageBo [];
  globalParamList: PipelineParamBo [];
  permissionList: PipelinePermissionBo [];

}

export type PipelinePageQueryBo = {
  id: number;
  name: string;
  email: string;
  pageNum: number, pageSize: number
}

export type PipelineParamBo = {
  id: number; pipelinePluginDetailId: number;
  pipelinePluginId: number; name: string;
  keyName: string; type: number; optional: string;
  value: string | RcFile; desc: string; notNull: number; //0可为空 1不可为空

  scope: number; //作用域0局部 1全局 查询插件详情的时候有 其他的时候没有值
}

export type PipelineStepBo = {
  id: number; name: string; disabled: number; pipelinePluginDetailId: number;
  pipelinePluginId: number; errorStop: number; script: string; sort: number; paramList: PipelineParamBo[];
  x: number; y: number
}


export type PipelineStageBo = {
  id: number; name: string; nodeDefault: number; nodeLabel: string;
  dockerFlag: number; dockerName: string; dockerParam: string;
  disabled: number; sort: number;
  stepList: PipelineStepBo []; sonStageList: PipelineStageBo [];
  x: number; y: number
}

export type PipelinePermissionBo = {
  id: number; type: number; bizId: number; look: number; edit: number; build: number;
}


export type PipelineNodeBo = {
  id: number; name: string; workDir: string; desc: string; status: number; disabled: number; errorLog: string;
  createTime: string; createBy: number; updateTime: string;
  updateBy: number; deleteFlag: number; token: string; label: string; workNum: number; priority: number;
}

export type PipelinePluginBo = {
  id: number; name: string; type: number; source: number; desc: string; number: number;
  scriptType: number; script: string; createTime: string;
  createBy: number; updateTime: string; updateBy: number; deleteFlag: number;
}

export type PipelinePluginDetailBo = {
  id: number; name: string; type: number; source: number; desc: string; number: number;
  scriptType: number; script: string; createTime: string;
  createBy: number; updateTime: string; updateBy: number; deleteFlag: number; pipelinePluginId: number;
  params: PipelineParamBo[];
}

export type OtherAccountBo = {
  'id': number, 'type': number, 'accountName': string, 'createTime': string,
  'createBy': number, 'updateTime': string, 'updateBy': number
}

export type PipelineBuildBo = {
  id: number; buildNo: number; pipelineId: number; name: string; buildStartTime: string; buildEndTime: string;
  buildStatus: number; softIds: []; pipelineNodeId: number; pipelineNodeLabel: string; dockerFlag: number; dockerName: string;
  dockerParam: string; parallel: number; email: number; emailUser: []; createTime: string; createBy: number;
  updateTime: string; updateBy: number; deleteFlag: number; log: string; workspacePath: string;
}

