import { Button, Input, Select, TreeSelect } from 'antd';
import { Form } from 'antd/lib';
import React, { useEffect, useState } from 'react';
import { deptPageApi } from '@/pages/system/dept/api.tsx';
import { getAccountDic } from '@/pages/system/account/accountApi.tsx';
import { DeptVo } from '@/pages/system/dept/ApiBo.ts';
import { DicVo } from '@/utils/DicVo.ts';
import { getPointSetApi, updatePointSetApi } from '@/pages/flow/process/process/api/processApi.tsx';
import { roleAllApi } from '@/pages/system/role/api.tsx';
import { RoleListVo } from '@/pages/system/role/ApiBo.ts';

const index = (props: {
  processPointId: number;
  closeSelf?: () => void;
}) => {
  const [form] = Form.useForm();
  const [flagSubmit, setFlagSubmit] = useState<string>('0');
  const [deptTreeList, setDeptTreeList] = useState([]);
  const [accountList, setAccountList] = useState<DicVo[]>([]);
  const [roleList, setRoleList] = useState<RoleListVo[]>([]);
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
    roleAllApi({}).then(rst => {
      setRoleList(rst.data);
    });

    getPointSetApi({ processPointId: props.processPointId }).then(rst => {
      form.setFieldsValue(rst.data);
    });

  };
  useEffect(() => {
    initData();
  }, []);


  const save = async () => {
    const isPass = await form.validateFields().catch(() => false);
    if (!isPass) return;
    const values = await form.getFieldsValue();

    const s = await updatePointSetApi({ ...values, processPointId: props.processPointId });
    props.closeSelf?.();
  };


  return (
    <div>
      <h1 style={{ color: 'blue' }}>办理事件的人员设置</h1>
      <div>
        <Form form={form}>
          <Form.Item
            label="通过条件"
            name="pipelinePassCondition"
            rules={[{ required: true }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Select
              style={{ width: '100%' }}
              placeholder="请选择通过条件"
              options={[{
                value: 1,
                label: '全部通过',
              }, {
                value: 0,
                label: '任意通过',
              }]}
            />
          </Form.Item>
          <Form.Item
            label="部门"
            name="deptIds"
            rules={[{ required: false }]}
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


          <Form.Item
            label="人员"
            name="userIds"
            rules={[{ required: false }]}
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

          <Form.Item
            label="角色"
            name="roleIds"
            rules={[{ required: false }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Select
              style={{ width: '100%' }}
              mode="multiple"
              showSearch
              optionFilterProp={'name'}
              fieldNames={{ label: 'name', value: 'id' }}
              placeholder="请选择角色"
              options={roleList}
            />
          </Form.Item>
          <Form.Item
            label="说明"
            name="remarks"
            rules={[{ required: false }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input.TextArea style={{ width: '100%' }}
                            placeholder="请输入说明"
                            autoSize={{ minRows: 3 }}
            />
          </Form.Item>

        </Form>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <Button type={'primary'}
                  onClick={save}
          >保存</Button>
        </div>

      </div>
    </div>
  );
};

export default index;