import apiClient from '@/api/apiClient.ts';
import {AiPipelineEdgeDetailVo} from './ApiBo';
import {Page, Rst} from '@/utils/baseBo.ts';

const base = '/devops-server';

export async function aiPipelineEdgeSaveApi(data: AiPipelineEdgeDetailVo) {
    return apiClient.post<Rst<undefined>>({url: `${base}/aiPipelineEdge/insert`, data});
}

export async function aiPipelineEdgeUpdateApi(data: AiPipelineEdgeDetailVo) {
    return apiClient.post<Rst<undefined>>({url: `${base}/aiPipelineEdge/update`, data});
}

export async function aiPipelineEdgeDeleteApi(data: { aiPipelineEdgeId: number }) {
    return apiClient.post<Rst<undefined>>({url: `${base}/aiPipelineEdge/del`, data});
}

// 查询详情
export async function aiPipelineEdgeGetOneApi(data: { aiPipelineEdgeId: number }) {
    return apiClient.post<Rst<AiPipelineEdgeDetailVo>>({url: `${base}/aiPipelineEdge/getOne`, data});
}

// page
export async function aiPipelineEdgePageApi(data: AiPipelineEdgeDetailVo) {
    return apiClient.post<Rst<Page<AiPipelineEdgeDetailVo>>>({url: `${base}/aiPipelineEdge/getPage`, data});
}

export async function aiPipelineEdgeAllApi(data: AiPipelineEdgeDetailVo) {
    return apiClient.post<Rst<AiPipelineEdgeDetailVo[]>>({url: `${base}/aiPipelineEdge/getAll`, data});
}
            