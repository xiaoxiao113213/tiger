import { lazy } from 'react';
import { createBrowserRouter, createHashRouter, Navigate, RouteObject, RouterProvider } from 'react-router-dom';

import DashboardLayout from '@/layouts/dashboard';
import { usePermissionRoutes } from '@/router/hooks';
import { ErrorRoutes } from '@/router/routes/error-routes';

import { AppRouteObject } from '#/router';
import { getUserInfoN } from '@/store/userStore.ts';
import AuthGuard from './components/auth-guard';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;
const LoginRoute: AppRouteObject = {
  path: '/login',
  Component: lazy(() => import('@/pages/sys/login/Login')),
};
const PAGE_NOT_FOUND_ROUTE: AppRouteObject = {
  path: '*',
  element: <Navigate to="/404" replace />,
};


export default function Router() {
  const userInfo = getUserInfoN();
  const permissionRoutes = usePermissionRoutes(userInfo?.permissions, 'router.tsx');

  const asyncRoutes: AppRouteObject = {
    path: '/',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [{ index: true, element: <Navigate to={HOMEPAGE} replace /> }, ...permissionRoutes],
  };

  const routes = [LoginRoute, asyncRoutes, ErrorRoutes, PAGE_NOT_FOUND_ROUTE];
  // 区分 hash 和Browser
  const router = createHashRouter(routes as unknown as RouteObject[]);
  // const router = createBrowserRouter(routes as unknown as RouteObject[]);
  return <RouterProvider router={router} />;
}




