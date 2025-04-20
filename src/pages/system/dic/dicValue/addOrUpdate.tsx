import React, { useEffect, useState } from 'react';
import { Button, ColorPicker, Form, Input, message, Radio, Select } from 'antd';
import { Color } from 'antd/es/color-picker';
import { OperateEnum } from '@/utils/enum.ts';
import { DicValueDetailVo } from '@/pages/system/dic/dicValue/ApiBo.ts';
import { DicVo } from '@/utils/DicVo.ts';
import { dicValueGetOneApi, dicValueSaveApi, dicValueUpdateApi } from '@/pages/system/dic/dicValue/api.tsx';
import { dicAll } from '@/pages/system/dic/dicApi.tsx';
import { checkApiRst, oFormatForm } from '@/utils/utils.ts';

type Props = {
  dicId: number
  detailId: number
  operateEnum: OperateEnum
  setAddOrUpdateModalFn: React.Dispatch<React.SetStateAction<OperateEnum>>,
  reloadTable: () => void
};
const AddOrUpdate = (props: Props) => {
  const [formRef] = Form.useForm<DicValueDetailVo>();
  const [detail, setDetailFn] = useState<DicValueDetailVo>();
  const [color, setColorFn] = useState<string>('#A5D886');
  const [dicList, setDicListFn] = useState<DicVo[]>([]);
  const initMyDataFn = async () => {
    if (props.operateEnum === OperateEnum.edit) {
      let rst = await dicValueGetOneApi({ id: props.detailId });
      setDetailFn(rst.data);
      formRef.setFieldsValue(rst.data);
      setColorFn(rst.data.color);
    } else {
      // formRef.setFieldsValue({sort: 0, disabled: 0})
      setDetailFn({ color: '#A5D886' });
    }

    const data = await dicAll({});
    if (checkApiRst(data)) return [];
    let list = data.data.map(it => {
      return { value: it.id, label: it.name };
    });
    setDicListFn(list);

  };

  const saveFn = async () => {
    if (props.operateEnum === OperateEnum.detail) {
      return;
    }
    const isPass = await formRef.validateFields().catch(() => false);
    if (!isPass) return;

    const values = await formRef?.getFieldsValue();
    oFormatForm(values);
    values.color = color;
    let res = {};
    if (props.operateEnum === OperateEnum.edit) {
      res = await dicValueUpdateApi({ ...values, id: props.detailId });
    } else if (props.operateEnum === OperateEnum.add) {
      res = await dicValueSaveApi({ ...values });
    }
    if (res?.code !== 1000) return;
    message.success(res?.msg);
    props.reloadTable();
    props.setAddOrUpdateModalFn(OperateEnum.close);

  };

  const colorChange = (value: Color, hex: string) => {
    setColorFn(hex);
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
            labelCol={{ flex: '20%' }}
            wrapperCol={{ flex: '80%' }}>


        <Form.Item label="字典" name="dicId" rules={[{ required: true }]} initialValue={props.dicId}>
          <Select placeholder="请输入"
            // defaultValue={props.dicId}
            // value={props.dicId}
                  options={dicList}
                  disabled={props.operateEnum === OperateEnum.edit}
          />
        </Form.Item>
        <Form.Item label="字典名称" name="label" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="字典值" name="value" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="状态" name="disabled" rules={[{ required: true }]} initialValue={0}>
          <Radio.Group>
            <Radio value={0}> 启用 </Radio>
            <Radio value={1}> 禁用 </Radio>
          </Radio.Group>
        </Form.Item>

        {detail &&
          <Form.Item
            label="颜色"
            name="color1"
          >
            <ColorPicker showText defaultValue={detail.color} onChange={colorChange} />
          </Form.Item>

        }
        <Form.Item
          label="备注"
          name="remarks"
        >
          <Input.TextArea allowClear />
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