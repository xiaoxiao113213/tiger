import { PlusCircleOutlined } from '@ant-design/icons';
import { Form, Input, message } from 'antd';
import { TextAreaRef } from 'antd/lib/input/TextArea';
import React, { FC, useEffect, useRef, useState } from 'react';
import s from './input.less';

interface VariableInputProps {
  value: string; // 输入框初始默认值
  label: string; // FormItem 标题
  name: string; // FormItem 参数名称
  varList: string[]; // 变量列表 插入变量的时候 下拉框展示 选中的变量进行插入
  variableChange: (value: string) => void; // 输入框变化的回调函数
}

export const VARIABLE_REG = /\[X(.*?)\]/g; // 正则匹配变量[X..]
export const VARIABLE_ARRAY = ['[X1]', '[X2]', '[X3]', '[X4]', '[X5]']; // 明确的所有变量模版

const VariableInput: FC<VariableInputProps> = ({ value, label, name, variableChange }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<TextAreaRef>(null);
  const [variableArray, setVariableArray] = useState<string[]>([]);

  useEffect(() => {
    const variableArr = value.match(VARIABLE_REG) || [];
    setInputValue(value);
    setVariableArray(variableArr);
  }, [value]);

  // 获取插入变量的起始Index
  const getInsertInitialIndex = () => {
    if (variableArray.length === 0) return 1;
    const variableIndexArray = variableArray.map(itm => {
      const index = itm.match(/\d/);
      if (Array.isArray(index) && index.length > 0) {
        return Number(index[0]);
      }
    });
    const arr = [1, 2, 3, 4, 5].filter(itm => !variableIndexArray.includes(itm));
    return arr[0];
  };

  // 插入变量
  const insertVariable = () => {
    const initialIndex = getInsertInitialIndex();
    const textareaElement = inputRef?.current?.resizableTextArea?.textArea; // 获取textArea元素
    const cursorPosition = textareaElement?.selectionStart || 0; // 获取光标起始位置
    const previousText = inputValue.substr(0, cursorPosition); // 获取变量前文本
    const followingText = inputValue.substr(cursorPosition); // 获取变量后文本
    const initialValues = `${previousText}[X${initialIndex}]${followingText}`;
    // 获取插入变量
    const variableArr = initialValues.match(VARIABLE_REG) || [];
    setInputValue(initialValues);
    setVariableArray(variableArr);
    variableChange?.(initialValues);

    // 插入操作完成后 将光标定位到插入内容的后面
    setTimeout(() => {
      inputRef?.current?.focus();
    });
  };

  // 键盘输入
  const handleChangeInput = (e: any) => {
    const initialValues = e?.target?.value;
    const reg = /\[X([^[\]]*?)\]/g;
    // 当前输入框内匹配的插入变量
    const variableArr = initialValues.match(reg) || [];
    // 判断是否合规
    const isCompliant = variableArr.every((itm: string) => VARIABLE_ARRAY.includes(itm));
    if (!isCompliant) {
      return message.error('不能对变量标志中进行插入变量！');
    }
    // 判断是否手动删除变量，当前输入框内的变量数组与原变量数组对比，如果缺了就说明删除了一个变量
    const deleteVariable = variableArray.filter((itm: string) => !variableArr.includes(itm));
    let deletedString = initialValues;
    if (deleteVariable.length > 0) {
      deletedString = inputValue.replace(deleteVariable[0], '');
    }
    setVariableArray(variableArr);
    setInputValue(deletedString);
    variableChange?.(deletedString);
  };

  return (
    <React.Fragment>
      <Form.Item label={label} name={name}>
        <div className={s.variableModule}>
          <div className={s.insertBtnBox}>
            <PlusCircleOutlined style={{ cursor: 'pointer' }} onClick={insertVariable} />
            <span style={{ cursor: 'pointer' }} onClick={insertVariable}>插入变量</span>
          </div>
          <Input.TextArea value={inputValue} ref={inputRef} onChange={handleChangeInput} />
        </div>
      </Form.Item>
    </React.Fragment>

  );
};

export default VariableInput;
