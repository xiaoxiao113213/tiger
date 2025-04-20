import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Radio } from 'antd';

import { SystemConfigDetailVo } from './ApiBo';
import { systemConfigGetOneApi, systemConfigSaveApi, systemConfigUpdateApi } from './api';
import GetSystemConfigTypeDicList from '@/components/Dic/SystemConfigTypeDic';
import { getNullBo, oFormatForm } from '@/utils/utils.ts';
import { OperateEnum } from '@/utils/enum.ts';
import { Rst } from '@/utils/baseBo.ts';

type Props = {
  detailId: number
  operateEnum: OperateEnum
  setAddOrUpdateModalFn: React.Dispatch<React.SetStateAction<OperateEnum>>,
  reloadTable: () => void
};
const AddOrUpdate = (props: Props) => {
  const [formRef] = Form.useForm<SystemConfigDetailVo>();
  const [detail, setDetailFn] = useState<SystemConfigDetailVo>(getNullBo);
  const { SystemConfigTypeList } = GetSystemConfigTypeDicList();

  const initMyDataFn = async () => {
    if (props.operateEnum === OperateEnum.edit) {
      let rst = await systemConfigGetOneApi({ id: props.detailId });
      setDetailFn(rst.data);
      formRef.setFieldsValue(rst.data);
    } else {
      formRef.setFieldsValue(getNullBo());
    }
  };

  const saveFn = async () => {

    const isPass = await formRef.validateFields().catch(() => false);
    if (!isPass) return;

    const values = await formRef?.getFieldsValue();
    oFormatForm(values);
    let res: Rst<any>;
    if (props.operateEnum === OperateEnum.edit) {
      res = await systemConfigUpdateApi({ ...values, id: props.detailId });
    } else {
      res = await systemConfigSaveApi({ ...values });
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

        <Form.Item label="配置key" name="key" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="类型" name="type" rules={[{ required: true }]}>
          <Radio.Group>
            {
              SystemConfigTypeList.map(it => {
                return <Radio value={it.value}> {it.label} </Radio>;
              })
            }
          </Radio.Group>
        </Form.Item>
        <Form.Item label="描述" name="remarks" rules={[{ required: true }]}>
          <Input.TextArea placeholder="请输入"
                          autoSize={{ minRows: 2 }} />
        </Form.Item>

        <Form.Item label="配置值" name="value" rules={[{ required: true }]}>
          <Input.TextArea placeholder="请输入" autoSize={{ minRows: 2 }} />
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