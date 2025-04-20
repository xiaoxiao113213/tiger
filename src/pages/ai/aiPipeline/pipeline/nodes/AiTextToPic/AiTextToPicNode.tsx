import React, { useEffect, useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { Button, Drawer, Form, Input, Popover, Select, Tag } from 'antd';
import { OperateEnum } from '@/utils/enum.ts';
import { AiPipelinePointDetailVo, useAiContext } from '@/pages/ai/aiPipeline/api/ApiBo.ts';
import { aiPipelinePointDeleteApi, aiPipelinePointGetOneApi, aiPipelinePointUpdateApi } from '@/pages/ai/aiPipeline/api/pointApi.tsx';
import InputForm from './inputForm.tsx';
import { getInputAllByPointApi } from '@/pages/ai/aiPipeline/api/varApi.tsx';
import { OptionVo } from '@/utils/DicVo.ts';
import OutputForm from './outputForm.tsx';
import { DeleteOutlined } from '@ant-design/icons';
import ChatModelDic from '@/components/Dic/ChatModelDic.ts';

function AiTextToPicNode({ id, isConnectable }) {
  const { getNode, deleteElements } = useReactFlow();
  const { deleteNode } = useAiContext();
  const [modal, setModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [inputVarList, setInputVarList] = useState<OptionVo[]>([]);

  const [point, setPoint] = useState<AiPipelinePointDetailVo>();
  const { ChatModelList } = ChatModelDic({ type: '图片生成' });

  const getDetail = async () => {
    const rst1 = await getInputAllByPointApi({ aiPipelinePointId: id });
    setInputVarList(rst1.data);
    const rst = await aiPipelinePointGetOneApi({ aiPipelinePointId: id });
    setPoint(rst.data);
  };
  useEffect(() => {
    getDetail();
  }, []);
  if (!point) {
    return <div>加载中...</div>;
  }


  const delPoint = async () => {
    await aiPipelinePointDeleteApi({ aiPipelinePointId: id });
    deleteNode(id);
  };

  const updatePoint = async (data: any) => {
    await aiPipelinePointUpdateApi(data);
  };

  return (
    <div>
      <Popover content={<Button icon={<DeleteOutlined />} type={'link'} onClick={delPoint}></Button>}
               placement={'topRight'}
               trigger={'contextMenu'}
      >
        <div style={{
          width: '150px',
          height: '40px',
          fontSize: '12px',
          cursor: 'pointer', // 添加鼠标指针样式
          backgroundColor: '#5ba6ea',
          borderRadius: '5px',
        }} onClick={async () => {
          await getDetail();
          setModalFn(OperateEnum.add);
        }}>
          <div>
          <span>
            {point?.title ?? '未命名'}
        </span>
          </div>
          <span>文本模型:<span>{point?.model}
          </span>
          </span>
        </div>
      </Popover>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} />

      <Drawer
        title={'设置'}
        open={modal !== OperateEnum.close}
        width={'800px'}
        zIndex={1000}
        destroyOnClose={true}
        maskClosable={true}
        onClose={() => setModalFn(OperateEnum.close)}
        footer={null}
      >
        <div style={{}}>
          {point &&
            <div style={{}}>
              <Form.Item label="标题" name="title" rules={[{ required: true }]}>
                <Input placeholder="请输入" defaultValue={point?.title} maxLength={20} showCount
                       onChange={(e) => {
                         point.title = e.target.value;
                         updatePoint({ aiPipelinePointId: id, title: e.target.value });
                       }}
                />
              </Form.Item>
              <Form.Item label="模型" name="model" rules={[{ required: true }]}>
                <Select options={ChatModelList} placeholder="请选择" defaultValue={point?.model}
                        onChange={(e) => {
                          point.model = e;
                          updatePoint({ aiPipelinePointId: id, model: e });
                        }}
                />
              </Form.Item>
              <div style={{ marginBottom: '10px' }}>
                <InputForm point={point}
                           getDetail={getDetail}
                           inputVarList={inputVarList}
                           notDeleteName={['awvh163ld']}
                />
              </div>
              <OutputForm point={point}
                          getDetail={getDetail}
                          inputVarList={inputVarList}
              />
            </div>
          }

        </div>
      </Drawer>

    </div>
  );
}


export default AiTextToPicNode;
