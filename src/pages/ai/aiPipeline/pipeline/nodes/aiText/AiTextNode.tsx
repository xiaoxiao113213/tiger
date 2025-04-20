import React, { useEffect, useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { Button, Drawer, Form, Input, Popover, Select, Switch, Tag } from 'antd';
import { OperateEnum } from '@/utils/enum.ts';
import { AiPipelinePointDetailVo, useAiContext } from '@/pages/ai/aiPipeline/api/ApiBo.ts';
import { aiPipelinePointDeleteApi, aiPipelinePointGetOneApi, aiPipelinePointUpdateApi } from '@/pages/ai/aiPipeline/api/pointApi.tsx';
import QwenTextDic from '@/components/Dic/QwenTextDic.ts';
import InputForm from '@/pages/ai/aiPipeline/pipeline/component/inputForm.tsx';
import { getInputAllByPointApi } from '@/pages/ai/aiPipeline/api/varApi.tsx';
import { OptionVo } from '@/utils/DicVo.ts';
import OutputForm from './outputForm.tsx';
import { DeleteOutlined } from '@ant-design/icons';

function AiTextNode({ id, isConnectable }) {
  const { getNode, deleteElements } = useReactFlow();
  const { deleteNode } = useAiContext();
  const [modal, setModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [inputVarList, setInputVarList] = useState<OptionVo[]>([]);

  const [point, setPoint] = useState<AiPipelinePointDetailVo>();
  const { QwenTextList } = QwenTextDic();

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
        width={'1200px'}
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
                <Select options={QwenTextList} placeholder="请选择" defaultValue={point?.model}
                        onChange={(e) => {
                          point.model = e;
                          updatePoint({ aiPipelinePointId: id, model: e });
                        }}
                />
              </Form.Item>
              <Form.Item label="对话历史" name="isHistory" rules={[{ required: true }]} tooltip={'开启后Ai聊天中的聊天历史会自动带入'}>
                <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultValue={point.isHistory == '1'}
                        onChange={(e) => {
                          point.isHistory = e ? '1' : '0';
                          updatePoint({ aiPipelinePointId: id, isHistory: e ? '1' : '0' });
                        }}
                />
              </Form.Item>
              <div style={{ marginBottom: '10px' }}>
                <InputForm point={point}
                           getDetail={getDetail}
                           inputVarList={inputVarList}
                />
              </div>

              <Form.Item label="系统提示词" name="systemPrompt" rules={[{ required: false }]}>
                <Input.TextArea placeholder="系统提示词,可以使用{{变量名}}、{{变量名.子变量名}}、{{变量名[数组索引]}}的方式引用输入参数中的变量" showCount
                                autoSize={{ minRows: 3, maxRows: 5 }}
                                defaultValue={point.systemPrompt}
                                onChange={(e) => {
                                  point.systemPrompt = e.target.value;
                                  updatePoint({ aiPipelinePointId: id, systemPrompt: e.target.value });
                                }}
                />
              </Form.Item>
              <Form.Item label="用户输入" name="userPrompt" rules={[{ required: true }]} tooltip={'本次调用的用户角色输入内容'}>
                <Input.TextArea placeholder="输入,可以使用{{变量名}}、{{变量名.子变量名}}、{{变量名[数组索引]}}的方式引用输入参数中的变量" showCount
                                autoSize={{ minRows: 3, maxRows: 5 }}
                                defaultValue={point.userPrompt}
                                onChange={(e) => {
                                  point.userPrompt = e.target.value;
                                  updatePoint({ aiPipelinePointId: id, userPrompt: e.target.value });
                                }}
                />
              </Form.Item>
              <Tag className={'mmm-margin-top-bottom-10'} bordered={false} color="magenta">当输出参数只有一个 且此参数是在结束节点关联的唯一一个输出 那么可以进行流式调用</Tag>
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


export default AiTextNode;
