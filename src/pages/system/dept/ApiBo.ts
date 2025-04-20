export type DeptVo = {
  id: number;
  name: string;
  disabled: number;
  parentId: number;
  remarks: string;
  sort: number;
  createTime: string;
  createBy: number;
  updateTime: string;
  updateBy: number;
  deleteFlag: number;
};


export type DeptDetailVo = {
  id: number;
  name: string;
  disabled: number;
  parentId: number;
  remarks: string;
  sort: number;
  createTime: string;
  createBy: number;
  updateTime: string;
  updateBy: number;
  deleteFlag: number;
};

export type DeptListVo = {
  id: number;
  name: string;
  disabled: number;
  parentId: number;
  remarks: string;
  sort: number;
  createTime: string;
  createBy: number;
  updateTime: string;
  updateBy: number;
  deleteFlag: number;
  type: number; // 0:部门 1:员工
};

