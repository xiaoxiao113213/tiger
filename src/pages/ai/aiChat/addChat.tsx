import { Button, Form, Input, InputNumber, Radio, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { AiChatDetailVo, aiChatSaveApi } from '@/pages/ai/aiChat/api/AiChatApi.tsx';
import ChatModelDic from '@/components/Dic/ChatModelDic.ts';
import { aiPipelineAllApi } from '@/pages/ai/aiPipeline/api/api.tsx';
import { AiPipelineDetailVo } from '@/pages/ai/aiPipeline/api/ApiBo.ts';
import AddChatRole from '@/pages/ai/aiChat/addChatRole.tsx';

const AddChat = (props: { callback: (chat: AiChatDetailVo) => void }) => {
  const [formRef] = Form.useForm<AiChatDetailVo>();
  const { ChatModelList } = ChatModelDic({ type: '文本生成' });
  const [aiPipelineList, setAiPipelineList] = useState<AiPipelineDetailVo[]>();
  const [type, setType] = useState('Model');
  const [audioType, setAudioType] = useState();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    aiPipelineAllApi({}).then((res) => {
      setAiPipelineList(res.data);
    });
  }, []);

  const add = async () => {
    const isPass = await formRef.validateFields().catch(() => false);
    if (!isPass) return;
    const values = await formRef?.getFieldsValue();
    const livePortrait = {};
    livePortrait.livePortraitTemplateId = values.livePortraitTemplateId || 'normal';
    livePortrait.livePortraitEyeMoveFreq = values.livePortraitEyeMoveFreq || 0.5;
    livePortrait.livePortraitMouthMoveStrength = values.livePortraitMouthMoveStrength || 1;
    livePortrait.livePortraitPasteBack = values.livePortraitPasteBack || true;
    values.livePortrait = livePortrait;
    values.userList = userList

    const rst = await aiChatSaveApi(values);
    props.callback(rst.data);
  };

  return (
    <div>
      <Form initialValues={{ type: 'Model' }} autoComplete="off" form={formRef}>
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
          rules={[{ required: true, message: '请选择类型' }]}
        >
          <Radio.Group
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <Radio value={'Model'}>大模型</Radio>
            {/*<Radio value={'Pipeline'}>流水线</Radio>*/}
            {/*<Radio value={'Audio'}>语音合成</Radio>*/}
            {/*<Radio value={'LivePortrait'}>灵动人像</Radio>*/}
            <Radio value={'Role'}>多角色</Radio>
          </Radio.Group>
        </Form.Item>

        {type === 'Model' && (
          <>
            <Form.Item<AiChatDetailVo>
              label="模型"
              name="model"
              rules={[{ required: true, message: '模型需要必选' }]}
            >
              <Select options={ChatModelList} />
            </Form.Item>
            <Form.Item<AiChatDetailVo> label="系统提示词" name="systemPrompt">
              <Input.TextArea
                showCount
                maxLength={2000}
                allowClear
                placeholder={'请输出系统提示词'}
                autoSize={{ minRows: 3, maxRows: 50 }}
              />
            </Form.Item>
          </>
        )}

        {type === 'Pipeline' && (
          <>
            <Form.Item<AiChatDetailVo>
              label="流水线"
              name="aiPipelineId"
              rules={[{ required: true, message: '流水线需要必选' }]}
            >
              <Select
                options={aiPipelineList?.map((item) => {
                  return { label: item.name, value: item.aiPipelineId };
                })}
              />
            </Form.Item>
          </>
        )}

        {(type === 'Audio' || type == 'LivePortrait') && (
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
            {audioType && (
              <Form.Item<AiChatDetailVo>
                label="音色选择"
                name="voice"
                rules={[{ required: true, message: '必选' }]}
              >
                {audioType === 'CosyVoice' && <Select options={CosyVoice} />}
                {audioType === 'Sambert' && <Select options={SambertVoice} />}
              </Form.Item>
            )}
          </>
        )}
        {type === 'LivePortrait' && (
          <>
            <p style={{ color: 'red', marginBottom: '10px' }}>
              语音合成模型，支持灵动人像功能，可实现人像动态表情、语音合成、语音转文字等功能。
              图片文件格式支持：jpeg、jpg、png、bmp、webp。
              图像文件&lt;10M，宽高比≤2，最大边长≤4096。
            </p>
            <Form.Item<AiChatDetailVo>
              label="模板"
              name="livePortraitTemplateId"
              rules={[{ required: true, message: '请选择' }]}
              initialValue={'normal'}
            >
              <Select
                options={[
                  { label: '头部动作幅度适中。适用于多种场景', value: 'normal' },
                  { label: '人物表现平静，头部动作幅度较小。推荐用于播报等场景', value: 'calm' },
                  { label: '人物表现活泼，头部动作幅度较大。推荐用于演唱等场景', value: 'active' },
                ]}
              />
            </Form.Item>
            <Form.Item<AiChatDetailVo>
              label="每秒眨眼数"
              name="livePortraitEyeMoveFreq"
              rules={[{ required: true }]}
              initialValue={0.5}
              tooltip={'每秒眨眼次数，可设值为0-1，值越大眨眼频率越高。默认值为0.5。'}
            >
              <InputNumber min={0} max={1} step={0.1} precision={1} />
            </Form.Item>
            <Form.Item<AiChatDetailVo>
              label="嘴部动作的幅度大小"
              name="livePortraitMouthMoveStrength"
              rules={[{ required: true }]}
              initialValue={1}
              tooltip={
                '嘴部动作的幅度大小，可设值为0-1.5，值越大嘴型越大。若设为0则嘴部无动作。默认值为1。'
              }
            >
              <InputNumber min={0} max={1.5} step={0.1} precision={1} />
            </Form.Item>
            <Form.Item<AiChatDetailVo>
              label="生成的人脸是否贴回原图"
              name="livePortraitPasteBack"
              rules={[{ required: true }]}
              initialValue={true}
              tooltip={
                '生成的人脸是否贴回原图，可设值为是或否。若设为否则仅输出生成的人脸，忽略人物身体。默认值为是'
              }
            >
              <Radio.Group>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </Form.Item>
          </>
        )}

        {type === 'Role' && (
          <>
            <Form.Item<AiChatDetailVo>
              label="案情背景"
              name="remarks"
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize={{minRows: 3, maxRows: 8}} />
            </Form.Item>
            <AddChatRole
              callback={(userList1) => setUserList(userList1)}
              userList={userList}
            ></AddChatRole>
          </>
        )}

        <Form.Item label={null}>
          <Button type="primary" onClick={add}>
            确认
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export const CosyVoice = [
  { label: '龙小淳', value: 'longxiaochun' },
  { label: '龙小夏', value: 'longxiaoxia' },
  { label: '龙小诚', value: 'longxiaocheng' },
  { label: '龙小白', value: 'longxiaobai' },
  { label: '龙老铁', value: 'longlaotie' },
  { label: '龙书', value: 'longshu' },
  { label: '龙硕', value: 'longshuo' },
  { label: '龙婧', value: 'longjing' },
  { label: '龙妙', value: 'longmiao' },
  { label: '龙悦', value: 'longyue' },
  { label: '龙媛', value: 'longyuan' },
  { label: '龙飞', value: 'longfei' },
  { label: '龙杰力豆', value: 'longjielidou' },
  { label: '龙彤', value: 'longtong' },
  { label: '龙祥', value: 'longxiang' },
  { label: 'Stella', value: 'loongstella' },
  { label: 'Bella', value: 'loongbella' },
];
export const SambertVoice = [
  { label: '知楠', value: 'sambert-zhinan-v1' },
  { label: '知琪', value: 'sambert-zhiqi-v1' },
  { label: '知厨', value: 'sambert-zhichu-v1' },
  { label: '知德', value: 'sambert-zhide-v1' },
  { label: '知佳', value: 'sambert-zhijia-v1' },
  { label: '知茹', value: 'sambert-zhiru-v1' },
  { label: '知倩', value: 'sambert-zhiqian-v1' },
  { label: '知祥', value: 'sambert-zhixiang-v1' },
  { label: '知薇', value: 'sambert-zhiwei-v1' },
  { label: '知浩', value: 'sambert-zhihao-v1' },
  { label: '知婧', value: 'sambert-zhijing-v1' },
  { label: '知茗', value: 'sambert-zhiming-v1' },
  { label: '知墨', value: 'sambert-zhimo-v1' },
  { label: '知娜', value: 'sambert-zhina-v1' },
  { label: '知树', value: 'sambert-zhishu-v1' },
  { label: '知莎', value: 'sambert-zhistella-v1' },
  { label: '知婷', value: 'sambert-zhiting-v1' },
  { label: '知笑', value: 'sambert-zhixiao-v1' },
  { label: '知雅', value: 'sambert-zhiya-v1' },
  { label: '知晔', value: 'sambert-zhiying-v1' },
  { label: '知媛', value: 'sambert-zhiyuan-v1' },
  { label: '知悦', value: 'sambert-zhiyue-v1' },
  { label: '知柜', value: 'sambert-zhigui-v1' },
  { label: '知硕', value: 'sambert-zhishuo-v1' },
  { label: '知妙（多情感）', value: 'sambert-zhimiao-emo-v1' },
  { label: '知猫', value: 'sambert-zhimao-v1' },
  { label: '知伦', value: 'sambert-zhilun-v1' },
  { label: '知飞', value: 'sambert-zhifei-v1' },
  { label: '知达', value: 'sambert-zhida-v1' },
  { label: 'Camila', value: 'sambert-camila-v1' },
  { label: 'Perla', value: 'sambert-perla-v1' },
  { label: 'Indah', value: 'sambert-indah-v1' },
  { label: 'Clara', value: 'sambert-clara-v1' },
  { label: 'Hanna', value: 'sambert-hanna-v1' },
  { label: 'Beth', value: 'sambert-beth-v1' },
  { label: 'Betty', value: 'sambert-betty-v1' },
  { label: 'Cally', value: 'sambert-cally-v1' },
  { label: 'Cindy', value: 'sambert-cindy-v1' },
  { label: 'Eva', value: 'sambert-eva-v1' },
  { label: 'Donna', value: 'sambert-donna-v1' },
  { label: 'Brian', value: 'sambert-brian-v1' },
  { label: 'Waan', value: 'sambert-waan-v1' },
];

export default AddChat;
