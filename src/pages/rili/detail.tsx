import { ProDescriptions } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { RiliDetailVo } from './api/ApiBo';
import { riliGetOneApi } from './api/api';
import { Tag, Timeline } from 'antd';
import dayjs from 'dayjs';
import FileView from '@/components/upload/FileView.tsx';
import UserView from '@/components/user/UserView.tsx';
import Title from 'antd/lib/typography/Title';


type Props = {
  detail?: { riliId?: number, type: number },
};
export default (props: Props) => {
  if (!props.detail?.riliId) {
    return <div></div>;
  }
  const [detail, setDetailFn] = useState<RiliDetailVo>();
  const initMyDataFn = async () => {
    let rst = await riliGetOneApi({ riliId: props.detail.riliId });
    setDetailFn(rst.data);
  };
  useEffect(() => {
    initMyDataFn();
    return () => {
    };
  }, []); // 第二个参数表示依赖项
  if (!detail) {
    return <div></div>;
  }


  return (
    <div>
      <ProDescriptions
        column={1}
        title=""
        tooltip=""
      >
        <ProDescriptions.Item label="类型" tooltip="" valueType="text" key={'type'}>
          {detail.type === 0 && <Tag color="blue">日程</Tag>}
          {detail.type === 1 && <Tag color="blue">任务</Tag>}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="标题" tooltip="" valueType="text" key={'name'}>
          {detail.name}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="status" tooltip="" valueType="text" key={'status'}>
          {detail.status == '0' && <Tag color="green">待开始</Tag>}
          {detail.status == '1' && <Tag color="blue">进行中</Tag>}
          {detail.status == '2' && <Tag color="red">结束</Tag>}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="描述" tooltip="" valueType="text" key={'remarks'}>
          {detail.remarks}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="开始时间" tooltip="" valueType="text" key={'startTime'}>
          {dayjs(detail.startTime).format('YYYY-MM-DD HH:mm')}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="结束时间" tooltip="" valueType="text" key={'endTime'}>
          {dayjs(detail.endTime).format('YYYY-MM-DD HH:mm')}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="创建人" tooltip="" valueType="text" key={'createBy'}>
          {detail.createByAccount?.nickName}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="创建时间" tooltip="" valueType="text" key={'createTime'}>
          {detail.createTime}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="附件" tooltip="" valueType="text" key={'fileList'}>
          <FileView fileList={detail.fileList ?? []}></FileView>
        </ProDescriptions.Item>
        <Title level={4}>参与人员</Title>
        <UserView userList={detail.userList ?? []} />
      </ProDescriptions>
      <Timeline
        style={{ marginTop: '20px' }}
        items={detail.commentList.map((item) => {
          return {
            children: `${item.createTime}【${item.createByAccount.nickName}】${item.content}`,
          };
        })}
      />


    </div>
  );
};            