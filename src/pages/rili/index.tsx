import React, { useEffect, useState } from 'react';

import { Calendar, dayjsLocalizer, Views } from 'react-big-calendar';
import dayjs from 'dayjs';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './rili.css';
import { Button, Divider, Drawer } from 'antd';
import { riliAllApi } from '@/pages/rili/api/api.tsx';
import { OperateEnum } from '@/utils/enum.ts';
import AddOrUpdate from '@/pages/rili/addOrUpdate.tsx';
import Detail from '@/pages/rili/detail.tsx';
import { EditOutlined } from '@ant-design/icons';

const localizer = dayjsLocalizer(dayjs);


const Index = () => {
  const [range, setRange] = useState<{ start: string, end: string }>();
  const [events, setEvents] = useState<any[]>([]);
  const [rili, setRiliFn] = useState<{ riliId?: number, type: number }>();
  const [addOrUpdateModal, setAddOrUpdateModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [detailModal, setDetailModalFn] = useState<OperateEnum>(OperateEnum.close);
  const messages = {
    allDay: '全天',
    previous: '上一页',
    next: '下一页',
    today: '今天',
    month: '月',
    week: '周',
    day: '日',
    agenda: '日程',
    date: '日期',
    time: '时间',
    event: '事件',
  };
  // Custom toolbar component
  const CustomToolbar = ({ label, onNavigate, onView, view }) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Button onClick={() => onNavigate('PREV')}>上一页</Button>
          <Button onClick={() => onNavigate('TODAY')}>今天</Button>
          <Button onClick={() => onNavigate('NEXT')}>下一页</Button>
          <span style={{ marginLeft: '10px' }}>{label}</span>
        </div>
        <Button
          type={'primary'}
          style={{ marginRight: '10px' }}
          onClick={() => {
            setRiliFn({
              riliId: undefined,
              type: 0,
            });
            setAddOrUpdateModalFn(OperateEnum.add);
          }}
        >
          新建日程
        </Button>
      </div>
    );
  };
  const initEvents = (start?: string, end?: string) => {
    riliAllApi({ startTime: start ?? range?.start, endTime: end ?? range?.end }).then((res) => {
      console.log('res', res);
      setEvents(res.data.map((item) => {
        let title = item.name;
        if (item.remarks && item.remarks.length > 0) {
          title += ' ' + item.remarks;
        }
        return {
          title: title,
          start: dayjs(item.startTime).toDate(),
          end: dayjs(item.endTime).toDate(),
          allDay: false,
          resource: {
            riliId: item.riliId,
            type: item.type,
            status: item.status,
          },
        };
      }));
    });
  };


  // 初始化时计算当前范围
  useEffect(() => {
    const now = new Date();
    const start = dayjs(now).startOf('week').format('YYYY-MM-DD HH:mm:ss');
    const end = dayjs(now).endOf('week').format('YYYY-MM-DD HH:mm:ss');
    setRange({ start, end });
    console.log('初始范围:', start, end);
    initEvents(start, end);
  }, []);

  return (
    <>
      <div style={{ height: '100%', scrollbarWidth: 'none' }} className="custom-scrollbar">
        <div className={'mmm-bgcolor'} style={{ height: '50px', display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Button type={'primary'} style={{ marginRight: '10px' }} onClick={() => {
              setRiliFn({
                riliId: undefined,
                type: 0,
              });
              setAddOrUpdateModalFn(OperateEnum.add);
            }}>新建日程</Button>
          </div>
        </div>
        <Divider></Divider>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          onDoubleClickEvent={(event, e) => {
          }}
          endAccessor="end"
          style={{ height: 'calc(100% - 100px)' }}
          messages={messages}
          onRangeChange={(range) => {
            setEvents([]);
            if (Array.isArray(range)) {
              console.log('range---1', range.length);
              if (range.length > 1) {
                const start = dayjs(range[0]).format('YYYY-MM-DD') + ' 00:00:00';
                const end = dayjs(range[range.length - 1]).format('YYYY-MM-DD') + ' 23:59:59';
                setRange({ start: start, end: end });
                initEvents(start, end);
              } else {
                const s = dayjs(range[0]).format('YYYY-MM-DD');
                const start = s + ' 00:00:00';
                const end = s + ' 23:59:59';
                setRange({ start: start, end: end });
                initEvents(start, end);
              }
            } else if (range.start && range.end) {
              console.log('range---2', range);
              const start = dayjs(range.start).format('YYYY-MM-DD') + ' 00:00:00';
              const end = dayjs(range.end).format('YYYY-MM-DD') + ' 23:59:59';
              setRange({ start: start, end: end });
              initEvents(start, end);
            }
          }}
          onView={(view) => {
            console.log('view---', view);
          }}
          onNavigate={(date, view) => {
            console.log('date---', date);
            console.log('view---', view);
          }}
          defaultView={Views.WEEK}
          onSelectEvent={(event, e) => {
            console.log(event, e);
            setRiliFn({
              riliId: event.resource.riliId,
              type: event.resource.type,
            });
            setDetailModalFn(OperateEnum.detail);
          }}
          eventPropGetter={(event, start, end, isSelected) => {
            var backgroundColor = 'rgba(200, 255, 200, 0.5)';
            // Wait("0", "待开始"),
            //   InProgress("1", "进行中"),
            //   End("2","已结束"), ;
            if (event.resource.status == '0') {
              backgroundColor = 'rgba(200, 255, 200, 0.5)';
            } else if (event.resource.status == '1') {
              backgroundColor = 'rgba(200, 200, 255, 0.5)';
            } else if (event.resource.status == '2') {
              backgroundColor = 'rgba(255, 200, 200, 0.5)';
            }
            return {
              style: {
                backgroundColor: backgroundColor,
                color: '#333', // 设置文本颜色
                borderRadius: '5px', // 使事件样式更加圆润
                border: '1px solid #ccc', // 添加边框
              },
            };
          }}
        />
      </div>
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
          <AddOrUpdate detail={rili} operateEnum={addOrUpdateModal}
                       setAddOrUpdateModalFn={setAddOrUpdateModalFn}
                       reloadTable={initEvents}
          />
        </div>
      </Drawer>
      <Drawer
        title={<div style={{ display: 'flex', justifyContent: 'space-between' }}>详情
          <div className={'mmm-hover-pointer'}><EditOutlined onClick={() => {
            setDetailModalFn(OperateEnum.close);
            setAddOrUpdateModalFn(OperateEnum.edit);
          }} /></div>
        </div>}
        open={detailModal !== OperateEnum.close}
        width={'500'}
        destroyOnClose={true}
        // maskClosable={false}
        onClose={() => setDetailModalFn(OperateEnum.close)}
        footer={null}
      >
        <div>
          <Detail detail={rili} />
        </div>
      </Drawer>
    </>


  );
};

export default Index;