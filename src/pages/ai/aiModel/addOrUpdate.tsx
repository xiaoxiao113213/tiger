import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, message, Select } from 'antd';
import { AiModelDetailVo } from './ApiBo';
import { aiModelGetOneApi, aiModelSaveApi, aiModelUpdateApi } from './api';
import { OperateEnum } from '@/utils/enum.ts';
import { getNullBo } from '@/utils/utils.ts';
import { Rst } from '@/utils/baseBo.ts';


type Props = {
  detailId: number
  operateEnum: OperateEnum
  setAddOrUpdateModalFn: React.Dispatch<React.SetStateAction<OperateEnum>>,
  reloadTable: () => void
};
const AddOrUpdate = (props: Props) => {
  const [formRef] = Form.useForm<AiModelDetailVo>();
  const [detail, setDetailFn] = useState<AiModelDetailVo>(getNullBo);

  const initMyDataFn = async () => {
    if (props.operateEnum === OperateEnum.edit) {
      let rst = await aiModelGetOneApi({ aiModelId: props.detailId });
      setDetailFn(rst.data);
      formRef.setFieldsValue(rst.data);
    } else {
      formRef.setFieldsValue({ sort: 0 });
    }
  };

  const saveFn = async () => {

    const isPass = await formRef.validateFields().catch(() => false);
    if (!isPass) return;

    const values = await formRef?.getFieldsValue();
    let res: Rst<any>;
    if (props.operateEnum === OperateEnum.edit) {
      res = await aiModelUpdateApi({ ...values, aiModelId: props.detailId });
    } else {
      res = await aiModelSaveApi({ ...values });
    }
    if (res.code !== 1000) return;
    message.success(res.msg);
    props.reloadTable();
    props.setAddOrUpdateModalFn(OperateEnum.close);

  };

  const closeModal = () => {
    props.setAddOrUpdateModalFn(OperateEnum.close);
  };


  useEffect(() => {
    initMyDataFn();
    return () => {
    };
  }, []); // 第二个参数表示依赖项


  return (
    <div>
      <Form form={formRef}
            labelCol={{ flex: '10%' }}
            wrapperCol={{ flex: '90%' }}>
        <Form.Item label="所属平台" name="belong" rules={[{ required: true }]}>
          <Select options={
            [
              { label: '通义千问', value: '通义千问' },
              { label: 'deepseek', value: 'deepseek' },
            ]
          } />
        </Form.Item>
        <Form.Item label="模型类型" name="type" rules={[{ required: true }]}>
          <Select options={[
            { label: '文本生成', value: '文本生成' },
            { label: '视频理解', value: '视频理解' },
            { label: '视频生成', value: '视频生成' },
            { label: '图片处理', value: '图片处理' },
            { label: '图片理解', value: '图片理解' },
            { label: '图片生成', value: '图片生成' },
            { label: '向量模型', value: '向量模型' },
            { label: '语音合成', value: '语音合成' },
            { label: '语音识别', value: '语音识别' },
          ]}
                  mode={'multiple'}
                  maxLength={1}
                  maxCount={1}
          />
        </Form.Item>

        <Form.Item label="名称" name="name" rules={[{ required: true }]}>
          <Input placeholder="请输入" maxLength={200} showCount />
        </Form.Item>
        <Form.Item label="模型编码" name="code" rules={[{ required: true }]}>
          <Input placeholder="请输入" maxLength={200} showCount />
        </Form.Item>
        <Form.Item label="上下文长度" name="contextLength" rules={[{ required: true }]}>
          <InputNumber placeholder="请输入" />
        </Form.Item>
        <Form.Item label="最大输入量" name="maxInput" rules={[{ required: true }]}>
          <InputNumber placeholder="请输入" />
        </Form.Item>
        <Form.Item label="最大输出量" name="maxOutput" rules={[{ required: true }]}>
          <InputNumber placeholder="请输入" />
        </Form.Item>
        <Form.Item label="排序" name="sort" rules={[{ required: false }]}>
          <InputNumber placeholder="请输入" />
        </Form.Item>
        <Form.Item label="说明" name="remarks" rules={[{ required: false }]}>
          <Input.TextArea placeholder="请输入" maxLength={2000} showCount />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ textAlign: 'right' }}>
          <Button type="default" onClick={closeModal} style={{ marginRight: 20 }}>
            取消
          </Button>
          <Button type="primary" onClick={saveFn}>
            确定
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddOrUpdate;