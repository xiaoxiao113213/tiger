import { BasicStatus, PermissionType } from './enum';

export interface UserToken {
  accessToken?: string;
  fileToken?: string;
}

export interface LoginInfo {
  accessToken?: string;
  fileToken?: string;
  user: UserInfo;
}

export interface UserInfo {
  accountId: string;
  email: string;
  account: string;
  nickName: string;
  avatar?: string;
  role?: Role;
  status?: BasicStatus;
  permissions?: Permission[];
  permissionList?: string[];
  roles?: Role[];
}

export interface Organization {
  id: string;
  name: string;
  status: 'enable' | 'disable';
  desc?: string;
  order?: number;
  children?: Organization[];
}

export interface Permission {
  id: string;
  parentId: string;
  name: string;
  label: string;
  type: PermissionType;
  route: string;
  status?: BasicStatus;
  order?: number;
  icon?: string;
  component?: string;
  hide?: boolean;
  hideTab?: boolean;
  frameSrc?: string;
  newFeature?: boolean;
  children?: Permission[];
}

export interface Role {
  id: string;
  name: string;
  label: string;
  status: BasicStatus;
  order?: number;
  desc?: string;
  permission?: Permission[];
}
