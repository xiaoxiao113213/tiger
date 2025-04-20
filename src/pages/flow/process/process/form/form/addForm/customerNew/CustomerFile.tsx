import React from 'react';
import { Form, Input, Radio } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { CustomerFieldBo } from '@/pages/flow/process/process/form/form/Bo.tsx';


// 文本组件
const CustomerFile = (props: {
  // 初始化的查询参数 可插入一些 写死的参数值  记得 必传id
  initFieldBo: CustomerFieldBo,
  isEditScope?: boolean; // 是否可以编辑scope 的操作，当流水线全局参数的时候 不可以编辑插件中带出来的全局参数
}) => {
  const isEditScope = props.isEditScope ?? true;

  return (
    <div>

      {props.initFieldBo.scope != undefined &&
        <Form.Item
          label="作用域" name="scope"
          rules={[{ required: true, message: 'Please input' }]}
          tooltip={{ title: '全局：整个流水线可用 局部：仅当插件点可用' }}
        >
          <Radio.Group disabled={!isEditScope}>
            <Radio value={1}> 全局 </Radio>
            <Radio value={0}> 局部 </Radio>
          </Radio.Group>
        </Form.Item>
      }
      <Form.Item
        label="标签名称" name="name"
        rules={[{ required: true, message: 'Please input' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="唯一标识" name="keyName"
        tooltip={'用于脚本中，需以字母开头 仅支持特殊字符_  '}
        rules={[{ required: true, message: 'Please input' }]}
      >
        <Input placeholder="需以字母开头 仅支持特殊字符_ " maxLength={12} showCount={true} disabled={props.initFieldBo.notEditKeyName === true}/>

      </Form.Item>

      <Form.Item
        label="是否必填" name="notNull"
        rules={[{ required: true, message: 'Please input' }]}
      >
        <Radio.Group>
          <Radio value={1}> 必填 </Radio>
          <Radio value={0}> 非必填 </Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="参数说明" name="desc"
        rules={[{ required: false, message: 'Please input' }]}
      >
        <TextArea autoSize={{ minRows: 2 }}
                  placeholder="请输入"
        />
      </Form.Item>

    </div>
  );
};
export default CustomerFile;