import React from 'react';
import { DatePicker, Form, Input, Radio } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import 'dayjs/locale/zh-cn';
import { CustomerFieldBo, DateTypeEnum } from '@/pages/flow/process/process/form/form/Bo.tsx';


// 文本组件
const CustomerDate = (props: {
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
        <Input placeholder="需以字母开头 仅支持特殊字符_ " maxLength={12} showCount={true} disabled={props.initFieldBo.notEditKeyName === true} />
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
        label="是否必填" name="dateType"
        rules={[{ required: true, message: 'Please input' }]}
      >
        <Radio.Group>
          <Radio value={DateTypeEnum.year}> 年</Radio>
          <Radio value={DateTypeEnum.yearMonth}> 年-月 </Radio>
          <Radio value={DateTypeEnum.yearMonthDay}> 年-月-日 </Radio>
          <Radio value={DateTypeEnum.yearMonthDayHour}> 年-月-日 时</Radio>
          <Radio value={DateTypeEnum.yearMonthDayHourMinuteSecond}> 年-月-日 时-分-秒</Radio>
          <Radio value={DateTypeEnum.hourMinuteSecond}> 时-分-秒</Radio>
        </Radio.Group>
      </Form.Item>


      {props.initFieldBo.dateType === DateTypeEnum.year &&
        <Form.Item
          label="参数默认值" name="value"
          rules={[{ required: false, message: 'Please input' }]}
        >
          <DatePicker format="YYYY" picker="year"
                      onChange={(date, dateString) => {

                      }}
          />
        </Form.Item>
      }

      {props.initFieldBo.dateType === DateTypeEnum.yearMonth &&
        <Form.Item
          label="参数默认值" name="value"
          rules={[{ required: false, message: 'Please input' }]}
        >
          <DatePicker format="YYYY-MM" picker="month"
                      onChange={(date, dateString) => {

                      }}
          />
        </Form.Item>
      }
      {
        props.initFieldBo.dateType === DateTypeEnum.yearMonthDay &&
        <Form.Item
          label="参数默认值" name="value"
          rules={[{ required: false, message: 'Please input' }]}
        >
          <DatePicker format="YYYY-MM-DD" picker="date"
                      onChange={(date, dateString) => {

                      }}
                      placeholder={'请选择年-月-日'}
          />
        </Form.Item>
      }
      {
        props.initFieldBo.dateType === DateTypeEnum.yearMonthDayHour &&
        <Form.Item
          label="参数默认值" name="value"
          rules={[{ required: false, message: 'Please input' }]}
        >
          <DatePicker format="YYYY-MM-DD HH" picker="date"
                      showTime={{ format: 'HH' }}
                      onChange={(date, dateString) => {

                      }}
                      placeholder={'请选择年-月-日-时'}
          />
        </Form.Item>
      }
      {
        props.initFieldBo.dateType === DateTypeEnum.yearMonthDayHourMinuteSecond &&
        <Form.Item
          label="参数默认值" name="value"
          rules={[{ required: false, message: 'Please input' }]}
        >
          <DatePicker format="YYYY-MM-DD HH:mm:ss" picker="date"
                      showTime={{ format: 'HH:mm:ss' }}
                      onChange={(date, dateString) => {

                      }}
                      placeholder={'请选择年-月-日-时'}
          />
        </Form.Item>
      }
      {
        props.initFieldBo.dateType === DateTypeEnum.hourMinuteSecond &&
        <Form.Item
          label="参数默认值" name="value"
          rules={[{ required: false, message: 'Please input' }]}
        >
          <DatePicker format="HH:mm:ss" picker="time"
                      onChange={(date, dateString) => {

                      }}
          />
        </Form.Item>
      }

      <Form.Item
        label="参数说明" name="desc"
        rules={[{ required: false, message: 'Please input' }]}
      >
        <TextArea
          autoSize={{ minRows: 2 }}
          placeholder="请输入"
        />
      </Form.Item>

    </div>
  );
};
export default CustomerDate;