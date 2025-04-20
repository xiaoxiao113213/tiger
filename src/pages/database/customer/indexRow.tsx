import React, { useMemo, useState } from 'react';
import { Checkbox, Form, Input, Select } from 'antd';
import { DicVo } from '@/utils/DicVo.ts';
import { DeleteOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/es/form/hooks/useForm';
import { TableIndexVo } from '@/pages/database/databaseBoard/api/table/ApiBo.ts';

const defaultValueDic = [
  { value: 'emptyString', label: 'empty string' },
  { value: 'CURRENT_TIMESTAMP', label: 'now' },
  { value: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP', label: 'now and update now' },
];

const IndexRow = (props: {
  field: TableIndexVo,
  form: FormInstance<TableIndexVo>
  MysqlIndexFunList: DicVo[],
  MysqlIndexTypeList: DicVo[],
  fieldCodeList: DicVo[],
}) => {
  const { form, fieldCodeList } = props;
  const [field, setField] = useState<TableIndexVo>({ ...props.field });
  const [deleteFlag, setDeleteFlag] = useState();
  console.log('IndexRow field', fieldCodeList);
  const delRow = () => {
    setDeleteFlag(1);
  };


  const getRow = useMemo(() => {
    // console.log('getRow field', field.name);
    if (deleteFlag === 1) {
      return <div></div>;
    }
    return (<>
      <td style={{ maxWidth: '150px' }}>
        <Form.Item
          name={`name-${field.id}`}
          style={{ margin: 0 }}
          initialValue={field.name}
          rules={[
            {
              required: true,
              message: `请输入字段名!`,
            },
          ]}
        >
          <Input key={`name-${field.id}`} />
        </Form.Item>
      </td>
      <td style={{ maxWidth: '500px' }}>
        <Form.Item
          name={`fieldNameList-${field.id}`}
          style={{ margin: 0 }}
          initialValue={field.fieldNameList}
          rules={[
            {
              required: true,
              message: `请选中字段!`,
            },
          ]}
        >
          <Select key={`type-${field.id}`}
                  options={fieldCodeList}
                  mode={'multiple'}
                  showSearch={true}
                  optionFilterProp={'label'}
          >
          </Select>
        </Form.Item>
      </td>
      <td>
        <Form.Item
          name={`indexType-${field.id}`}
          style={{ margin: 0 }}
          initialValue={field.indexType}
          rules={[
            {
              required: true,
              message: `请输入类型!`,
            },
          ]}
        >
          <Select key={`indexType-${field.id}`}
                  options={props.MysqlIndexTypeList}

          >
          </Select>
        </Form.Item>
      </td>
      <td>
        <Form.Item
          name={`indexFun-${field.id}`}
          style={{ margin: 0 }}
          initialValue={field.indexFun}
          rules={[
            {
              required: true,
              message: `请输入类型!`,
            },
          ]}
        >
          <Select key={`indexFun-${field.id}`}
                  options={props.MysqlIndexFunList}
                  showSearch={true}
                  optionFilterProp={'label'}
          >
          </Select>
        </Form.Item>
      </td>

      <td style={{ maxWidth: '300px' }}>
        <Form.Item
          name={`desc-${field.id}`}
          style={{ margin: 0 }}
          initialValue={field.desc}
        >
          <Input.TextArea key={`desc-${field.id}`}
                          autoSize={{ minRows: 1, maxRows: 1 }} />
        </Form.Item>
      </td>

      <td>
        <DeleteOutlined onClick={delRow} />
      </td>
      <td style={{ display: 'none' }}>
        <Form.Item
          name={`deleteFlag-${field.id}`}
          style={{ margin: 0 }}
          valuePropName="checked"
          initialValue={deleteFlag}
          normalize={(value) => (value ? 1 : 0)}
        >
          <Checkbox key={`deleteFlag-${field.id}`}></Checkbox>
        </Form.Item>
      </td>
    </>);

  }, [field, fieldCodeList, deleteFlag]);

  return (
    getRow
  );
};

export default IndexRow;