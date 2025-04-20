import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, Card, Checkbox, Col, Divider, Form, FormInstance, Row, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { PermissionParentBo } from '@/pages/pipeline/pipeline/component/pipelineTab';
import { PipelineBo } from '@/pages/pipeline/pipeline/api/bo.tsx';
import { OperateEnum } from '@/utils/enum.ts';
import { AccountItemBo } from '@/pages/system/account/ApiBo.ts';
import { accountAllApi } from '@/pages/system/account/accountApi.tsx';
import { roleAllApi } from '@/pages/system/role/api.tsx';
import { deptAllApi } from '@/pages/system/dept/api.tsx';


type Props = {
  // 初始化的查询参数 可插入一些 写死的参数值
  detail: PipelineBo,
  setDetailFn: Dispatch<SetStateAction<PipelineBo>>,
  pipelineNodeList: [],
  detailFormRef: FormInstance<PipelineBo>,
  userPermissionsForm: FormInstance<PermissionParentBo>,
  deptPermissionsForm: FormInstance<PermissionParentBo>,
  rolePermissionsForm: FormInstance<PermissionParentBo>,
  openType: OperateEnum,
  softList: [],
  otherAccountList: []
};

interface RoleItemBo {
}

const PipelinePermissionAdd = (props: Props) => {

  const [accountList, setAccountListFn] = useState<AccountItemBo[]>([]);
  const [roleList, setRoleListFn] = useState<RoleItemBo[]>([]);
  const [deptList, setDeptListFn] = useState<RoleItemBo[]>([]);

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };
  useEffect(() => {
    // 在组件挂载或更新后执行操作
    accountAllApi({}).then(rst => {
      setAccountListFn(rst.data);
    });
    roleAllApi({}).then(rst => {
      setRoleListFn(rst.data);
    });
    deptAllApi({}).then(rst => {
      setDeptListFn(rst.data);
    });
    return () => {
      // 在组件卸载前执行清理操作
    };
  }, []); // 第二个参数表示依赖项


  return (

    <div>
      <Divider orientation="center">用户</Divider>
      <div className={'mmm-bgcolor'}>
        <Card>
          <Form
            name="user"
            onFinish={onFinish}
            autoComplete="off"
            form={props.userPermissionsForm}
            disabled={props.openType === OperateEnum.detail}
          >
            <Form.List name="list">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (

                    <div key={key} style={{ width: '100%', display: 'flex', alignItems: 'baseline' }}>
                      <div style={{ width: '30%', marginRight: '10%' }}>
                        <Form.Item
                          {...restField}
                          name={[name, 'bizId']}
                          rules={[{ required: true, message: 'select' }]}
                        >
                          <Select
                            options={accountList}
                            fieldNames={{ label: 'account', value: 'id' }}
                            placeholder="选择用户"
                          />
                        </Form.Item>
                      </div>
                      <div style={{ width: '45%', marginRight: '4%' }}>
                        <Form.Item
                          {...restField}
                          name={[name, 'permissions']}
                          rules={[{ required: false, message: 'Missing last name' }]}
                        >
                          <Checkbox.Group style={{ width: '100%' }}>
                            <Row>
                              <Col span={8}>
                                <Checkbox value="look">查看</Checkbox>
                              </Col>
                              <Col span={8}>
                                <Checkbox value="edit">编辑</Checkbox>
                              </Col>
                              <Col span={8}>
                                <Checkbox value="build">构建</Checkbox>
                              </Col>
                            </Row>
                          </Checkbox.Group>
                        </Form.Item>


                      </div>
                      {props.openType !== OperateEnum.detail &&
                        <div style={{ width: '10%' }}>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </div>
                      }
                    </div>

                  ))}
                  {props.openType !== OperateEnum.detail &&
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        添加用户
                      </Button>
                    </Form.Item>
                  }
                </>
              )}
            </Form.List>
          </Form>
        </Card>
      </div>
      <Divider orientation="center">部门</Divider>
      <div className={'mmm-bgcolor'}>
        <Card>
          <Form
            name="dept"
            onFinish={onFinish}
            // style={{maxWidth: 600}}
            autoComplete="off"
            form={props.deptPermissionsForm}
            // labelCol={{ flex: "23%" }}
            // wrapperCol={{ flex: "77%" }}
            disabled={props.openType === OperateEnum.detail}
          >
            <Form.List name="list">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (

                    <div key={key} style={{ width: '100%', display: 'flex', alignItems: 'baseline' }}>
                      <div style={{ width: '30%', marginRight: '10%' }}>
                        <Form.Item
                          {...restField}
                          name={[name, 'bizId']}
                          rules={[{ required: true, message: 'select' }]}
                        >
                          <Select
                            options={deptList}
                            fieldNames={{ label: 'name', value: 'id' }}
                            placeholder="选择用户"
                          />
                        </Form.Item>
                      </div>
                      <div style={{ width: '45%', marginRight: '4%' }}>

                        <Form.Item
                          {...restField}
                          name={[name, 'permissions']}
                          rules={[{ required: false, message: 'Missing last name' }]}
                        >
                          <Checkbox.Group style={{ width: '100%' }}>
                            <Row>
                              <Col span={8}>
                                <Checkbox value="look">查看</Checkbox>
                              </Col>
                              <Col span={8}>
                                <Checkbox value="edit">编辑</Checkbox>
                              </Col>
                              <Col span={8}>
                                <Checkbox value="build">构建</Checkbox>
                              </Col>
                            </Row>
                          </Checkbox.Group>
                        </Form.Item>


                      </div>
                      {props.openType !== OperateEnum.detail &&
                        <div style={{ width: '10%' }}>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </div>
                      }
                    </div>

                  ))}
                  {props.openType !== OperateEnum.detail &&
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        添加部门
                      </Button>
                    </Form.Item>
                  }
                </>
              )}
            </Form.List>
          </Form>
        </Card>
      </div>
      <Divider orientation="center">角色</Divider>
      <div className={'mmm-bgcolor'}>
        <Card>
          <Form
            name="role"
            onFinish={onFinish}
            // style={{maxWidth: 600}}
            autoComplete="off"
            form={props.rolePermissionsForm}
            // labelCol={{ flex: "23%" }}
            // wrapperCol={{ flex: "77%" }}
            disabled={props.openType === OperateEnum.detail}
          >
            <Form.List name="list">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (

                    <div key={key} style={{ width: '100%', display: 'flex', alignItems: 'baseline' }}>
                      <div style={{ width: '30%', marginRight: '10%' }}>
                        <Form.Item
                          {...restField}
                          name={[name, 'bizId']}
                          rules={[{ required: true, message: 'select' }]}
                        >
                          <Select
                            options={roleList}
                            fieldNames={{ label: 'name', value: 'id' }}
                            placeholder="选择用户"
                          />
                        </Form.Item>
                      </div>
                      <div style={{ width: '45%', marginRight: '4%' }}>

                        <Form.Item
                          {...restField}
                          name={[name, 'permissions']}
                          rules={[{ required: false, message: 'Missing last name' }]}
                        >
                          <Checkbox.Group style={{ width: '100%' }}>
                            <Row>
                              <Col span={8}>
                                <Checkbox value="look">查看</Checkbox>
                              </Col>
                              <Col span={8}>
                                <Checkbox value="edit">编辑</Checkbox>
                              </Col>
                              <Col span={8}>
                                <Checkbox value="build">构建</Checkbox>
                              </Col>
                            </Row>
                          </Checkbox.Group>
                        </Form.Item>


                      </div>
                      {props.openType !== OperateEnum.detail &&
                        <div style={{ width: '10%' }}>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </div>
                      }
                    </div>

                  ))}
                  {props.openType !== OperateEnum.detail &&
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        添加角色
                      </Button>
                    </Form.Item>
                  }
                </>
              )}
            </Form.List>
          </Form>
        </Card>
      </div>
    </div>

  );
};

export default PipelinePermissionAdd;
