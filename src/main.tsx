import { getUserInfo, setUserInfo, setUserToken } from '@/store/userStore.ts';
import { getUserInfoBySsoCodeApi } from '@/pages/system/account/accountApi.tsx';
// react
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
// react helmet
import { HelmetProvider } from 'react-helmet-async';
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';

import App from '@/App';
// i18n
import './locales/i18n';
// tailwind css
import './theme/index.css';
import { initMySystemConfig } from '@/utils/SystemConfig';
import { userInfoApi } from '@/api/services/userService.ts';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import isBetween from 'dayjs/plugin/isBetween';
import IsSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import minMax from 'dayjs/plugin/minMax';
import weekday from 'dayjs/plugin/weekday';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(IsSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(localeData);
dayjs.extend(minMax);
// dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.extend(isBetween);
dayjs.extend(weekday);
// 扩展 dayjs
dayjs.extend(utc);
dayjs.extend(timezone);
// 设置 dayjs 为中文
dayjs.locale('zh-cn');
// 设置全局时区（如果需要）
dayjs.tz.setDefault('Asia/Shanghai'); // 默认时区


// 获取当前页面地址
const { pathname, href } = window.location;
let url = new URL(href);
let ssoCode = url.searchParams.get('ssoCode');
if (ssoCode) {
  let rst = await getUserInfoBySsoCodeApi({ ssoCode: ssoCode });
  if (rst?.data?.user) {
    setUserInfo(rst.data.user);
    setUserToken({ accessToken: rst.data.accessToken, fileToken: rst.data.fileToken },);
  }
  // 改变浏览器地址栏中 url地址 去掉ssoCode参数
  let url = new URL(window.location.href);
  url.searchParams.delete('ssoCode');
  window.history.pushState({}, 0, url.toString());
  // console.log('url', url);
} else {
  const rst = await userInfoApi();
  if (rst?.data?.user) {
    setUserInfo(rst.data.user);
    setUserToken({ accessToken: rst.data.accessToken, fileToken: rst.data.fileToken },);
  }
}
await initMySystemConfig();
// 判断是否是登录页面
// console.log('pathname', pathname, href);
// if (!href.endsWith('/login')) {
//   // 如果是登录页面，不需要获取用户信息
//   const rst = await userInfoApi();
//   if (rst?.data?.user) {
//     setUserInfo(rst.data.user);
//     setUserToken(
//       { accessToken: rst.data.accessToken, fileToken: rst.data.accessToken },
//     );
//   }
// }
console.log('main 地址打印 pathname', pathname, href, getUserInfo());


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <HelmetProvider>
    <Suspense>
      <App />
    </Suspense>
  </HelmetProvider>,
);

// 🥵 start service worker mock in development mode
// worker.start({ onUnhandledRequest: 'bypass' });
