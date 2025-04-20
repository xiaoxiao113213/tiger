export type RoleVo = {
  id: number;
  name: string;
  code: string;
  sort: number;
  remarks: string;
  disabled: number;
  createTime: string;
  createBy: number;
  updateTime: string;
  updateBy: number;
  deleteFlag: number;
};


export type RoleDetailVo = {
  id: number;
  name: string;
  code: string;
  sort: number;
  remarks: string;
  disabled: number;
  createTime: string;
  createBy: number;
  updateTime: string;
  updateBy: number;
  deleteFlag: number;
  menu: number[]
};

export type RoleListVo = {
  id: number;
  name: string;
  code: string;
  sort: number;
  remarks: string;
  disabled: number;
  createTime: string;
  createBy: number;
  updateTime: string;
  updateBy: number;
  deleteFlag: number;
};

