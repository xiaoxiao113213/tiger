import { ProDescriptions } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { Spin, Tabs, Tag } from 'antd';
import { RoleVo } from '@/pages/system/role/ApiBo.ts';
import { checkApiRst, getNullBo } from '@/utils/utils.ts';
import { menuApplicationTreeApi } from '@/pages/system/menu/api.tsx';
import { roleGetOneApi } from '@/pages/system/role/api.tsx';
import MenuComponent from '@/pages/system/role/component/menuComponent.tsx';
import { OperateEnum } from '@/utils/enum.ts';


type Props = {
  detailId: number
};
export default (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [detail, setDetailFn] = useState<RoleVo>(getNullBo);
  const [applicationList, setApplicationListFn] = useState<[]>([]);


  const initMyDataFn = async () => {
    setLoading(true);
    // 先默认写死一个应用的 可支持多个应用
    // const rst1 = await menuApplicationTreeApi({applicationId: 1});
    const rst1 = await menuApplicationTreeApi({});
    if (checkApiRst(rst1)) return;
    let applicationList1 = rst1.data;
    // applicationList1[0].name = "权限列表"


    let rst = await roleGetOneApi({ id: props.detailId });
    setDetailFn({ ...rst.data, applicationList: applicationList1 });

    setApplicationListFn(applicationList1);
    setLoading(false);
  };


  // 设置 菜单的时候  添加选中的值
  const setDetailApplicationCheckKeysFn = (checkedKeys: number[], index: number) => {
    console.log('1', detail, checkedKeys, index);
    setDetailFn((pre) => {
      pre.applicationList[index].checkedKeys = checkedKeys;
      return pre;
    });
  };

  useEffect(() => {
    initMyDataFn();
    return () => {
    };
  }, []); // 第二个参数表示依赖项


  return (
    <div>
      <Spin spinning={loading} delay={500}>
        <ProDescriptions
          column={2}
          title=""
          tooltip=""
        >
          <ProDescriptions.Item label="名称" tooltip="" valueType="text" key={'name'}>
            {detail.name}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="编码" tooltip="" valueType="text" key={'code'}>
            {detail.code}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="排序" tooltip="" valueType="text" key={'label'}>
            {detail.sort}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="状态" tooltip="" key={'disabled'}>
            {(() => {
              if (detail.disabled === 0) {
                return <Tag color={'green'}>启用中</Tag>;
              } else {
                return <Tag color={'red'}>禁用中</Tag>;
              }
            })()}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="创建时间" tooltip="" valueType="text" key={'createTime'}>
            {detail.createTime}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="创建人" tooltip="" valueType="text" key={'token'}>
            {detail.createBy}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="备注" tooltip="" valueType="textarea" key={'desc'}>
            {detail.remarks}
          </ProDescriptions.Item>

        </ProDescriptions>
        <Tabs defaultActiveKey="0" size={'large'}>
          {
            applicationList.map((application, index) => {
              return <Tabs.TabPane tab={application.name} key={index}>
                <MenuComponent
                  application={application}
                  checkMenuIds={detail ? (detail.menu ?? []) : []}
                  setDetailApplicationCheckKeysFn={setDetailApplicationCheckKeysFn}
                  applicationIndex={index}
                  openType={OperateEnum.detail}
                />
              </Tabs.TabPane>;
            })
          }
        </Tabs>

      </Spin>
    </div>
  );
};