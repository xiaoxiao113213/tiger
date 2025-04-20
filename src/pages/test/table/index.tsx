import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Table, TableProps } from 'antd';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DndContext, type DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { PlusOutlined } from '@ant-design/icons';

interface Item {
  key: string;
  name: string;
  age: number;
  address: string;
}

const originData: Item[] = [];
for (let i = 0; i < 10; i++) {
  originData.push({
    key: i.toString(),
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
}


interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row = (props: RowProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props['data-row-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: 'move',
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return <tr {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />;
};
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

const App: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

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
    console.log('EditableCell', editing, dataIndex, title, inputType, record, index, children, restProps);

    return (
      <td {...restProps}>
        {editing ? (
          dataIndex === 'name' &&
          <Form.Item
            name={`name-${record.key}`}
            style={{ margin: 0 }}
            initialValue={record.name}
            rules={[
              {
                required: true,
                message: `请输入${title}!`,
              },
            ]}
          >
            <Input key={`name-${record.key}`} />
          </Form.Item>
          ||
          dataIndex === 'age' &&
          <Form.Item
            name={`age-${record.key}`}
            style={{ margin: 0 }}
            initialValue={record.age}
            rules={[
              {
                required: true,
                message: `请输入${title}!`,
              },
            ]}
          >
            <InputNumber key={`age-${record.key}`} />
          </Form.Item>
          ||
          dataIndex === 'address' &&
          <Form.Item
            name={`address-${record.key}`}
            style={{ margin: 0 }}
            initialValue={record.address}
            rules={[
              {
                required: true,
                message: `请输入${title}!`,
              },
            ]}
          >
            <Input key={`address-${record.key}`} />
          </Form.Item>

        ) : (
          children
        )}
      </td>
    );
  };

  const columns = [
    {
      title: '标题',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: '15%',
      editable: true,
    },
    {
      title: 'address',
      dataIndex: 'address',
      width: '40%',
      editable: true,
    },
    {
      title: 'address1',
      dataIndex: 'address1',
      width: '40%',
      editable: true,
    },
  ];

  const mergedColumns: TableProps<Item>['columns'] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: true,
      }),
    };
  });


  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
        distance: 1,
      },
    }),
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setData((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<Item> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const save = async () => {
    const formData = await form.getFieldsValue();
    console.log('save', formData);
    const oldData = JSON.parse(JSON.stringify(data));
    formData && Object.keys(formData).forEach((key) => {
      const [dataIndex, recordKey] = key.split('-');
      const record = oldData.find((i) => i.key === recordKey);
      record[dataIndex] = formData[key];
    });
    console.log('save', oldData);
  };
  return (
    <div style={{ height: '100%' }}>
      <Button onClick={save}>保存</Button>
      <Form form={form} component={false}>
        <DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
          <SortableContext
            // rowKey array
            items={data.map((i) => i.key)}
            strategy={verticalListSortingStrategy}
          >
            <Table
              rowSelection={rowSelection}
              components={{
                body: {
                  cell: EditableCell,
                  row: Row,
                },
              }}

              bordered
              rowHoverable={false}
              // footer = {false}
              onRow={(record) => {
                return {
                  onClick: (event) => {
                  }, // 点击行
                  onDoubleClick: (event) => {
                  },
                  onContextMenu: (event) => {
                  },
                  onMouseEnter: (event) => {
                    // setEditingKey(record.key);
                    // edit(record);
                  }, // 鼠标移入行
                  onMouseLeave: (event) => {
                    // save(record.key);
                  },
                };
              }}

              dataSource={data}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={false}
            />
          </SortableContext>
        </DndContext>
        <Button style={{ width: '100%' }} type={'dashed'}
                onClick={() => setData([...data, { key: (data.length + 1).toString(), name: 'Edward', age: 32, address: 'London Park no. 1' }])}
        ><PlusOutlined />添加字段</Button>
      </Form>
    </div>
  );
};

export default App;