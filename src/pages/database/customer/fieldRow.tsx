import React, { useMemo, useState } from 'react';
import { Checkbox, Form, Input, InputNumber, Select } from 'antd';
import { TableFieldDetailVo } from '@/pages/database/databaseBoard/api/tableField/ApiBo.ts';
import { DicVo } from '@/utils/DicVo.ts';
import { DeleteOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/es/form/hooks/useForm';

const defaultValueDic = [
  { value: 'emptyString', label: 'empty string' },
  { value: 'CURRENT_TIMESTAMP', label: 'now' },
  { value: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP', label: 'now and update now' },
];

const FieldRow = (props: {
  field: TableFieldDetailVo,
  mysqlType: DicVo[],
  form: FormInstance<TableFieldDetailVo>
}) => {
  const { mysqlType, form } = props;
  const [field, setField] = useState<TableFieldDetailVo>({ ...props.field });
  const [deleteFlag, setDeleteFlag] = useState();

  const delRow = () => {
    setDeleteFlag(1);
  };

  const typeChange = (e) => {
    console.log('typeChange', e);
    if (e === 'int' || e === 'bigint') {
      form.setFieldValue(`length-${field.tableFieldId}`, undefined);
      form.setFieldValue(`decimal-${field.tableFieldId}`, undefined);
    } else if (e === 'decimal') {
      form.setFieldValue(`length-${field.tableFieldId}`, 10);
      form.setFieldValue(`decimal-${field.tableFieldId}`, 2);
    } else if (e === 'varchar') {
      form.setFieldValue(`length-${field.tableFieldId}`, 255);
      form.setFieldValue(`decimal-${field.tableFieldId}`, undefined);
    } else if (e === 'char') {
      form.setFieldValue(`length-${field.tableFieldId}`, 255);
      form.setFieldValue(`decimal-${field.tableFieldId}`, undefined);
    } else if (e === 'text' || e === 'longtext' || e === 'mediumtext') {
      form.setFieldValue(`length-${field.tableFieldId}`, undefined);
      form.setFieldValue(`decimal-${field.tableFieldId}`, undefined);
    } else if (e === 'timestamp') {
      form.setFieldValue(`length-${field.tableFieldId}`, undefined);
      form.setFieldValue(`decimal-${field.tableFieldId}`, undefined);
    } else if (e === 'datetime') {
      form.setFieldValue(`length-${field.tableFieldId}`, undefined);
      form.setFieldValue(`decimal-${field.tableFieldId}`, undefined);
    } else if (e === 'date') {
      form.setFieldValue(`length-${field.tableFieldId}`, undefined);
      form.setFieldValue(`decimal-${field.tableFieldId}`, undefined);
    } else if (e === 'time') {
      form.setFieldValue(`length-${field.tableFieldId}`, undefined);
      form.setFieldValue(`decimal-${field.tableFieldId}`, undefined);
    } else if (e === 'year') {
      form.setFieldValue(`length-${field.tableFieldId}`, undefined);
      form.setFieldValue(`decimal-${field.tableFieldId}`, undefined);
    } else if (e === 'json') {
      form.setFieldValue(`length-${field.tableFieldId}`, undefined);
      form.setFieldValue(`decimal-${field.tableFieldId}`, undefined);
    }
  };

  const flagKeyChange = (e) => {
    // console.log('flagKeyChange', e);
    if (e.target.checked) {
      form.setFieldValue(`flagNotNull-${field.tableFieldId}`, true);
      form.setFieldValue(`flagAutoIncrement-${field.tableFieldId}`, true);
      form.setFieldValue(`flagUnsigned-${field.tableFieldId}`, true);
    } else {
      form.setFieldValue(`flagAutoIncrement-${field.tableFieldId}`, false);
      form.setFieldValue(`flagUnsigned-${field.tableFieldId}`, false);
    }
  };

  const getRow = useMemo(() => {
    // console.log('getRow field', field.code);
    if (deleteFlag === 1) {
      return <div></div>;
    }
    return (<>
      <td>
        <Form.Item
          name={`selected-${field.tableFieldId}`}
          style={{ margin: 0 }}
          valuePropName="checked"
          initialValue={field.selected ?? 0}
        >
          <Checkbox key={`selected-${field.tableFieldId}`}></Checkbox>
        </Form.Item>
      </td>
      <td style={{ maxWidth: '150px' }}>
        <Form.Item
          name={`code-${field.tableFieldId}`}
          style={{ margin: 0 }}
          initialValue={field.code}
          rules={[
            {
              required: true,
              message: `请输入字段名!`,
            },
          ]}
        >
          <Input key={`code-${field.tableFieldId}`} />
        </Form.Item>
      </td>
      <td>
        <Form.Item
          name={`type-${field.tableFieldId}`}
          style={{ margin: 0 }}
          initialValue={field.type}
          rules={[
            {
              required: true,
              message: `请输入类型!`,
            },
          ]}
        >
          <Select key={`type-${field.tableFieldId}`}
                  options={mysqlType}
                  showSearch={true}
                  optionFilterProp={'label'}
                  onChange={typeChange}
          >
          </Select>
        </Form.Item>
      </td>
      <td>
        <Form.Item
          name={`length-${field.tableFieldId}`}
          style={{ margin: 0, width: '50px' }}
          initialValue={field.length}
        >
          <InputNumber key={`length-${field.tableFieldId}`} />
        </Form.Item>
      </td>
      <td>
        <Form.Item
          name={`decimal-${field.tableFieldId}`}
          style={{ margin: 0, width: '50px' }}
          initialValue={field.decimal}
        >
          <InputNumber key={`decimal-${field.tableFieldId}`} />
        </Form.Item>
      </td>
      <td>
        <Form.Item
          name={`flagNotNull-${field.tableFieldId}`}
          style={{ margin: 0 }}
          valuePropName="checked"
          initialValue={field.flagNotNull}
          normalize={(value) => (value ? 1 : 0)}
        >
          <Checkbox key={`flagNotNull-${field.tableFieldId}`}></Checkbox>
        </Form.Item>
      </td>
      <td>
        <Form.Item
          name={`flagKey-${field.tableFieldId}`}
          style={{ margin: 0 }}
          valuePropName="checked"
          initialValue={field.flagKey}
          normalize={(value) => (value ? 1 : 0)}
        >
          <Checkbox key={`flagKey-${field.tableFieldId}`}
                    onChange={flagKeyChange}
          ></Checkbox>
        </Form.Item>
      </td>
      <td style={{ maxWidth: '200px' }}>
        <Form.Item
          name={`defaultValue-${field.tableFieldId}`}
          style={{ margin: 0 }}
          initialValue={field.defaultValue}
        >
          <Select key={`defaultValue-${field.tableFieldId}`}
                  options={[
                    { value: 'emptyString', label: 'empty string' },
                    { value: 'CURRENT_TIMESTAMP', label: 'now' },
                    { value: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP', label: 'now and update now' },
                  ]}
                  mode={'tags'}
                  maxCount={1}
          >
          </Select>

        </Form.Item>
      </td>
      <td style={{ maxWidth: '200px' }}>
        <Form.Item
          name={`desc-${field.tableFieldId}`}
          style={{ margin: 0 }}
          initialValue={field.desc}
        >
          <Input.TextArea key={`desc-${field.tableFieldId}`}
                          autoSize={{ minRows: 1, maxRows: 1 }} />
        </Form.Item>
      </td>
      <td>
        <Form.Item
          name={`flagAutoIncrement-${field.tableFieldId}`}
          style={{ margin: 0 }}
          valuePropName="checked"
          initialValue={field.flagAutoIncrement}
          normalize={(value) => (value ? 1 : 0)}
        >
          <Checkbox key={`flagAutoIncrement-${field.tableFieldId}`}></Checkbox>
        </Form.Item>
      </td>
      <td>
        <Form.Item
          name={`flagUnsigned-${field.tableFieldId}`}
          style={{ margin: 0 }}
          valuePropName="checked"
          initialValue={field.flagUnsigned}
          normalize={(value) => (value ? 1 : 0)}
        >
          <Checkbox key={`flagUnsigned-${field.tableFieldId}`}></Checkbox>
        </Form.Item>
      </td>
      <td>
        <DeleteOutlined onClick={delRow} />
      </td>
      <td style={{ display: 'none' }}>
        <Form.Item
          name={`deleteFlag-${field.tableFieldId}`}
          style={{ margin: 0 }}
          valuePropName="checked"
          initialValue={deleteFlag}
          normalize={(value) => (value ? 1 : 0)}
        >
          <Checkbox key={`deleteFlag-${field.tableFieldId}`}></Checkbox>
        </Form.Item>
      </td>
    </>);

  }, [field, mysqlType, deleteFlag]);

  return (
    getRow
  );
};

export default FieldRow;