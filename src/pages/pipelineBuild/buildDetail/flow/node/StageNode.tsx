import React from 'react';
import { Handle, Position } from '@xyflow/react';
import './node.css';
import { Button, Tooltip } from 'antd';
import { usePipelineBuildContext } from '@/pages/pipelineBuild/buildDetail/context.tsx';

const CustomNode = ({ id, data, isConnectable }) => {
  const { nodeClickFn } = usePipelineBuildContext();

  const handleContextMenu = (event) => {
    event.preventDefault();
  };
  console.log(data);


  return (
    <Tooltip title={<div>
      <div><Button type={'link'}
                   onClick={() => {
                     nodeClickFn('详情', id);
                   }}
      >详情</Button></div>
    </div>}
             trigger={['contextMenu', 'click']} placement={'right'}>
      <div
        className="text-updater-node my-node"
        style={{
          backgroundColor: data?.bgColor ?? '#c7e8a9',
          height: '100%',
          textAlign: 'center',
          lineHeight: '40px',
          borderRadius: 4,
          position: 'relative',
        }}
        onContextMenu={handleContextMenu}
      >
        <Handle type="target" position={Position.Left} isConnectable={isConnectable} style={{ opacity: 0 }} />

        <div className="nodrag  mmm-ellipsis">
          {data.label}
        </div>

        <Handle id="a" type="source" position={Position.Right} isConnectable={isConnectable} style={{ opacity: 0 }} />
        <Handle id="b" type="source" position={Position.Bottom} isConnectable={isConnectable} style={{ opacity: 0, left: 0 }} />

      </div>
    </Tooltip>
  );
};

export default CustomNode;
