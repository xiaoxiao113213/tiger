import apiClient from '../apiClient';

import { UserInfo, UserToken } from '#/entity';
import { Rst } from '@/utils/baseBo.ts';

export interface SignInReq {
  username: string;
  password: string;
}

export interface SignUpReq extends SignInReq {
  email: string;
}

export type SignInRes = UserToken & { user: UserInfo };

export enum UserApi {
  SignIn = '/devops-server/b/systemVit/login',
  SignUp = '/auth/signup',
  Logout = '/auth/logout',
  userInfo = '/devops-server/b/systemVit/getUserInfo',
}

const signin = (data: SignInReq) => apiClient.post<Rst<SignInRes>>({ url: UserApi.SignIn, data });
const signup = (data: SignUpReq) => apiClient.post<SignInRes>({ url: UserApi.SignUp, data });
export const userInfoApi = () => apiClient.post<Rst<SignInRes>>({ url: UserApi.userInfo });
const logout = () => apiClient.get({ url: UserApi.Logout });

export default {
  signin,
  signup,
  logout,

};
