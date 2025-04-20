import React, { useEffect, useState } from 'react';

import { Button, Form, Input, InputNumber, message, Radio, TreeSelect } from 'antd';
import { OperateEnum } from '@/utils/enum.ts';
import { DeptVo } from '@/pages/system/dept/ApiBo.ts';
import { checkApiRst, getNullBo, oFormatForm } from '@/utils/utils.ts';
import { deptGetOneApi, deptPageApi, deptSaveApi, deptUpdateApi } from '@/pages/system/dept/api.tsx';

type Props = {
  detailId: number
  operateEnum: OperateEnum
  setAddOrUpdateModalFn: React.Dispatch<React.SetStateAction<OperateEnum>>,
  reloadTable: () => void
};
const AddOrUpdate = (props: Props) => {
  const [formRef] = Form.useForm<DeptVo>();
  const [detail, setDetailFn] = useState<DeptVo>(getNullBo);

  const [deptList, setDeptListFn] = useState([]);

  const initMyDataFn = async () => {

    deptPageApi({}).then(res => {
      if (checkApiRst(res)) return;
      let parent = [{ id: 0, name: '顶级' }];
      parent = parent.concat(res.data);
      setDeptListFn(parent);
    });


    if (props.operateEnum === OperateEnum.edit) {
      let rst = await deptGetOneApi({ id: props.detailId });
      setDetailFn(rst.data);
      formRef.setFieldsValue(rst.data);
    } else {
      formRef.setFieldsValue({ sort: 0, disabled: 0 });
    }
  };

  const saveFn = async () => {
    if (props.operateEnum === OperateEnum.detail) {
      return;
    }
    const isPass = await formRef.validateFields().catch(() => false);
    if (!isPass) return;

    const values = await formRef?.getFieldsValue();
    oFormatForm(values);
    let res = {};
    if (props.operateEnum === OperateEnum.edit) {
      res = await deptUpdateApi({ ...values, id: props.detailId });
    } else if (props.operateEnum === OperateEnum.add) {
      res = await deptSaveApi({ ...values });
    }
    if (res?.code !== 1000) return;
    message.success(res?.msg);
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
        <Form.Item label="父级部门" name="parentId" rules={[{ required: true }]}>
          <TreeSelect
            showSearch
            placeholder="请选择部门"
            // optionFilterProp="children"
            // filterOption={(input, option) =>
            //     (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            // }
            treeDefaultExpandAll={true}
            fieldNames={{ label: 'name', value: 'id' }}
            treeData={deptList}

          />
        </Form.Item>
        <Form.Item label="名称" name="name" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="排序" name="sort" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="状态" name="disabled" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value={0}> 启用 </Radio>
            <Radio value={1}> 禁用 </Radio>
          </Radio.Group>
        </Form.Item>
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