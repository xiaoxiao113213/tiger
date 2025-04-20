import { Avatar, Divider, MenuProps } from 'antd';
import Dropdown, { DropdownProps } from 'antd/es/dropdown/dropdown';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { IconButton } from '@/components/icon';
import { useLoginStateContext } from '@/pages/sys/login/providers/LoginStateProvider';
import { useRouter } from '@/router/hooks';
import { clearUserInfoAndToken, getUserInfo } from '@/store/userStore';
import { useThemeToken } from '@/theme/hooks';
import { loginOutApi } from '@/pages/system/account/accountApi.tsx';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

/**
 * Account Dropdown
 */
export default function AccountDropdown() {
  const { replace } = useRouter();
  const userInfo = getUserInfo();
  const { backToLogin } = useLoginStateContext();
  const { t } = useTranslation();
  const logout = async () => {
    try {
      await loginOutApi();
      clearUserInfoAndToken();
      // backToLogin();
      document.location.href = '/sso.html';
    } catch (error) {
      console.log(error);
    } finally {
      // replace('/sso.html');
    }
  };
  const { colorBgElevated, borderRadiusLG, boxShadowSecondary } = useThemeToken();

  const contentStyle: React.CSSProperties = {
    backgroundColor: colorBgElevated,
    borderRadius: borderRadiusLG,
    boxShadow: boxShadowSecondary,
  };

  const menuStyle: React.CSSProperties = {
    boxShadow: 'none',
  };

  const dropdownRender: DropdownProps['dropdownRender'] = (menu) => (
    <div style={contentStyle}>
      <div className="flex flex-col items-start p-4">
        <div>{userInfo?.account}</div>
        <div className="text-gray">{userInfo?.nickName}</div>
        <div className="text-gray">{userInfo?.email}</div>
      </div>
      <Divider style={{ margin: 0 }} />
      {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
    </div>
  );

  const items: MenuProps['items'] = [

    { label: <NavLink to={HOMEPAGE}>个人信息</NavLink>, key: '1' },
    { type: 'divider' },
    {
      label: <button className="font-bold text-warning">{t('sys.login.logout')}</button>,
      key: '4',
      onClick: logout,
    },
  ];


  // useEffect(() => {
  //   console.log('AccountDropdown mounted');
  //   setUserInfo(getUserInfo());
  // }, []);


  return (
    <Dropdown menu={{ items }} trigger={['click']} dropdownRender={dropdownRender}>
      <IconButton className="h-10 w-10 transform-none px-0 hover:scale-105">
        <Avatar.Group shape="circle">
          <Avatar
            style={{ backgroundColor: '#6fb3f1', verticalAlign: 'middle' }}
            size="default"
            src={userInfo?.avatar}
          >
            {userInfo?.nickName}
          </Avatar>
        </Avatar.Group>
      </IconButton>
    </Dropdown>
  );
}
