import React, { useMemo, useState } from 'react';
import { Button, Card, Divider, Form } from 'antd';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


export const ChildComponent = React.memo(() => {
  console.log('Child Component Rendered');
  return (
    <div>
      <h1>Child Component</h1>
    </div>
  );
});


const Index = () => {
  const [num, setNum] = useState(1);
  const memoizedChildComponent = useMemo(() => <ChildComponent />, [num]);
  const [select, setSelect] = useState('1');
  const [form] = Form.useForm();
  const [list, setList] = useState(['1', '2', '3']);

  const onDragEnd = (result) => {
    // 处理拖动结束的逻辑
    if (!result.destination) {
      return;
    }
    const newList = [...list];
    const [removed] = newList.splice(result.source.index, 1);
    newList.splice(result.destination.index, 0, removed);
    setList(newList);
  };

  return <div>
    <h1>Parent Component</h1>
    <Button onClick={() => {
      setNum(num + 1);
    }}>+1</Button>
    <div>{num}</div>


    <div>
      <h2 style={{ color: '#151414' }}>表单定义

      </h2>
      <Divider>

        表单（可直接拖拽排序,双击进入属性修改界面）</Divider>
      <div className={'mmm-bgcolor'}>
        <Card title={<div>自定义表单 <Button type={'link'}
                                             onClick={() => {
                                             }}>添加参数</Button>
        </div>}
        >
          {/*  非常大的坑 千万不能随机这个key   否则会导致一直从新渲染*/}
          <Form form={form}
                key={'pipelineEditForm'}
                onValuesChange={
                  (changedValues, allValues) => {
                    // console.log('变动值了', changedValues, allValues);
                  }
                }
                validateTrigger="false"
          >
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="my-droppable">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {list.map((item, index) => (
                      <Draggable key={item} draggableId={item} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => {
                              setSelect(item);
                            }}
                            onDoubleClick={() => {
                              // if (props.disabled) return;
                              // setInitFieldBo(item);
                              // setAddFormModal(OperateEnum.edit);
                            }}
                            style={{
                              border: select === item ? '1px solid #8AA6EA' : 'none',
                              borderRadius: 5,
                              ...provided.draggableProps.style,
                            }}
                          >
                            <div key={index} style={{ display: 'flex' }}>
                              <span style={{ flex: 20 }}>
                                <ChildComponent></ChildComponent>
                              </span>


                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Form>
        </Card>

      </div>

    </div>

  </div>;
};

export default Index;