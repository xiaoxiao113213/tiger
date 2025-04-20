export type PipelinePluginVo = {
  id: number;
  name: string;
  type: number;
  source: number;
  desc: string;
  number: number;
  scriptType: number;
  script: string;
  createTime: string;
  createBy: number;
  updateTime: string;
  updateBy: number;
  deleteFlag: number;
};


export type PipelinePluginDetailVo = {
  id: number;
  name: string;
  type: number;
  source: number;
  desc: string;
  number: number;
  scriptType: number;
  script: string;
  createTime: string;
  createBy: number;
  updateTime: string;
  updateBy: number;
  deleteFlag: number;
  params: PipelineParamBo[];
};

export type PipelinePluginListVo = {
  id: number;
  name: string;
  type: number;
  source: number;
  desc: string;
  number: number;
  scriptType: number;
  script: string;
  createTime: string;
  createBy: number;
  updateTime: string;
  updateBy: number;
  deleteFlag: number;
  params: PipelineParamBo[];
};

export type PipelineParamBo = {
  id: number; pipelinePluginDetailId: number;
  pipelinePluginId: number; name: string;
  keyName: string; type: number; optional: string;
  value: string; desc: string; notNull: number; //0可为空 1不可为空

  scope: number; //作用域0局部 1全局 查询插件详情的时候有 其他的时候没有值
}
