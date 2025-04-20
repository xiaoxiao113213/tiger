import { message } from 'antd';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import userService, { SignInReq } from '@/api/services/userService';
import { getItem, removeItem, setItem } from '@/utils/storage';

import { UserInfo, UserToken } from '#/entity';
import { StorageEnum } from '#/enum';


export const setUserInfo = (userInfo: UserInfo) => {
  setItem(StorageEnum.User, userInfo);
  setPermissionList(userInfo.permissionList ?? []);
};
export const getUserInfo = (): UserInfo => {
  const user = getItem<UserInfo>(StorageEnum.User);
  if (!user) {
    throw new Error('用户信息不存在');
  }
  return user;
};
export const getUserInfoN = (): UserInfo | null => {
  return getItem<UserInfo>(StorageEnum.User);
};

export const setPermissionList = (list: string[]) => {
  setItem(StorageEnum.Permission, list);
};
export const getPermissionList = (): string[] => {
  const list = getItem<string[]>(StorageEnum.Permission);
  if (!list) {
    return [];
  }
  return list;
};


export const setUserToken = (userToken: UserToken) => {
  setItem(StorageEnum.Token, userToken);
};
export const getUserToken = (): UserToken | null => {
  return getItem<UserToken>(StorageEnum.Token);
};


export const clearUserInfoAndToken = () => {
  removeItem(StorageEnum.User);
  removeItem(StorageEnum.Token);
};


export const useSignIn = () => {
  const { t } = useTranslation();
  const navigatge = useNavigate();

  const signInMutation = userService.signin;

  const signIn = async (data: SignInReq) => {
    try {
      const res = await signInMutation(data);
      const { user, accessToken, fileToken } = res.data;
      setUserToken({ accessToken, fileToken });
      setUserInfo(user);
      // navigatge(HOMEPAGE, { replace: true });
      navigatge('/', { replace: true });
      message.success('登录成功');
      // window.location.href = HOMEPAGE;
    } catch (err) {
      message.warning({
        content: err.message,
        duration: 3,
      });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(signIn, []);
};
