import React, { useEffect } from 'react';
import { Background, ConnectionLineType, Controls, MiniMap, Panel, ReactFlow, ReactFlowProvider, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomEdge from '@/pages/flow/customer/edge/CustomEdge';
import CustomDelEdge from '@/pages/flow/customer/edge/CustomDelEdge';
import CustomOptionsEdge from '@/pages/flow/customer/edge/CustomOptionsEdge';
import conditionNode from '@/pages/flow/customer/node/ConditionNode';
import StartNode from '@/pages/flow/customer/node/StartNode';
import EndNode from '@/pages/flow/customer/node/EndNode';
import otherConditionNode from '@/pages/flow/customer/node/OtherConditionNode';
import ApprovalNode from '@/pages/flow/customer/node/ApprovalNode';
import CcNode from '@/pages/flow/customer/node/CcNode';
import HandleNode from '@/pages/flow/customer/node/HandleNode';
import Dagre from '@dagrejs/dagre';
import { processPointAllApi } from '@/pages/flow/process/process/api/pointApi';
import { MyContext } from '@/pages/flow/process/process/uilts';
import { ProcessPointVo } from '@/pages/flow/process/process/api/PointApiBo.ts';
import { Button, Modal } from 'antd';
import { processPublish } from '@/pages/flow/process/process/api/processApi.tsx';
import { checkApiRst } from '@/utils/utils.ts';


const nodeTypes = {
  startNode: StartNode,
  endNode: EndNode,
  conditionNode: conditionNode,
  otherConditionNode: otherConditionNode,
  approvalNode: ApprovalNode,
  ccNode: CcNode,
  handleNode: HandleNode,
};
const edgeTypes = {
  'custom-edge': CustomEdge,
  'custom-del-edge': CustomDelEdge,
  'custom-options-edge': CustomOptionsEdge,
};

const LayoutFlow = (props: {
  processId: number,
  processVersionId: number,
  close: () => void,
}) => {
  let reactFlow = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  const nodeWidth = 161;
  const nodeHeight = 50;
  const getLayoutedElements = (nodes, edges) => {
    g.setGraph({
      rankdir: 'TB',
      ranksep: 100,
      nodesep: 50,

    });
    nodes.forEach((node) => {
      g.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });
    edges.forEach((edge) => {
      g.setEdge(edge.source, edge.target);
    });
    Dagre.layout(g);
    nodes.forEach((node) => {
      const nodeWithPosition = g.node(node.id);
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      };

      return node;
    });
    return { nodes, edges };
  };

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


  const onLayout = (nodes1, edges1) => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes1,
      edges1,
    );
    let parentNode = layoutedNodes.find((item) => {
      return item.data.level === 1;
    });
    // updateNode(parentNode.position.y, 2, layoutedNodes);

    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
    // setNodes([...nodes1]);
    // setEdges([...edges1]);
    //
    // window.requestAnimationFrame(() => {
    //     reactFlow.fitView();
    // });
  };
  const initData = async () => {
    const rst = await processPointAllApi({ processId: props.processId, processVersionId: props.processVersionId } as ProcessPointVo);
    let nodes1 = rst.data.nodes.map((item, index) => {
      return {
        id: item.processPointId,
        data: { label: item.name, ...item },
        type: item.type,
        draggable: false,
        style: {
          backgroundColor: '#ac3131',
          border: '1px solid #222', borderRadius: '5px',
        },
        position: item.position,
      };
    });
    let edges1 = rst.data.edges.map((item, index) => {
      return { id: item.processPointRelationId, source: item.source, target: item.target };
    });


    onLayout(nodes1, edges1);

  };

  useEffect(() => {
    initData();
  }, []);

  const publish = async () => {

    Modal?.confirm({
      title: '是否确认发布',
      content: '发布会这个流程将只针对新的申请才会生效，已经在审批中的流程不会受到影响',
      icon: null,
      onOk: async () => {
        const rst = await processPublish({ processId: props.processId });
        if (checkApiRst(rst)) return;
        props.close();
      },
    });


  };


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
          type: 'custom-options-edge',

        }}

        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        minZoom={0.01}
      >
        <Controls />
        <MiniMap pannable />
        <Background variant="dots" gap={12} size={1} />
        <Panel position="top-left">
          <Button type={'primary'} onClick={() => {
            publish();
          }}>发布</Button>
        </Panel>
        {/*<DevTools />*/}
      </ReactFlow>
    </MyContext.Provider>
  );
};
export default function App(props: {
  processId: number,
  processVersionId: number,
  close: () => void,
}) {
  return (
    <div style={{ width: '95vw', height: '91vh' }}>
      <ReactFlowProvider>
        <LayoutFlow processId={props.processId} processVersionId={props.processVersionId} close={props.close} />
      </ReactFlowProvider>
    </div>
  );
}
