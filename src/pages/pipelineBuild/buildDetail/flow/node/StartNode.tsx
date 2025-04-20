import React from 'react';
import { Handle, Position } from '@xyflow/react';
import './node.css';

function index({ id, data, isConnectable }) {

  const handleContextMenu = (event) => {
    event.preventDefault();
  };

  return (
    <div>

      <div className="text-updater-node my-node"
           style={{ backgroundColor: '#c7e8a9', height: '100%', textAlign: 'center', lineHeight: '40px' }}
           onContextMenu={handleContextMenu}
      >
        <Handle type="target" position={Position.Top} isConnectable={isConnectable} style={{ opacity: 0 }} />
        <div className="nodrag  mmm-ellipsis">
          {data.label}
        </div>
        <Handle type="source" position={Position.Right} isConnectable={isConnectable} style={{ opacity: 0 }} />
      </div>

    </div>
  )
    ;
}

export default index;
