import React, { useEffect, useRef, useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import './text-updater-node.css';
import { DeleteTwoTone, EditTwoTone, RightCircleTwoTone } from '@ant-design/icons';
import { MyContext } from '@/pages/flow/process/process/uilts';
import { Drawer, Modal, Tooltip } from 'antd';
import { processPointDeleteApi, processPointUpdateApi } from '@/pages/flow/process/process/api/pointApi';
import { checkApiRst } from '@/utils/utils.ts';
import { OperateEnum } from '@/utils/enum.ts';
import HandleNodeEdit from '@/pages/flow/process/process/edit/HandleNodeEdit.tsx';


function HandleNode({ id, data, isConnectable }) {
  const { getNode } = useReactFlow();
  const [modal, setModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [edit, setEditFn] = useState<boolean>(false);
  const [label, setLabel] = useState(data.label);
  const inputRef = useRef<HTMLInputElement>(null);
  // console.log('数据值', id, data, getNode(id));
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
            inputRef.current?.removeEventListener('keydown', handleKeyDown);
          } catch (e) {
          }
          updateLabel();
        }
      };
      inputRef.current.addEventListener('keydown', handleKeyDown);
      // Clean up event listener on component unmount or when edit mode is disabled
      return () => {
        try {
          inputRef.current?.removeEventListener('keydown', handleKeyDown);
        } catch (e) {
        }
      };
    }
  }, [edit]);
  return (
    <div className="text-updater-node" style={{ backgroundColor: '#d0aeef' }}>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div className="nodrag" style={{ width: 150 }}>
        <div>
          <label htmlFor="text" style={{ height: 15, fontSize: 10, display: 'flex' }}>

            {!edit &&
              <Tooltip placement="top" title={label}>


              <span style={{ flex: 5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}<EditTwoTone onClick={() => {
                setEditFn(true);
              }} /></span>
              </Tooltip>
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
            <span style={{ flex: 1, color: 'blue' }}>设置办理人</span>
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
          <HandleNodeEdit processPointId={id} closeSelf={() => {
            setModalFn(OperateEnum.close);
          }}></HandleNodeEdit>
        </div>
      </Drawer>


    </div>
  );
}

export default HandleNode;
