export type AccountItemBo = {
  id: number;
  token: string;
  account: string,
  type: number,
  disabled: number,
  createTime: string,
  remarks: string,
  email: string,
  roleNames: string,
  deptNames: string,
  roleIds: number[],
  applicationList: [],
  roleList: AccountRoleItemBo[],
}
export type AccountRoleItemBo = {
  id: number; //roleId
  roleName: string,
  value: string,
}


export type AccountCacheVo = {

  id: number;
  account: string,
  nickName: string,
  type: number,  //类型:0前台  1后台
  email: string,
  phone: string,
  avatar: string,
  disabled: number, //状态0 启用 1禁用
  remarks: string,

  roleList: { id: number, name: string, code: string }[],
  deptList: { id: number, name: string, disabled: string, parentId: number }[],
}


export enum bizTypeEnum {
  Public = 0,//公共
  DocSpace = 1,// 文档空间
  DocContent = 2,// 文档内容  存储 docTreeId
  ProcessFile = 3,// 流程文件 存储的流程实例的id
  TempConvertFile = 4,// 临时转换文件
  Pipeline = 5,// 流水线文件， 流水线id

  Chat = 6,// 聊天对话， 对话id
  Rili = 7,// 日历id 会议
  Task = 8,// 任务id
  Project = 9,// 项目id
  Machine = 10,// 机器id

}
