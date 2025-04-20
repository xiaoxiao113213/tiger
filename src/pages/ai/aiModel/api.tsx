import apiClient from '@/api/apiClient.ts';
import { AiModelDetailVo } from './ApiBo';
import { Page, Rst } from '@/utils/baseBo.ts';

const base = '/devops-server';

export async function aiModelSaveApi(data: AiModelDetailVo) {
    return apiClient.post<Rst<undefined>>({ url: `${base}/aiModel/insert`, data });
}

export async function aiModelUpdateApi(data: AiModelDetailVo) {
    return apiClient.post<Rst<undefined>>({ url: `${base}/aiModel/update`, data });
}
export async function aiModelDeleteApi(data: { aiModelId: number }) {
    return apiClient.post<Rst<undefined>>({ url: `${base}/aiModel/del`, data });
}

// 查询详情
export async function aiModelGetOneApi(data: { aiModelId: number }) {
    return apiClient.post<Rst<AiModelDetailVo>>({ url: `${base}/aiModel/getOne`, data });
}

// page
export async function aiModelPageApi(data: AiModelDetailVo) {
    return apiClient.post<Rst<Page<AiModelDetailVo>>>({ url: `${base}/aiModel/getPage`, data });
}

export async function aiModelAllApi(data: AiModelDetailVo) {
    return apiClient.post<Rst<AiModelDetailVo[]>>({ url: `${base}/aiModel/getAll`, data });
}
            