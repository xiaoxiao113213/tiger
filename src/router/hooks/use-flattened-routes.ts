import { useCallback } from 'react';

import { flattenMenuRoutes, menuFilter } from '../utils';

import { usePermissionRoutes } from './use-permission-routes';
import { getUserInfoN } from '@/store/userStore.ts';

/**
 * 返回拍平后的菜单路由
 */
export function useFlattenedRoutes() {
  const userInfo = getUserInfoN();
  const flattenRoutes = useCallback(flattenMenuRoutes, []);
  const permissionRoutes = usePermissionRoutes(userInfo?.permissions, 'use-flattened-routes.ts');
  const menuRoutes = menuFilter(permissionRoutes);
  return flattenRoutes(menuRoutes);
}
