import React, { useEffect, useState } from 'react';
import { Button, Drawer, message, Tabs, TabsProps } from 'antd';
import BuildList from '@/pages/pipelineBuild/buildList';
import ArchiveMsg from '@/pages/pipelineBuild/archiveMsg';
import PipelineDoLog from '@/pages/pipelineBuild/pipelineDoLog';
import BuildModal from '@/pages/pipeline/pipeline/component/BuildModal';
import { OperateEnum } from '@/utils/enum.ts';
import { PipelineBo } from '@/pages/pipeline/pipeline/api/bo.tsx';
import { pipelineGetOneApi } from '@/pages/pipeline/pipeline/api/pipeline.tsx';
import { checkApiRst, getUrlParams } from '@/utils/utils.ts';

export type Props = {};
const Index = () => {
  const [buildModal, setBuildModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [refresh, setRefreshFn] = useState<number>(0);
  // detail 中加入一个  应用列表 applicationList  然后应用列表下有选中的菜单id  checkedKeys
  const [pipelineId, setPipelineIdFn] = useState<number>(0);
  const [pipeline, setPipelineFn] = useState<PipelineBo>({} as PipelineBo);


  const onChange = (key: string) => {
    console.log(key);
  };
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `构建列表`,
      closeIcon: false,
      children: <BuildList
        pipelineId={pipelineId}
        refresh={refresh}
      />,
    },
    {
      key: '2',
      label: `归档信息`,
      closeIcon: false,
      children: <ArchiveMsg

      />,
    },
    {
      key: '3',
      label: `操作日志`,
      closeIcon: false,
      children: <PipelineDoLog
        pipelineId={pipelineId}
        refresh={refresh}
      />,
    },
  ];
  const initMyDataFn = async () => {
    const queryParams = getUrlParams();
    const pipelineId = parseInt(queryParams.get('pipelineId'))!!;
    setPipelineIdFn(pipelineId);
    // message.info('pipelineId:' + pipelineId);
    let rst = await pipelineGetOneApi({ id: pipelineId });
    if (checkApiRst(rst)) return;
    setPipelineFn(rst.data);
  };
  // 打开构建流水线的弹框
  const openBuildModalFn = async () => {
    setBuildModalFn(OperateEnum.add);
  };

  const refreshFn = () => {
    setRefreshFn((pre) => {
      return pre + 1;
    });
  };


  const operations = <div>

    <Button type="primary" onClick={openBuildModalFn} style={{ marginRight: 10 }}>
      构建
    </Button>

    {/*<Button type="default" >*/}
    {/*    取消*/}
    {/*</Button>*/}
  </div>;


  useEffect(() => {
    // 在组件挂载或更新后执行操作
    initMyDataFn();

    return () => {
      // 在组件卸载前执行清理操作

    };
  }, []); // 第二个参数表示依赖项

  return (
    <div>
      <div>
        <Tabs
          hideAdd={true}
          type="editable-card"
          defaultActiveKey="1"
          items={items} onChange={onChange} tabBarExtraContent={operations} />
      </div>
      <div>

        <Drawer
          title={'构建流水线'}
          open={buildModal !== OperateEnum.close}
          footer={false}
          width={'75%'}
          destroyOnClose={true}
          maskClosable={false}
          onClose={() => setBuildModalFn(OperateEnum.close)}
          // styles={drawerStyles}
        >
          <BuildModal
            setBuildModalFn={setBuildModalFn}
            detailId={pipelineId}
            reloadTable={() => {
              setBuildModalFn(OperateEnum.close);
              refreshFn();
            }}
          />
        </Drawer>
      </div>


    </div>
  );
};

export default Index;