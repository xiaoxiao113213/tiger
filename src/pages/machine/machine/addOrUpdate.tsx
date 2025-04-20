import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, message, Select } from 'antd';
import { MachineDetailVo, TypeList } from './ApiBo';
import { machineGetOneApi, machineSaveApi, machineUpdateApi } from './api';
import { OperateEnum } from '@/utils/enum.ts';
import { getNullBo } from '@/utils/utils.ts';
import { Rst } from '@/utils/baseBo.ts';
import { Number } from 'ts-toolbelt';

type Props = {
  detailId: number
  operateEnum: OperateEnum
  setAddOrUpdateModalFn: React.Dispatch<React.SetStateAction<OperateEnum>>,
  reloadTable: () => void
};
const AddOrUpdate = (props: Props) => {
  const [formRef] = Form.useForm<MachineDetailVo>();
  const [detail, setDetailFn] = useState<MachineDetailVo>(getNullBo);

  const initMyDataFn = async () => {
    if (props.operateEnum === OperateEnum.edit) {
      let rst = await machineGetOneApi({ machineId: props.detailId });
      setDetailFn(rst.data);
      formRef.setFieldsValue(rst.data);
    } else {
      formRef.setFieldsValue({port: 22});
    }
  };

  const saveFn = async () => {

    const isPass = await formRef.validateFields().catch(() => false);
    if (!isPass) return;

    const values = await formRef?.getFieldsValue();
    let res: Rst<any>;
    if (props.operateEnum === OperateEnum.edit) {
      res = await machineUpdateApi({ ...values, machineId: props.detailId });
    } else {
      res = await machineSaveApi({ ...values });
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
            labelCol={{ flex: '15%' }}
        // wrapperCol={{ flex: '90%' }}
      >
        <Form.Item label="类型" name="type" rules={[{ required: true }]}>
          <Select placeholder="请选择" allowClear
                  options={TypeList}
          />
        </Form.Item>

        {/*<Form.Item label="sort" name="sort" rules={[{ required: true }]}>*/}
        {/*  <Input placeholder="请输入" maxLength={200} showCount />*/}
        {/*</Form.Item>*/}
        <Form.Item label="描述" name="remarks" rules={[{ required: true }]}>
          <Input.TextArea placeholder="请输入" maxLength={200} showCount
                          autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Form.Item>

        <Form.Item label="机器连接地址" name="host" rules={[{ required: true }]}>
          <Input placeholder="请输入 host" maxLength={200} showCount autoComplete={'ds1'} />
        </Form.Item>
        <Form.Item label="端口号" name="port" rules={[{ required: true }]}>
          <InputNumber placeholder="请输入 port"   autoComplete={'ds1'} />
        </Form.Item>
        <Form.Item label="机器用户名" name="username" rules={[{ required: true }]}>
          <Input placeholder="请输入" maxLength={200} showCount autoComplete={'ds12'} />
        </Form.Item>
        <Form.Item label="机器密码" name="password" rules={[{ required: false }]}>
          <Input.Password placeholder="请输入,更新的时候 不输入，就不会修改密码" maxLength={200} showCount autoComplete={'new-password'}
          />
        </Form.Item>
        {/*<Form.Item label="isOnline" name="isOnline" rules={[{ required: true }]}>*/}
        {/*  <Input placeholder="请输入" maxLength={200} showCount />*/}
        {/*</Form.Item>*/}

        {/*<Form.Item label='状态' name='disabled' rules={[{required: true}]}>*/}
        {/*    <Radio.Group>*/}
        {/*        <Radio value={0}> 启用 </Radio>*/}
        {/*        <Radio value={1}> 禁用 </Radio>*/}
        {/*    </Radio.Group>*/}
        {/*</Form.Item>*/}

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