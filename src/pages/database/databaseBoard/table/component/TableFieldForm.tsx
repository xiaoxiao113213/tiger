// ant 的表格 模式
import { TableFieldDetailVo } from '@/pages/database/databaseBoard/api/tableField/ApiBo';
// 自定义 编辑的table的插件
// 单选框
import React, { ChangeEvent, useEffect } from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Checkbox, Input, InputNumber } from 'antd';

export enum TableFormTypeEnum {
  编辑,
  排序,
}

// 字段是否可以为空的 勾选框
export const FlagNotNullCheckbox: React.FC<{
  value?: number;
  onChange?: (
    value: number,
  ) => void;
  ifShow: boolean;
}> = ({ value, onChange, ifShow }) => {
  // console.log(`FlagNotNullCheckbox =`, value);
  const onChangeValue = async (e: CheckboxChangeEvent) => {
    // console.log(`checked = ${e.target.checked}`);
    if (e.target.checked) {
      onChange?.(1);
    } else {
      onChange?.(0);
    }
  };
  return (
    <div>
      {ifShow && <Checkbox checked={value == 1} onChange={onChangeValue}></Checkbox>}
      {!ifShow && <div>-</div>}
    </div>
  );
};
// // 字段是否是主键 勾选框
export const FlagKeyCheckbox: React.FC<{
  value?: number;
  onChange?: (
    value: number,
  ) => void;
  ifShow: boolean;
}> = ({ value, onChange, ifShow }) => {
  console.log(`FlagKeyCheckbox =`, value);
  const onChangeValue = async (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      onChange?.(1);
    } else {
      onChange?.(0);
    }
  };
  return (
    <div>
      {ifShow && <Checkbox checked={value == 1} onChange={onChangeValue}></Checkbox>}
      {!ifShow && <div>-</div>}
    </div>
  );
};
//  字段是否自动递增 勾选框
export const FlagAutoIncrementCheckbox: React.FC<{
  value?: number;
  onChange?: (
    value: number,
  ) => void;
  field?: TableFieldDetailVo;
  type: TableFormTypeEnum;
}> = ({ value, onChange, field, type }) => {
  console.log(`FlagAutoIncrementCheckbox =`, value);
  const ifShow = field?.type === 'int' ||
    field?.type === 'bigint' ||
    field?.type === 'tinyint';
  const onChangeValue = async (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      onChange?.(1);
    } else {
      onChange?.(0);
    }
  };
  let defaultValue = value;
  if (!ifShow && value) {
    defaultValue = undefined;
    onChangeValue({ target: { checked: false } });
  }

  return (
    <div>
      {type === TableFormTypeEnum.编辑 && ifShow && <Checkbox checked={defaultValue == 1} onChange={onChangeValue}></Checkbox>}
      {type === TableFormTypeEnum.排序 && ifShow && <Checkbox checked={field.flagAutoIncrement == 1}></Checkbox>}
      {!ifShow && <div>-</div>}
    </div>
  );
};
//  字段是否无符号 勾选框
export const FlagUnsignedCheckbox: React.FC<{
  value?: number;
  onChange?: (
    value: number,
  ) => void;
  field?: TableFieldDetailVo;
  type: TableFormTypeEnum;
}> = ({ value, onChange, field, type }) => {
  console.log(`FlagUnsignedCheckbox =`, value);
  const ifShow = field?.type === 'int' ||
    field?.type === 'bigint' ||
    field?.type === 'tinyint';
  const onChangeValue = async (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      onChange?.(1);
    } else {
      onChange?.(0);
    }
  };
  let defaultValue = value;
  if (!ifShow && value) {
    defaultValue = undefined;
    onChangeValue({ target: { checked: false } });
  }

  return (
    <div>
      {type === TableFormTypeEnum.编辑 && ifShow && <Checkbox checked={defaultValue == 1} onChange={onChangeValue}></Checkbox>}
      {type === TableFormTypeEnum.排序 && ifShow && <Checkbox checked={field.flagUnsigned == 1}></Checkbox>}
      {!ifShow && <div>-</div>}
    </div>
  );
};


export const MyInput: React.FC<{
  value?: string;
  onChange?: (
    value: string,
  ) => void;
}> = ({ value, onChange }) => {
  console.log(`MyInput =`, value);
  const onChangeValue = async (e: ChangeEvent) => {
    // console.log(`checked = ${e.target.checked}`);
    if (e.target.value) {
      onChange?.(e.target.value);
    } else {
      onChange?.(e.target.value);
    }
  };
  useEffect(() => {
    // 在组件挂载或更新后执行操作
    return () => {
      // 在组件卸载前执行清理操作
    };
  }, [value]); // 第二个参数表示依赖项
  return (
    <div>
      <Input defaultValue={value} onChange={onChangeValue}></Input>
      {/*{ifShow && <Checkbox checked={value == 1} onChange={onChangeValue}></Checkbox>}*/}
      {/*{!ifShow && <div>-</div>}*/}
    </div>
  );
};

//  字段长度的输入框
export const LengthInput: React.FC<{
  value?: number;
  onChange?: (
    value: number,
  ) => void;
  field?: TableFieldDetailVo;
  type: TableFormTypeEnum;
}> = ({ value, onChange, field, type }) => {

  // console.log(`LengthInput =`, value);
  const onChangeValue = async (e: number | undefined) => {
    if (e) {
      onChange?.(e);
    } else {
      onChange?.(0);
    }
  };
  let defaultValue = value;
  // 根据数据库的类型来判断是否显示长度
  // 从8.0.17版本开始，tinyint, smallint, mediumint, int, and bigint类型的显示宽度将失效。
  const ifShow = field?.type === 'varchar' ||
    field?.type === 'char' ||
    field?.type === 'decimal';
  if (ifShow) {
    //     给上面的三种类型设置默认长度
    if (field?.type === 'varchar' && !value) {
      onChangeValue(255);
      //     给 InputNumber 这个组件设置默认值
      defaultValue = 255;
    } else if (field?.type === 'char' && !value) {
      onChangeValue(255);
      defaultValue = 255;
    } else if (field?.type === 'decimal' && !value) {
      onChangeValue(10);
      defaultValue = 10;
    }
  }
  return (
    <div>
      {ifShow && type === TableFormTypeEnum.编辑 && <InputNumber defaultValue={defaultValue} onChange={onChangeValue} placeholder={'请输入'}></InputNumber>}
      {ifShow && type === TableFormTypeEnum.排序 && <div>{defaultValue}</div>}
      {!ifShow && <div>-</div>}
    </div>
  );
};


//  字段小数点的输入框
export const DecimalInput: React.FC<{
  value?: number;
  onChange?: (
    value: number,
  ) => void;
  field?: TableFieldDetailVo;
  type: TableFormTypeEnum;
}> = ({ value, onChange, field, type }) => {
  console.log(`DecimalInput =`, value);
  const onChangeValue = async (e: number | undefined) => {
    if (e) {
      onChange?.(e);
    } else {
      onChange?.(0);
    }
  };
  let defaultValue = value;
  // 根据数据库的类型来判断是否显示长度
  // 从8.0.17版本开始，tinyint, smallint, mediumint, int, and bigint类型的显示宽度将失效。
  const ifShow = field?.type === 'decimal';
  if (ifShow) {
    //     给上面的三种类型设置默认长度
    if (field?.type === 'decimal' && !value) {
      onChangeValue(2);
      defaultValue = 2;
    }
  }
  return (
    <div>
      {ifShow && type === TableFormTypeEnum.编辑 && <InputNumber defaultValue={defaultValue} onChange={onChangeValue} placeholder={'请输入'}></InputNumber>}
      {ifShow && type === TableFormTypeEnum.排序 && <div>{defaultValue}</div>}
      {!ifShow && <div>-</div>}
    </div>
  );
};
