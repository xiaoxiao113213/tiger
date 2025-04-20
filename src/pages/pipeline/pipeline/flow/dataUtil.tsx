// 设置步骤坐标
import { PipelineStageBo, PipelineStepBo } from '@/pages/pipeline/pipeline/api/bo.tsx';
import { getRandomString } from '@/utils/utils.ts';

function setStepCoordinate(step: PipelineStepBo, x: number, y: number, globalY: number): Coordinate {
  step.x = x;
  step.y = y;
  if (y > globalY) {
    return {
      x,
      y,
      globalY: y,
    };
  } else {
    return {
      x,
      y,
      globalY,
    };
  }

}


// 设置stage 坐标 step坐标
// stage 和step 本身 都是 宽 100  高40
// sonStage 和parent stage 间隔 x + 200  y 不加 因为属于同一个层级 高度一样   stage 本身宽100 x+200 因此这两个stage的间隔宽度是100
// stage 和 并行的 stage x 不加 因为属于同一列 y + 并行中的上个stage 的最后 step的 y值  然后 + 40 + 20
// step 和stage  x + 30 , y + 60
// step 和 step  x 不变 , y + 60
function setSonStageCoordinate(stage: PipelineStageBo, x: number, y: number, globalY: number): Coordinate {
  stage.x = x;
  stage.y = y;
  let newGlobalY = globalY;
  if (stage.sonStageList && stage.sonStageList.length > 0) {
    let point: Coordinate = { x, y, globalY };
    stage.sonStageList.forEach((sonStage, index) => {
      if (index === 0) {
        point = setSonStageCoordinate(sonStage, x + 200, y, globalY);
      } else {
        // 第二个层级 y坐标 就永远 globalY +60
        point = setSonStageCoordinate(sonStage, point.x, point.globalY + 60, point.globalY);
      }
    });
    if (globalY < point.globalY) {
      newGlobalY = point.globalY;
    }
  } else {
    if (newGlobalY < y) newGlobalY = y;
  }

  // 返回这个stage的 最大域坐标
  if (stage.stepList && stage.stepList.length > 0) {
    let point: Coordinate = { x, y, globalY: newGlobalY };
    stage.stepList.forEach((step, index) => {
      if (index === 0) {
        point = setStepCoordinate(step, x + 30, y + 60, newGlobalY);
      } else {
        point = setStepCoordinate(step, point.x, point.y + 60, point.globalY);
      }
    });
    // 返回 这个stage 的最长的y 坐标  也就是 stage下 最后一个step的y
    if (point.globalY > newGlobalY) newGlobalY = point.globalY;
    return {
      x,
      y: point.y,
      globalY: newGlobalY,
    };
  } else {
    // 返回 这个stage 的最长的y 坐标  也就是 stage下 最后一个step的y
    if (y > newGlobalY) newGlobalY = y;
    return {
      x: x,
      y: y,
      globalY: newGlobalY,
    };
  }
}

function getStartNode() {
  return {
    id: 'start',
    position: { x: 100, y: 100 },
    style: { width: 100, height: 40, fill: '#6ae7b1', stroke: '#6ae7b1', lineWidth: 0, radius: 3 },
    data: {
      label: 'Start',
    },
    type: 'startNode',
  };
}

function getStepNodeId(stepId: number) {
  return 'step-' + stepId;
}

function getStageNodeId(stageId: number) {
  return 'stage-' + stageId;
}

function getStageNode(id: number, label: string, x: number, y: number) {
  return {
    id: getStageNodeId(id),
    position: { x: x, y: y },
    style: { width: 100, height: 40, fill: '#5bdeea', stroke: '#5ba6ea', lineWidth: 0, radius: 3 },
    data: { label: label },
    type: 'stageNode',
  };
}

function getStepNode(id: number, label: string, x: number, y: number) {
  return {
    id: getStepNodeId(id),
    position: { x: x, y: y },
    style: { width: 100, height: 40, fill: '#bd68dc', stroke: '#c22323', lineWidth: 0, radius: 20 },
    data: { label: label },
    type: 'stepNode',
  };
}


function getNodeAndEdge(stage: PipelineStageBo, parentPoint: Point, nodes: [], edges: []) {
  let node = getStageNode(stage.id, stage.name, stage.x, stage.y);
  nodes.push(node);
  if (stage.x === parentPoint.x) {
    const edge = {
      id: getRandomString(),
      source: parentPoint.id,
      target: getStageNodeId(stage.id),
    };
    edges.push(edge);
  } else {
    const edge = {
      id: getRandomString(),
      source: parentPoint.id,
      target: getStageNodeId(stage.id),
    };
    edges.push(edge);
  }

  if (stage.stepList && stage.stepList.length > 0) {
    stage.stepList.forEach((step) => {
      let node = getStepNode(step.id, step.name, step.x, step.y);
      nodes.push(node);
      const edge = {
        id: getRandomString(),
        source: getStageNodeId(stage.id),
        sourceHandle: 'b',
        target: getStepNodeId(step.id),

      };
      edges.push(edge);
    });
  }

  if (stage.sonStageList && stage.sonStageList.length > 0) {
    let nowParentPoint: Point = {
      id: getStageNodeId(stage.id),
      x: stage.x,
      y: stage.y,
    };
    stage.sonStageList.forEach((sonStage) => {
      getNodeAndEdge(sonStage, nowParentPoint, nodes, edges);
    });
  }
}


export function buildData(stageList: PipelineStageBo[]) {
  let point: Coordinate = { x: 300, y: 100, globalY: 100 };
  stageList.forEach((stage, index) => {
    if (index === 0) {
      point = setSonStageCoordinate(stage, point.x, point.y, point.globalY);
    } else {
      point = setSonStageCoordinate(stage, point.x, point.globalY + 60, point.globalY);
    }
  });

  let startNode = getStartNode();
  let nodes = [startNode];
  let edges = [];
  let nowParentPoint: Point = {
    id: startNode.id,
    x: startNode.position.x,
    y: startNode.position.y,
  };
  stageList.forEach((stage) => {
    getNodeAndEdge(stage, nowParentPoint, nodes, edges);
  });
  return { nodes: nodes, edges: edges, y: point.globalY + 40 };
}

type Coordinate = {
  x: number;
  y: number;
  globalY: number;  //最高y坐标 每个列表中的stage的第二个用这个  +40 + 20
};
type Point = {
  id: string; //已经拼装好的id  例如 stage-  step-
  x: number;
  y: number;
};

