import React, { useEffect, useRef, useState } from 'react';
import { Button, DatePicker, Form, Input, message, Radio } from 'antd';


import { OperateEnum } from '@/utils/enum.ts';
import { Rst } from '@/utils/baseBo.ts';
import { RiliDetailVo } from './api/ApiBo';
import { riliGetOneApi, riliSaveApi, riliUpdateApi } from './api/api';
import { AccountCacheVo } from '@/pages/system/account/ApiBo.ts';
import SelectUserComponent, { SelectUserComponentRef } from '@/components/user/SelectUserComponent.tsx';
import FileUploadCom from '@/components/upload/FileUploadCom.tsx';
import dayjs from 'dayjs';
import { fileClientToServer, fileServerToClient } from '@/components/upload/utils.ts';
import { oFormatForm } from '@/utils/utils.ts';

type Props = {
  detail?: { riliId?: number, type: number },
  operateEnum: OperateEnum
  setAddOrUpdateModalFn: React.Dispatch<React.SetStateAction<OperateEnum>>,
  reloadTable: () => void,
};
const AddOrUpdate = (props: Props) => {
  if (!props.detail) {
    return <div></div>;
  }
  const [formRef] = Form.useForm<RiliDetailVo>();
  const [detail, setDetailFn] = useState<RiliDetailVo>();
  const userRef = useRef<SelectUserComponentRef>(null);
  const initMyDataFn = async () => {
    if (props.operateEnum === OperateEnum.edit && props.detail?.riliId) {
      let rst = await riliGetOneApi({ riliId: props.detail.riliId });
      if (rst.code !== 1000) return;
      rst.data.startTime = dayjs(rst.data.startTime);
      rst.data.endTime = dayjs(rst.data.endTime);
      rst.data.fileList = fileServerToClient(rst.data.fileList);
      setDetailFn(rst.data);
      formRef.setFieldsValue(rst.data);
    } else {
      setDetailFn({} as RiliDetailVo);
      formRef.setFieldsValue({});
    }
  };
  useEffect(() => {
    initMyDataFn();
    return () => {
    };
  }, []); // 第二个参数表示依赖项
  if (!detail) {
    return <div></div>;
  }


  const saveFn = async () => {

      const isPass = await formRef.validateFields().catch(() => false);
      if (!isPass) return;
      const userIds = userRef.current?.getSelectedUsers().map((item: AccountCacheVo) => item.id);

      const values = await formRef?.getFieldsValue();
      oFormatForm(values);
      values.fileList = fileClientToServer(values.fileList);
      let res: Rst<any>;
      if (props.operateEnum === OperateEnum.edit && props.detail?.riliId) {
        res = await riliUpdateApi({
          ...values, riliId: props?.detail?.riliId,
          userIds,

        });
      } else {
        res = await riliSaveApi({
          ...values,
          userIds,
        });
      }
      if (res.code !== 1000) return;
      message.success(res.msg);
      props.reloadTable();
      props.setAddOrUpdateModalFn(OperateEnum.close);

    }
  ;

  const closeModal = () => {
    props.setAddOrUpdateModalFn(OperateEnum.close);
  };


  return (
    <div>
      <Form form={formRef}
            labelCol={{ flex: '10%' }}
            wrapperCol={{ flex: '90%' }}>

        <Form.Item label="类型" name="type" rules={[{ required: true }]} initialValue={props.detail.type}>
          <Radio.Group disabled={true}>
            <Radio value={0}> 日程 </Radio>
            {/*<Radio value={1}> 任务 </Radio>*/}
          </Radio.Group>
        </Form.Item>
        <Form.Item label="标题" name="name" rules={[{ required: true }]}>
          <Input placeholder="请输入" showCount maxLength={200} />
        </Form.Item>
        {/*<Form.Item label="status" name="status" rules={[{ required: true }]}>*/}
        {/*  <Input placeholder="请输入" />*/}
        {/*</Form.Item>*/}
        <Form.Item label="描述" name="remarks" rules={[{ required: true }]}>
          <Input.TextArea placeholder="请输入"
                          autoSize={{ minRows: 3, maxRows: 8 }}
                          maxLength={1000}
                          showCount={true}
          />
        </Form.Item>
        <Form.Item label="开始时间" name="startTime" rules={[{ required: true }]}>

          <DatePicker format="YYYY-MM-DD HH:mm" picker="date"
                      showTime={{ format: 'HH:mm' }}
                      onChange={(date, dateString) => {
                        // console.log(date, dateString);
                      }}
                      placeholder={'请选择开始时间'}
          />

        </Form.Item>
        <Form.Item label="结束时间" name="endTime" rules={[{ required: true }]}
        >
          <DatePicker format="YYYY-MM-DD HH:mm" picker="date"
                      showTime={{ format: 'HH:mm' }}
                      onChange={(date, dateString) => {
                      }}
                      placeholder={'请选择结束时间'}
          />
        </Form.Item>
        <FileUploadCom name={'fileList'} label={'附件'} required={false} />
        <SelectUserComponent initSelectedUsers={detail?.userList ?? []}
                             ref={userRef}
        >
        </SelectUserComponent>


        <Form.Item style={{ textAlign: 'center', marginTop: '20px' }}>
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