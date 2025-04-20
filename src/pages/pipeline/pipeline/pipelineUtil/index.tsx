import { IBBox } from '@antv/g6';
import { PipelineStageBo, PipelineStepBo } from '@/pages/pipeline/pipeline/api/bo.tsx';

export function isStart(nodeId: string) {
  return nodeId === 'start';
}

export function isStage(nodeId: string) {
  return nodeId.startsWith('stage-');
}

export function isStep(nodeId: string) {
  return nodeId.startsWith('step-');
}

export function getStageId(nodeId: string) {
  return nodeId.substring(6);
}

export function getStepId(nodeId: string) {
  return nodeId.substring(5);
}

// 判断两个包围盒是否相交的函数
export function isBBoxIntersect(bbox1: IBBox, bbox2: IBBox) {
  return (
    bbox1.minX < bbox2.maxX &&
    bbox1.maxX > bbox2.minX &&
    bbox1.minY < bbox2.maxY &&
    bbox1.maxY > bbox2.minY
  );
}

// 根据id 获取指定的 stage 阶段数据
export function getStage(id: number, pipelineStageList: PipelineStageBo []): null | PipelineStageBo {
  if (!pipelineStageList || pipelineStageList.length === 0) return null;
  for (let pipelineStageBo of pipelineStageList) {
    if (pipelineStageBo.id === id) {
      return pipelineStageBo;
    }
    let tmp = getStage(id, pipelineStageBo.sonStageList);
    if (tmp !== null && tmp !== undefined) return tmp;
  }
  return null;
}

// 根据id 获取指定的 stage 父级阶段数据
export function getStageParent(id: number, pipelineStageList: PipelineStageBo [], parentStage: PipelineStageBo | null): null | PipelineStageBo {
  if (!pipelineStageList || pipelineStageList.length === 0) return null;
  for (let pipelineStageBo of pipelineStageList) {
    if (pipelineStageBo.id === id) {
      return parentStage;
    }
    let tmp = getStageParent(id, pipelineStageBo.sonStageList, pipelineStageBo);
    if (tmp !== null && tmp !== undefined) return tmp;
  }
  return null;
}


// 获取所有的子id列表
export function getAllSonStageId(pipelineStageList: PipelineStageBo [], ids: number[]) {
  if (!pipelineStageList || pipelineStageList.length === 0) return null;
  for (let pipelineStageBo of pipelineStageList) {
    ids.push(pipelineStageBo.id);
    getAllSonStageId(pipelineStageBo.sonStageList, ids);
  }
}

export function getStep(stepId: number, pipelineStageList: PipelineStageBo []): null | PipelineStepBo {
  if (!pipelineStageList || pipelineStageList.length === 0) return null;
  for (let pipelineStageBo of pipelineStageList) {
    for (let pipelineStepBo of pipelineStageBo.stepList) {
      if (pipelineStepBo.id === stepId) {
        return pipelineStepBo;
      }
    }
    let tmp = getStep(stepId, pipelineStageBo.sonStageList);
    if (tmp !== null && tmp !== undefined) return tmp;
  }
  return null;
}

// 获取包含step的stage
export function getStepStage(stepId: number, pipelineStageList: PipelineStageBo []): null | PipelineStageBo {
  if (!pipelineStageList || pipelineStageList.length === 0) return null;
  for (let pipelineStageBo of pipelineStageList) {
    for (let pipelineStepBo of pipelineStageBo.stepList) {
      if (pipelineStepBo.id === stepId) {
        return pipelineStageBo;
      }
    }
    let tmp = getStepStage(stepId, pipelineStageBo.sonStageList);
    if (tmp !== null && tmp !== undefined) return tmp;
  }
  return null;
}

