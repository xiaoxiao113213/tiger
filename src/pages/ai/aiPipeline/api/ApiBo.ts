import React, { useContext } from 'react';

export enum Category {
  Input = 'input',
  Output = 'output',
}

export enum NodeType {
  Start = 'start',
  End = 'end',
  AiText = 'aiText',
  Normal = 'normal',
}


// 变量类型
export enum VarType {
  String = 'string',
  Number = 'number',
  Boolean = 'boolean',
  Object = 'object',
  ArrayString = 'arrayString',
  ArrayNumber = 'arrayNumber',
  ArrayBoolean = 'arrayBoolean',
  ArrayObject = 'arrayObject',
  FileDoc = 'fileDoc',
  FileImage = 'fileImage',
  FileAudio = 'fileAudio',
  FileVideo = 'fileVideo',
  FileTxt = 'fileTxt',
  FileExcel = 'fileExcel',
  FilePdf = 'filePdf',
  FileList = 'fileList',
}

export const VarTypeOptions = [
  { label: 'String', value: VarType.String },
  { label: 'Number', value: VarType.Number },
  { label: 'Boolean', value: VarType.Boolean },
  { label: 'Object', value: VarType.Object },
  { label: 'ArrayString', value: VarType.ArrayString },
  { label: 'ArrayNumber', value: VarType.ArrayNumber },
  { label: 'ArrayBoolean', value: VarType.ArrayBoolean },
  { label: 'ArrayObject', value: VarType.ArrayObject },


  { label: 'FileDoc', value: VarType.FileDoc },
  { label: 'FileImage', value: VarType.FileImage },
  { label: 'FileAudio', value: VarType.FileAudio },
  { label: 'FileVideo', value: VarType.FileVideo },
  { label: 'FileTxt', value: VarType.FileTxt },
  { label: 'FileExcel', value: VarType.FileExcel },
  { label: 'FilePdf', value: VarType.FilePdf },
  { label: 'FileList', value: VarType.FileList },
];

export type AiPipelinePointVarDetailVo = {
  aiPipelinePointVarId: number;
  aiPipelinePointId: number;
  aiPipelineId: number;
  name: string;
  type: string;
  remarks: string;
  defaultValue: string;
  category: string;
  relatedId: string[];
  parentId: number;
//
  value?: string;
  children?: AiPipelinePointVarDetailVo[];
};


export type AiPipelineEdgeDetailVo = {
  aiPipelineEdgeId: number;
  aiPipelineId: number;
  source: number;
  target: number;
};
export type AiPipelinePointDetailVo = {
  aiPipelinePointId: number;
  aiPipelineId: number;
  type: string;
  remarks: string;
  x: string;
  y: string;
  varList: AiPipelinePointVarDetailVo[]
  title: string;
  model: string;
  isHistory: string;
  systemPrompt: string;
  userPrompt: string;
};

export type AiPipelineDetailVo = {
  aiPipelineId: number;
  type: string;
  name: string;
  remarks: string;
  createBy: number;
  createTime: string;
  updateBy: number;
  updateTime: string;
  deleteFlag: number;
  sort: number;
};

export type AiPipelineDetail1Vo = {
  points: AiPipelinePointDetailVo[];
  edges: AiPipelineEdgeDetailVo[];
}


interface AiContextType {
  reloadData: (nodeId: number) => void;
  deleteNode: (nodeId: number) => void;
  setOpenDrawer: (open: boolean) => void;
}


export const AiContext = React.createContext<AiContextType>(
  {
    reloadData: (nodeId: number) => {
    },
    setOpenDrawer: (open: boolean) => {

    },
    deleteNode: (nodeId: number) => {

    },
  },
);

export const useAiContext = () => useContext(AiContext);
