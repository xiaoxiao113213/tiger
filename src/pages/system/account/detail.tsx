import { ProDescriptions } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { Spin, Tabs, Tag } from 'antd';
import MenuComponent from './component/menuComponent';
import getIfFlag from '@/components/Dic/IfFlagDic';
import { AccountItemBo } from '@/pages/system/account/ApiBo.ts';
import { checkApiRst, getNullBo } from '@/utils/utils.ts';
import { accountGetOneApi } from '@/pages/system/account/accountApi.tsx';
import { menuApplicationTreeApi } from '@/pages/system/menu/api.tsx';
import { roleAllApi } from '@/pages/system/role/api.tsx';
import { deptPageApi } from '@/pages/system/dept/api.tsx';


type Props = {
  detailId: number,
};
export default (props: Props) => {
  let ifFlagList = getIfFlag();
  const [loading, setLoading] = useState(false);
  const [detail, setDetailFn] = useState<AccountItemBo>(getNullBo);
  const [applicationList, setApplicationListFn] = useState([]);
  const [deptTreeList, setDeptTreeListFn] = useState([]);
  const [roleList, setRoleListFn] = useState([]);

  const initMyDataFn = async () => {
    setLoading(true);
    menuApplicationTreeApi({}).then(rst => {
      if (checkApiRst(rst)) return;
      let applicationList1 = rst.data;
      // applicationList1[0].name = "权限列表"
      setApplicationListFn(applicationList1);
    });

    roleAllApi({}).then(rst => {
      // console.log("rst1", rst)
      setRoleListFn(rst.data);
    });
    deptPageApi({}).then(rst => {
      // console.log("rst2", rst)
      setDeptTreeListFn(rst.data);
    });

    let rst = await accountGetOneApi({ id: props.detailId });
    setDetailFn({ ...rst.data });
    setLoading(false);
  };
  useEffect(() => {
    initMyDataFn();
    return () => {
    };
  }, []); // 第二个参数表示依赖项

  if (detail == undefined || !applicationList) return <div>loading</div>;
  return (
    <div>
      <Spin spinning={loading} delay={500}>
        <ProDescriptions
          column={2}
          title=""
          tooltip=""
        >
          <ProDescriptions.Item label="账号" tooltip="" valueType="text" key={'name'}>
            {detail.account}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="手机号" tooltip="" valueType="text" key={'phone'}>
            {detail.phone}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="是否禁用" tooltip="" key={'disabled'}>
            {(() => {
              let item = ifFlagList.find(item => item.value === detail.disabled);
              return <Tag color={item?.color}>{item?.label}</Tag>;
            })()}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="类型" tooltip="" key={'type'}>
            {(() => {
              if (detail.type === 0) {
                return <Tag color={'green'}>前台</Tag>;
              } else {
                return <Tag color={'red'}>后台</Tag>;
              }
            })()}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="邮箱" tooltip="" valueType="textarea" key={'email'}>
            {detail.email}
          </ProDescriptions.Item>

          {/*<ProDescriptions.Item label="角色" tooltip="" valueType="text" key={'role'}>*/}
          {/*  {detail.roleNames}*/}
          {/*</ProDescriptions.Item>*/}
          <ProDescriptions.Item label="部门" tooltip="" valueType="text" key={'dept'}>
            {detail.deptNames}
          </ProDescriptions.Item>

          <ProDescriptions.Item label="创建时间" tooltip="" valueType="text" key={'createTime'}>
            {detail.createTime}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="创建人" tooltip="" valueType="text" key={'token'}>
            {detail.createByAccount?.nickName}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="个人简介" tooltip="" valueType="textarea" key={'desc'}>
            {detail.remarks}
          </ProDescriptions.Item>
        </ProDescriptions>
        <Tabs defaultActiveKey="0" key={'role'} type={'card'} size={'large'} style={{ marginTop: '20px' }}>
          {detail.roleList != undefined &&
            detail?.roleList.map((role, indexR) => {
              return <Tabs.TabPane tab={role.name} key={indexR}>
                <Tabs defaultActiveKey="0" key={'application'} type={'card'} size={'large'}>
                  {
                    applicationList.map((application, indexA) => {
                      return <Tabs.TabPane tab={application.name} key={indexA + '-' + indexR}>
                        <MenuComponent
                          application={application}
                          roleId={role.id}
                        />
                      </Tabs.TabPane>;
                    })
                  }
                </Tabs>
              </Tabs.TabPane>;
            })
          }
        </Tabs>

      </Spin>
    </div>
  );
};