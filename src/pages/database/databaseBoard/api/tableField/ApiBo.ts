export type TableFieldVo = {
  tableFieldId: number;
  tableId: number;
  databaseBoardId: number;
  code: string;
  desc: string;
  type: string;
  length: number;
  decimal: number;
  flagNotNull: number;
  flagKey: number;
  defaultValue: string;
  flagAutoIncrement: number;
  flagUnsigned: number;
};


export interface TableFieldDetailVo {
  // id: string; // 临时生成使用
  tableFieldId: number;
  tableId: number;
  databaseBoardId: number;
  code: string;
  desc: string;
  type: string;
  length: number;
  decimal: number;
  flagNotNull: number;
  flagKey: number;
  defaultValue: string;
  flagAutoIncrement: number;
  flagUnsigned: number;
  deleted?: boolean;
};

export type TableFieldListVo = {
  tableFieldId: number;
  tableId: number;
  databaseBoardId: number;
  code: string;
  desc: string;
  type: string;
  length: number;
  decimal: number;
  flagNotNull: number;
  flagKey: number;
  defaultValue: string;
  flagAutoIncrement: number;
  flagUnsigned: number;
};

