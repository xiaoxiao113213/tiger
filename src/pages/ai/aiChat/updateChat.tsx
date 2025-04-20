import { Button, Form, Input, Radio, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { AiChatDetailVo, aiChatGetOneApi, aiChatUpdateApi } from '@/pages/ai/aiChat/api/AiChatApi.tsx';
import ChatModelDic from '@/components/Dic/ChatModelDic.ts';
import { AiPipelineDetailVo } from '@/pages/ai/aiPipeline/api/ApiBo.ts';
import { aiPipelineAllApi } from '@/pages/ai/aiPipeline/api/api.tsx';
import { CosyVoice, SambertVoice } from '@/pages/ai/aiChat/addChat.tsx';


const UpdateChat = (props: {
  aiChatId: number;
  callback: (chat: AiChatDetailVo) => void;
}) => {
  const [formRef] = Form.useForm<AiChatDetailVo>();
  const { ChatModelList } = ChatModelDic();
  const [type, setType] = useState('Model');
  const [aiPipelineList, setAiPipelineList] = useState<AiPipelineDetailVo[]>();
  const [audioType, setAudioType] = useState();
  useEffect(() => {
    aiPipelineAllApi({}).then((res) => {
      setAiPipelineList(res.data);
    });
  }, []);
  useEffect(() => {
    aiChatGetOneApi({ aiChatId: props.aiChatId }).then(rst => {
      const values = { ...rst.data };
      setType(rst.data.type);
      if (rst.data.type === 'Model') {
        values.model = rst.data.model.model;
        values.systemPrompt = rst.data.model.systemPrompt;
      } else if (rst.data.type === 'Pipeline') {
        values.aiPipelineId = String(rst.data.pipeline.aiPipelineId);
      } else if (rst.data.type === 'Audio') {
        setAudioType(rst.data.audio.audioType);
        values.audioType = String(rst.data.audio.audioType);
        values.voice = String(rst.data.audio.voice);

      }
      formRef.setFieldsValue(values);
    });
  }, []);


  const update = async () => {
    const isPass = await formRef.validateFields().catch(() => false);
    if (!isPass) return;
    const values = await formRef?.getFieldsValue();
    const rst = await aiChatUpdateApi({ ...values, aiChatId: props.aiChatId });
    props.callback(rst.data);
  };

  return (
    <div>
      <Form
        initialValues={{ type: 'Model' }}
        autoComplete="off"
        form={formRef}
      >
        <Form.Item<AiChatDetailVo>
          label="标题"
          name="title"
          rules={[{ required: false, message: '标题' }]}
        >
          <Input showCount maxLength={30} allowClear placeholder={'请输出标题'} />
        </Form.Item>

        <Form.Item<AiChatDetailVo>
          label="类型"
          name="type"
          rules={[{ message: '请选择类型' }]}
        >
          <Radio.Group disabled={true}>
            <Radio value={'Model'}>大模型</Radio>
            <Radio value={'Pipeline'}>流水线</Radio>
            <Radio value={'Audio'}>语音合成</Radio>
          </Radio.Group>
        </Form.Item>
        {type === 'Model' &&
          <>
            <Form.Item<AiChatDetailVo>
              label="模型"
              name="model"
              rules={[{ message: '模型需要必选' }]}
            >
              <Select options={ChatModelList} disabled={true} />
            </Form.Item>

            <Form.Item<AiChatDetailVo>
              label="系统提示词"
              name="systemPrompt"
            >
              <Input.TextArea showCount maxLength={2000} allowClear placeholder={'请输出系统提示词'}
                              autoSize={{ minRows: 3, maxRows: 50 }}
              />
            </Form.Item>
          </>
        }
        {
          type === 'Pipeline' &&
          <Form.Item<AiChatDetailVo>
            label="流水线"
            name="aiPipelineId"
            rules={[{ required: true, message: '流水线需要必选' }]}
          >
            <Select
              disabled={true}
              options={aiPipelineList?.map((item) => {
              return { label: item.name, value: item.aiPipelineId };
            })} />
          </Form.Item>
        }
        {
          type === 'Audio' &&
          <>
            <Form.Item<AiChatDetailVo>
              label="音频类型"
              name="audioType"
              rules={[{ required: true, message: '音频地址需要必选' }]}
            >
              <Select
                options={[
                  { label: 'CosyVoice音色列表', value: 'CosyVoice' },
                  { label: 'Sambert音色列表', value: 'Sambert' },
                ]}
                onChange={(e) => {
                  setAudioType(e);
                }}
              />
            </Form.Item>
            {audioType &&
              <Form.Item<AiChatDetailVo>
                label="音色选择"
                name="voice"
                rules={[{ required: true, message: '必选' }]}
              >
                {
                  audioType === 'CosyVoice' &&
                  <Select options={CosyVoice} />
                }
                {
                  audioType === 'Sambert' &&
                  <Select options={SambertVoice} />
                }
              </Form.Item>
            }
          </>

        }

        <Form.Item label={null}>
          <Button type="primary" onClick={update}>
            确认
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateChat;