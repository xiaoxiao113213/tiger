import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CircleLoading } from '@/components/loading';
import SimpleLayout from '@/layouts/simple';

import AuthGuard from '../components/auth-guard';

import { AppRouteObject } from '#/router';
import XtermComponent from '@/pages/machine/machine/xtermComponent.tsx';
import FileComponent from '@/pages/machine/machine/fileComponent.tsx';

const Page403 = lazy(() => import('@/pages/sys/error/Page403'));
const Page404 = lazy(() => import('@/pages/sys/error/Page404'));
const Page500 = lazy(() => import('@/pages/sys/error/Page500'));
const PipelineBuildPage = lazy(() => import('@/pages/pipelineBuild/index.tsx'));
const DocDocPage = lazy(() => import('@/pages/doc/doc/index.tsx'));

/**
 * error routes
 * 403, 404, 500
 */
export const ErrorRoutes: AppRouteObject = {
  element: (
    <AuthGuard>
      <SimpleLayout>
        <Suspense fallback={<CircleLoading />}>
          <Outlet />
        </Suspense>
      </SimpleLayout>
    </AuthGuard>
  ),
  children: [
    { path: '403', element: <Page403 /> },
    { path: '404', element: <Page404 /> },
    { path: '500', element: <Page500 /> },
    { path: 'pipelineBuild', element: <PipelineBuildPage /> },
    { path: '/doc/doc', element: <DocDocPage /> },
    { path: '/xterm', element: <XtermComponent /> },
    { path: '/machine/file', element: <FileComponent /> },
  ],
};
