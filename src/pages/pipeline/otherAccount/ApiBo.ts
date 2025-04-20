export type OtherAccountVo = {
  id: number;
  type: number;
  accountName: string;
  accountPassword: string;
  remarks: string;
  createTime: string;
  createBy: number;
  updateTime: string;
  updateBy: number;
  deleteFlag: number;
};


export type OtherAccountDetailVo = {
  id: number;
  type: number;
  accountName: string;
  accountPassword: string | undefined | null;
  remarks: string;
  createTime: string;
  createBy: number;
  updateTime: string;
  updateBy: number;
  deleteFlag: number;
};

export type OtherAccountListVo = {
  id: number;
  type: number;
  accountName: string;
  accountPassword: string;
  remarks: string;
  createTime: string;
  createBy: number;
  updateTime: string;
  updateBy: number;
  deleteFlag: number;
};

export type OtherAccountBo = {
  'id': number, 'type': number, 'accountName': string, 'createTime': string,
  'createBy': number, 'updateTime': string, 'updateBy': number
}