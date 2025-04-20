import React from 'react';
import { Handle, Position } from '@xyflow/react';
import './node.css';
import { Button, Tooltip } from 'antd';
import { usePipelineContext } from '@/pages/pipeline/pipeline/pipelineUtil/context.tsx';
import { OperateEnum } from '@/utils/enum.ts';

const CustomNode = ({ id, data, isConnectable }) => {
  const { nodeClickFn, pipelineOpenType } = usePipelineContext();

  const handleContextMenu = (event) => {
    event.preventDefault();
  };


  return (
    <Tooltip title={<div>
      {
        pipelineOpenType !== OperateEnum.detail && <div>
          <div><Button type={'link'}
                       onClick={() => {
                         nodeClickFn('修改', id);
                       }}
          >修改</Button></div>
          <div><Button type={'link'}
                       onClick={() => {
                         nodeClickFn('添加子阶段', id);
                       }}
          >添加子阶段</Button></div>
          <div><Button type={'link'}
                       onClick={() => {
                         nodeClickFn('添加步骤', id);
                       }}
          >添加执行步骤</Button></div>
          <div><Button type={'link'}
                       onClick={() => {
                         nodeClickFn('删除', id);
                       }}
          >删除</Button></div>
        </div>
      }
      {
        pipelineOpenType === OperateEnum.detail &&
        <div><Button type={'link'}
                     onClick={() => {
                       nodeClickFn('详情', id);
                     }}
        >详情</Button></div>
      }

    </div>}
             trigger={['contextMenu', 'click']} placement={'right'}>
      <div
        className="text-updater-node my-node"
        style={{
          backgroundColor: '#c7e8a9',
          height: '100%',
          textAlign: 'center',
          lineHeight: '40px',
          borderRadius: 4,
          position: 'relative',
        }}
        onContextMenu={handleContextMenu}
      >
        <Handle type="target" position={Position.Left} isConnectable={isConnectable} style={{ opacity: 0 }} />
        <Tooltip title={data.label}>
          <div className="nodrag  mmm-ellipsis">
            {data.label}
          </div>
        </Tooltip>
        <Handle id="a" type="source" position={Position.Right} isConnectable={isConnectable} style={{ opacity: 0 }} />
        <Handle id="b" type="source" position={Position.Bottom} isConnectable={isConnectable} style={{ opacity: 0, left: 0 }} />

      </div>
    </Tooltip>
  );
};

export default CustomNode;
