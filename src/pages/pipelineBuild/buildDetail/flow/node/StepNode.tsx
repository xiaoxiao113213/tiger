import React from 'react';
import { Handle, Position } from '@xyflow/react';
import './node.css';
import { Button, Tooltip } from 'antd';
import { usePipelineBuildContext } from '@/pages/pipelineBuild/buildDetail/context.tsx';

function index({ id, data, isConnectable }) {
  const { nodeClickFn } = usePipelineBuildContext();
  const buildStatus = data.buildStatus;
  const handleContextMenu = (event) => {
    event.preventDefault();
  };
  // 动态设置类名
  const dynamicClassName = buildStatus === 8 || buildStatus === 9 ? 'mmm-content' : '';
  return (
    <Tooltip
      title={
        <div>
          <div><Button type={'link'}
                       onClick={() => {
                         nodeClickFn('日志', id);
                       }}

          >日志</Button></div>
          <div><Button type={'link'}
                       onClick={() => {
                         nodeClickFn('详情', id);
                       }}
          >详情</Button></div>
        </div>
      }
      trigger={['contextMenu', 'click']}
      placement={'right'}
    >
      <div className={`text-updater-node my-node ${dynamicClassName}`}
           style={{
             backgroundColor: data?.bgColor ?? '#c7e8a9',
             height: '100%',
             textAlign: 'center',
             lineHeight: '40px',
             borderRadius: 20,
           }}
           onContextMenu={handleContextMenu}
      >
        <Handle type="target" position={Position.Left} isConnectable={isConnectable} style={{ opacity: 0 }} />

        <div className="nodrag mmm-ellipsis">
          {data.label}
        </div>

      </div>
    </Tooltip>
  );
}

export default index;
