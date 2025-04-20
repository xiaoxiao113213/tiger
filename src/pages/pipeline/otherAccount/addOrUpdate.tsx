import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Radio } from 'antd';
import { OtherAccountDetailVo } from './ApiBo';
import { otherAccountGetOneApi, otherAccountSaveApi, otherAccountUpdateApi } from './api';
import GetOtherAccountTypeDicList from '@/components/Dic/OtherAccountTypeDic';
import { OperateEnum } from '@/utils/enum.ts';
import { getNullBo } from '@/utils/utils.ts';
import { Rst } from '@/utils/baseBo.ts';

type Props = {
  detailId: number
  operateEnum: OperateEnum
  setAddOrUpdateModalFn: React.Dispatch<React.SetStateAction<OperateEnum>>,
  reloadTable: () => void
};

const AddOrUpdate = (props: Props) => {
  const [formRef] = Form.useForm<OtherAccountDetailVo>();
  const [detail, setDetailFn] = useState<OtherAccountDetailVo>(getNullBo);
  const { OtherAccountTypeMap, OtherAccountTypeValueEnum, OtherAccountTypeList } = GetOtherAccountTypeDicList();

  const initMyDataFn = async () => {
    if (props.operateEnum === OperateEnum.edit) {
      let rst = await otherAccountGetOneApi({ id: props.detailId });
      rst.data.accountPassword = undefined;
      setDetailFn(rst.data);
      formRef.setFieldsValue(rst.data);
    } else {
      formRef.setFieldsValue(getNullBo());
    }
  };

  const saveFn = async () => {
    const isPass = await formRef.validateFields().catch(() => false);
    if (!isPass) return;

    const values = formRef.getFieldsValue();
    let res: Rst<any>;
    if (props.operateEnum === OperateEnum.edit) {
      res = await otherAccountUpdateApi({ ...values, id: props.detailId });
    } else {
      res = await otherAccountSaveApi({ ...values });
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
  }, []);

  return (
    <div>

      <Form form={formRef}
            labelCol={{ flex: '10%' }}
            wrapperCol={{ flex: '90%' }}>
        <Form.Item label="类型" name="type" rules={[{ required: true }]}>
          <Radio.Group>
            {
              OtherAccountTypeList.map(it => {
                return <Radio value={it.value} key={it.value}> {it.label} </Radio>;
              })
            }
          </Radio.Group>
        </Form.Item>
        <Form.Item label="账号名称" name="accountName" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="密码" name="accountPassword" rules={[{ required: false }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="备注" name="remarks" rules={[{ required: false }]}>
          <Input placeholder="请输入" />
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
