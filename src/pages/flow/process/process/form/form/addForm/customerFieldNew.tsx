import React from 'react';
import { Form, Radio, RadioChangeEvent } from 'antd';
import CustomerText from '@/pages/flow/process/process/form/form/addForm/customerNew/customerText';
import CustomerTextArea from '@/pages/flow/process/process/form/form/addForm/customerNew/customerTextArea';
import CustomerSelect from '@/pages/flow/process/process/form/form/addForm/customerNew/customerSelect';
import CustomerMutSelect from '@/pages/flow/process/process/form/form/addForm/customerNew/customerMutSelect';
import CustomerFile from '@/pages/flow/process/process/form/form/addForm/customerNew/CustomerFile';
import CustomerDate from '@/pages/flow/process/process/form/form/addForm/customerNew/CustomerDate';
import CustomerNumber from '@/pages/flow/process/process/form/form/addForm/customerNew/customerNumber.tsx';
import { CustomerFieldBo, FormFieldTypeEnum } from '@/pages/flow/process/process/form/form/Bo.tsx';


const CustomerField = (props: {
  initFieldBo: CustomerFieldBo,
  isEditScope?: boolean; // 是否可以编辑scope 的操作，当流水线全局参数的时候 不可以编辑插件中带出来的全局参数
}) => {
  const { initFieldBo, isEditScope } = props;

  const validateString = (str: string) => {
    // 正则表达式检查字符串是否以字母开头，且仅包含字母、数字和下划线
    let regex = /^[a-zA-Z][_a-zA-Z0-9]*$/;
    return regex.test(str);
  };

  return (
    <div>

      <Form.Item
        label="类型" name="type"
        rules={[{ required: true, message: 'Please input' }]}
      >
        <Radio.Group onChange={(e: RadioChangeEvent) => {
        }}
                     disabled={true}
        >
          {initFieldBo.type == FormFieldTypeEnum.text && <Radio value={FormFieldTypeEnum.text}>文本</Radio>}
          {initFieldBo.type == FormFieldTypeEnum.number && <Radio value={FormFieldTypeEnum.number}>数字</Radio>}
          {initFieldBo.type == FormFieldTypeEnum.textArea && <Radio value={FormFieldTypeEnum.textArea}>文本域</Radio>}
          {initFieldBo.type == FormFieldTypeEnum.select && <Radio value={FormFieldTypeEnum.select}>下拉单选</Radio>}
          {initFieldBo.type == FormFieldTypeEnum.mutSelect && <Radio value={FormFieldTypeEnum.mutSelect}>下拉多选框</Radio>}
          {initFieldBo.type == FormFieldTypeEnum.file && <Radio value={FormFieldTypeEnum.file}>文件</Radio>}
          {initFieldBo.type == FormFieldTypeEnum.date && <Radio value={FormFieldTypeEnum.date}>时间</Radio>}
        </Radio.Group>
      </Form.Item>
      {FormFieldTypeEnum.text === initFieldBo?.type &&
        <CustomerText initFieldBo={initFieldBo} key={initFieldBo.id} isEditScope={isEditScope}
        ></CustomerText>
      }
      {
        FormFieldTypeEnum.textArea === initFieldBo?.type &&
        <CustomerTextArea initFieldBo={initFieldBo} key={initFieldBo.id} isEditScope={isEditScope}
        ></CustomerTextArea>
      }
      {
        FormFieldTypeEnum.select === initFieldBo?.type &&
        <CustomerSelect initFieldBo={initFieldBo} key={initFieldBo.id} isEditScope={isEditScope}
        ></CustomerSelect>
      }
      {
        FormFieldTypeEnum.mutSelect === initFieldBo?.type &&
        <CustomerMutSelect initFieldBo={initFieldBo} key={initFieldBo.id} isEditScope={isEditScope}
        ></CustomerMutSelect>
      }
      {
        FormFieldTypeEnum.file === initFieldBo?.type &&
        <CustomerFile initFieldBo={initFieldBo} key={initFieldBo.id} isEditScope={isEditScope}
        ></CustomerFile>
      }
      {
        FormFieldTypeEnum.date === initFieldBo?.type &&
        <CustomerDate initFieldBo={initFieldBo} key={initFieldBo.id + initFieldBo.dateType} isEditScope={isEditScope}
        ></CustomerDate>
      }
      {
        FormFieldTypeEnum.number === initFieldBo?.type &&
        <CustomerNumber initFieldBo={initFieldBo} key={initFieldBo.id} isEditScope={isEditScope}
        ></CustomerNumber>
      }
    </div>
  );
};

export default CustomerField;

