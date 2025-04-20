import React, { useState } from 'react';
import 'gantt-task-react/dist/index.css';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import { Flex, Radio } from 'antd';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const generateTasks = (): Task[] => {
  const tasks: Task[] = [];

  // 普通任务
  for (let i = 0; i < 10; i++) {
    tasks.push({
      id: `Task_${i}`,
      type: 'task',
      name: `Task ${i}`,
      start: new Date(2024, 8, 13 + i),
      end: new Date(2024, 8, 15 + i),
      progress: Math.floor(Math.random() * 100),
      styles: {
        backgroundColor: i % 2 === 0 ? '#d3e0ea' : '#c8d5b9',
        progressColor: '#ffbb54',
        progressSelectedColor: '#ff9e0d',
      },
      isDisabled: false,
      project: `Project_1`, // 所属项目
      dependencies: i > 0 ? [`Task_${i - 1}`] : [], // 依赖于前一个任务
    });
  }

  // 里程碑
  tasks.push({
    id: 'Milestone_1',
    type: 'milestone',
    name: 'Project Milestone',
    start: new Date(2024, 8, 20),
    end: new Date(2024, 8, 20),
    progress: 0,
    styles: {
      backgroundColor: '#ff0000',
      progressColor: '#ff0000',
      progressSelectedColor: '#ff0000',
    },
    isDisabled: true,
    dependencies: ['Task_9'], // 依赖最后一个任务完成后达成里程碑
  });

  // 项目任务
  tasks.push({
    id: 'Project_1',
    type: 'project',
    name: 'Main Project',
    start: new Date(2024, 8, 13),
    end: new Date(2024, 8, 30),
    progress: 45,
    styles: {
      backgroundColor: '#2c3e50',
      backgroundSelectedColor: '#34495e',
      progressColor: '#27ae60',
      progressSelectedColor: '#2ecc71',
    },
    hideChildren: false, // 默认显示子任务
  });

  // 项目的子任务（带依赖关系）
  for (let i = 0; i < 5; i++) {
    tasks.push({
      id: `SubTask_${i}`,
      type: 'task',
      name: `Sub Task ${i}`,
      start: new Date(2024, 8, 16 + i),
      end: new Date(2024, 8, 18 + i),
      progress: Math.floor(Math.random() * 100),
      styles: {
        backgroundColor: '#f5b7b1',
        progressColor: '#e74c3c',
        progressSelectedColor: '#c0392b',
      },
      project: 'Project_1', // 表示属于主项目
      dependencies: i > 0 ? [`SubTask_${i - 1}`, 'Project_1'] : ['Project_1'], // 依赖前一个子任务
    });
  }

  // 第二个项目
  tasks.push({
    id: 'Project_2',
    type: 'project',
    name: 'Second Project',
    start: new Date(2024, 8, 25),
    end: new Date(2024, 9, 10),
    progress: 30,
    styles: {
      backgroundColor: '#8e44ad',
      backgroundSelectedColor: '#9b59b6',
      progressColor: '#dcdde1',
      progressSelectedColor: '#e1bee7',
    },
    hideChildren: true, // 默认隐藏子任务
  });

  // 第二个项目的子任务（默认隐藏）
  for (let i = 0; i < 3; i++) {
    tasks.push({
      id: `SecondProject_SubTask_${i}`,
      type: 'task',
      name: `Second Project Sub Task ${i}`,
      start: new Date(2024, 8, 28 + i),
      end: new Date(2024, 8, 30 + i),
      progress: Math.floor(Math.random() * 100),
      styles: {
        backgroundColor: '#dff9fb',
        progressColor: '#00cec9',
        progressSelectedColor: '#00b894',
      },
      project: 'Project_2', // 关联到第二个项目
      dependencies: i > 0 ? [`SecondProject_SubTask_${i - 1}`] : [],
    });
  }

  // 第二个项目的里程碑
  tasks.push({
    id: 'Milestone_2',
    type: 'milestone',
    name: 'Second Project Milestone',
    start: new Date(2024, 9, 10),
    end: new Date(2024, 9, 10),
    progress: 0,
    styles: {
      backgroundColor: '#e67e22',
      progressColor: '#e67e22',
      progressSelectedColor: '#d35400',
    },
    dependencies: ['SecondProject_SubTask_2'], // 依赖子任务完成
  });

  return tasks;
};

// Main component
const App = () => {
  const [tasks, setTasks] = useState<Task[]>(generateTasks());
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Day); // Store the current view mode

  const handleDateChange = (task: Task) => {
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, start: task.start, end: task.end } : t,
    );
    setTasks(updatedTasks);
  };
  // Custom tooltip component
  const CustomTooltip = ({ task }: { task: Task }) => {
    return (
      <div style={{ padding: '5px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}>
        <strong>{task.name}</strong>
        <div>Start: {task.start.toLocaleDateString()}</div>
        <div>End: {task.end.toLocaleDateString()}</div>
        {task.type != 'milestone' && <div>Progress: {task.progress}%</div>}
      </div>
    );
  };
  // 处理任务排序的拖拽结束事件
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed);

    setTasks(reorderedTasks);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Independent button area */}
      <div style={{ padding: '10px 0', backgroundColor: '#f5f5f5', flexShrink: 0 }}>
        <Flex vertical gap="middle">
          <Radio.Group onChange={(e) => {
            setViewMode(e.target.value);
          }} defaultValue={ViewMode.Day}>
            <Radio.Button value={ViewMode.Hour}>小时</Radio.Button>
            <Radio.Button value={ViewMode.QuarterDay}>四分之一天</Radio.Button>
            <Radio.Button value={ViewMode.HalfDay}>半天</Radio.Button>
            <Radio.Button value={ViewMode.Day}>天</Radio.Button>
            <Radio.Button value={ViewMode.Week}>周</Radio.Button>
            <Radio.Button value={ViewMode.Month}>月</Radio.Button>
            <Radio.Button value={ViewMode.Year}>年</Radio.Button>
          </Radio.Group>
        </Flex>
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
        />
      </div>
    </div>
  );
};

export default App;

// Custom task list header
const CustomTaskListHeader = () => {
  return (
    <div>
      <div style={{
        height: '50px', lineHeight: '50px', display: 'flex',
      }}>
        <div style={{ width: 100, border: 'solid 0.5px', borderColor: 'rgba(224,224,224,1)' }}>Name</div>
        <div style={{ width: 100, border: 'solid 0.5px', borderColor: 'rgba(224,224,224,1)' }}>Name</div>
      </div>
    </div>
  );
};

// Custom task list table
const CustomTaskListTable = ({ tasks }: { tasks: Task[] }) => {
  return (
    <>
      {tasks.map((task) => (
        <div style={{ height: '50px', lineHeight: '50px', display: 'flex' }} key={task.id}>
          <div style={{ width: 100, border: 'solid 0.5px', borderColor: 'rgba(224,224,224,1)' }} className={'mmm-ellipsis'}>{task.name}</div>
          <div style={{ width: 100, border: 'solid 0.5px', borderColor: 'rgba(224,224,224,1)' }} className={'mmm-ellipsis'}>{task.name}</div>
        </div>
      ))}
    </>
  );
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
                  >
                    <div style={{ width: 100, border: 'solid 0.5px', borderColor: 'rgba(224,224,224,1)' }} className={'mmm-ellipsis'}>{task.name}</div>
                    <div style={{ width: 100, border: 'solid 0.5px', borderColor: 'rgba(224,224,224,1)' }} className={'mmm-ellipsis'}>{task.name}</div>
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
