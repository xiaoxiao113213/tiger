import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Button, Card, Drawer, message, Modal, Popover } from 'antd';

import { OperateEnum } from '@/utils/enum.ts';
import Detail from './detail.tsx';
import AddOrUpdate from './addOrUpdate.tsx';
import dayjs, { Dayjs } from 'dayjs';
import { WorkLogDetailVo } from '@/pages/project/workLog/ApiBo.ts';
import { workLogAllApi, workLogDeleteApi } from '@/pages/project/workLog/api.tsx';
import { checkApiRst } from '@/utils/utils.ts';
import { DeleteOutlined, EditOutlined, LeftOutlined, MoreOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons';

const daysOfWeek = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
const Index = (props: { tab: string }) => {
  const [rangeDate, setRangeDate] = useState<Dayjs[]>();
  const [workLogList, setWorkLogList] = useState<WorkLogDetailVo[]>();

  const initData = async (startDate: string, endDate: string) => {
    let rst = await workLogAllApi({ startDay: startDate, endDay: endDate });
    setWorkLogList(rst.data);
  };


  useEffect(() => {
    //   使用dayjs 或者当前周的所有时间开始时间和结束时间 和所有的中间的时间
    const startDate = dayjs().startOf('week');
    const dateList = [];
    for (let i = 0; i < 7; i++) {
      dateList.push(startDate.add(i, 'day'));
    }
    setRangeDate(dateList);
    initData(dateList[0].format('YYYY-MM-DD'), dateList[dateList.length - 1].format('YYYY-MM-DD'));
  }, []);

  if (!rangeDate) return null;
  if (!workLogList) return null;

  const reloadList = async () => {
    initData(rangeDate[0].format('YYYY-MM-DD'), rangeDate[rangeDate.length - 1].format('YYYY-MM-DD'));
  };
  const setNextWeekRang = () => {
    const startDate = rangeDate[6].add(1, 'day');
    const dateList = [];
    for (let i = 0; i < 7; i++) {
      dateList.push(startDate.add(i, 'day'));
    }
    setRangeDate(dateList);
    initData(dateList[0].format('YYYY-MM-DD'), dateList[dateList.length - 1].format('YYYY-MM-DD'));
  };

  const setPreWeekRang = () => {
    const startDate = rangeDate[0].add(-7, 'day');
    const dateList = [];
    for (let i = 0; i < 7; i++) {
      dateList.push(startDate.add(i, 'day'));
    }
    setRangeDate(dateList);
    initData(dateList[0].format('YYYY-MM-DD'), dateList[dateList.length - 1].format('YYYY-MM-DD'));
  };


  const onDragEnd = async (result) => {

  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'hidden' }}>
      <div style={{ textAlign: 'center' }}>
        <Button type={'link'} icon={<LeftOutlined />} onClick={setPreWeekRang}/>
        {rangeDate[0].format('YYYY-MM-DD')} ~ {rangeDate[rangeDate.length - 1].format('YYYY-MM-DD')}
        <Button type={'link'} icon={<RightOutlined />} onClick={setNextWeekRang} />
      </div>
      <div style={{ flexGrow: 1, display: 'flex', gap: '2px', overflowY: 'auto' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {
            rangeDate.map((item, index) => (
              <DroppableColumn
                key={index}
                title={<div>{daysOfWeek[item.day()]} {item.format('YYYY-MM-DD')} </div>}
                list={workLogList.filter((workLog) => workLog.day === item.format('YYYY-MM-DD'))}
                droppableId={item.format('YYYY-MM-DD')}
                reloadList={reloadList}
              />
            ))
          }
        </DragDropContext>
      </div>
    </div>
  );
};

const DroppableColumn = ({ title, list, droppableId, reloadList }) => {
  const totalHours = list.reduce((acc, cur) => acc + Number(cur.hours), 0);
  const [enter, setEnter] = useState(false);
  const [detailId, setDetailIdFn] = useState<number>();
  const [addOrUpdateModal, setAddOrUpdateModalFn] = useState<OperateEnum>(OperateEnum.close);
  return (

    <div style={{ width: '14%', border: '1px solid #f0f0f0', borderRadius: '4px', padding: '10px' }}
         onMouseEnter={() => {
           setEnter(true);
         }}
         onMouseLeave={() => {
           setEnter(false);
         }}
    >
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ minHeight: '300px' }}
          >
            <div style={{ textAlign: 'center', fontStyle: 'italic', fontWeight: 'bold' }}>
              {title} {totalHours}/8
            </div>
            <div style={{ marginTop: '10px', marginBottom: '10px' }}>
              <Button style={{ width: '100%', visibility: enter ? 'visible' : 'hidden' }} icon={<PlusOutlined />} type={'primary'}
                      onClick={() => setAddOrUpdateModalFn(OperateEnum.add)}
              ></Button>
            </div>
            {list.map((item, index) => (
              <Draggable key={item.workLogId} draggableId={item.workLogId.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      marginBottom: '10px',
                      backgroundColor: '#f9f9f9',
                      padding: '3px',
                      borderRadius: '4px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    }}
                  >
                    <IssueCard key={item.workLogId} item={item} reloadList={reloadList} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
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
          <AddOrUpdate detailId={detailId ?? 0} operateEnum={addOrUpdateModal}
                       setAddOrUpdateModalFn={setAddOrUpdateModalFn}
                       reloadTable={() => {
                         reloadList();
                       }}
                       day={droppableId}
          />
        </div>
      </Drawer>
    </div>


  );
};


const IssueCard = (props: { item: WorkLogDetailVo, reloadList }) => {
  const item = props.item;
  const [detailModal, setDetailModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [addOrUpdateModal, setAddOrUpdateModalFn] = useState<OperateEnum>(OperateEnum.close);
  const deleteDetailFn = async (item: WorkLogDetailVo) => {
    Modal?.confirm({
      title: '是否确认删除',
      // content: item.account,
      icon: null,
      onOk: async () => {
        let rst = await workLogDeleteApi({ workLogId: item.workLogId });
        if (checkApiRst(rst)) return;
        message.success(rst.msg);
        props.reloadList();
      },
    });
  };
  return (
    <div>
      <Card title={
        // <Button type={'link'}
        //         onClick={() => setDetailModalFn(OperateEnum.edit)}
        // >
        <a className={'mmm-ellipsis'} onClick={
          () => {
            setDetailModalFn(OperateEnum.edit);
          }
        }>{props.item.issueName}</a>
        // </Button>
      }
            size="small"
            extra={
              <div className={'mmm-hover-pointer'}>
                <Popover
                  placement={'rightTop'}
                  trigger={'click'}
                  content={<div>
                    <Button type={'link'}
                            icon={<EditOutlined />}
                            onClick={() => setAddOrUpdateModalFn(OperateEnum.edit)}
                    />
                    <Button type={'link'}
                            icon={<DeleteOutlined />}
                            onClick={() => deleteDetailFn(item)}
                    />
                  </div>}>
                  <MoreOutlined style={{ width: '20px' }} />
                </Popover>
              </div>
            }
      >
        <div>工时：{props.item.hours}/时</div>
        <div>项目：{props.item.projectName}</div>
        <div className={'mmm-ellipsis'}>描述：{props.item.remarks}</div>
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
          <Detail detailId={item.workLogId} />
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
          <AddOrUpdate detailId={item.workLogId ?? 0} operateEnum={addOrUpdateModal}
                       setAddOrUpdateModalFn={setAddOrUpdateModalFn}
                       reloadTable={() => {
                         props.reloadList();
                       }}
          />
        </div>
      </Drawer>
    </div>
  );
};
export default Index;
