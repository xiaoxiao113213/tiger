import React, { useEffect } from 'react';
import { Background, ConnectionLineType, Controls, ReactFlow, ReactFlowProvider, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { MyContext } from '@/pages/flow/process/process/uilts.ts';
import { buildData } from './dataUtil.tsx';
import CustomEdge from '@/pages/pipeline/pipeline/flow/edge/CustomEdge.tsx';
import { BuildDetailBo } from '@/pages/pipelineBuild/api/pipelineBuildBo.ts';
import StartNode from '@/pages/pipelineBuild/buildDetail/flow/node/StartNode.tsx';
import StageNode from '@/pages/pipelineBuild/buildDetail/flow/node/StageNode.tsx';
import StepNode from '@/pages/pipelineBuild/buildDetail/flow/node/StepNode.tsx';


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
  detail: BuildDetailBo,
  nodeClickFn: (buttonName: string, nodeId: string) => void
}) => {
  let reactFlow = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

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
    let data = buildData(props?.detail?.pipelineBuildStageList ?? []);

    setNodes([...data.nodes]);
    setEdges([...data.edges]);
    setTimeout(() => {
      reactFlow.fitView();
    }, 200);
  };

  useEffect(() => {
    initData();
  }, [props.detail]);

  return (
    <MyContext.Provider value={{ initData }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        connectionLineType={ConnectionLineType.SmoothStep}
        defaultEdgeOptions={{
          animated: true,
          type: 'custom-edge',
        }}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        minZoom={0.01}
        zoomOnScroll={false}
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />

        {/*<DevTools />*/}
      </ReactFlow>
    </MyContext.Provider>
  );
};
export default function index(props: {
  // 初始化的查询参数 可插入一些 写死的参数值
  detail: BuildDetailBo,
  nodeClickFn: (buttonName: string, nodeId: string) => void
}) {
  return (
    <div style={{ width: '100%', height: '50vh' }}>
      <ReactFlowProvider>
        <LayoutFlow
          detail={props.detail}
          nodeClickFn={props.nodeClickFn}
        />
      </ReactFlowProvider>
    </div>
  );
}
