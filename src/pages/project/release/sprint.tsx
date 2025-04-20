import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Title from 'antd/lib/typography/Title';
import { Badge, Button, Card, Drawer, Form, Select, Tag } from 'antd';
import { ProjectIssueListVo } from '@/pages/project/issues/ApiBo.ts';
import projectDic from '@/components/Dic/ProjectDic.ts';
import { DicVo } from '@/utils/DicVo.ts';
import { projectReleaseAllApi } from '@/pages/project/release/api.tsx';
import { projectIssueGetOneApi, projectIssueHeadUserListApi, projectIssueListForReleaseApi, projectIssueUpdateStatusSortApi } from '@/pages/project/issues/api.tsx';
import IssueTypeDic from '@/components/Dic/IssueTypeDic.ts';
import { DicMap } from '@/utils/baseBo.ts';
import { EditOutlined } from '@ant-design/icons';
import { OperateEnum } from '@/utils/enum.ts';
import Detail from '@/pages/project/issues/detail.tsx';
import AddOrUpdate from '@/pages/project/issues/addOrUpdate.tsx';
import { oDateRemoveTime } from '@/utils/utils.ts';

const Sprint = (props: { tab: string }) => {
  const [searchFormRef] = Form.useForm<any>();
  const { IssueTypeMap } = IssueTypeDic();
  const [waitList, setWaitList] = useState<ProjectIssueListVo[]>([]);
  const [sprintList, setSprintList] = useState<ProjectIssueListVo[]>([]);
  const [completeList, setCompleteList] = useState<ProjectIssueListVo[]>([]);
  const [closeList, setCloseList] = useState<ProjectIssueListVo[]>([]);
  const { ProjectList, ProjectMap, ProjectValueEnum, refreshData } = projectDic();
  const [releaseDic, setReleaseDic] = useState<DicVo[]>();
  const [headUserDic, setHeadUserDic] = useState<DicVo[]>();
  const [projectId, setProjectId] = useState<number>();
  const [projectReleaseId, setProjectReleaseId] = useState<number>();

  const clearList = () => {
    setWaitList([]);
    setSprintList([]);
    setCompleteList([]);
    setCloseList([]);
    setHeadUserDic([]);
  };


  useEffect(() => {
    if (ProjectList.length > 0) {
      setProjectId(ProjectList[0].value);
      searchFormRef.setFieldsValue({ projectId: ProjectList[0].value });
    } else {
      setProjectId(undefined);
      searchFormRef.setFieldsValue({ projectId: undefined });
      clearList();
    }
  }, [ProjectList]);

  useEffect(() => {
    if (projectId) {
      projectReleaseAllApi({ projectId, status: '1' }).then((res) => {
        setReleaseDic(res.data);
      });
    } else {
      setReleaseDic([]);
    }
  }, [projectId]);

  useEffect(() => {
    if (releaseDic && releaseDic.length > 0) {
      setProjectReleaseId(releaseDic[0].value);
      searchFormRef.setFieldsValue({ projectReleaseId: releaseDic[0].value });
    } else {
      setProjectReleaseId(undefined);
      searchFormRef.setFieldsValue({ projectReleaseId: undefined });
    }
  }, [releaseDic]);

  const initList = (headUserId?: number) => {
    projectIssueListForReleaseApi({
      projectId: projectId,
      projectReleaseId: projectReleaseId,
      headUserId: headUserId,
    }).then((res) => {
      const data = res.data;
      setWaitList(data.filter((item) => item.status === '0'));
      setSprintList(data.filter((item) => item.status === '1'));
      setCompleteList(data.filter((item) => item.status === '2'));
      setCloseList(data.filter((item) => item.status === '3'));
    });
  };


  useEffect(() => {
    if (props.tab != '1') return;
    if (projectReleaseId) {
      searchFormRef.setFieldsValue({ headUserId: undefined });
      initList();
      projectIssueHeadUserListApi({ projectReleaseId: projectReleaseId }).then((res) => {
        setHeadUserDic(res.data);
      });
    } else {
      clearList();
    }
  }, [projectReleaseId, props.tab]);


  if (ProjectList.length < 1) {
    return <div></div>;
  }

  const updateList = async (projectIssueId: number) => {
    const item = (await projectIssueGetOneApi({ projectIssueId })).data;
    setWaitList(prevState => prevState.map((i) => i.projectIssueId === projectIssueId ? item : i));
    setSprintList(prevState => prevState.map((i) => i.projectIssueId === projectIssueId ? item : i));
    setCompleteList(prevState => prevState.map((i) => i.projectIssueId === projectIssueId ? item : i));
    setCloseList(prevState => prevState.map((i) => i.projectIssueId === projectIssueId ? item : i));
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    // If dropped outside a droppable area, do nothing
    if (!destination) return;

    // If dropped in the same column and position, do nothing
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    let sourceList, destinationList, setSourceList, setDestinationList;

    // Determine source and destination lists based on droppableId
    switch (source.droppableId) {
      case 'wait':
        sourceList = [...waitList];
        setSourceList = setWaitList;
        break;
      case 'sprint':
        sourceList = [...sprintList];
        setSourceList = setSprintList;
        break;
      case 'complete':
        sourceList = [...completeList];
        setSourceList = setCompleteList;
        break;
      case 'close':
        sourceList = [...closeList];
        setSourceList = setCloseList;
        break;
      default:
        return;
    }

    // If dragging within the same column
    if (source.droppableId === destination.droppableId) {
      const [movedItem] = sourceList.splice(source.index, 1); // Remove from source
      sourceList.splice(destination.index, 0, movedItem); // Move item to new position
      await setSourceList(sourceList); // Update the state of the list
      // Determine preProjectIssueId for backend update
      const preProjectIssueId = destination.index === 0 ? null : sourceList[destination.index - 1]?.projectIssueId;
      // Call backend to update order
      await projectIssueUpdateStatusSortApi({ projectIssueId: movedItem.projectIssueId, status: movedItem.status, preProjectIssueId: preProjectIssueId });
      await updateList(movedItem.projectIssueId);
      return;
    }

    // If dragging between different columns
    switch (destination.droppableId) {
      case 'wait':
        destinationList = [...waitList];
        setDestinationList = setWaitList;
        break;
      case 'sprint':
        destinationList = [...sprintList];
        setDestinationList = setSprintList;
        break;
      case 'complete':
        destinationList = [...completeList];
        setDestinationList = setCompleteList;
        break;
      case 'close':
        destinationList = [...closeList];
        setDestinationList = setCloseList;
        break;
      default:
        return;
    }
    // Move the item from the source to the destination list
    const [movedItem] = sourceList.splice(source.index, 1); // Remove from source
    destinationList.splice(destination.index, 0, movedItem); // Insert into destination
    await setSourceList(sourceList); // Update source list state
    await setDestinationList(destinationList); // Update destination list state
    // Determine the new status based on destination droppableId
    const newStatus = destination.droppableId === 'wait' ? '0' : destination.droppableId === 'sprint' ? '1' : destination.droppableId === 'complete' ? '2' : '3';
    // Determine preProjectIssueId for backend update
    const preProjectIssueId = destination.index === 0 ? null : destinationList[destination.index - 1]?.projectIssueId;
    // Call backend to update the status and order
    await projectIssueUpdateStatusSortApi({ projectIssueId: movedItem.projectIssueId, status: newStatus, preProjectIssueId });
    await updateList(movedItem.projectIssueId);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'hidden' }}>
      <Card style={{ marginBottom: '20px' }}>
        <Form layout="inline" form={searchFormRef} style={{ gap: '10px' }}>
          <Form.Item label="项目" name={'projectId'} required={true}>
            <Select
              style={{ width: 200 }}
              placeholder="请选择项目"
              options={ProjectList}
              onChange={(value) => setProjectId(value)}
            />
          </Form.Item>
          <Form.Item label="版本" name={'projectReleaseId'} required={true}>
            <Select
              style={{ width: 200 }}
              placeholder="请选择版本"
              options={releaseDic}
              onChange={(value) => setProjectReleaseId(value)}
            />
          </Form.Item>
          <Form.Item label="责任人" name={'headUserId'}>
            <Select
              allowClear={true}
              style={{ width: 200 }}
              placeholder="请选择版本"
              options={headUserDic}
              onChange={(value) => {
                initList(value);
              }
              }
            />
          </Form.Item>
        </Form>
      </Card>

      <div style={{ flexGrow: 1, display: 'flex', gap: '10px', overflowY: 'auto' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <DroppableColumn
            title={<span>待处理 <Badge status={'default'} /></span>}
            list={waitList}
            droppableId="wait"
            IssueTypeMap={IssueTypeMap}
            updateList={updateList}
          />
          <DroppableColumn
            title={<span>进行中 <Badge status={'processing'} /></span>}
            list={sprintList}
            droppableId="sprint"
            IssueTypeMap={IssueTypeMap}
            updateList={updateList}
          />
          <DroppableColumn
            title={<span>已完成 <Badge status={'success'} /></span>}
            list={completeList}
            droppableId="complete"
            IssueTypeMap={IssueTypeMap}
            updateList={updateList}
          />
          <DroppableColumn
            title={<span>已关闭 <Badge status={'error'} /></span>}
            list={closeList}
            droppableId="close"
            IssueTypeMap={IssueTypeMap}
            updateList={updateList}
          />
        </DragDropContext>
      </div>
    </div>
  );
};

const DroppableColumn = (props: { title, list, droppableId, IssueTypeMap, updateList: (projectIssueId: number) => void }) => {
  const { title, list, droppableId, IssueTypeMap, updateList } = props;
  return (
    <Card style={{ width: '25%', padding: '0 10px' }}>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ minHeight: '300px' }}
          >
            <Title level={4} style={{ textAlign: 'center', marginBottom: '20px' }}>
              {title}
            </Title>
            {list.map((item, index) => (
              <Draggable key={item.projectIssueId} draggableId={item.projectIssueId.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      marginBottom: '10px',
                      backgroundColor: '#f9f9f9',
                      padding: '10px',
                      borderRadius: '4px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    }}
                  >
                    <IssueCard key={item.projectIssueId} item={item} typeMap={IssueTypeMap} updateList={updateList} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Card>
  );
};

const IssueCard = (props: { item: ProjectIssueListVo, typeMap: DicMap, updateList: (projectIssueId: number) => void }) => {
  const { item, updateList } = props;
  const [detailModal, setDetailModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [addOrUpdateModal, setAddOrUpdateModalFn] = useState<OperateEnum>(OperateEnum.close);

  return (
    <div>
      <Card title={<Button type={'link'}
                           onClick={() => setDetailModalFn(OperateEnum.edit)}
      >{props.item.name}</Button>} size="small" extra={<Button type={'link'} icon={<EditOutlined />}
                                                               onClick={() => setAddOrUpdateModalFn(OperateEnum.edit)}
      ></Button>}>
        <div>类型：<Tag color={props.typeMap[props.item.type]?.color}>{props.typeMap[props.item.type]?.label}</Tag></div>
        <div>描述：{props.item.remarks}</div>
        <div>负责人：{props.item.headUserInfo?.nickName}</div>
        <div>开始时间：{oDateRemoveTime(props.item.startDate)}</div>
        <div>结束时间：{oDateRemoveTime(props.item.endDate)}</div>
        <div>优先级：{getPriority(props.item.priority)}</div>
      </Card>
      <Drawer
        title={'配置详情'}
        open={detailModal !== OperateEnum.close}
        width={'75%'}
        destroyOnClose={true}
        maskClosable={false}
        onClose={() => setDetailModalFn(OperateEnum.close)}
        footer={null}
      >
        <div>
          <Detail detailId={item.projectIssueId} />
        </div>
      </Drawer>

      <Drawer
        title={addOrUpdateModal == OperateEnum.edit ? '配置编辑' : '配置新增'}
        open={addOrUpdateModal !== OperateEnum.close}
        width={'50%'}
        destroyOnClose={true}
        maskClosable={false}
        onClose={() => setAddOrUpdateModalFn(OperateEnum.close)}
        footer={null}
      >
        <div>
          <AddOrUpdate detailId={item.projectIssueId ?? 0} operateEnum={addOrUpdateModal}
                       setAddOrUpdateModalFn={setAddOrUpdateModalFn}
                       reloadTable={() => {
                         setAddOrUpdateModalFn(OperateEnum.close);
                         updateList(item.projectIssueId);
                       }}
                       defaultProjectId={item.projectId}
          />
        </div>
      </Drawer>

    </div>

  );
};
//         '0': { text: '一般', status: 'Success' },
//         '1': { text: '重要', status: 'Processing' },
//         '2': { text: '紧急', status: 'Error' },

const getPriority = (priority: string) => {
  switch (priority.toString()) {
    case '0':
      return <span>一般 <Badge status={'success'} /></span>;
    case '1':
      return <span>重要 <Badge status={'processing'} /></span>;
    case '2':
      return <span>紧急 <Badge status={'error'} /></span>;
    default:
      return '';
  }
};


export default Sprint;
