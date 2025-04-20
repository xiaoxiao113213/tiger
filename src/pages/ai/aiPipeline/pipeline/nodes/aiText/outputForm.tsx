import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Table, TableProps } from 'antd';
import { AiPipelinePointDetailVo, AiPipelinePointVarDetailVo, Category, VarType, VarTypeOptions } from '@/pages/ai/aiPipeline/api/ApiBo.ts';
import { aiPipelinePointVarAddSonApi, aiPipelinePointVarDeleteApi, aiPipelinePointVarSaveApi, aiPipelinePointVarUpdateApi } from '@/pages/ai/aiPipeline/api/varApi.tsx';
import { getRandomString } from '@/utils/utils.ts';
import { DeleteOutlined } from '@ant-design/icons';
import { OptionVo } from '@/utils/DicVo.ts';

interface DataType {
  place: string;
  key: string;
  name: string;
  type: string;
  remarks: string;
  parentId?: string;
  children?: DataType[];
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text' | 'select' | 'textArea';
  record: DataType;
  index: number;
}


const OutputForm = (props: {
  point: AiPipelinePointDetailVo,
  getDetail: () => void,
  inputVarList: OptionVo[],
}) => {
  const { point, inputVarList, getDetail } = props;
  const [form] = Form.useForm();
  const [data, setData] = useState<DataType[]>();

  const getChildren = (children?: AiPipelinePointVarDetailVo[]) => {
    if (!children) {
      return undefined;
    }
    return children.map((item, index) => {
      return {
        place: '',
        key: item.aiPipelinePointVarId.toString(),
        name: item.name,
        type: item.type,
        remarks: item.remarks,
        parentId: item.parentId ? item.parentId.toString() : undefined,
        children: getChildren(item.children),
      };
    });
  };


  useEffect(() => {
    if (point) {
      setData(point.varList
        .filter((item) => {
          return item.category == Category.Output;
        })
        .map((item, index) => {
          return {
            place: '',
            key: item.aiPipelinePointVarId.toString(),
            name: item.name,
            type: item.type,
            remarks: item.remarks,
            parentId: item.parentId ? item.parentId.toString() : undefined,
            children: getChildren(item.children),
          };
        }));
    }
  }, [point]);

  const FormDataSon = (formData, children?: DataType[]) => {
    if (!children) {
      return formData;
    }
    for (let i = 0; i < children.length; i++) {
      const item = children[i];
      formData[item.key + '_' + 'name'] = item.name;
      formData[item.key + '_' + 'type'] = item.type;
      formData[item.key + '_' + 'remarks'] = item.remarks;
      FormDataSon(formData, item.children);
    }
    return formData;
  };


  useEffect(() => {
    const formData = {};
    for (let dataKey in data) {
      formData[data[dataKey].key + '_' + 'name'] = data[dataKey].name;
      formData[data[dataKey].key + '_' + 'type'] = data[dataKey].type;
      formData[data[dataKey].key + '_' + 'remarks'] = data[dataKey].remarks;
      FormDataSon(formData, data[dataKey].children);
    }
    form.setFieldsValue(formData);
  }, [data]);


  const add = async () => {
    await aiPipelinePointVarSaveApi({
      aiPipelinePointId: point.aiPipelinePointId,
      name: getRandomString(),
      type: 'string',
      remarks: '',
      category: Category.Output,
    });
    props.getDetail();
  };

  const delVar = async (item: DataType) => {
    await aiPipelinePointVarDeleteApi({ aiPipelinePointVarId: parseInt(item.key) });
    props.getDetail();
  };
  const addSon = async (item: DataType) => {
    await aiPipelinePointVarAddSonApi({ aiPipelinePointVarId: parseInt(item.key) });
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
    let inputNode: React.JSX.Element;
    if (title == '变量类型') {
      inputNode = <Select options={VarTypeOptions} />;
    } else if (title == '描述') {
      inputNode = <Input.TextArea autoSize={{
        minRows: 1,
        maxRows: 3,
      }}></Input.TextArea>;
    } else {
      inputNode = <Input maxLength={20} showCount />;
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
      title: '序号',
      dataIndex: 'place',
      // width: '15px',
      editable: false,
      render: (_: any, record: DataType, index) => {
        return <div>{index}<Button
          // icon={<MergeOutlined />}
          icon={<img src="/icons/添加子级.svg" alt="icon" style={{ width: 16, height: 16, display: 'inline', marginRight: '5px' }} />}
          type={'link'}
          onClick={() => addSon(record)}
          hidden={record.type != VarType.Object && record.type != VarType.ArrayObject}>
        </Button></div>;
      },
    },
    {
      title: '变量名',
      dataIndex: 'name',
      width: '180px',
      editable: true,
    },
    {
      title: '变量类型',
      dataIndex: 'type',
      width: '130px',
      editable: true,
    },
    {
      title: '描述',
      dataIndex: 'remarks',
      editable: true,
    },
    {
      title: '',
      dataIndex: 'operation',
      width: '50px',
      render: (_: any, record: DataType) => {
        return <div>
          <Button icon={<DeleteOutlined />}
                  type={'link'}
                  onClick={() => delVar(record)}
                  hidden={data && data.length <= 1}>
          </Button>


        </div>;
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
    if (col.dataIndex === 'remarks') {
      inputType = 'textArea';
    }
    const getEditing = (record: DataType) => {
      return true;
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


  // 直接更新table数据 不需要重新请求
  const updateTableDataChildren = (children?: DataType[], id, valueKey, value) => {
    if (!children) {
      return;
    }
    children.forEach((item) => {
      if (item.key == id) {
        item[valueKey] = value;
      } else {
        updateTableDataChildren(item.children, id, valueKey, value);
      }
    });

  };
  // 直接更新table数据 不需要重新请求
  const updateTableData = (id, valueKey, value) => {
    if (valueKey == 'type') {
      props.getDetail();

      // const newData = data.map((item) => {
      //   if (item.key == id) {
      //     item.type = value;
      //   } else {
      //     updateTableDataChildren(item.children, id, valueKey, value);
      //   }
      //   return item;
      // });
      // setData(newData);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', marginBottom: '5px' }}>
        <div>输出参数设置：</div>
        <div style={{ marginRight: '30px' }}><a
          onClick={() => add()}
        ><img src="/icons/加号.svg" alt="icon" style={{ width: 16, height: 16, display: 'inline', marginRight: '5px' }} /></a></div>
      </div>
      <Form form={form} component={false}
            onValuesChange={async (changedValues, allValues) => {
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
                await aiPipelinePointVarUpdateApi(p);
                // 更新data的数据
                updateTableData(id, valueKey, value);
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

export default OutputForm;