import React, { useEffect, useState } from 'react';
import 'gantt-task-react/dist/index.css';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import { Button, Drawer, Flex, Radio, Tooltip } from 'antd';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { taskAllApi, taskUpdateApi, updateSortApi } from '@/pages/task/api.tsx';
import { OperateEnum } from '@/utils/enum.ts';
import Detail from '@/pages/task/detail.tsx';
import { EditOutlined } from '@ant-design/icons';
import AddOrUpdate from '@/pages/task/addOrUpdate.tsx';
import dayjs from 'dayjs';


const App = (props: { tagNum: string }) => {
  const [tasks, setTasks] = useState<Task[]>();
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Day); // Store the current view mode
  const [selected, setSelected] = useState<number | string>();
  const [detailModal, setDetailModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [addOrUpdateModal, setAddOrUpdateModalFn] = useState<OperateEnum>(OperateEnum.close);
  const initData = async () => {
    const rst = await taskAllApi({ isOver: 0 });
    const data = rst.data.map((item: any) => {
      return {
        id: item.taskId,
        type: 'task',
        name: item.name,
        start: dayjs(dayjs(item.startTime).format('YYYY-MM-DD')).toDate(),
        end: dayjs(dayjs(item.endTime).format('YYYY-MM-DD 23:59:59')).toDate(),
        progress: item.progress,
        styles: {
          // backgroundColor: item.progress > 0 ? '#d3e0ea' : '#c8d5b9',
          progressColor: '#ffbb54',
          progressSelectedColor: '#ff9e0d',
        },
        isDisabled: false,
        // project: `Project_1`, // 所属项目
        // dependencies: item.taskId > 0 ? [`${item.taskId - 1}`] : [], // 依赖于前一个任务
        remarks: item.remarks,
      };
    });
    setTasks(data);
  };
  useEffect(() => {
    if (props.tagNum == '2') {
      initData();
    }
  }, [props.tagNum]);
  if (!tasks) return null;
  if (tasks.length == 0) return <div>暂无未完成的任务</div>;


  const handleDateChange = (task: Task) => {
    // console.log("拖拽的时间",task,dayjs(task.start).format('YYYY-MM-DD HH:mm:ss'),task,dayjs(task.end).format('YYYY-MM-DD HH:mm:ss'))
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, start: dayjs(dayjs(task.start).format('YYYY-MM-DD')).toDate(), end: dayjs(dayjs(task.end).format('YYYY-MM-DD 23:59:59')).toDate() } : t,
    );
    setTasks(updatedTasks);
    taskUpdateApi({ taskId: task.id, startTime: dayjs(task.start).format('YYYY-MM-DD'), endTime: dayjs(task.end).format('YYYY-MM-DD') });
  };
  // Custom tooltip component
  const CustomTooltip = ({ task }: { task: Task }) => {
    return (
      <div style={{ padding: '5px', backgroundColor: '#a0aaaf', border: '1px solid #ccc', borderRadius: '4px', maxWidth: '250px' }}>
        <strong>{task.name}</strong>
        <div>开始时间: {task.start.toLocaleDateString()}</div>
        <div>结束时间: {task.end.toLocaleDateString()}</div>
        {task.type != 'milestone' && <div>进度: {task.progress}%</div>}
        <div>描述：{task.remarks}</div>
      </div>
    );
  };
  // 处理任务排序的拖拽结束事件
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const previousId = reorderedTasks[result.destination.index].id;
    const taskId = reorderedTasks[result.source.index].id;

    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed);
    setTasks(reorderedTasks);
    // console.log(result);
    updateSortApi({ previousId: previousId, taskId: taskId });
  };

  const CustomTaskListTable1 = ({ tasks, onDragEnd }: { tasks: Task[], onDragEnd: (result: any) => void }) => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        display: 'flex',
                        height: '50px',
                        lineHeight: '50px',
                        // border: 'solid 0.5px',
                        borderColor: 'rgba(224,224,224,1)',
                        // marginBottom: '8px',
                        backgroundColor: '#fff',
                        ...provided.draggableProps.style,
                      }}
                      key={task.id}
                      onClick={() => {
                        setSelected(task.id);
                        setAddOrUpdateModalFn(OperateEnum.edit);
                      }}
                    >
                      <div
                        style={{
                          width: 180,
                          border: 'solid 0.5px',
                          borderColor: 'rgba(224,224,224,1)',
                          padding: '8px',
                          lineHeight: '50px',  // Apply lineHeight here as well
                        }}
                        className={'mmm-ellipsis mmm-hover-pointer'}
                      >
                        <Tooltip title={task.name} trigger={'hover'} placement={'left'}>
                          {task.name} {/* Ensure that task.name is directly within the div */}
                        </Tooltip>
                      </div>
                      {/*<div style={{ width: 100, border: 'solid 0.5px', borderColor: 'rgba(224,224,224,1)' }} className={'mmm-ellipsis'}>{task.name}</div>*/}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Independent button area */}
      <div style={{ padding: '10px 0', backgroundColor: '#f5f5f5', flexShrink: 0, display: 'flex', justifyContent: 'space-between' }}>
        <Flex vertical gap="middle">
          <Radio.Group onChange={(e) => {
            setViewMode(e.target.value);
          }} defaultValue={ViewMode.Day}>
            {/*<Radio.Button value={ViewMode.Hour}>小时</Radio.Button>*/}
            {/*<Radio.Button value={ViewMode.QuarterDay}>四分之一天</Radio.Button>*/}
            {/*<Radio.Button value={ViewMode.HalfDay}>半天</Radio.Button>*/}
            <Radio.Button value={ViewMode.Day}>天</Radio.Button>
            <Radio.Button value={ViewMode.Week}>周</Radio.Button>
            <Radio.Button value={ViewMode.Month}>月</Radio.Button>
            <Radio.Button value={ViewMode.Year}>年</Radio.Button>
          </Radio.Group>
        </Flex>
        <div><Button type={'primary'}
                     onClick={() => {
                       setSelected(undefined);
                       setAddOrUpdateModalFn(OperateEnum.add);
                     }}
        >新建</Button></div>
      </div>

      {/* Independent Gantt chart area */}
      <div style={{ overflowY: 'auto', flexGrow: 1 }}> {/* Gantt scrollable container */}
        <Gantt
          tasks={tasks}
          viewMode={viewMode} // Set the current view mode dynamically
          locale={'zh-cn'}
          listCellWidth={'150px'}
          columnWidth={80}
          headerHeight={50}
          TaskListHeader={CustomTaskListHeader}
          TaskListTable={() => (
            <CustomTaskListTable1 tasks={tasks} onDragEnd={onDragEnd} />
          )}
          onDateChange={handleDateChange}
          TooltipContent={CustomTooltip}  // Custom tooltip
          onDoubleClick={(task) => {
            // console.log('click', task);
            setSelected(task.id);
            setDetailModalFn(OperateEnum.detail);
          }}
          onSelect={(task, isSelected) => {
            // console.log(task, isSelected);
            setSelected(isSelected ? task.id : undefined);
          }}

        />
      </div>
      <Drawer
        title={<div style={{ display: 'flex', justifyContent: 'space-between' }}>详情
          <div className={'mmm-hover-pointer'}><EditOutlined onClick={() => {
            setDetailModalFn(OperateEnum.close);
            setAddOrUpdateModalFn(OperateEnum.edit);
          }} /></div>
        </div>}
        open={detailModal !== OperateEnum.close}
        width={'50%'}
        destroyOnClose={true}
        maskClosable={false}
        onClose={() => setDetailModalFn(OperateEnum.close)}
        footer={null}
      >
        <div>
          <Detail detailId={selected!!} />
        </div>
      </Drawer>
      <Drawer
        title={addOrUpdateModal == OperateEnum.edit ? '编辑' : '新增'}
        open={addOrUpdateModal !== OperateEnum.close}
        width={'50%'}
        destroyOnClose={true}
        maskClosable={false}
        onClose={() => setAddOrUpdateModalFn(OperateEnum.close)}
        footer={null}
      >
        <div>
          <AddOrUpdate detailId={selected} operateEnum={addOrUpdateModal}
                       setAddOrUpdateModalFn={setAddOrUpdateModalFn}
                       reloadTable={initData}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default App;

// Custom task list header
const CustomTaskListHeader = () => {
  return (
    <div className={'mmm-hover-pointer'}>
      <div style={{
        height: '50px', lineHeight: '50px', display: 'flex',
      }}>
        <div style={{ width: 180, border: 'solid 0.5px', borderColor: 'rgba(224,224,224,1)', padding: '8px' }}>名称</div>
        {/*<div style={{ width: 100, border: 'solid 0.5px', borderColor: 'rgba(224,224,224,1)' }}>Name</div>*/}
      </div>
    </div>
  );
};



