import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, message, Radio, Spin, Tabs } from 'antd';
import MenuComponent from './component/menuComponent';
import { OperateEnum } from '@/utils/enum.ts';
import { RoleVo } from '@/pages/system/role/ApiBo.ts';
import { menuApplicationTreeApi } from '@/pages/system/menu/api.tsx';
import { checkApiRst, getNullBo, oFormatForm } from '@/utils/utils.ts';
import { roleGetOneApi, roleSaveApi, roleUpdateApi } from '@/pages/system/role/api.tsx';
import { Rst } from '@/utils/baseBo.ts';

type Props = {
  detailId: number
  operateEnum: OperateEnum
  setAddOrUpdateModalFn: React.Dispatch<React.SetStateAction<OperateEnum>>,
  reloadTable: () => void
};
const AddOrUpdate = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [formRef] = Form.useForm<RoleVo>();
  const [detail, setDetailFn] = useState<RoleVo>({
    applicationList: [], menu: [],
  });
  const [applicationList, setApplicationListFn] = useState<[]>([]);
  const initMyDataFn = async () => {
    setLoading(true);
    // 先默认写死一个应用的 可支持多个应用
    // const rst = await menuApplicationTreeApi({application:1});
    const rst = await menuApplicationTreeApi({});
    if (checkApiRst(rst)) return;
    let applicationList1 = rst.data;
    // applicationList1[0].name = "权限列表"

    if (props.operateEnum === OperateEnum.edit) {
      let rst = await roleGetOneApi({ id: props.detailId });
      setDetailFn({ ...rst.data, applicationList: applicationList1 });
      formRef.setFieldsValue(rst.data);
    } else {
      setDetailFn({ applicationList: applicationList1 });
      formRef.setFieldsValue({ sort: 0, disabled: 0 });
    }
    setApplicationListFn(applicationList1);
    setLoading(false);
  };

  const getApplicationTreeFn = async () => {

  };

  // 设置 菜单的时候  添加选中的值
  const setDetailApplicationCheckKeysFn = (checkedKeys: number[], index: number) => {
    console.log('1', detail, checkedKeys, index);
    setDetailFn((pre) => {
      pre.applicationList[index].checkedKeys = checkedKeys;
      return pre;
    });
  };

  const saveFn = async () => {

    const isPass = await formRef.validateFields().catch(() => false);
    if (!isPass) return;
    setLoading(true);
    const values = await formRef?.getFieldsValue();
    oFormatForm(values);
    const menuIds = [];
    for (let applicationListElement of detail.applicationList) {
      if (applicationListElement.checkedKeys)
        menuIds.push(...applicationListElement.checkedKeys);
    }
    values.menu = menuIds;
    let res = getNullBo<Rst<undefined>>();
    if (detail?.id) {
      res = await roleUpdateApi({ ...values, id: detail?.id });
    } else {
      res = await roleSaveApi({ ...values });
    }
    if (res?.code !== 1000) return;
    message.success(res?.msg);
    props.reloadTable();
    props.setAddOrUpdateModalFn(OperateEnum.close);
    setLoading(false);
  };

  const closeModal = () => {
    props.setAddOrUpdateModalFn(OperateEnum.close);
  };


  useEffect(() => {
    getApplicationTreeFn();
    initMyDataFn();
    return () => {
    };
  }, []); // 第二个参数表示依赖项


  return (
    <div>
      <Spin spinning={loading} delay={500}>

        <Form form={formRef}
              labelCol={{ flex: '10%' }}
              wrapperCol={{ flex: '90%' }}>
          <Form.Item label="名称" name="name" rules={[{ required: true }]}>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="编码" name="code" rules={[{ required: true }]}>
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
          <Tabs defaultActiveKey="0" size={'large'}>
            {
              applicationList.map((application, index) => {
                return <Tabs.TabPane tab={application.name} key={index}>
                  <MenuComponent
                    application={application}
                    checkMenuIds={detail ? (detail.menu ?? []) : []}
                    setDetailApplicationCheckKeysFn={setDetailApplicationCheckKeysFn}
                    applicationIndex={index}
                    openType={props.operateEnum}
                  />
                </Tabs.TabPane>;
              })
            }
          </Tabs>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ textAlign: 'right' }}>
            <Button type="default" onClick={closeModal} style={{ marginRight: 20 }}>
              取消
            </Button>
            <Button type="primary" onClick={saveFn}>
              确定
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default AddOrUpdate;