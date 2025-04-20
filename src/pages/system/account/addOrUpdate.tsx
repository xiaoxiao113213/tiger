import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, message, Radio, Select, Space, Spin, Tabs, TreeSelect } from 'antd';
import MenuComponent from './component/menuComponent';
import Password from 'antd/lib/input/Password';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './index.css';
import { OperateEnum } from '@/utils/enum.ts';
import { AccountItemBo } from '@/pages/system/account/ApiBo.ts';
import { accountGetOneApi, accountSaveApi, accountUpdateApi } from '@/pages/system/account/accountApi.tsx';
import { checkApiRst, oFormatForm } from '@/utils/utils.ts';
import { Rst } from '@/utils/baseBo.ts';
import { menuApplicationTreeApi } from '@/pages/system/menu/api.tsx';
import { roleAllApi } from '@/pages/system/role/api.tsx';
import { deptPageApi } from '@/pages/system/dept/api.tsx';

type Props = {
  detailId: number
  operateEnum: OperateEnum
  setAddOrUpdateModalFn: React.Dispatch<React.SetStateAction<OperateEnum>>,
  reloadTable: () => void,
  // applicationList: [],
  // deptTreeList: [],
  // roleList: [],
};
const AddOrUpdate = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [formRef] = Form.useForm<AccountItemBo>();
  const [applicationList, setApplicationListFn] = useState([]);
  const [deptTreeList, setDeptTreeListFn] = useState([]);
  const [roleList, setRoleListFn] = useState([]);
  const [selectRoleList, setSelectRoleList] = useState([]);
  const [detail, setDetailFn] = useState<AccountItemBo>({
    applicationList: [], menu: [],
  });
  const initMyDataFn = async () => {
    menuApplicationTreeApi({}).then(rst => {
      if (checkApiRst(rst)) return;
      let applicationList1 = rst.data;
      setApplicationListFn(applicationList1);
    });
    roleAllApi({}).then(rst => {
      setRoleListFn(rst.data);
    });
    deptPageApi({}).then(rst => {
      setDeptTreeListFn(rst.data);
    });
    if (props.operateEnum === OperateEnum.add) return;
    setLoading(true);
    const res = await accountGetOneApi({ id: props.detailId });
    res.data.roleIds = res.data.roleList.map((role) => role.id);
    setSelectRoleList(res.data.roleList);
    setDetailFn(res.data);
    formRef.setFieldsValue(res.data);
    setLoading(false);
  };

  useEffect(() => {
    initMyDataFn();
    return () => {
    };
  }, []); // 第二个参数表示依赖项


  // 新增用户 编辑用户的时候 修改角色的是 联动
  const roleSelectChangeFn = async (value: string[]) => {
    const selectRoleList = [];
    roleList.filter((role) => {
        if (value.includes(role.id)) {
          selectRoleList.push(role);
        }
      },
    );
    setSelectRoleList(selectRoleList);

  };

  const saveFn = async () => {
    const isPass = await formRef.validateFields().catch(() => false);
    if (!isPass) return;
    const values = await formRef?.getFieldsValue();
    oFormatForm(values);
    let res: Rst<any>;
    if (detail?.id) {
      res = await accountUpdateApi({ ...values, id: detail?.id });
    } else {
      let password = values.password;
      res = await accountSaveApi({ ...values, password: password, type: 1 });
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


  return (
    <div>
      <Spin spinning={loading}>

        <Form form={formRef}
              labelCol={{ flex: '10%' }}
              wrapperCol={{ flex: '90%' }}>
          <Form.Item label="账号" name="account" rules={[{ required: true }]}>
            <Input placeholder="请输入" autoComplete="new-password"
                   disabled={props.operateEnum === OperateEnum.edit}
            />
          </Form.Item>
          <Form.Item label="昵称" name="nickName" rules={[{ required: true }]}>
            <Input placeholder="请输入" autoComplete="new-password" />
          </Form.Item>
          <Form.Item label="手机号" name="phone" rules={[{ required: true }]}>
            <Input placeholder="请输入" autoComplete="new-password" />
          </Form.Item>
          {props.operateEnum === OperateEnum.add &&
            <Form.Item label="密码" name="password" rules={[{ required: true }]}>
              <Password placeholder="请输入" autoComplete="new-password" />
            </Form.Item>
          }

          <Form.Item label="状态" name="disabled" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value={0}> 启用 </Radio>
              <Radio value={1}> 禁用 </Radio>
            </Radio.Group>
          </Form.Item>

          {/*<Form.Item label="类型" name="type" rules={[{ required: true }]}>*/}
          {/*  <Radio.Group disabled={props.operateEnum === OperateEnum.edit}>*/}
          {/*    <Radio value={0}> 前台 </Radio>*/}
          {/*    <Radio value={1}> 后台 </Radio>*/}
          {/*  </Radio.Group>*/}
          {/*</Form.Item>*/}
          <Form.Item label="角色" name="roleIds" rules={[{ required: true }]}>
            <Select
              mode="multiple"
              options={roleList}
              fieldNames={{ label: 'name', value: 'id' }}
              onChange={roleSelectChangeFn}
            />
          </Form.Item>
          <Form.Item label="邮箱" name="email" rules={[{ required: true }]}>
            <Input placeholder="请输入" autoComplete="new-password" />
          </Form.Item>

          <Divider>所属部门</Divider>
          <Form.List name="deptList">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div className={'mySpace'} key={key}>
                    <Space key={key} align="baseline">

                      <Form.Item
                        {...restField}
                        name={[name, 'deptId']}
                        rules={[{ required: true, message: '请选择部门' }]}
                      >
                        <TreeSelect
                          placeholder="请选择部门"
                          treeDefaultExpandAll={true}
                          fieldNames={{ label: 'name', value: 'id' }}
                          treeData={deptTreeList}
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'owner']}
                        rules={[{ required: true, message: '请选择关系' }]}
                      >
                        <Select
                          placeholder={'请选择关系'}
                          options={[
                            {
                              value: 0,
                              label: '员工',
                            },
                            {
                              value: 1,
                              label: '负责人',
                            },
                          ]}
                        />
                      </Form.Item>
                      <div className={'myCenter'}>

                        <MinusCircleOutlined style={{ textAlign: 'right' }} onClick={() => remove(name)} />

                      </div>

                    </Space>
                  </div>
                ))}

                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add field
                  </Button>
                </Form.Item>


              </>
            )}
          </Form.List>
          <Divider />

          <Form.Item
            label="个人简介"
            name="remarks"
          >
            <Input.TextArea allowClear />
          </Form.Item>

          <Tabs defaultActiveKey="0" key={'role'} type={'card'} size={'large'}>
            {selectRoleList.map((role, indexR) => {
              return <Tabs.TabPane tab={role.name} key={indexR}>
                <Tabs defaultActiveKey="0" key={'application'} type={'card'} size={'large'}>
                  {
                    applicationList.map((application, indexA) => {
                      return <Tabs.TabPane tab={application.name} key={indexA}>
                        <MenuComponent
                          application={application}
                          roleId={role.id}
                        />
                      </Tabs.TabPane>;
                    })
                  }
                </Tabs>
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