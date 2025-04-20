import { BaseEdge, EdgeLabelRenderer, useReactFlow } from '@xyflow/react';
import { PlusSquareTwoTone } from '@ant-design/icons';
import { Button, Drawer, Tooltip } from 'antd';
import React, { useState } from 'react';
import { FlowNodeType, MyContext } from '@/pages/flow/process/process/uilts';
import { processPointSaveApi, processPointSaveEndApi } from '@/pages/flow/process/process/api/pointApi';
import { checkApiRst } from '@/utils/utils.ts';
import { OperateEnum } from '@/utils/enum.ts';


const Tip = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, source, target, getNode, edges }) => {
  const myContext = React.useContext(MyContext);
  let sourceNode = getNode(source);
  let targetNode = getNode(target);
  let sourceList = edges.filter(edge => edge.source === source);
  let targetList = edges.filter(edge => edge.target === target);

  // console.log(id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, source, target, sourceNode, targetNode, edges);
  // console.log('开始和结束数量', sourceList, targetList);

  const addPoint = async (type: FlowNodeType) => {
    let rst = await processPointSaveApi({ type: type, source: source, target: target });
    if (checkApiRst(rst)) {
      return;
    }
    myContext.initData();
  };
  const addPointEnd = async (type: FlowNodeType) => {
    let rst = await processPointSaveEndApi({ type: type, source: source, target: target });
    if (checkApiRst(rst)) {
      return;
    }
    myContext.initData();
  };


  return (
    <div>
      {
        // 条件分支的上面一个加号
        sourceList.length > 1 &&
        <Tooltip trigger={'click'} placement={'rightTop'} title={
          <div>
            <div><Button type={'link'} onClick={() => {
              addPoint(FlowNodeType.approvalNode);
            }}>审批人</Button></div>
            <div><Button type={'link'} onClick={() => {
              addPoint(FlowNodeType.ccNode);
            }}>抄送人</Button></div>
            <div><Button type={'link'} onClick={() => {
              addPoint(FlowNodeType.handleNode);
            }}>办理人</Button></div>
          </div>
        }>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${sourceX}px,${sourceY + 25}px)`,
              pointerEvents: 'all',
              cursor: 'pointer',
            }}
            className="nodrag nopan"
          >
            <PlusSquareTwoTone />
          </div>
        </Tooltip>
      }
      {
        // 当结束节点是多的时候 在开始节点的下面25px的位置 添加一个加号
        sourceList.length === 1 && targetList.length > 1 &&
        <Tooltip trigger={'click'} placement={'rightTop'} title={
          <div>
            <div><Button type={'link'} onClick={() => {
              addPoint(FlowNodeType.approvalNode);
            }}>审批人</Button></div>
            <div><Button type={'link'} onClick={() => {
              addPoint(FlowNodeType.ccNode);
            }}>抄送人</Button></div>
            <div><Button type={'link'} onClick={() => {
              addPoint(FlowNodeType.handleNode);
            }}>办理人</Button></div>
            <div><Button type={'link'} onClick={() => {
              addPoint(FlowNodeType.conditionNode);
            }}>条件分支</Button></div>
          </div>
        }>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${sourceX}px,${sourceY + 25}px)`,
              pointerEvents: 'all',
              cursor: 'pointer',
            }}
            className="nodrag nopan"
          >
            <PlusSquareTwoTone />
          </div>
        </Tooltip>
      }
      {
        // 当结束节点是多的时候 在结束节点的上面25px的位置 添加一个加号
        sourceList.length === 1 && targetList.length > 1 &&
        <Tooltip trigger={'click'} placement={'rightTop'} title={
          <div>
            <div><Button type={'link'} onClick={() => {
              addPointEnd(FlowNodeType.approvalNode);
            }}>审批人</Button></div>
            <div><Button type={'link'} onClick={() => {
              addPointEnd(FlowNodeType.ccNode);
            }}>抄送人</Button></div>
            <div><Button type={'link'} onClick={() => {
              addPointEnd(FlowNodeType.handleNode);
            }}>办理人</Button></div>
          </div>
        }>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${targetX}px,${targetY - 25}px)`,
              pointerEvents: 'all',
              cursor: 'pointer',
            }}
            className="nodrag nopan"
          >
            <PlusSquareTwoTone />
          </div>
        </Tooltip>
      }

      {

        sourceList.length === 1 && targetList.length === 1 &&
        <Tooltip trigger={'click'} placement={'rightTop'} title={
          <div>
            <div><Button type={'link'} onClick={() => {
              addPoint(FlowNodeType.approvalNode);
            }}>审批人</Button></div>
            <div><Button type={'link'} onClick={() => {
              addPoint(FlowNodeType.ccNode);
            }}>抄送人</Button></div>
            <div><Button type={'link'} onClick={() => {
              addPoint(FlowNodeType.handleNode);
            }}>办理人</Button></div>
            <div><Button type={'link'} onClick={() => {
              addPoint(FlowNodeType.conditionNode);
            }}>条件分支</Button></div>
          </div>
        }>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${sourceX}px,${sourceY + 50}px)`,
              pointerEvents: 'all',
              cursor: 'pointer',
            }}
            className="nodrag nopan"
          >
            <PlusSquareTwoTone />
          </div>
        </Tooltip>
      }
      {
        // 条件分支
        sourceList.length > 1 && targetList.length === 1 &&
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${sourceX}px,${sourceY + 50}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          {/*button的内容上下居中*/}
          <Button key={'condition'} type={'default'}
                  style={{ height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  onClick={() => {
                    addPoint(FlowNodeType.conditionNode);
                  }}
          >
            添加条件分支
          </Button>
        </div>
      }


    </div>
  );

};


export default function CustomOptionsEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, source, target }) {
  const {
    setEdges, addNodes,
    getNodes, getNode, getEdges,
  } = useReactFlow();
  const [nodeOpenType, setNodeOpenTypeFn] = useState(OperateEnum.close);
  let edges = getEdges();
  let sourceNode = getNode(source);
  let targetNode = getNode(target);
  // console.log(id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, source, target, sourceNode, targetNode);
  // M x,y：移动到点 (x,y)
  // L x,y：画一条直线到点 (x,y)
  // C x1,y1, x2,y2, x,y：绘制三次贝塞尔曲线，控制点为 (x1,y1) 和 (x2,y2)，终点为 (x,y)
  // function getCustomStepPathAvoidingNodes() {
  //   let path = `M ${sourceX},${sourceY}`;
  //   path += ` L ${sourceX},${targetY - 50}`;
  //   path += ` L ${targetX},${targetY - 50}`;
  //   path += ` L ${targetX},${targetY}`;
  //   return path;
  // }
  function getCustomStepPathAvoidingNodes() {
    let path = `M ${sourceX},${sourceY}`;
    path += ` L ${sourceX},${sourceY + 50}`;
    path += ` L ${targetX},${sourceY + 50}`;
    path += ` L ${targetX},${targetY}`;
    return path;
  }

  // Usage in CustomOptionsEdge component
  const edgePath = getCustomStepPathAvoidingNodes();


  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <Tip
          id={id}
          sourceX={sourceX}
          sourceY={sourceY}
          targetX={targetX}
          targetY={targetY}
          sourcePosition={sourcePosition}
          targetPosition={targetPosition}
          source={source}
          target={target}
          getNode={getNode}
          edges={edges}
          key={'myTip'}
        ></Tip>
      </EdgeLabelRenderer>

      <div>
        <Drawer
          title={'设置审批人'}
          open={nodeOpenType !== OperateEnum.close}
          width={'50%'}
          destroyOnClose={true}
          maskClosable={false}
          onClose={() => setNodeOpenTypeFn(OperateEnum.close)}
          footer={null}
        >

        </Drawer>
      </div>

    </>
  );
}



