import React, { useEffect, useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { Drawer, Form, Input, Select, Table, TableProps } from 'antd';
import { OperateEnum } from '@/utils/enum.ts';
import Title from 'antd/lib/typography/Title';
import { DeleteOutlined } from '@ant-design/icons';
import { AiPipelinePointDetailVo, Category, VarTypeOptions } from '@/pages/ai/aiPipeline/api/ApiBo.ts';
import { aiPipelinePointGetOneApi } from '@/pages/ai/aiPipeline/api/pointApi.tsx';
import { aiPipelinePointVarDeleteApi, aiPipelinePointVarSaveApi, aiPipelinePointVarUpdateApi } from '@/pages/ai/aiPipeline/api/varApi.tsx';
import { getRandomString } from '@/utils/utils.ts';


function StartNode({ id, isConnectable }) {
  const { getNode } = useReactFlow();
  const [modal, setModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [form] = Form.useForm();
  const [data, setData] = useState<DataType[]>();
  const [point, setPoint] = useState<AiPipelinePointDetailVo>();


  useEffect(() => {
    const formData = {};
    for (let dataKey in data) {
      formData[data[dataKey].key + '_' + 'name'] = data[dataKey].name;
      formData[data[dataKey].key + '_' + 'type'] = data[dataKey].type;
      formData[data[dataKey].key + '_' + 'remarks'] = data[dataKey].remarks;
      formData[data[dataKey].key + '_' + 'defaultValue'] = data[dataKey].defaultValue;
    }
    form.setFieldsValue(formData);
  }, [data]);

  useEffect(() => {
    if (point) {
      setData(point.varList
        .filter(item => {
          return item.name != 'historyMsg';
        })
        .map((item, index) => {
          return {
            key: item.aiPipelinePointVarId.toString(),
            name: item.name,
            type: item.type,
            remarks: item.remarks,
            defaultValue: item.defaultValue,
          };
        }));
    }
  }, [point]);


  const getDetail = async () => {
    const rst = await aiPipelinePointGetOneApi({ aiPipelinePointId: id });
    setPoint(rst.data);
  };

  const add = async () => {
    await aiPipelinePointVarSaveApi({
      aiPipelinePointId: id,
      name: getRandomString(),
      type: 'string',
      remarks: '',
      defaultValue: undefined,
      category: Category.Output,
    });
    getDetail();
  };

  const delVar = async (item: DataType) => {
    if (item.name === 'newMsg') {
      return;
    }
    await aiPipelinePointVarDeleteApi({ aiPipelinePointVarId: parseInt(item.key) });
    getDetail();
  };


  const columns = [
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
      title: '默认值',
      dataIndex: 'defaultValue',
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
      width: '30px',
      render: (_: any, record: DataType) => {
        const editable = record.name === 'historyMsg' || record.name === 'newMsg';
        if (editable) {
          return <></>;
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
    const getEditing = (record: DataType) => {
      let editing = true;
      if (record.name === 'newMsg') {
        editing = col.dataIndex === 'defaultValue' || col.dataIndex === 'remarks';
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
      <div style={{
        width: '100px',
        height: '40px',
        display: 'flex', // 使用 flexbox 布局
        justifyContent: 'center', // 水平居中
        alignItems: 'center', // 垂直居中
        textAlign: 'center',
        fontSize: 'medium',
        cursor: 'pointer', // 添加鼠标指针样式
        backgroundColor: '#f0f0f0',
      }} onClick={() => {
        getDetail();
        setModalFn(OperateEnum.add);
      }}>
        <span>
          开始
        </span>
      </div>
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} />

      <Drawer
        title={'设置'}
        open={modal !== OperateEnum.close}
        width={'1200px'}
        destroyOnClose={true}
        maskClosable={true}
        onClose={() => setModalFn(OperateEnum.close)}
        footer={null}
      >
        <div style={{}}>
          <div style={{}}>
            <Title level={4}>开始</Title>
          </div>
          <div>
            <div style={{ display: 'flex', marginBottom: '5px' }}>
              <div>输入参数设置：</div>
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
        </div>
      </Drawer>

    </div>
  );
}

interface DataType {
  key: string;
  name: string;
  type: string;
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
  const recordName = record?.name;
  if (title == '变量类型') {
    inputNode = <Select options={VarTypeOptions} />;
  } else if (title == '描述') {
    inputNode = <Input.TextArea autoSize={{
      minRows: 1,
      maxRows: 3,
    }}></Input.TextArea>;
  } else if (title == '默认值') {
    inputNode = <Input.TextArea
      autoSize={{
        minRows: 1,
        maxRows: 3,
      }}
    />;
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

export default StartNode;
