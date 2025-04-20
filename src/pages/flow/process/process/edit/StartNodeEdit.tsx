import { Button, Card, Drawer, message, Select, TreeSelect } from 'antd';
import { Form } from 'antd/lib';
import React, { useEffect, useState } from 'react';
import { deptPageApi } from '@/pages/system/dept/api.tsx';
import { getAccountDic } from '@/pages/system/account/accountApi.tsx';
import { clientToServerValueItem, CustomerFieldBo, serverToClientValue } from '@/pages/flow/process/process/form/form/Bo.tsx';
import { DeptVo } from '@/pages/system/dept/ApiBo.ts';
import { DicVo } from '@/utils/DicVo.ts';
import { getStartSetApi, updateStartSetApi } from '@/pages/flow/process/process/api/processApi.tsx';
import FormComponent, { FormBuilderRef } from '@/pages/flow/process/process/form/form/addForm/formComponent.tsx';
import SubmitForm from '@/pages/flow/process/process/form/form/submitForm';

const StartNodeEdit = (props: {
  processPointId: number;
  closeSelf?: () => void;
}) => {
  const [form] = Form.useForm();
  const [flagSubmit, setFlagSubmit] = useState<string>('0');
  const [deptTreeList, setDeptTreeList] = useState([]);
  const [accountList, setAccountList] = useState<DicVo[]>([]);
  const [fieldList, setFieldList] = useState<CustomerFieldBo[]>([]);
  const [formDesignOpen, setFormDesignOpen] = useState(false);
  const formBuilderRef = React.useRef<FormBuilderRef>(null);
  const [formFieldRef] = Form.useForm();
  const initData = async () => {
    // 获取部门树
    deptPageApi({} as DeptVo).then(rst => {
      // console.log("rst2", rst)
      setDeptTreeList(rst.data);
    });
    getAccountDic().then(rst => {
      // console.log("rst", rst)
      setAccountList(rst.data);
    });

    getStartSetApi({ processPointId: props.processPointId }).then(rst => {
      // console.log("rst", rst)
      form.setFieldsValue(rst.data);
      setFlagSubmit(rst.data.flagSubmit);
      // 适配value的值
      rst.data.fieldList.forEach((item) => {
        serverToClientValue(item);
      });
      setFieldList(rst.data.fieldList);
    });
  };
  useEffect(() => {
    initData();
  }, []);
  const handleOk = () => {
    const list = formBuilderRef.current?.getFieldList();
    if (!list) return;
    // 如果list中 key为空 或者有重复的key 都报错
    list.forEach((item) => {
      if (item.keyName === '') {
        message.error('有字段的唯一标识为空');
        throw new Error('有字段的唯一标识为空');
      }
      const tmpList = list.filter((i) => i.keyName === item.keyName);
      if (tmpList.length > 1) {
        message.error(`有重复的唯一标识【${tmpList[0].keyName}】`);
        throw new Error(`有重复的唯一标识【${tmpList[0].keyName}】`);
      }
    });
    setFieldList(list);
    const value = {};
    list.forEach((item) => {
      value[item.id] = item.value;
    });
    formFieldRef.setFieldsValue(value);
    setFormDesignOpen(false);
  };

  const save = async () => {
    const isPass = await form.validateFields().catch(() => false);
    if (!isPass) return;
    const values = await form.getFieldsValue();
    // 适配value的值
    fieldList.forEach((item) => {
      clientToServerValueItem(item);
    });
    const s = await updateStartSetApi({ ...values, processPointId: props.processPointId, fieldList: fieldList });
    props.closeSelf?.();
  };


  return (
    <div>
      <h1 style={{ color: 'blue' }}>基础设置</h1>
      <div>
        <Form form={form}>
          <Form.Item
            label="谁可以提交"
            name="flagSubmit"
            rules={[{ required: true }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Select
              placeholder="请选择提交人范围"
              style={{ width: '100%' }}
              options={[
                { value: '0', label: '全部' },
                { value: '1', label: '指定部门' },
                { value: '2', label: '指定人员' },
              ]}
              onChange={(value) => {
                setFlagSubmit(value);
              }}
            />
          </Form.Item>
          {flagSubmit === '1' &&
            <Form.Item
              label="部门"
              name="deptIds"
              rules={[{ required: true, message: '部门必填' }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <TreeSelect
                style={{ width: '100%' }}
                placeholder="请选择部门"
                treeDefaultExpandAll={true}
                fieldNames={{ label: 'name', value: 'id' }}
                treeData={deptTreeList}
                multiple={true}
              />
            </Form.Item>
          }
          {flagSubmit === '2' &&
            <Form.Item
              label="人员"
              name="userIds"
              rules={[{ required: true, message: '人员必填' }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Select
                style={{ width: '100%' }}
                mode="multiple"
                showSearch
                optionFilterProp={'label'}
                placeholder="请选择人员"
                options={accountList}
              />
            </Form.Item>
          }
        </Form>
        <Card title={<div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>表单设计</span><Button type={'primary'} onClick={() => setFormDesignOpen(true)}>设计表单</Button></div>}>
          <Form form={formFieldRef}
                validateTrigger="false"
                onValuesChange={(changedValues, allValues) => {
                  // console.log('变动值了', changedValues, allValues);
                  fieldList.forEach((item) => {
                    // 如何验证是否有这个key
                    if (changedValues.hasOwnProperty(item.id)) {
                      item.value = changedValues[item.id];
                    }
                  });
                  setFieldList(fieldList);
                }
                }>
            {
              fieldList.map((item) => {
                return <SubmitForm
                  key={item.id}
                  initFieldBo={item}
                ></SubmitForm>;
              })
            }
          </Form>
        </Card>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <Button type={'primary'}
                  onClick={save}
          >保存</Button>
        </div>

      </div>
      <Drawer title={'表单设计'} open={formDesignOpen} onClose={() => setFormDesignOpen(false)}
              extra={<Button onClick={handleOk} type={'primary'}>确定</Button>}
              width={'100%'}
              destroyOnClose={true}
              keyboard={false}
      >
        <FormComponent ref={formBuilderRef} initFormDesign={fieldList}></FormComponent>
      </Drawer>
    </div>
  );
};

export default StartNodeEdit;