import { Button, Input, InputNumber, Select } from 'antd';
import { Form } from 'antd/lib';
import React, { useEffect, useState } from 'react';
import { getStartFormField, updatePointScript } from '@/pages/flow/process/process/api/processApi.tsx';
import { FormFieldTypeEnum } from '@/pages/flow/process/process/form/form/Bo.tsx';
import { ProcessPointFormFieldVo } from '@/pages/flow/process/process/api/ProcessPointFormFieldApiBo.ts';
import { processPointGetOneApi } from '@/pages/flow/process/process/api/pointApi.tsx';

const index = (props: {
  processPointId: number;
  closeSelf?: () => void;
}) => {
  const [form] = Form.useForm();
  const [flagSubmit, setFlagSubmit] = useState<string>('0');
  const [fieldList, setFieldList] = useState<ProcessPointFormFieldVo[]>([]);
  const initData = async () => {

    getStartFormField({ processPointId: props.processPointId }).then(rst => {
      const list = rst.data.filter((item) => {
        return item.type === FormFieldTypeEnum.number;
      });
      setFieldList(list);

      // form.setFieldsValue(rst.data);
    });
    let s = await processPointGetOneApi({ processPointId: props.processPointId });
    form.setFieldsValue(s.data.script);

  };
  useEffect(() => {
    initData();
  }, []);


  const save = async () => {
    const isPass = await form.validateFields().catch(() => false);
    if (!isPass) return;
    const values = await form.getFieldsValue();

    const s = await updatePointScript({ script: { ...values }, processPointId: props.processPointId });
    props.closeSelf?.();
  };


  return (
    <div>
      <h1 style={{ color: 'blue' }}>表单中数字类型的字段可在此处进行加条件</h1>
      <br />
      <br />
      <div>
        <Form form={form}>
          <div style={{ display: 'flex' }}>
            <Form.Item
              label=""
              style={{ flex: 1 }}
              name="uniqueCode"
              rules={[{ required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Select
                style={{ width: '100%' }}
                placeholder="请选择通过条件"
                options={fieldList}
                fieldNames={{ label: 'name', value: 'uniqueCode' }}
              />
            </Form.Item>
            <Form.Item
              style={{ flex: 1 }}
              label=""
              name="sign"
              rules={[{ required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Select
                style={{ width: '100%' }}
                placeholder="请选择通过条件"
                options={[
                  {
                    value: '>',
                    label: '>',
                  },
                  {
                    value: '>=',
                    label: '>=',
                  },
                  {
                    value: '<',
                    label: '<',
                  },
                  {
                    value: '<=',
                    label: '<=',
                  },
                  {
                    value: '=',
                    label: '=',
                  },
                  {
                    value: '!=',
                    label: '!=',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              style={{ flex: 1 }}
              label=""
              name="rightValue"
              rules={[{ required: false }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder="请输入数字"
              ></InputNumber>
            </Form.Item>
          </div>


          <Form.Item
            label="说明"
            name="remarks"
            rules={[{ required: false }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input.TextArea style={{ width: '100%' }}
                            placeholder="请输入说明"
                            autoSize={{ minRows: 3 }}
            />
          </Form.Item>

        </Form>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <Button type={'primary'}
                  onClick={save}
          >保存</Button>
        </div>

      </div>
    </div>
  );
};

export default index;