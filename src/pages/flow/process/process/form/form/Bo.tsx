import { DicVo } from '@/utils/DicVo.ts';
import { RcFile } from 'antd/es/upload';
import dayjs from 'dayjs';
import { ProcessPointFormFieldVo } from '@/pages/flow/process/process/api/ProcessPointFormFieldApiBo.ts';
import { fileUploadVo } from '@/utils/baseBo.ts';
import { getUserToken } from '@/store/userStore.ts';
import { oGetRandomNumberString } from '@/utils/utils.ts';

export type CustomerFieldBo = {
  id: string; // 用于区分每个字段的唯一标识
  formFieldId: string;  // 表单字段id  这个主要用来 当右侧的属性进行编辑的时候，可以通过这个id重新赋值的时候 然后中间的表单显示的时候 进行实时的更新
  //
  name: string;
  keyName: string;
  type: number | FormFieldTypeEnum;
  optional: DicVo[] | undefined;
  value: string | RcFile | undefined;
  desc: string;
  notNull: number; //0可为空 1不可为空

  dateType: number | undefined; // 时间插件类型
  unit: string | undefined; // 数字单位
  scope: number | undefined | null; //作用域0局部 1全局  流水线特殊字段时候有 其他的时候没有值
  notEditKeyName?: boolean | undefined | null; // 是否不可编辑keyName

//   业务字段
//   当流水线 全局参数的时候 这个值 可能会是 插件的全局参数 会有此值
  pipelinePluginDetailId?: number | undefined | null;
//  项目自定义字段的时候 会有此值
  projectCustomFieldId: number | string | undefined | null;
}

export enum DateTypeEnum {
  year = 0, // 日期
  yearMonth = 1, // 日期
  yearMonthDay = 2, // 日期
  yearMonthDayHour = 3, // 日期
  yearMonthDayHourMinuteSecond = 4, // 日期
  hourMinuteSecond = 5, // 日期
}

export enum FormFieldTypeEnum {
  text = 1,//文本框
  number = 2,//数字
  textArea = 3,//文本域
  select = 4,//下拉单选
  mutSelect = 5,//下拉多选框
  file = 6,//文件
  date = 7,//时间
  password = 8,//密码文本框
  account = 9,//账号
}

//适配value 值
export const serverToClientValue = (item: ProcessPointFormFieldVo | CustomerFieldBo) => {
  item.id = oGetRandomNumberString(10);
  item.formFieldId = oGetRandomNumberString(10);
  if (item.type === FormFieldTypeEnum.mutSelect) {
    item.value = JSON.parse(item.value);
  } else if (item.type === FormFieldTypeEnum.date) {
    //   时间格式化成 yyyy-MM-dd HH:mm:ss
    if (item.value) {
      item.value = dayjs(item.value);
    }
  } else if (item.type === FormFieldTypeEnum.file) {
    if (item.value != null && item.value != '') {
      const value = JSON.parse(item.value) as fileUploadVo[];
      const token = getUserToken()?.fileToken ?? '';
      const fileList = value.map((item) => {
        return {
          data: item,
          uid: item.fileKey,
          name: item.fileName,
          status: 'done',
          // url: item.fullPath + '?token=' + token,
          url: import.meta.env.VITE_APP_BASE_API + '/devops-server/public/biz/download/0/' + item.fileKey + '?token=' + token,
        };
      });
      item.value = fileList;
    } else {
      item.value = [];
    }
  }
};

export const serverToClientValue1 = (item: ProcessPointFormFieldVo | CustomerFieldBo, serverValue?: any): any | undefined => {
  if (item.type === FormFieldTypeEnum.mutSelect) {
    return JSON.parse(serverValue);
  } else if (item.type === FormFieldTypeEnum.date) {
    //   时间格式化成 yyyy-MM-dd HH:mm:ss
    if (serverValue) {
      return dayjs(serverValue);
    }
  } else if (item.type === FormFieldTypeEnum.file) {
    if (serverValue != null && serverValue != '') {
      const value = JSON.parse(serverValue) as fileUploadVo[];
      const token = getUserToken()?.fileToken ?? '';
      const fileList = value.map((item) => {
        return {
          data: item,
          uid: item.fileKey,
          name: item.fileName,
          status: 'done',
          // url: item.fullPath + '?token=' + token,
          url: import.meta.env.VITE_APP_BASE_API + '/devops-server/public/biz/download/0/' + item.fileKey + '?token=' + token,
        };
      });
      // return { fileList: fileList,upload: {fileList: fileList}};
      return fileList;
    } else {
      return [];
    }
  } else {
    return serverValue;
  }
};

// 客户端的值转换成服务端的值
export const clientToServerValue1 = (item: ProcessPointFormFieldVo | CustomerFieldBo, value?: any) => {
  if (!value) {
    return value;
  }
  if (item.type === FormFieldTypeEnum.mutSelect) {
    return JSON.stringify(value);
  } else if (item.type === FormFieldTypeEnum.date) {
    //   时间格式化成 yyyy-MM-dd HH:mm:ss
    return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
  } else if (item.type === FormFieldTypeEnum.file) {
    //   文件上传
    return JSON.stringify(
      value.map((item) => {
        return item.data;
      }),
    );
  } else {
    return value;
  }

};

export const clientToServerValue = (item: ProcessPointFormFieldVo | CustomerFieldBo, data: {}) => {
  if (data[item.keyName] != undefined && data[item.keyName] != null) {
    if (item.type === FormFieldTypeEnum.mutSelect) {
      data[item.keyName] = JSON.stringify(data[item.keyName]);
    } else if (item.type === FormFieldTypeEnum.date) {
      //   时间格式化成 yyyy-MM-dd HH:mm:ss
      data[item.keyName] = dayjs(data[item.keyName]).format('YYYY-MM-DD HH:mm:ss');
    } else if (item.type === FormFieldTypeEnum.file) {
      //   文件上传
      data[item.keyName] = JSON.stringify(
        data[item.keyName].map((item) => {
          return item.data;
        }),
      );
    }
  }
};


export const clientToServerValueItem = (item: ProcessPointFormFieldVo | CustomerFieldBo) => {

  if (item.type === FormFieldTypeEnum.mutSelect) {
    item.value = JSON.stringify(item.value ?? []);
  } else if (item.type === FormFieldTypeEnum.date) {
    //   时间格式化成 yyyy-MM-dd HH:mm:ss
    if (item.value) {
      item.value = dayjs(item.value).format('YYYY-MM-DD HH:mm:ss');
    }
  } else if (item.type === FormFieldTypeEnum.file) {
    //   文件上传
    item.value = JSON.stringify(
      item.value?.map((item) => {
        return item.data;
      }),
    );
  }
};

