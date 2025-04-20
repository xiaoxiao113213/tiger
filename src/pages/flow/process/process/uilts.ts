import React from 'react';

export enum FlowNodeType {
  startNode = 'startNode',//开始节点
  endNode = 'endNode',//结束节点
  conditionNode = 'conditionNode',//条件节点
  otherConditionNode = 'otherConditionNode',//其他条件节点
  approvalNode = 'approvalNode',//审批节点
  ccNode = 'ccNode',//     抄送节点
  handleNode = 'handleNode' //     办理节点


}

export const MyContext = React.createContext();

