import React, { useEffect, useState } from 'react';
import { Cascader, Form, Input, InputNumber, Select, Table, TableProps } from 'antd';
import { AiPipelinePointDetailVo, Category, VarTypeOptions } from '@/pages/ai/aiPipeline/api/ApiBo.ts';
import { aiPipelinePointVarDeleteApi, aiPipelinePointVarSaveApi, aiPipelinePointVarUpdateApi } from '@/pages/ai/aiPipeline/api/varApi.tsx';
import { getRandomString } from '@/utils/utils.ts';
import { DeleteOutlined } from '@ant-design/icons';
import { OptionVo } from '@/utils/DicVo.ts';

interface DataType {
  key: string;
  name: string;
  relatedId: string[];
  remarks: string;
  defaultValue: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text' | 'select' | 'textArea';
  record: DataType;
  index: number;
}


const InputForm = (props: {
  point: AiPipelinePointDetailVo,
  getDetail: () => void,
  inputVarList: OptionVo[],
  title?: string,
  notDeleteName?: string[], // 这些名称的不允许出现删除按钮
}) => {
  const { point, inputVarList, getDetail } = props;
  const title = props.title || '输入变量：';
  const [form] = Form.useForm();
  const [data, setData] = useState<DataType[]>();


  useEffect(() => {
    if (point) {
      setData(point.varList
        .filter((item) => {
          return item.category == Category.Input;
        })
        .map((item, index) => {
          return {
            key: item.aiPipelinePointVarId.toString(),
            name: item.name,
            relatedId: item.relatedId,
            remarks: item.remarks,
            defaultValue: item.defaultValue,
          };
        }));
    }
  }, [point]);

  useEffect(() => {
    const formData = {};
    for (let dataKey in data) {
      formData[data[dataKey].key + '_' + 'name'] = data[dataKey].name;
      formData[data[dataKey].key + '_' + 'relatedId'] = data[dataKey].relatedId;
      formData[data[dataKey].key + '_' + 'remarks'] = data[dataKey].remarks;
      formData[data[dataKey].key + '_' + 'defaultValue'] = data[dataKey].defaultValue;
    }
    form.setFieldsValue(formData);
  }, [data]);


  const add = async () => {
    await aiPipelinePointVarSaveApi({
      aiPipelinePointId: point.aiPipelinePointId,
      name: getRandomString(),
      type: 'string',
      remarks: '',
      category: Category.Input,
    });
    props.getDetail();
  };

  const delVar = async (item: DataType) => {
    await aiPipelinePointVarDeleteApi({ aiPipelinePointVarId: parseInt(item.key) });
    props.getDetail();
  };


  const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = (
    {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    }) => {

    if (title == '变量名') {
      return (
        <td {...restProps}>
          {editing ? (
            <Form.Item
              name={`${record.key}_${dataIndex}`}
              style={{ margin: 0 }}
              rules={[
                {
                  required: true,
                  message: `请输入 ${title}！只能输入英文字符和数字，且以英文字符开头。`,
                },
                {
                  pattern: /^[a-zA-Z][a-zA-Z0-9]*$/,
                  message: `只能输入英文字符和数字，且以英文字符开头。`,
                },
              ]}
            >
              <Input maxLength={20} showCount />
            </Form.Item>

          ) : (
            children
          )}
        </td>
      );
    }
    if (title == '变量值') {
      return (
        <td {...restProps}>
          {editing ? (
            <Form.Item
              name={`${record.key}_${dataIndex}`}
              style={{ margin: 0 }}
            >
              <Cascader options={inputVarList} placeholder="Please select" />
            </Form.Item>

          ) : (
            children
          )}
        </td>
      );
    }
    let inputNode = inputType === 'number' ? <InputNumber /> : <Input maxLength={20} showCount />;
    if (inputType === 'select') {
      inputNode = <Select options={VarTypeOptions} />;
    }
    if (inputType === 'textArea') {
      inputNode = <Input.TextArea autoSize={
        {
          minRows: 1,
          maxRows: 6,
        }
      }></Input.TextArea>;
    }

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={record.key + '_' + dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: false,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };


  const columns = [
    {
      title: '变量名',
      dataIndex: 'name',
      width: '180px',
      editable: true,
    },
    {
      title: '变量值',
      dataIndex: 'relatedId',
      width: '130px',
      editable: true,
    },
    {
      title: '默认值',
      dataIndex: 'defaultValue',
      editable: true,
    }, {
      title: '描述',
      dataIndex: 'remarks',
      editable: true,
    },
    {
      title: '',
      dataIndex: 'operation',
      width: '30px',
      render: (_: any, record: DataType) => {
        if (props.notDeleteName && props.notDeleteName.includes(record.name)) {
          return <div></div>;
        }
        return <div><DeleteOutlined
          onClick={() => delVar(record)}
        /></div>;
      },
    },
  ];

  const mergedColumns: TableProps<DataType>['columns'] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    let inputType = 'text';
    if (col.dataIndex === 'type') {
      inputType = 'select';
    }
    if (col.dataIndex === 'remarks' || col.dataIndex === 'defaultValue') {
      inputType = 'textArea';
    }
    const getEditing = (record: DataType) => {
      let editing = true;
      if (record.name === 'historyMsg') {
        editing = false;
      }
      if (record.name === 'newMsg') {
        editing = false;
      }
      return editing;

    };

    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        inputType: inputType,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: getEditing(record),
      }),
    };
  });


  return (
    <div>
      <div style={{ display: 'flex', marginBottom: '5px' }}>
        <div>{title}</div>
        <div style={{ marginRight: '30px' }}><a
          onClick={() => add()}
        ><img src="/icons/加号.svg" alt="icon" style={{ width: 16, height: 16, display: 'inline', marginRight: '5px' }} /></a></div>
      </div>
      <Form form={form} component={false}
            onValuesChange={(changedValues, allValues) => {
              console.log('changedValues', changedValues);
              //   遍历key和value值
              for (let key in changedValues) {
                const keyArr = key.split('_');
                const id = keyArr[0];
                const valueKey = keyArr[1];
                const value = changedValues[key];
                console.log('id', id);
                console.log('valueKey', valueKey);
                console.log('value', value);
                const p = { aiPipelinePointVarId: parseInt(id), [valueKey]: value, keyName: valueKey };
                aiPipelinePointVarUpdateApi(p);
              }
            }}
      >
        <Table<DataType>
          components={{
            body: { cell: EditableCell },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
        />
      </Form>

    </div>
  );
};

export default InputForm;