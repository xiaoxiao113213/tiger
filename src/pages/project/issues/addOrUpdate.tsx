import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, message, Select } from 'antd';
import { ProjectIssueDetailVo } from './ApiBo';
import { projectIssueGetOneApi, projectIssueSaveApi, projectIssueUpdateApi } from './api';
import { OperateEnum } from '@/utils/enum.ts';
import { getNullBo, oFormatForm } from '@/utils/utils.ts';
import { Rst } from '@/utils/baseBo.ts';
import FileUploadCom from '@/components/upload/FileUploadCom.tsx';
import { getAccountDic } from '@/pages/system/account/accountApi.tsx';
import { DicVo } from '@/utils/DicVo.ts';
import projectDic from '@/components/Dic/ProjectDic.ts';
import IssueTypeDic from '@/components/Dic/IssueTypeDic.ts';
import { clientToServerValue1, CustomerFieldBo, serverToClientValue, serverToClientValue1 } from '@/pages/flow/process/process/form/form/Bo.tsx';
import { fileClientToServer, fileServerToClient } from '@/components/upload/utils.ts';
import { projectCustomFieldAllApi } from '@/pages/project/project/api.tsx';
import SubmitNowform from '@/pages/flow/process/process/form/form/submitForm/submitNowform.tsx';
import dayjs from 'dayjs';
import { projectReleaseAllApi } from '@/pages/project/release/api.tsx';

type Props = {
  detailId: number
  operateEnum: OperateEnum
  setAddOrUpdateModalFn: React.Dispatch<React.SetStateAction<OperateEnum>>,
  reloadTable: () => void,
  defaultProjectId?: number
};
const AddOrUpdate = (props: Props) => {
  const [formRef] = Form.useForm<ProjectIssueDetailVo>();
  const [detail, setDetailFn] = useState<ProjectIssueDetailVo>(getNullBo);
  const [accountDic, setAccountDic] = useState<DicVo[]>();
  const { ProjectList } = projectDic();
  const { IssueTypeList } = IssueTypeDic();
  const [fieldList, setFieldList] = useState<CustomerFieldBo[]>();

  const [releaseDicList, setReleaseDicList] = useState<DicVo[]>([]);

  const initMyDataFn = async () => {
    // 获取release字典
    projectReleaseAllApi({ projectId: props.defaultProjectId }).then((res) => {
      setReleaseDicList(res.data);
    });

    // 获取自定义字段
    const rst1 = await projectCustomFieldAllApi({ bizType: '2' } as any);
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
      let rst = await projectIssueGetOneApi({ projectIssueId: props.detailId });
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
      formRef.setFieldsValue({ projectId: props.defaultProjectId });
    }


  };

  useEffect(() => {
    initMyDataFn();
    return () => {
    };
  }, []); // 第二个参数表示依赖项
  if (fieldList === undefined) return <div></div>;


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
      res = await projectIssueUpdateApi({ ...values, projectIssueId: props.detailId });
    } else {
      res = await projectIssueSaveApi({ ...values });
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
            labelCol={{ flex: '120px' }}
      >
        <Form.Item label="所属项目" name="projectId" rules={[{ required: true }]}>
          <Select options={ProjectList} disabled={true}>
          </Select>
        </Form.Item>
        <Form.Item label="所属版本" name="projectReleaseId" rules={[{ required: false }]}>
          <Select allowClear={true}
                  options={releaseDicList}
          >
          </Select>
        </Form.Item>
        <Form.Item label="类型" name="type" rules={[{ required: true }]}>
          <Select options={IssueTypeList} disabled={props.operateEnum == OperateEnum.edit}>
          </Select>
        </Form.Item>
        <Form.Item label="标题" name="name" rules={[{ required: true }]}>
          <Input placeholder="请输入" maxLength={200} showCount />
        </Form.Item>
        <Form.Item label="计划开始时间" name="planStartDate" rules={[{ required: true }]}>
          <DatePicker placeholder="请选择" />
        </Form.Item>
        <Form.Item label="计划结束时间" name="planEndDate" rules={[{ required: true }]}>
          <DatePicker placeholder="请选择" />
        </Form.Item>
        <Form.Item label="开始时间" name="startDate" rules={[{ required: false }]}>
          <DatePicker placeholder="请选择" />
        </Form.Item>
        <Form.Item label="结束时间" name="endDate" rules={[{ required: false }]}>
          <DatePicker placeholder="请选择"
                      onChange={(date) => {
                        console.log(date);
                      }}
          />
        </Form.Item>
        <Form.Item label="描述" name="remarks" rules={[{ required: false }]}>
          <Input.TextArea placeholder="请输入" maxLength={1900} showCount
                          autoSize={{ minRows: 2, maxRows: 5 }}
          />
        </Form.Item>
        <Form.Item label="优先级" name="priority" rules={[{ required: true }]} initialValue={0}>
          <Select defaultActiveFirstOption={true}>
            <Select.Option value={0}>一般</Select.Option>
            <Select.Option value={1}>重要</Select.Option>
            <Select.Option value={2}>紧急</Select.Option>
          </Select>
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