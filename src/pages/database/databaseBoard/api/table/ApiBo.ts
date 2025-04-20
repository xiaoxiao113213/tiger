import { TableFieldDetailVo } from '@/pages/database/databaseBoard/api/tableField/ApiBo';
import { EdgeConfig } from '@/pages/database/Visualizer/types';

export type TableVo = {
  tableId: number;
  code: string;
  desc: string;
  indexList: TableIndexVo[];
  databaseBoardId: number;
  fillColor: string;
  y: string;
  x: string;
  shapeType: string;
  comboTableId: number;
  createTime: string;
  createBy: number;
  updateTime: string;
  updateBy: number;
  deleteFlag: number;
};


export type TableDetailVo = {
  tableId: number;
  code: string;
  desc: string;
  remarks: string;
  indexList: TableIndexVo[];
  databaseBoardId: number;
  y: string;
  x: string;
  shapeType: string;
  comboTableId: number | null | undefined;
  createTime: string;
  createBy: number;
  updateTime: string;
  updateBy: number;
  deleteFlag: number;
  fillColor: string;

  fieldList: TableFieldDetailVo[];
};

export type TableListVo = {
  tableId: number;
  code: string;
  desc: string;
  remarks: string;
  indexList: TableIndexVo[];
  databaseBoardId: number;
  fillColor: string;
  y: string;
  x: string;
  shapeType: string;
  comboTableId: number;
  createTime: string;
  createBy: number;
  updateTime: string;
  updateBy: number;
  deleteFlag: number;
  fieldList: TableFieldDetailVo[];
};

export type TableListBordVo = {

  databaseBoardId: number;
  pointy: number;
  pointx: number;
  zoom: number;
  tableList: TableListVo[];
  edgeList: EdgeConfig[];
};


export type TableIndexVo = {
  id: string; // 临时生成使用

  name: string;
  fieldNameList: string[];
  indexType: string;
  indexFun: string;
  desc: string;

};
