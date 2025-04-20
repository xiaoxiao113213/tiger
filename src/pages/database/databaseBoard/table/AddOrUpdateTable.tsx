import React, { useEffect, useState } from 'react';
import { TableDetailVo } from '@/pages/database/databaseBoard/api/table/ApiBo';
import { ColorPicker, Form, Input, Select } from 'antd';
import GetMysqlTableTypeDicList from '@/components/Dic/MysqlTableTypeDic';
import { Color } from 'antd/es/color-picker';
import { oFormatForm } from '@/utils/utils.ts';


type Props = {
  table: TableDetailVo;
  setTable: (
    table: TableDetailVo,
  ) => void;
}

export default (props: Props) => {
  const [formRef] = Form.useForm<TableDetailVo>();
  const { MysqlTableTypeList } = GetMysqlTableTypeDicList();

  const [color, setColorFn] = useState<string | undefined>(undefined);

  const colorChange = (value: Color, hex: string) => {
    setColorFn(hex);
    props.setTable({ ...props.table, fillColor: hex });
  };
  // 删除行
  const onChange = async () => {
    const values = await formRef?.getFieldsValue();
    oFormatForm(values);
    props.setTable({ ...props.table, ...values });
  };

  useEffect(() => {
    // 在组件挂载或更新后执行操作
    formRef.setFieldsValue(props.table);
    setColorFn(props.table.fillColor);
    return () => {
      // 在组件卸载前执行清理操作
      // console.log('Component will unmount');
    };
  }, [props.table]); // 第二个参数表示依赖项


  return (
    <div>
      <Form form={formRef} onChange={onChange}
            labelCol={{ flex: '10%' }}
            wrapperCol={{ flex: '90%' }}>

        <Form.Item label="表名称" name="code" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="引擎类型" name="engineType" rules={[{ required: true }]}>
          <Select placeholder="请输入"
                  options={MysqlTableTypeList}
                  onChange={onChange}
          />
        </Form.Item>
        <Form.Item label="表备注" name="desc" rules={[{ required: false }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="业务描述" name="remarks" rules={[{ required: false }]}>
          <Input.TextArea placeholder="请输入"
                          autoSize={{ minRows: 5 }}

          />
        </Form.Item>
        <Form.Item
          label="背景色"
          name="color1"
        >
          {
            color ? <ColorPicker defaultValue={color} onChange={colorChange} /> : null
          }
        </Form.Item>
        {/*<Form.Item label='状态' name='disabled' rules={[{required: true}]}>*/}
        {/*    <Radio.Group>*/}
        {/*        <Radio value={0}> 启用 </Radio>*/}
        {/*        <Radio value={1}> 禁用 </Radio>*/}
        {/*    </Radio.Group>*/}
        {/*</Form.Item>*/}

      </Form>
    </div>
  );
};