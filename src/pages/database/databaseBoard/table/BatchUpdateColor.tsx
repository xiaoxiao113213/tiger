import React, { useState } from 'react';
import { Button, ColorPicker, Form } from 'antd';
import { TableDetailVo } from '../api/table/ApiBo';
import { Color } from 'antd/es/color-picker';
import { Rst } from '@/utils/baseBo.ts';
import { tableBatchUpdateColorApi } from '@/pages/database/databaseBoard/api/table/api.tsx';

type Props = {
  nodes: any[] | undefined;
  databaseBoardId: number,
  closeComboTagModal: () => void,
};
const BatchUpdateColor = (props: Props) => {
  const [formRef] = Form.useForm<TableDetailVo>();
  const [color, setColorFn] = useState<string>('#A5D886');
  const colorChange = (value: Color, hex: string) => {
    setColorFn(hex);
  };


  const saveFn = async () => {
    console.log(props.nodes);
    let res: Rst<any> = await tableBatchUpdateColorApi(props.nodes?.map((item) => {
      return {
        tableId: item.id,
        fillColor: color,
      };
    }));
    props.closeComboTagModal();

  };

  const closeModal = () => {
    props.closeComboTagModal();
  };


  return (
    <div>
      <Form form={formRef}
            labelCol={{ flex: '10%' }}
            wrapperCol={{ flex: '90%' }}>
        <Form.Item
          label="背景色"
          name="color1"
        >
          <ColorPicker showText defaultValue={color} onChange={colorChange} />
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

export default BatchUpdateColor;