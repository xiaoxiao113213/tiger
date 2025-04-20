// 当不等于1000 的时候 也就是错误的请求 返回true
import { Rst } from '@/utils/baseBo.ts';
import { PipelineStageBo, PipelineStepBo } from '@/pages/pipeline/pipeline/api/bo.tsx';
import dayjs from 'dayjs';
import { getPermissionList } from '@/store/userStore.ts';

export function checkApiRst(data: Rst<any>) {
  return data.code !== 1000;
}

export function checkApiRstCode(code: number) {
  return code !== 1000;
}


export function getNullBo<T>(): T {
  // @ts-ignore
  return {};
}

export function changeBo<T>(any: any): T {
  // @ts-ignore
  return any;
}

export function getRandomNumber() {
  // console.log(randomNumber);
  return Math.floor(Math.random() * 900000000) + 100000000;
}

// 获取十个字符串的 字母
export function getRandomString() {
  return 'a' + Math.random().toString(36).substring(2, 10);
}

export function oGetRandomNumberString(length: number) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10); // 生成0到9之间的随机数字
  }
  return result;
}


// 如果为空 则返回true
export function oCheckNull(value: any): boolean {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === 'string') {
    return value.trim() === '';
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (value instanceof Map) {
    return value.size === 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  return false; // For other cases, consider them as not empty
}

export function oParseSelectOptions(text: string) {
  if (!text) {
    return [];
  }
  const lines = text.split('\n');
  const options = lines.map(line => {
    const parts = line.split('|');
    if (parts.length === 2) {
      return { value: parts[0].trim(), label: parts[1].trim() };
    } else {
      const value = line.trim();
      return { value, label: value };
    }
  });
  return options;
}


//  获取所有的步骤列表 通过 stage 获取
export const oGetAllStep = (pipelineStageList: PipelineStageBo[]) => {
  let stepList: PipelineStepBo[] = [];
  if (!pipelineStageList) return stepList;
  pipelineStageList.forEach(stage => {
    if (stage.stepList) stepList = stepList.concat(stage.stepList);
    if (stage.sonStageList) {
      stepList = stepList.concat(oGetAllStep(stage.sonStageList));
    }
  });
  return stepList;
};

export const oFormatForm = (values?: any) => {
  if (!values) return;
  for (let valuesKey in values) {
    if (values.hasOwnProperty(valuesKey)) {
      if (values[valuesKey] && dayjs.isDayjs(values[valuesKey])) {
        values[valuesKey] = values[valuesKey].format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }
};


export const oDateRemoveTime = (date?: string) => {
  if (!date) return date;
  return date.split(' ')[0];
};


export const oCheckHidden = (permission: string) => {
  if (!permission) return true;
  return !getPermissionList().includes(permission);
};
// 通过权限数组判断是否有权限显示 如果都有才返回false
export const oCheckHiddenList = (permissionList: string[]) => {
  if (!permissionList) return true;
  for (let permission of permissionList) {
    if (!getPermissionList().includes(permission)) {
      return true;
    }
  }
  return false;
};


/**
 * 格式化时间
 * @param timeMs - 时间（单位：毫秒）
 * @returns 格式化后的时间字符串
 */
export function formatTime(timeMs: number): string {
  if (timeMs < 1000) {
    return `${timeMs} ms`;
  } else if (timeMs < 60 * 1000) {
    return `${(timeMs / 1000).toFixed(2)} s`;
  } else if (timeMs < 60 * 60 * 1000) {
    return `${(timeMs / (60 * 1000)).toFixed(2)} M`;
  } else {
    return `${(timeMs / (60 * 60 * 1000)).toFixed(2)} H`;
  }
}

/**
 * 格式化存储大小
 * @param sizeBytes - 存储大小（单位：字节）
 * @returns 格式化后的存储大小字符串
 */
export function formatStorage(sizeBytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  let index = 0;

  while (sizeBytes >= 1024 && index < units.length - 1) {
    sizeBytes /= 1024;
    index++;
  }

  return `${sizeBytes.toFixed(2)} ${units[index]}`;
}

export function getUrlParams(){
  // 提取哈希部分（结果为 "#/xterm?machineId=2"）
  const url = window.location.href

// 分割哈希中的参数部分
  return new URLSearchParams(url.split("?")[1] || "")
// // 获取参数
//   const machineId = hashParams.get("machineId");
}