import React from 'react';
import { CustomerFieldBo, DateTypeEnum } from '@/pages/flow/process/process/form/form/Bo.tsx';
import { DatePicker, Form } from 'antd';

const DateSubmit = (props: { initFieldBo: CustomerFieldBo }) => {

  let scopeName = '';
  if (props.initFieldBo.scope == 1) {
    scopeName = '（全局）';
  }

  return (
    <div>
      {props.initFieldBo.dateType === DateTypeEnum.year &&
        <Form.Item
          label={props.initFieldBo.name + scopeName}
          name={props.initFieldBo.id}
          rules={[{ required: props.initFieldBo.notNull == 1 }]}
          tooltip={props.initFieldBo.desc}
          initialValue={props.initFieldBo.value ?? ''}
        >
          <DatePicker
            format="YYYY" picker="year"
          />
        </Form.Item>
      }
      {props.initFieldBo.dateType === DateTypeEnum.yearMonth &&
        <Form.Item
          label={props.initFieldBo.name + scopeName}
          name={props.initFieldBo.id}
          rules={[{ required: props.initFieldBo.notNull == 1 }]}
          tooltip={props.initFieldBo.desc}
          initialValue={props.initFieldBo.value ?? ''}
        >
          <DatePicker
            format="YYYY-MM" picker="month"
          />
        </Form.Item>
      }
      {props.initFieldBo.dateType === DateTypeEnum.yearMonthDay &&
        <Form.Item
          label={props.initFieldBo.name + scopeName}
          name={props.initFieldBo.id}
          rules={[{ required: props.initFieldBo.notNull == 1 }]}
          tooltip={props.initFieldBo.desc}
          initialValue={props.initFieldBo.value ?? ''}
        >
          <DatePicker
            format="YYYY-MM-DD" picker="date"
          />
        </Form.Item>
      }
      {props.initFieldBo.dateType === DateTypeEnum.yearMonthDayHour &&
        <Form.Item
          label={props.initFieldBo.name + scopeName}
          name={props.initFieldBo.id}
          rules={[{ required: props.initFieldBo.notNull == 1 }]}
          tooltip={props.initFieldBo.desc}
          initialValue={props.initFieldBo.value ?? ''}
        >
          <DatePicker
            format="YYYY-MM-DD HH" picker="date"
            showTime={{ format: 'HH' }}
          />
        </Form.Item>
      }
      {props.initFieldBo.dateType === DateTypeEnum.yearMonthDayHourMinuteSecond &&
        <Form.Item
          label={props.initFieldBo.name + scopeName}
          name={props.initFieldBo.id}
          rules={[{ required: props.initFieldBo.notNull == 1 }]}
          tooltip={props.initFieldBo.desc}
          initialValue={props.initFieldBo.value ?? ''}
        >
          <DatePicker
            format="YYYY-MM-DD HH:mm:ss" picker="date"
            showTime={{ format: 'HH:mm:ss' }}
          />
        </Form.Item>
      }

      {
        props.initFieldBo.dateType === DateTypeEnum.hourMinuteSecond &&
        <Form.Item
          label={props.initFieldBo.name + scopeName}
          name={props.initFieldBo.id}
          rules={[{ required: props.initFieldBo.notNull == 1 }]}
          tooltip={props.initFieldBo.desc}
          initialValue={props.initFieldBo.value ?? ''}
        >
          <DatePicker
            format="HH:mm:ss" picker="time"
          />
        </Form.Item>
      }

    </div>
  );
};

export default DateSubmit;

