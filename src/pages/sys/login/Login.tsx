import { Layout, Typography } from 'antd';
import Color from 'color';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import Overlay2 from '@/assets/images/background/img.png';
import LocalePicker from '@/components/locale-picker';
import { getUserToken } from '@/store/userStore';
import { useThemeToken } from '@/theme/hooks';

import LoginForm from './LoginForm';
import MobileForm from './MobileForm';
import { LoginStateProvider } from './providers/LoginStateProvider';
import QrCodeFrom from './QrCodeForm';
import RegisterForm from './RegisterForm';
import ResetForm from './ResetForm';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

function Login() {
  const { t } = useTranslation();
  const token = getUserToken();
  const { colorBgElevated } = useThemeToken();

  // 判断用户是否有权限
  if (token?.accessToken) {
    // 如果有授权，则跳转到首页
    return <Navigate to={HOMEPAGE} replace />;
  }

  const gradientBg = Color(colorBgElevated).alpha(0.9).toString();
  const bg = `linear-gradient(${gradientBg}, ${gradientBg}) center center / cover no-repeat,url(${Overlay2})`;

  return (
    <Layout className="relative flex !min-h-screen !w-full !flex-row">
      <div
        className="hidden grow flex-col items-center justify-center gap-[80px] bg-center  bg-no-repeat md:flex"
        style={{
          background: bg,
        }}
      >
        <div className="text-3xl font-bold leading-normal lg:text-4xl xl:text-5xl">Xiao Hu</div>
        <Typography.Text className="flex flex-row gap-[16px] text-2xl">
          {/*{t('sys.login.signInSecondTitle')}*/}
          自我掌控数据
        </Typography.Text>
      </div>

      <div className="m-auto flex !h-screen w-full max-w-[480px] flex-col justify-center px-[16px] lg:px-[64px]">
        <LoginStateProvider>
          <LoginForm />
          <MobileForm />
          <QrCodeFrom />
          <RegisterForm />
          <ResetForm />
        </LoginStateProvider>
      </div>

      <div className="absolute right-2 top-0">
        <LocalePicker />
      </div>
    </Layout>
  );
}

export default Login;
