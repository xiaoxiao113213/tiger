import React, { type MouseEvent as ReactMouseEvent, useCallback, useEffect, useState } from 'react';
import { addEdge, applyEdgeChanges, applyNodeChanges, Background, Controls, MiniMap, Panel, ReactFlow, ReactFlowProvider, useReactFlow } from '@xyflow/react';
import { Button, Drawer, Tag } from 'antd';
import type { Edge, Node } from '@xyflow/react/dist/esm/types';
import { delEdgeApi, getPointAndEdgeApi } from '@/pages/ai/aiPipeline/api/api.tsx';
import { AiContext, AiPipelinePointDetailVo } from '@/pages/ai/aiPipeline/api/ApiBo.ts';
import { aiPipelinePointGetOneApi, aiPipelinePointSaveApi, updatePositionApi } from '@/pages/ai/aiPipeline/api/pointApi.tsx';
import '@xyflow/react/dist/style.css';
import StartNode from './nodes/start/StartNode.tsx';
import EndNode from './nodes/EndNode.tsx';
import { aiPipelineEdgeSaveApi } from '@/pages/ai/aiPipeline/api/edgeApi.tsx';
import AiTextNode from '@/pages/ai/aiPipeline/pipeline/nodes/aiText/AiTextNode.tsx';
import { OperateEnum } from '@/utils/enum.ts';
import TextAi1Test from '@/pages/ai/aiPipeline/pipeline/test/TextAi1Test.tsx';
import AiTextToPicNode from '@/pages/ai/aiPipeline/pipeline/nodes/AiTextToPic/AiTextToPicNode.tsx';


const nodeTypes = {
  start: StartNode,
  end: EndNode,
  aiText: AiTextNode,
  aiTextToPic: AiTextToPicNode,

};

const Flow = (props: {
  aiPipelineId: number,
  closeModal: () => void
}) => {
  const { screenToFlowPosition } = useReactFlow();
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [singTestModel, setSingTestModel] = useState(OperateEnum.close);

  const pointToNode = (point: AiPipelinePointDetailVo) => {
    return {
      id: point.aiPipelinePointId.toString(),
      data: {
        aiPipelineId: point.aiPipelineId,
        label: '213',
        point: point,
        schemaColor: '#91C4F2',
      },
      position: { x: point.x, y: point.y },
      type: point.type,
    };

  };

  const initData = async () => {
    let rst = await getPointAndEdgeApi({ aiPipelineId: props.aiPipelineId });

    let nodes = rst.data.points.map((point: AiPipelinePointDetailVo) => {
      return pointToNode(point);
    });
    setNodes(nodes);
    setEdges(rst.data.edges.map((item) => {
      return {
        id: item.aiPipelineEdgeId.toString(),
        source: item.source.toString(),
        target: item.target.toString(),
      };
    }));
  };

  const reloadNode = async (nodeId: number) => {
    const { data: point } = await aiPipelinePointGetOneApi({ aiPipelinePointId: nodeId });
    const node = pointToNode(point);
    setNodes((nds) => {
      // 直接删除旧的节点，添加新的节点
      return nds.filter((item) => item.id !== nodeId.toString()).concat(node);
    });

  };

  useEffect(() => {
    initData();
  }, []);
  useEffect(() => {

  }, [nodes]);

  const updateNodeLocation = async (event: ReactMouseEvent, node: Node, nodes: Node[]) => {
    if (openDrawer) {
      return;
    }
    updatePositionApi({
      x: node.position.x,
      y: node.position.y,
      aiPipelinePointId: node.id,
    });
  };

  // 拖拽功能 实现拖拽到画布上生成新的节点 start
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(async (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      // check if the dropped element is valid
      // console.log('type', type);
      if (typeof type === 'undefined' || !type) {
        return;
      }
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const rst = await aiPipelinePointSaveApi({
        aiPipelineId: props.aiPipelineId,
        x: position.x.toString(),
        y: position.y.toString(),
        type: type,
      });
      if (rst.code !== 1000) {
        return;
      }
      const point = rst.data;
      const newNode = pointToNode(point);
      setNodes((nds) => {
        return [...nds, newNode];
      });
    },
    [screenToFlowPosition],
  );
  // 拖拽功能 实现拖拽到画布上生成新的节点  end


  const deleteNode = (nodeId: number) => {
    setNodes((currentNodes) => currentNodes.filter((node) => node.id != nodeId));
  };
  const onConnect = useCallback((params) => {
      console.log('onConnect', params);
      aiPipelineEdgeSaveApi({
        aiPipelineId: props.aiPipelineId,
        source: parseInt(params.source),
        target: parseInt(params.target),
      }).then((rst) => {
        setEdges((eds) => addEdge(params, eds));
      });

    },
    []);
  const onElementsRemove = async (params: { nodes: Node[]; edges: Edge[]; }) => {
    console.log('elementsToRemove', params);
    // setNodes((nds) => nds.filter((node) => !params.nodes.find((n) => n.id === node.id)));
    setEdges((eds) => eds.filter((edge) => !params.edges.find((e) => e.id === edge.id)));
    if (params.edges.length > 0) {
      params.edges.forEach((item) => {
        delEdgeApi({ ...item, aiPipelineId: props.aiPipelineId });
      });
    }
    return false;
  };
  const onNodesChange = useCallback((changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [],
  );
  const onEdgesChange = useCallback((changes) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [],
  );


  return (
    <AiContext.Provider value={{ reloadData: reloadNode, setOpenDrawer, deleteNode: deleteNode }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDragStop={updateNodeLocation}
        deleteKeyCode={['Backspace', 'Delete']}
        // onDelete={onElementsRemove}
        onBeforeDelete={onElementsRemove}
        defaultEdgeOptions={{
          animated: true,
        }}
        fitView
        snapGrid={[16, 16]}
        nodeTypes={nodeTypes}
        minZoom={0.01}
        maxZoom={6}
        preventScrolling={true}
        zoomOnScroll={true}
        zoomOnPinch={true}
        zoomOnDoubleClick={false}
        onDrop={onDrop}
        onDragOver={onDragOver}
        // onPointerUp={() => {
        //   updateNodeLocation();
        // }}

      >
        <Controls />
        <Background color="#aaa" gap={16} />
        <MiniMap pannable
                 nodeColor={'#151414'}
        />
        <Panel position="top-left">
          <Button type={'link'}
                  onClick={() => {
                  }}
                  onDragStart={(event) => onDragStart(event, 'aiText')}
                  draggable
          >
            文本Ai
          </Button>
          <Button type={'link'}
                  onClick={() => {
                  }}
                  onDragStart={(event) => onDragStart(event, 'aiTextToPic')}
                  draggable

          >
            文生图Ai
          </Button>
        </Panel>
        <Panel position="top-right">
          <Button type={'primary'}
                  style={{ display: 'block' }}
                  onClick={() => {
                    setSingTestModel(OperateEnum.add);
                  }}
          >
            单次测试
          </Button>
        </Panel>
      </ReactFlow>

      <Drawer
        title={'单测'}
        open={singTestModel !== OperateEnum.close}
        width={'70%'}
        destroyOnClose={true}
        maskClosable={true}
        onClose={() => setSingTestModel(OperateEnum.close)}
        footer={null}
      >
        <div>
          <TextAi1Test aiPipelineId={props.aiPipelineId} />
        </div>
      </Drawer>


    </AiContext.Provider>
  );
};


const Bord = (props: {
  aiPipelineId: number,
  closeModal: () => void
}) => {
  return (
    <div style={{ width: '100%', height: 'calc(100vh - 110px)' }}>
      <ReactFlowProvider>
        <Flow
          aiPipelineId={props.aiPipelineId}
          closeModal={props.closeModal}
        />
      </ReactFlowProvider>
    </div>
  );
};

export default Bord;