import React, { FC, useMemo, useState } from 'react';
import { NodeProps } from '@xyflow/react';
import { KeyIcon } from '../components';
import '../style/table-node.css';

import '@reactflow/node-resizer/dist/style.css';
import { Button, Drawer, message, Modal, Popover, Tooltip } from 'antd';
import { OperateEnum } from '@/utils/enum.ts';
import TableTag from '@/pages/database/databaseBoard/table/TableTag.tsx';
import { useDataBaseContext } from '@/pages/database/Visualizer/nodeTypes.ts';
import { tableCopyApi, tableDeleteApi } from '@/pages/database/databaseBoard/api/table/api.tsx';
import { checkApiRst, oCheckHidden } from '@/utils/utils.ts';
import { MoreOutlined, UnorderedListOutlined } from '@ant-design/icons';

export const TableNode: FC<NodeProps> = (node) => {
  const { data, selected } = node;
  const tableId = node.id;
  const databaseBoardId = data.databaseBoardId;
  const [tableModal, setTableModalFn] = useState<OperateEnum>(OperateEnum.close);
  const { reloadTableData, setOpenDrawer, deleteTable } = useDataBaseContext();
  const closeModel = () => {
    setTableModalFn(OperateEnum.close);
    setOpenDrawer(false);
    reloadTableData(tableId);
  };
  const deleteDetailFn = async () => {
    Modal?.confirm({
      title: '是否确认删除',
      // content: item.account,
      icon: null,
      onOk: async () => {
        let rst = await tableDeleteApi({ tableId: tableId });
        if (checkApiRst(rst)) return;
        message.success(rst.msg);
        setTableModalFn(OperateEnum.close);
        setOpenDrawer(false);
        deleteTable(tableId);
      },
    });
  };
  const copyTable = async () => {
    let rst = await tableCopyApi({ tableId: tableId });
    if (checkApiRst(rst)) return;
    reloadTableData(rst.data);
  };


  const getHtml = useMemo(() => {
    console.log('tableNode', data);
    return (
      <Tooltip trigger={'hover'} title={data.description ?? ''}>
        <div>
          {/*{data.columns.map((column: any, index: number) => {*/}
          {/*  return <>*/}
          {/*    <Handle type="target" id={`${tableId}-${column.name}-left-target`} position={Position.Left} isConnectable={true} style={{ top: `${(index + 1) * 34 + 17}px`, left: '-8px' }} />*/}
          {/*    <Handle type="source" id={`${tableId}-${column.name}-left-source`} position={Position.Left} isConnectable={true} style={{ top: `${(index + 1) * 34 + 17}px`, left: '-8px' }} />*/}
          {/*    <Handle type="target" id={`${tableId}-${column.name}-right-target`} position={Position.Right} isConnectable={true} style={{ top: `${(index + 1) * 34 + 17}px`, right: '-8px' }} />*/}
          {/*    <Handle type="source" id={`${tableId}-${column.name}-right-source`} position={Position.Right} isConnectable={true} style={{ top: `${(index + 1) * 34 + 17}px`, right: '-8px' }} />*/}
          {/*  </>;*/}
          {/*})}*/}
          <div key={tableId} className="table" style={{ backgroundColor: selected ? '#d4dee6' : 'white' }}
               onDoubleClick={() => {
                 setTableModalFn(OperateEnum.add);
                 setOpenDrawer(true);
               }}
          >
            <div
              style={{
                backgroundColor: data.schemaColor,
                display: 'flex',
              }}
              className="table__name"
            >
              <div style={{ flex: 10 }}>{data.name}</div>
              <div style={{ color: 'blue', flex: 1, cursor: 'default' }}>
                <Popover
                  trigger={'click'}
                  placement={'rightTop'}
                  content={
                    <div>
                      <div>
                        <Button type={'link'} onClick={() => {
                          setTableModalFn(OperateEnum.add);
                          setOpenDrawer(true);
                        }} hidden={oCheckHidden('databaseBoard:edit')}>
                          修改
                        </Button>
                      </div>
                      <div>
                        <Button type={'link'} onClick={deleteDetailFn} hidden={oCheckHidden('databaseBoard:edit')}>
                          删除
                        </Button>
                      </div>
                      <div>
                        <Button type={'link'} onClick={copyTable} hidden={oCheckHidden('databaseBoard:edit')}>
                          复制
                        </Button>
                      </div>
                    </div>
                  }
                >
                  <UnorderedListOutlined />
                  {/*<MoreOutlined />*/}
                </Popover>
              </div>
            </div>
            <div className="table__columns">
              {data.columns.map((column: any, index: any) => (
                <div className="column-name__inner" key={index}>
                  <div className="column-name__name" style={{ display: 'flex', alignItems: 'center' }}>
                    {column.name} &nbsp;
                    {column.key && <KeyIcon />}
                  </div>
                  <div className="column-name__type">
                    {column.type}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Tooltip>
    );
  }, [data, selected]);


  return (
    <>
      {getHtml}
      <Drawer
        title={'表结构'}
        key={'1222232'}
        open={tableModal !== OperateEnum.close}
        width={'100%'}
        destroyOnClose={true}
        maskClosable={false}
        keyboard={true}
        onClose={closeModel}
        footer={null}
      >
        <div>
          <TableTag
            tableId={tableId}
            databaseBoardId={databaseBoardId}
            closeTableTagModal={closeModel}
          />
        </div>
      </Drawer>
    </>


  );
};
