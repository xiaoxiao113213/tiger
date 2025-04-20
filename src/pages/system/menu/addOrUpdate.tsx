import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, message, Radio, TreeSelect } from 'antd';
import { OperateEnum } from '@/utils/enum.ts';
import { ModuleVo } from '@/pages/system/menu/ApiBo.ts';
import { checkApiRst, getNullBo, oFormatForm } from '@/utils/utils.ts';
import { moduleGetOneApi, modulePageApi, moduleSaveApi, moduleUpdateApi } from '@/pages/system/menu/api.tsx';
import { Rst } from '@/utils/baseBo.ts';

type Props = {
  detailId: number
  operateEnum: OperateEnum
  setAddOrUpdateModalFn: React.Dispatch<React.SetStateAction<OperateEnum>>,
  reloadTable: () => void,
  applicationId: number,
  parentId?: number
};
const AddOrUpdate = (props: Props) => {
  const [formRef] = Form.useForm<ModuleVo>();
  const [detail, setDetailFn] = useState<ModuleVo>({});
  const [menuList, setMenuListFn] = useState([]);

  const initMyDataFn = async () => {
    modulePageApi({ applicationId: props.applicationId }).then(res => {
      if (checkApiRst(res)) return;
      let parent = [{ id: 0, name: '顶级', labelName: '顶级' }];
      parent = parent.concat(res.data);
      setMenuListFn(parent);
    });
    if (props.operateEnum === OperateEnum.edit) {
      let rst = await moduleGetOneApi({ id: props.detailId });
      setDetailFn(rst.data);
      formRef.setFieldsValue(rst.data);
    } else {
      formRef.setFieldsValue({ sort: 0, disabled: 0, showFlag: 1, type: 0, parentId: props.parentId });
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
    let res = getNullBo<Rst<undefined>>();
    if (props.operateEnum === OperateEnum.edit) {
      res = await moduleUpdateApi({ ...values, id: props.detailId });
    } else if (props.operateEnum === OperateEnum.add) {
      res = await moduleSaveApi({ ...values, applicationId: props.applicationId });
    }
    if (res?.code !== 1000) return;
    message.success(res?.msg);
    props.reloadTable();
    props.setAddOrUpdateModalFn(OperateEnum.close);

  };

  const closeModal = () => {
    props.setAddOrUpdateModalFn(OperateEnum.close);
  };
  const formChange = (changedValues: any, allValues: any) => {
    console.log('changedValues', changedValues);
    console.log('allValues', allValues);
    setDetailFn({ ...detail, ...changedValues });
  };


  useEffect(() => {
    initMyDataFn();
    return () => {
    };
  }, []); // 第二个参数表示依赖项


  return (
    <div>
      <Form form={formRef}
            labelCol={{ flex: '13%' }}
            wrapperCol={{ flex: '80%' }}
            onValuesChange={formChange}
      >
        <Form.Item label="父级菜单" name="parentId" rules={[{ required: true }]}>
          <TreeSelect
            showSearch
            placeholder="请选择菜单"
            // optionFilterProp="children"
            // filterOption={(input, option) =>
            //     (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            // }
            treeDefaultExpandAll={true}
            fieldNames={{ label: 'labelName', value: 'id' }}
            treeData={menuList}
          />
        </Form.Item>
        <Form.Item label="类型" name="type" rules={[{ required: true }]}>
          <Radio.Group defaultValue={0}>
            <Radio value={0}> 目录 </Radio>
            <Radio value={1}> 菜单 </Radio>
            <Radio value={2}> 按钮 </Radio>
            <Radio value={3}> 独立页面 </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="名称" name="name" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="权限编码" name="permission" rules={[{ required: true }]}
                   tooltip={'也是路由地址  唯一性 '}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        {
          (detail.type === 1 || detail.type === 3) &&
          <Form.Item label="页面路径地址" name="component" rules={[{ required: true }]}>
            <Input placeholder="请输入" />
          </Form.Item>
        }

        <Form.Item label="排序" name="sort" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="状态" name="disabled" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value={0}> 启用 </Radio>
            <Radio value={1}> 禁用 </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="菜单展示" name="showFlag" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value={1}> 是 </Radio>
            <Radio value={0}> 否 </Radio>
          </Radio.Group>
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