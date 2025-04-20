import React from 'react';
import { Handle, Position } from '@xyflow/react';
import './node.css';
import { Button, Tooltip } from 'antd';
import { usePipelineContext } from '@/pages/pipeline/pipeline/pipelineUtil/context.tsx';
import { OperateEnum } from '@/utils/enum.ts';

function index({ id, data, isConnectable }) {

  const { nodeClickFn, pipelineOpenType } = usePipelineContext();

  const handleContextMenu = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      {pipelineOpenType !== OperateEnum.detail &&
        <Tooltip title={<div>
          <div><Button type={'link'} onClick={() => {
            nodeClickFn('添加子阶段', id);
          }}>添加阶段</Button></div>
        </div>}
                 trigger={['contextMenu', 'click']} placement={'right'}
        >
          <div className="text-updater-node my-node"
               style={{ backgroundColor: '#c7e8a9', height: '100%', textAlign: 'center', lineHeight: '40px' }}
               onContextMenu={handleContextMenu}
          >
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} style={{ opacity: 0 }} />
            <div className="nodrag">
              <div>
                {data.label}
              </div>
            </div>
            <Handle type="source" position={Position.Right} isConnectable={isConnectable} style={{ opacity: 0 }} />
          </div>
        </Tooltip>

      }
      {
        pipelineOpenType === OperateEnum.detail &&
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
      }
    </div>
  )
    ;
}

export default index;
