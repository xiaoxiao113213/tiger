import React, { useEffect, useRef, useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import './text-updater-node.css';
import { RightCircleTwoTone } from '@ant-design/icons';
import { Drawer } from 'antd';
import { OperateEnum } from '@/utils/enum.ts';
import EndNodeEdit from '@/pages/flow/process/process/edit/EndNodeEdit.tsx';


function EndNode({ id, data, isConnectable }) {
  const { getNode } = useReactFlow();
  const [modal, setModalFn] = useState<OperateEnum>(OperateEnum.close);
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
            <span style={{ flex: 5 }}>结束</span>
          </label>
          <hr style={{ marginTop: 0 }}></hr>
          <label htmlFor="text" style={{ height: 15, fontSize: 15, display: 'flex' }}>
            <span style={{ flex: 1, color: 'blue' }}>设置抄送人</span>
            <span style={{ flex: 1, textAlign: 'right' }}>
                        <RightCircleTwoTone
                          onClick={() => {
                            setModalFn(OperateEnum.edit);
                          }}
                        />
                        </span>
          </label>
        </div>
      </div>
      <Drawer
        title={'设置'}
        open={modal !== OperateEnum.close}
        width={'70%'}
        destroyOnClose={true}
        maskClosable={false}
        onClose={() => setModalFn(OperateEnum.close)}
        footer={null}
      >
        <div>
          <EndNodeEdit processPointId={id} closeSelf={() => {
            setModalFn(OperateEnum.close);
          }}></EndNodeEdit>
        </div>
      </Drawer>
    </div>
  );
}

export default EndNode;
