import React, { useEffect, useRef, useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import './text-updater-node.css';
import { DeleteTwoTone, EditTwoTone, RightCircleTwoTone } from '@ant-design/icons';
import { MyContext } from '@/pages/flow/process/process/uilts';
import { Drawer, Modal } from 'antd';
import { processPointDeleteApi, processPointUpdateApi } from '@/pages/flow/process/process/api/pointApi';
import { checkApiRst } from '@/utils/utils.ts';
import { OperateEnum } from '@/utils/enum.ts';
import ConditionNodeEdit from '@/pages/flow/process/process/edit/ConditionNodeEdit.tsx';


function ConditionNode({ id, data, isConnectable }) {
  const { getNode } = useReactFlow();
  const [modal, setModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [edit, setEditFn] = useState<boolean>(false);
  const [label, setLabel] = useState(data.label);
  const inputRef = useRef<HTMLInputElement>(null);

  const myContext = React.useContext(MyContext);
  const delPoint = async () => {
    Modal?.confirm({
      title: '是否确认删除',
      // content: item.account,
      icon: null,
      onOk: async () => {
        let rst = await processPointDeleteApi({ processPointId: id });
        if (checkApiRst(rst)) {
          return;
        }
        myContext.initData();
      },
    });
  };
  const updateLabel = () => {
    let newLabel = inputRef.current?.value || label;
    setLabel(newLabel);
    data.label = newLabel;
    setEditFn(false);
    processPointUpdateApi({ processPointId: id, name: newLabel });
  };


  useEffect(() => {
    if (edit && inputRef.current) {
      inputRef.current.focus();
      const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          try {
            inputRef.current.removeEventListener('keydown', handleKeyDown);
          } catch (e) {
          }
          updateLabel();
        }
      };
      inputRef.current.addEventListener('keydown', handleKeyDown);
      // Clean up event listener on component unmount or when edit mode is disabled
      return () => {
        try {
          inputRef.current.removeEventListener('keydown', handleKeyDown);
        } catch (e) {
        }
      };
    }
  }, [edit]);
  return (
    <div className="text-updater-node" style={{ backgroundColor: '#efcfae' }}>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div className="nodrag" style={{ width: 150 }}>
        <div>
          <label htmlFor="text" style={{ height: 15, fontSize: 10, display: 'flex' }}>
            {!edit &&
              <span style={{ flex: 5 }}>{label}<EditTwoTone onClick={() => {
                setEditFn(true);
              }} /></span>
            }
            {
              edit &&
              <span style={{ flex: 1 }}>
                                <input
                                  defaultValue={label}
                                  onBlur={() => {
                                    updateLabel();
                                  }}
                                  ref={inputRef}
                                /></span>
            }
            <span style={{ flex: 1, textAlign: 'right' }}>
                            <DeleteTwoTone
                              onClick={delPoint}
                            />
                        </span>
          </label>
          <hr style={{ marginTop: 0 }}></hr>
          <label htmlFor="text" style={{ height: 15, fontSize: 15, display: 'flex' }}>
            <span style={{ flex: 1, color: 'blue' }}>设置条件</span>
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
        width={'70%'}
        destroyOnClose={true}
        maskClosable={false}
        onClose={() => setModalFn(OperateEnum.close)}
        footer={null}
      >
        <div>
          <ConditionNodeEdit processPointId={id} closeSelf={() => {
            setModalFn(OperateEnum.close);
          }}></ConditionNodeEdit>
        </div>
      </Drawer>
    </div>
  );
}

export default ConditionNode;
