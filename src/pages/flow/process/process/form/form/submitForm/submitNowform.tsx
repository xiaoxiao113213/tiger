import React from 'react';
import TextSubmit from '@/pages/flow/process/process/form/form/submitForm/field/textSubmit';
import TextAreaSubmit from '@/pages/flow/process/process/form/form/submitForm/field/textAreaSubmit';
import SelectSubmit from '@/pages/flow/process/process/form/form/submitForm/field/SelectSubmit';
import MutSelectSubmit from '@/pages/flow/process/process/form/form/submitForm/field/MutSelectSubmit';
import { CustomerFieldBo, FormFieldTypeEnum } from '@/pages/flow/process/process/form/form/Bo.tsx';
import DateSubmit from '@/pages/flow/process/process/form/form/submitForm/field/DateSubmit.tsx';
import NumberSubmit from '@/pages/flow/process/process/form/form/submitForm/field/NumberSubmit.tsx';
import FileUploadSubmit from '@/pages/flow/process/process/form/form/submitForm/field/FileUploadSubmit.tsx';


const Index = React.memo(({ initFieldBo }: { initFieldBo: CustomerFieldBo }) => {

  return (
    <div>
      {
        FormFieldTypeEnum.text === initFieldBo?.type &&
        <TextSubmit initFieldBo={initFieldBo}></TextSubmit>
      }
      {
        FormFieldTypeEnum.textArea === initFieldBo?.type &&
        <TextAreaSubmit initFieldBo={initFieldBo}></TextAreaSubmit>
      }
      {
        FormFieldTypeEnum.select === initFieldBo?.type &&
        <SelectSubmit initFieldBo={initFieldBo}></SelectSubmit>
      }
      {
        FormFieldTypeEnum.mutSelect === initFieldBo?.type &&
        <MutSelectSubmit initFieldBo={initFieldBo}></MutSelectSubmit>
      }
      {
        FormFieldTypeEnum.file === initFieldBo?.type &&
        <FileUploadSubmit initFieldBo={initFieldBo} />
      }
      {
        FormFieldTypeEnum.date === initFieldBo?.type &&
        <DateSubmit initFieldBo={initFieldBo}></DateSubmit>
      }
      {
        FormFieldTypeEnum.number === initFieldBo?.type &&
        <NumberSubmit initFieldBo={initFieldBo}></NumberSubmit>
      }

    </div>
  );
});

export default Index;