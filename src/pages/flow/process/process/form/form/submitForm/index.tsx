import React from 'react';
import TextSubmit from '@/pages/flow/process/process/form/form/submitForm/field/textSubmit';
import TextAreaSubmit from '@/pages/flow/process/process/form/form/submitForm/field/textAreaSubmit';
import SelectSubmit from '@/pages/flow/process/process/form/form/submitForm/field/SelectSubmit';
import MutSelectSubmit from '@/pages/flow/process/process/form/form/submitForm/field/MutSelectSubmit';
import FileSubmit from '@/pages/flow/process/process/form/form/submitForm/field/FileSubmit';
import { CustomerFieldBo, FormFieldTypeEnum } from '@/pages/flow/process/process/form/form/Bo.tsx';
import DateSubmit from '@/pages/flow/process/process/form/form/submitForm/field/DateSubmit.tsx';
import NumberSubmit from '@/pages/flow/process/process/form/form/submitForm/field/NumberSubmit.tsx';

// 表单 支持修改属性，但是不支持文件提交
const Index = (props: {
  initFieldBo: CustomerFieldBo,
}) => {
  return (
    <>
      {
        FormFieldTypeEnum.text === props.initFieldBo?.type &&
        <TextSubmit initFieldBo={props.initFieldBo}></TextSubmit>
      }
      {
        FormFieldTypeEnum.textArea === props.initFieldBo?.type &&
        <TextAreaSubmit initFieldBo={props.initFieldBo}></TextAreaSubmit>
      }
      {
        FormFieldTypeEnum.select === props.initFieldBo?.type &&
        <SelectSubmit initFieldBo={props.initFieldBo}></SelectSubmit>
      }
      {
        FormFieldTypeEnum.mutSelect === props.initFieldBo?.type &&
        <MutSelectSubmit initFieldBo={props.initFieldBo}></MutSelectSubmit>
      }
      {
        FormFieldTypeEnum.file === props.initFieldBo?.type &&
        <FileSubmit initFieldBo={props.initFieldBo}></FileSubmit>
      }
      {
        FormFieldTypeEnum.date === props.initFieldBo?.type &&
        <DateSubmit initFieldBo={props.initFieldBo}></DateSubmit>
      }
      {
        FormFieldTypeEnum.number === props.initFieldBo?.type &&
        <NumberSubmit initFieldBo={props.initFieldBo}></NumberSubmit>
      }

    </>
  );
};

export default Index;