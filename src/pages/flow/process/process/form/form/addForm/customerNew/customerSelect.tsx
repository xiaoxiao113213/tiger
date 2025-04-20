import React from 'react';
import { Button, Divider, Form, Input, Radio, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { CustomerFieldBo } from '@/pages/flow/process/process/form/form/Bo.tsx';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';


// 文本组件
const CustomerSelect = (props: {
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
      <Divider>可选值</Divider>
      <Form.List name="optional">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div key={key} style={{ display: 'flex', width: '100%' }}>
                <Form.Item
                  {...restField}
                  name={[name, 'label']}
                  rules={[{ required: true, message: '请输入标签' }]}
                  style={{ flex: 2 }}
                >
                  <Input placeholder="请输入标签" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'value']}
                  rules={[{ required: true, message: '请输入标签对应的值' }]}
                  style={{ flex: 2, marginLeft: '8px' }}
                >
                  <Input placeholder="请输入标签对应的值" />
                </Form.Item>
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <MinusCircleOutlined
                    onClick={() => remove(name)}
                  />
                </div>
              </div>
            ))}
            <Form.Item>
              <Button type="dashed"
                      onClick={() => add({ label: '', value: '' })}
                      block icon={<PlusOutlined />}>
                添加可选值
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Divider></Divider>
      <br></br>

      <Form.Item
        label="参数默认值" name="value"
        rules={[{ required: false, message: 'Please input' }]}
      >
        <Select
          options={props.initFieldBo.optional}
          allowClear={true}
          placeholder={'请选择'}
        />
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
export default CustomerSelect;