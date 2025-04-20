import React, { useEffect, useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import './text-updater-node.css';
import { RightCircleTwoTone } from '@ant-design/icons';
import { Drawer } from 'antd';
import { OperateEnum } from '@/utils/enum.ts';
import StartNodeEdit from '@/pages/flow/process/process/edit/StartNodeEdit';


function StartNode({ id, data, isConnectable }) {
  const { getNode } = useReactFlow();
  const [modal, setModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [label, setLabel] = useState(data.label);


  useEffect(() => {

  }, []);
  return (
    <div className="text-updater-node">

      <div className="nodrag" style={{ width: 150 }}>
        <div>
          <label htmlFor="text" style={{ height: 15, fontSize: 10, display: 'flex' }}>
            <span style={{ flex: 5 }}>提交人</span>
          </label>
          <hr style={{ marginTop: 0 }}></hr>
          <label htmlFor="text" style={{ height: 15, fontSize: 15, display: 'flex' }}>
            <span style={{ flex: 1, color: 'blue' }}>设置</span>
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
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />

      <Drawer
        title={'设置'}
        open={modal !== OperateEnum.close}
        width={'100%'}
        destroyOnClose={true}
        maskClosable={false}
        onClose={() => setModalFn(OperateEnum.close)}
        footer={null}
      >
        <div>
          <StartNodeEdit processPointId={id} closeSelf={() => {
            setModalFn(OperateEnum.close);
          }}></StartNodeEdit>
        </div>
      </Drawer>

    </div>
  );
}

export default StartNode;
