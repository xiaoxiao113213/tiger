export type MachineDetailVo = {
  machineId: number;
  type: string;
  createBy: number;
  createTime: string;
  updateBy: number;
  updateTime: string;
  deleteFlag: number;
  sort: number;
  remarks: string;
  username: string;
  password: string;
  isOnline: string;
  host: string;
  port: string;
  initDir: string,
};

export type FileInfoVo = {

  fileName: string,
  permissions: string,
  links: number,
  owner: string,
  group: string,
  size: number,
  date: string,
  time: string,
  parentPath: string,
  type?: string,


}


export const TypeList = [
  {
    value: '0',
    label: 'linux',
  },
];

export const TypeValueEnum =
  {
    0: { text: 'linux' },
  };
