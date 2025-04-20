import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, message, Select } from 'antd';
import { ProjectDetailVo, projectStatusDic } from './ApiBo';
import { projectCustomFieldAllApi, projectGetOneApi, projectSaveApi, projectUpdateApi } from './api';
import { OperateEnum } from '@/utils/enum.ts';
import { Rst } from '@/utils/baseBo.ts';
import projectTypeDic from '@/components/Dic/projectTypeDic.ts';
import { DicVo } from '@/utils/DicVo.ts';
import { getAccountDic } from '@/pages/system/account/accountApi.tsx';
import FileUploadCom from '@/components/upload/FileUploadCom.tsx';
import dayjs from 'dayjs';
import SubmitNowform from '@/pages/flow/process/process/form/form/submitForm/submitNowform.tsx';
import { clientToServerValue1, CustomerFieldBo, serverToClientValue, serverToClientValue1 } from '@/pages/flow/process/process/form/form/Bo.tsx';
import { fileClientToServer, fileServerToClient } from '@/components/upload/utils.ts';
import { oFormatForm } from '@/utils/utils.ts';

type Props = {
  detailId: number
  operateEnum: OperateEnum
  setAddOrUpdateModalFn: React.Dispatch<React.SetStateAction<OperateEnum>>,
  reloadTable: () => void
};
const AddOrUpdate = (props: Props) => {
  const [formRef] = Form.useForm<ProjectDetailVo>();
  const [detail, setDetailFn] = useState<ProjectDetailVo>();
  const { projectTypeList } = projectTypeDic();
  const [accountDic, setAccountDic] = useState<DicVo[]>();

  const [fieldList, setFieldList] = useState<CustomerFieldBo[]>();
  const initMyDataFn = async () => {
    // 获取自定义字段
    const rst1 = await projectCustomFieldAllApi({ bizType: '0' } as any);
    const fieldList = rst1.data;
    fieldList.forEach((item) => {
      const projectCustomFieldId = item.projectCustomFieldId;
      const item1 = item as CustomerFieldBo;
      serverToClientValue(item1);
      item1.id = projectCustomFieldId + '_customField';
    });
    setFieldList(fieldList);
    // 获取账号字典
    const rst = await getAccountDic();
    rst.data.forEach(item => item.value = item.value.toString());
    setAccountDic(rst.data);
    if (props.operateEnum === OperateEnum.edit) {
      // 获取详情
      let rst = await projectGetOneApi({ projectId: props.detailId });
      rst.data.planEndDate = rst.data.planEndDate ? dayjs(rst.data.planEndDate) : undefined;
      rst.data.planStartDate = rst.data.planStartDate ? dayjs(rst.data.planStartDate) : undefined;
      rst.data.startDate = rst.data.startDate ? dayjs(rst.data.startDate) : undefined;
      rst.data.endDate = rst.data.endDate ? dayjs(rst.data.endDate) : undefined;
      rst.data.headUserId = rst.data.headUserId == 0 ? undefined : rst.data.headUserId;
      rst.data.reporterUserId = rst.data.reporterUserId == 0 ? undefined : rst.data.reporterUserId;
      rst.data.fileList = fileServerToClient(rst.data.fileList);
      setDetailFn(rst.data);

      for (let key in rst.data.customValues) {
        if (rst.data.customValues.hasOwnProperty(key)) {
          const keys = key.split('_');
          if (keys.length === 2) {
            const projectCustomFieldId = keys[0];
            rst.data.customValues[key] = serverToClientValue1(fieldList.find(item => item.projectCustomFieldId == projectCustomFieldId), rst.data.customValues[key]);
          }
        }
      }
      console.log(rst.data);
      formRef.setFieldsValue({ ...rst.data, ...rst.data.customValues });
    } else {
      setDetailFn({} as ProjectDetailVo);
    }
  };
  useEffect(() => {
    initMyDataFn();
    return () => {
    };
  }, []); // 第二个参数表示依赖项


  if (!detail) return null;
  if (!fieldList) return null;


  const saveFn = async () => {
    const isPass = await formRef.validateFields().catch(() => false);
    if (!isPass) return;
    const values = await formRef?.getFieldsValue();
    oFormatForm(values);
    for (let key in values) {
      if (values.hasOwnProperty(key)) {
        const keys = key.split('_');
        if (keys.length === 2) {
          const projectCustomFieldId = keys[0];
          values[keys[0]] = clientToServerValue1(fieldList.find(item => item.projectCustomFieldId == projectCustomFieldId), values[key]);
          delete values[key];
        }
      }
    }
    values.fileList = fileClientToServer(values.fileList);
    let res: Rst<any>;
    if (props.operateEnum === OperateEnum.edit) {
      res = await projectUpdateApi({ ...values, projectId: props.detailId });
    } else {
      res = await projectSaveApi({ ...values });
    }
    if (res.code !== 1000) return;
    message.success(res.msg);
    props.reloadTable();
    props.setAddOrUpdateModalFn(OperateEnum.close);
  };

  const closeModal = () => {
    props.setAddOrUpdateModalFn(OperateEnum.close);
  };


  return (
    <div>
      <Form form={formRef}
            labelCol={{ flex: '100px' }}
        // wrapperCol={{ flex: '90%' }}
      >
        <Form.Item label="名称" name="name" rules={[{ required: true }]}>
          <Input placeholder="请输入" maxLength={200} showCount />
        </Form.Item>
        <Form.Item label="类型" name="type" rules={[{ required: true }]}>
          <Select placeholder="请选择"
                  options={projectTypeList}
          />
        </Form.Item>

        <Form.Item label="编码" name="code" rules={[{ required: true }]}>
          <Input placeholder="请输入" maxLength={200} showCount disabled={props.operateEnum != OperateEnum.add} />
        </Form.Item>
        <Form.Item label="状态" name="status" rules={[{ required: true }]}>
          <Select placeholder="请选择"
                  options={projectStatusDic}
          />
        </Form.Item>
        <Form.Item label="计划开始日期" name="planStartDate" rules={[{ required: false }]}>
          <DatePicker placeholder="请选择" />
        </Form.Item>
        <Form.Item label="计划结束日期" name="planEndDate" rules={[{ required: false }]}>
          <DatePicker placeholder="请选择" />
        </Form.Item>
        <Form.Item label="实际开始日期" name="startDate" rules={[{ required: false }]}>
          <DatePicker placeholder="请选择" />
        </Form.Item>
        <Form.Item label="实际结束日期" name="endDate" rules={[{ required: false }]}>
          <DatePicker placeholder="请选择" />
        </Form.Item>
        <Form.Item label="描述" name="remarks" rules={[{ required: false }]}>
          <Input.TextArea placeholder="请输入"
                          showCount
                          maxLength={2000}
                          autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Form.Item>
        <Form.Item label="负责人" name="headUserId" rules={[{ required: true }]}>
          <Select placeholder="请选择"
                  options={accountDic}
                  optionFilterProp="label"
                  showSearch={true}
          />
        </Form.Item>
        <Form.Item label="报告人" name="reporterUserId" rules={[{ required: false }]}>
          <Select placeholder="请选择"
                  options={accountDic}
                  optionFilterProp="label"
                  showSearch={true}

          />
        </Form.Item>

        <FileUploadCom name={'fileList'} label={'附件'} required={false} />

        {/*<Form.Item label='状态' name='disabled' rules={[{required: true}]}>*/}
        {/*    <Radio.Group>*/}
        {/*        <Radio value={0}> 启用 </Radio>*/}
        {/*        <Radio value={1}> 禁用 </Radio>*/}
        {/*    </Radio.Group>*/}
        {/*</Form.Item>*/}


        {
          fieldList.map((item) => {
            return <SubmitNowform
              key={item.id}
              initFieldBo={item}
            ></SubmitNowform>;
          })
        }


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