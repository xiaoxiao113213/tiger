import { useEffect, useRef, useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import './text-updater-node.css';

// 条件的其他情况
function OtherConditionNode({ id, data, isConnectable }) {
  const { getNode } = useReactFlow();
  const [edit, setEditFn] = useState<boolean>(false);
  const [label, setLabel] = useState(data.label);
  const inputRef = useRef<HTMLInputElement>(null);
  // console.log('数据值', id, data, getNode(id));
  useEffect(() => {
    if (edit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [edit]);
  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div className="nodrag" style={{ width: 150 }}>
        <div>
          <label htmlFor="text" style={{ height: 15, fontSize: 10, display: 'flex' }}>
            <span style={{ flex: 5 }}>其他条件</span>
          </label>
          <hr style={{ marginTop: 0 }}></hr>
          <label htmlFor="text" style={{ height: 15, fontSize: 15, display: 'flex' }}>
            <span style={{ flex: 1 }}>都不满足就会走这里</span>
          </label>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  );
}

export default OtherConditionNode;
