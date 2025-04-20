import apiClient from '@/api/apiClient.ts';
import { Rst } from '@/utils/baseBo.ts';
import { LoginInfo } from '#/entity.ts';

const baseUrl = '/devops-server/b';

export async function queryCurrent() {
  return apiClient.post<Rst<LoginInfo>>({ url: `${baseUrl}/systemVit/getUserInfo` });

}

