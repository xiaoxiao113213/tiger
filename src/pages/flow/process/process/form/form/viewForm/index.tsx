import React from 'react';
import { CustomerFieldBo, DateTypeEnum, FormFieldTypeEnum } from '@/pages/flow/process/process/form/form/Bo.tsx';
import { ProcessInstancePointFormFieldDetailVo } from '@/pages/flow/process/myProcess/api/ApiBo.ts';
import { Descriptions, Upload } from 'antd';
import dayjs from 'dayjs';
import { fileUploadVo } from '@/utils/baseBo.ts';
import { getUserToken } from '@/store/userStore.ts';

// 数据 展示页面
const Index = (props: {
  initFieldBoList: CustomerFieldBo[] | ProcessInstancePointFormFieldDetailVo[],
  column?: number,
  bordered?: boolean,
}) => {

  const items = props.initFieldBoList.map((item) => {
    if (item.type === FormFieldTypeEnum.text) {
      return {
        key: item.keyName,
        label: item.name,
        children: item.value,
      };
    } else if (item.type === FormFieldTypeEnum.number) {
      if (item.unit === null || item.unit === undefined || item.unit === 'null') {
        item.unit = '';
      }
      return {
        key: item.keyName,
        label: item.name,
        children: (item.value ?? '') + ' ' + item.unit,
      };
    } else if (item.type === FormFieldTypeEnum.textArea) {
      return {
        key: item.keyName,
        label: item.name,
        children: item.value,
      };
    } else if (item.type === FormFieldTypeEnum.select) {
      let value = item.value;
      if (item.value === null ||
        item.value === undefined ||
        item.value === ''
      ) {
      } else {
        item.optional?.forEach((item) => {
          if (item.value === item.value) {
            value = item.label;
          }
        });
      }
      return {
        key: item.keyName,
        label: item.name,
        children: value,
      };
    } else if (item.type === FormFieldTypeEnum.mutSelect) {
      let value = item.value;
      if (item.value === null ||
        item.value === undefined ||
        item.value === ''
      ) {
      } else {
        value = '';
        const selectValue = JSON.parse(item.value);
        item.optional?.forEach((item) => {
          if (selectValue.includes(item.value)) {
            value += item.label + ', ';
          }
        });
        value = value.substring(0, value.length - 2);
      }
      return {
        key: item.keyName,
        label: item.name,
        children: value,
      };
    } else if (item.type === FormFieldTypeEnum.file) {
      if (item.value === null ||
        item.value === undefined ||
        item.value === ''
      ) {
        return {
          key: item.keyName,
          label: item.name,
          children: '',
        };
      } else {
        const value = JSON.parse(item.value) as fileUploadVo[];
        const token = getUserToken()?.fileToken ?? '';
        const fileList = value.map((item) => {
          return {
            uid: item.fileKey,
            name: item.fileName,
            status: 'done',
            url: item.fullPath + '?token=' + token,
          };
        });
        return {
          key: item.keyName,
          label: item.name,
          children: <Upload action="/upload.do" listType="picture-card" disabled={true}
                            fileList={fileList}>
          </Upload>,
        };
      }

    } else if (item.type === FormFieldTypeEnum.date) {
      let value = item.value;
      if (item.value === null ||
        item.value === undefined ||
        item.value === ''
      ) {
      } else {
        let date = dayjs(item.value);
        if (item.dateType === DateTypeEnum.year) {
          value = date.format('YYYY');
        } else if (item.dateType === DateTypeEnum.yearMonth) {
          value = date.format('YYYY-MM');
        } else if (item.dateType === DateTypeEnum.yearMonthDay) {
          value = date.format('YYYY-MM-DD');
        } else if (item.dateType === DateTypeEnum.yearMonthDayHour) {
          value = date.format('YYYY-MM-DD HH');
        } else if (item.dateType === DateTypeEnum.yearMonthDayHourMinuteSecond) {
          value = date.format('YYYY-MM-DD HH:mm:ss');
        } else if (item.dateType === DateTypeEnum.hourMinuteSecond) {
          value = date.format('HH:mm:ss');
        }
      }
      return {
        key: item.keyName,
        label: item.name,
        children: value,
      };

    } else {
      return {
        key: item.keyName,
        label: item.name,
        children: item.value,
      };
    }


  });


  return (
    <div>
      <Descriptions items={items} layout={'horizontal'} bordered={props.bordered ?? false}
        // column={props.column ?? 2}
      />
    </div>
  );
};

export default Index;