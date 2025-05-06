import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Button,
  Form,
  GetRef,
  Input,
  InputRef,
  Popconfirm,
  Select,
  Table,
  TableProps,
} from 'antd';
import ChatModelDic from '@/components/Dic/ChatModelDic.ts';

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  bizType: string;
  roleName: string;
  systemPrompt: string;
  model: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);
  const { ChatModelList } = ChatModelDic({ type: '文本生成' });

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;
  if (!editable) {
    return <td {...restProps}>{childNode}</td>;
  }
  if (!editing) {
    childNode = <div className="editable-cell-value-wrap">{children}</div>;
    return (
      <td {...restProps} onClick={toggleEdit}>
        {childNode}
      </td>
    );
  }
  if (dataIndex === 'bizType') {
    childNode = (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[{ required: true, message: `${title} is required.` }]}
      >
        <Select
          autoFocus={true}
          options={[
            { value: 'User', label: '用户自己' },
            { value: 'Model', label: '大模型' },
          ]}
          onChange={save}
          onBlur={save}
        />
      </Form.Item>
    );
  } else if (dataIndex === 'systemPrompt') {
    childNode = (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[{ required: true, message: `${title} is required.` }]}
      >
        <Input.TextArea ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    );
  } else if (dataIndex === 'model') {
    childNode = (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[{ required: true, message: `${title} is required.` }]}
      >
        <Select autoFocus={true} options={ChatModelList} onChange={save} onBlur={save} />
      </Form.Item>
    );
  } else {
    childNode = (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[{ required: true, message: `${title} is required.` }]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

interface DataType {
  key: React.Key;
  bizType: string;
  roleName: string;
  systemPrompt: string;
  model: string;
}

type ColumnTypes = Exclude<TableProps<DataType>['columns'], undefined>;

const App = (props: { callback: (userList: Item[]) => void; userList: Item[] }) => {
  const [dataSource, setDataSource] = useState<DataType[]>(props.userList);

  const [count, setCount] = useState(props.userList.length);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    props.callback(newData);
  };

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: '谁来回答',
      dataIndex: 'bizType',
      editable: true,
      width: '120px',
      render: (_, { bizType }) => {
        if (bizType === 'User') {
          return <span>用户自己</span>;
        }
        return <span>大模型</span>;
      },
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      width: '150px',
      editable: true,
    },
    {
      title: '提示词',
      dataIndex: 'systemPrompt',
      editable: true,
    },
    {
      title: '大模型',
      dataIndex: 'model',
      width: '150px',
      editable: true,
    },
    {
      title: '操作',
      width: '70px',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>删除</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      bizType: 'Model',
      roleName: '',
      systemPrompt: '',
      model: '',
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
    props.callback([...dataSource, newData]);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
    props.callback(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Alert message="用户自己只能添加一个" type="success" />
      <div style={{ marginTop: '10px' }}>
        <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
          新增角色
        </Button>
      </div>
      <Table<DataType>
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};

export default App;
