import React, { useEffect, useState } from 'react';
import { Form } from 'antd/lib';
import { DicVo } from '@/utils/DicVo.ts';
import { RoleListVo } from '@/pages/system/role/ApiBo.ts';
import { deptPageApi } from '@/pages/system/dept/api.tsx';
import { DeptVo } from '@/pages/system/dept/ApiBo.ts';
import { getAccountDic } from '@/pages/system/account/accountApi.tsx';
import { roleAllApi } from '@/pages/system/role/api.tsx';
import { Button, message, Select, TreeSelect } from 'antd';
import { pipelinePermissionGetApi, pipelinePermissionUpdateApi } from '@/pages/pipeline/pipeline/api/pipeline.tsx';

const AccountSetting = (props: { pipelineId: number, closeFn: () => void }) => {
  const [form] = Form.useForm();
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
    pipelinePermissionGetApi({ pipelineId: props.pipelineId }).then(rst => {
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
    await pipelinePermissionUpdateApi({ ...values, pipelineId: props.pipelineId });
    message.success('保存成功');
    props.closeFn();
  };


  return (
    <div>
      <h1 style={{ color: 'blue' }}>项目人员设置</h1>
      <div>
        <Form form={form}>
          <Form.Item
            label="部门（选中之后，只有直属这个部门的人才有效，子部门需要单独选）"
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
              showSearch={true}
              treeNodeFilterProp={'name'}
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

export default AccountSetting;