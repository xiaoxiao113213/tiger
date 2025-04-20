import React, { useEffect } from 'react';
import { Background, ConnectionLineType, Controls, MiniMap, ReactFlow, ReactFlowProvider, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { MyContext } from '@/pages/flow/process/process/uilts';
import StartNode from '@/pages/pipeline/pipeline/flow/node/StartNode.tsx';
import { PipelineBo } from '@/pages/pipeline/pipeline/api/bo.tsx';
import { OperateEnum } from '@/utils/enum.ts';
import { buildData } from './dataUtil.tsx';
import StageNode from '@/pages/pipeline/pipeline/flow/node/StageNode.tsx';
import StepNode from '@/pages/pipeline/pipeline/flow/node/StepNode.tsx';
import CustomEdge from '@/pages/pipeline/pipeline/flow/edge/CustomEdge.tsx';
import { usePipelineContext } from '@/pages/pipeline/pipeline/pipelineUtil/context.tsx';


const nodeTypes = {
  startNode: StartNode,
  stageNode: StageNode,
  stepNode: StepNode,
};
const edgeTypes = {
  'custom-edge': CustomEdge,
};

const LayoutFlow = (props: {
  // 初始化的查询参数 可插入一些 写死的参数值
  detail: PipelineBo,
  nodeClickFn: (buttonName: string, nodeId: string) => void
  openType: OperateEnum, // 引入这个组件的打开方式 以 详情和非详情进行区分
}) => {
  let reactFlow = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { pipelineOpenType } = usePipelineContext();

  const updateNode = (parentY: number, level: number, nodes: any[]) => {
    let nodes1 = nodes.filter((item) => {
      return item.data.level === level;
    });
    if (nodes1.length === 0) return;
    nodes1.forEach((node) => {
      if (node.position.y - parentY != 150) {
        node.position.y = parentY + 150;
        // console.log('parentY', parentY, level, node.position.y, node.position.y - parentY);
      }
    });
    updateNode(parentY + 150, level + 1, nodes);
  };


  const initData = async () => {
    let data = buildData(props?.detail?.pipelineStageList ?? []);

    setNodes([...data.nodes]);
    setEdges([...data.edges]);
    setTimeout(() => {
      reactFlow.fitView();
    }, 100);
  };

  useEffect(() => {
    initData();
  }, [props.detail]);

  return (
    <MyContext.Provider value={{ initData }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        // onConnect={onConnect}
        connectionLineType={ConnectionLineType.SmoothStep}
        defaultEdgeOptions={{
          animated: true,
          type: 'custom-edge',
        }}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        minZoom={0.01}
        zoomOnScroll={pipelineOpenType !== OperateEnum.detail}
      >
        <Controls />
        <MiniMap pannable />
        <Background variant="dots" gap={12} size={1} />

        {/*<DevTools />*/}
      </ReactFlow>
    </MyContext.Provider>
  );
};
export default function App(props: {
  // 初始化的查询参数 可插入一些 写死的参数值
  detail: PipelineBo,
  nodeClickFn: (buttonName: string, nodeId: string) => void
  openType: OperateEnum, // 引入这个组件的打开方式 以 详情和非详情进行区分
}) {
  return (
    <div style={{ width: '100%', height: '50vh' }}>
      <ReactFlowProvider>
        <LayoutFlow
          detail={props.detail}
          nodeClickFn={props.nodeClickFn}
          openType={props.openType}
        />
      </ReactFlowProvider>
    </div>
  );
}
