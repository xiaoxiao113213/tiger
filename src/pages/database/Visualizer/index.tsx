import React, { type MouseEvent as ReactMouseEvent, useCallback, useEffect, useRef, useState } from 'react';

import { MyDataBaseContext } from './nodeTypes';


import { MaximizeIcon, MinimizeIcon, TableNode } from './components';

// this is important! You need to import the styles from the lib to make it work
import '@xyflow/react/dist/style.css';
import './Style';
import { DicVo } from '@/utils/DicVo.ts';
import { tableAddLineApi, tableAllApi, tableDelLineApi, tableGetOneApi, tableSaveNewApi, tableUpdateLocationApi } from '@/pages/database/databaseBoard/api/table/api.tsx';
import { TableListVo, TableVo } from '@/pages/database/databaseBoard/api/table/ApiBo.ts';
import { TableFieldDetailVo } from '@/pages/database/databaseBoard/api/tableField/ApiBo.ts';
import { Button, Drawer, Input, message, Select } from 'antd';
import { OperateEnum } from '@/utils/enum.ts';
import DefaultTableField from '@/pages/database/databaseBoard/table/DefaultTableField.tsx';
import DdlFromDatabase from '@/pages/database/databaseBoard/table/DdlFromDatabase.tsx';
import CompareFromDatabase from '@/pages/database/databaseBoard/table/CompareFromDatabase.tsx';
import BatchUpdateColor from '@/pages/database/databaseBoard/table/BatchUpdateColor.tsx';
import { DownOutlined, SearchOutlined, TableOutlined, UpOutlined } from '@ant-design/icons';
import { addEdge, applyEdgeChanges, applyNodeChanges, Background, ControlButton, Controls, MiniMap, Panel, ReactFlow, ReactFlowProvider, useReactFlow } from '@xyflow/react';
import type { Edge, Node } from '@xyflow/react/dist/esm/types';
import { TextNode } from '@/pages/database/Visualizer/components/TextNode.tsx';

export const nodeTypes = {
  table: TableNode,
  text: TextNode,
};

interface VisualizerProps {
  databaseBoardId: number,
  MysqlTypeMap: Map<any, DicVo>,
  closeBoardModalFn: () => void,
}


const Flow: React.FC<VisualizerProps> = (props: VisualizerProps) => {
  const { screenToFlowPosition } = useReactFlow();
  const flowInstance = useReactFlow();
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [select, setSelect] = useState<{
    nodes: any[];
    edges: any[];
  }>();
  const [selectNodeDic, setSelectNodeDic] = useState<DicVo[]>();
  const [fullscreenOn, setFullScreen] = useState(false);
  // 画布的 DOM 容器，用于计算节点坐标
  const reactFlowWrapper = useRef(null);
  const [defaultFieldModal, setDefaultFieldModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [ddlFromDatabaseModal, setDdlFromDatabaseFn] = useState<OperateEnum>(OperateEnum.close);
  const [compareFromDatabaseModal, setCompareFromDatabaseFn] = useState<OperateEnum>(OperateEnum.close);
  const [colorModal, setColorFn] = useState<OperateEnum>(OperateEnum.close);


  const toggleFullScreen = () => {
    if (fullscreenOn) {
      document.exitFullscreen().then(function() {
        setFullScreen(false);
      })
        .catch(function(error) {
          alert('Can\'t exit fullscreen');
          console.error(error);
        });
    } else {
      var element = document.querySelector('body');

      // make the element go to full-screen mode
      element && element.requestFullscreen()
        .then(function() {
          setFullScreen(true);
        })
        .catch(function(error) {
          alert('Can\'t turn on fullscreen');
          console.error(error);
        });
    }
  };

  const initData = async () => {
    let rst = await tableAllApi({ databaseBoardId: props.databaseBoardId } as TableVo);

    let nodes = rst.data.tableList.map((table: TableListVo) => {
      let type = 'table';
      if (table.shapeType === '2') {
        type = 'text';
      }
      return {
        id: table.tableId.toString(),
        data: {
          databaseBoardId: table.databaseBoardId,
          name: table.code,
          description: table.desc,
          remarks: table.remarks,
          columns: table.fieldList.map((column: TableFieldDetailVo) => {
            return {
              name: column.code,
              description: column.desc,
              type: column.type,
              key: column.flagKey === 1,
            };
          }),
          schemaColor: table.fillColor ?? '#91C4F2',
        },
        position: { x: table.x, y: table.y },
        type: type,
      };
    });
    setNodes(nodes);
    // setEdges(rst.data.edgeList);
  };

  const reloadNode = async (tableId: number) => {
    const { data: table } = await tableGetOneApi({ tableId: tableId });
    let type = 'table';
    if (table.shapeType === '2') {
      type = 'text';
    }
    const node = {
      id: table.tableId.toString(),
      data: {
        name: table.code,
        databaseBoardId: table.databaseBoardId,
        description: table.desc,
        remarks: table.remarks,
        columns: table.fieldList.map((column: TableFieldDetailVo) => {
          return {
            name: column.code,
            description: column.desc,
            type: column.type,
            key: column.flagKey === 1,
          };
        }),
        schemaColor: table.fillColor ?? '#91C4F2',
      },
      position: { x: table.x, y: table.y },
      type: type,
    };
    setNodes((nds) => {
      // 直接删除旧的节点，添加新的节点
      return nds.filter((item) => item.id !== tableId.toString()).concat(node);
    });

  };

  useEffect(() => {
    initData();
  }, []);
  useEffect(() => {
    setSelectNodeDic(nodes.map((node) => {
      return {
        label: node.data.name,
        value: node.id,
      }
    }))
  }, [nodes]);

  const updateNodeLocation = async (event: ReactMouseEvent, node: Node, nodes: Node[]) => {
    if (openDrawer) {
      return;
    }
    const tableList = nodes.map((node) => {
      return {
        x: node.position.x,
        y: node.position.y,
        tableId: node.id,
      };
    });
    let tablePositions = {
      databaseBoardId: props.databaseBoardId,
      tableList: tableList,
    };
    tableUpdateLocationApi(tablePositions);
  };

  // 拖拽功能 实现拖拽到画布上生成新的节点 start
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(async (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      // check if the dropped element is valid
      // console.log('type', type);
      if (typeof type === 'undefined' || !type) {
        return;
      }
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      let shapeType = '0';
      if (type === 'table') {
        shapeType = '0';
      } else if (type === 'text') {
        shapeType = '2';
      }

      const rst = await tableSaveNewApi({
        databaseBoardId: props.databaseBoardId,
        x: position.x.toString(),
        y: position.y.toString(), shapeType,
      } as TableVo);
      if (rst.code !== 1000) {
        return;
      }
      const table = rst.data;
      const newNode = {
        id: table.tableId.toString(),
        type,
        position,
        data: {
          name: table.code,
          databaseBoardId: table.databaseBoardId,
          description: table.desc,
          remarks: table.remarks,
          columns:
            table.fieldList.map((column: TableFieldDetailVo) => {
              return {
                name: column.code,
                description: column.desc,
                type: column.type,
                key: column.flagKey === 1,
              };
            })
          ,
          schemaColor: table.fillColor ?? '#91C4F2',
        },
      };
      setNodes((nds) => {
        return [...nds, newNode];
      });
    },
    [screenToFlowPosition],
  );
  // 拖拽功能 实现拖拽到画布上生成新的节点  end

  //  复制功能
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);
      const ctrlKeyForPlatform = isMac ? event.metaKey : event.ctrlKey;
      if (ctrlKeyForPlatform) {
        switch (event.key) {
          case 's':
            event.preventDefault(); // 阻止默认行为，比如浏览器本身的保存页面功能
            // console.log('Detected Ctrl+S or ⌘+S');
            // 在这里处理保存逻辑
            // updateNodeLocation();
            break;
          default:
          // 其他按键组合
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // console.log("关闭-keydown")
    };
  }, [nodes]); // 空依赖数组意味着仅在挂载时执行一次
  // 实现搜索功能  并直接定位到该节点
  const [searchName, setSearchName] = useState<string>('');
  const [searchRstName, setSearchRstName] = useState<string>('');
  const [searchIndex, setSearchIndex] = useState<number>(0);
  const [searchNodeList, setSearchNodeList] = useState<[]>([]);
  // 包含 searchName 的节点 有多个  就定位到第一个 然后按钮点击下个 就等位到下一个  就实现定位到该节点 并设置此节点为选中状态
  const searchNode = () => {
    setSearchIndex(0);
    setSearchNodeList([]);
    setSearchRstName('');

    let nodes1 = nodes?.filter(item => item?.data?.name?.includes(searchName));
    setSearchNodeList(nodes1);
    if (nodes1?.length > 0) {
      flowInstance.setCenter(nodes1[0].position.x, nodes1[0].position.y);
      setSearchRstName(nodes1[0].data.name);
    }
  };
  // 搜索下一个
  const searchNext = () => {
    if (searchNodeList.length === 0) return;
    let nextIndex;
    if (searchIndex >= searchNodeList.length - 1) {
      nextIndex = 0;
    } else {
      nextIndex = searchIndex + 1;
    }
    setSearchIndex(nextIndex);
    setSearchNodeList(searchNodeList => {
      setSearchIndex(index => {
        flowInstance.setCenter(searchNodeList[index].position.x, searchNodeList[index].position.y);
        setSearchRstName(searchNodeList[index].data.name);
        return index;
      });
      return searchNodeList;
    });

  };
  // 搜索上一个
  const searchLast = () => {
    if (searchNodeList.length === 0) return;
    let nextIndex;
    if (searchIndex <= 0) {
      nextIndex = searchNodeList.length - 1;
    } else {
      nextIndex = searchIndex - 1;
    }
    setSearchIndex(nextIndex);
    setSearchNodeList(searchNodeList => {
      setSearchIndex(index => {
        console.log(index, searchNodeList);
        flowInstance.setCenter(searchNodeList[index].position.x, searchNodeList[index].position.y);
        setSearchRstName(searchNodeList[index].data.name);
        return index;
      });
      return searchNodeList;
    });
  };

  const deleteNode = (tableId: number) => {
    setNodes((currentNodes) => currentNodes.filter((node) => node.id != tableId));
  };
  const onConnect = useCallback((params) => {
      console.log('onConnect', params);
      setEdges((eds) => addEdge(params, eds));
      tableAddLineApi({ ...params, databaseBoardId: props.databaseBoardId });
    },
    []);
  const onElementsRemove = async (params: { nodes: Node[]; edges: Edge[]; }) => {
    console.log('elementsToRemove', params);
    // setNodes((nds) => nds.filter((node) => !params.nodes.find((n) => n.id === node.id)));
    setEdges((eds) => eds.filter((edge) => !params.edges.find((e) => e.id === edge.id)));
    if (params.edges.length > 0) {
      params.edges.forEach((item) => {
        tableDelLineApi({ ...item, databaseBoardId: props.databaseBoardId });
      });
    }
    return false;
  };
  const onNodesChange = useCallback((changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [],
  );
  const onEdgesChange = useCallback((changes) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [],
  );


  return (
    <MyDataBaseContext.Provider value={{ reloadTableData: reloadNode, setOpenDrawer, deleteTable: deleteNode }}>
      <div className="Flow" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeDragStop={updateNodeLocation}
          onSelectionChange={setSelect}
          deleteKeyCode={['Backspace', 'Delete']}
          // onDelete={onElementsRemove}
          onBeforeDelete={onElementsRemove}
          defaultEdgeOptions={{
            animated: true,
          }}
          fitView
          snapGrid={[16, 16]}
          nodeTypes={nodeTypes}
          minZoom={0.01}
          maxZoom={1.5}
          preventScrolling={true}
          zoomOnScroll={true}
          zoomOnPinch={true}
          zoomOnDoubleClick={false}
          onDrop={onDrop}
          onDragOver={onDragOver}
          // onPointerUp={() => {
          //   updateNodeLocation();
          // }}

        >
          <Controls showInteractive={false}>
            <ControlButton onClick={toggleFullScreen}>
              {!fullscreenOn && <MaximizeIcon />}
              {fullscreenOn && <MinimizeIcon />}
            </ControlButton>
          </Controls>
          <Background color="#aaa" gap={16} />
          <MiniMap pannable
                   nodeColor={'#151414'}
          />
          <Panel position="top-left">
            <Button type={'link'}
                    onClick={() => {
                      setDefaultFieldModalFn(OperateEnum.add);
                    }}>
              设置默认字段
            </Button>
            <Button type={'link'}
                    onClick={() => {
                      setDdlFromDatabaseFn(OperateEnum.add);
                    }}>
              从数据库同步
            </Button>
            <Button type={'link'}
                    onClick={() => {
                      setCompareFromDatabaseFn(OperateEnum.add);
                    }}>
              与数据库对比
            </Button>
            <Button type={'link'}
                    onClick={() => {
                      if (select?.nodes?.length === 0) {
                        message.error('请批量选中节点');
                        return;
                      }
                      setColorFn(OperateEnum.add);
                    }}>
              批量改颜色
            </Button>
            <Select
              // options={nodes}
              options={selectNodeDic}
              placeholder="批量选择表"
              mode={'multiple'}
              style={{ width: 300 }}
              optionFilterProp={'label'}
              allowClear={true}
              showSearch={true}
              autoClearSearchValue={false}
              onChange={(value) => {
                flowInstance.setNodes((currentNodes) =>
                  currentNodes.map((node) => {
                    if (value.includes(node.id)) {
                      return {
                        ...node,
                        selected: true,
                      };
                    }
                    return {
                      ...node,
                    };
                  }),
                );
              }}
            >
            </Select>

          </Panel>
          <Panel position="top-left">
            <div style={{ marginTop: '50px' }}>
              <Button type={'link'}
                      style={{ display: 'block' }}
                      onClick={() => {
                      }}
                      onDragStart={(event) => onDragStart(event, 'table')}
                      draggable
                      icon={<TableOutlined />}
              ></Button>
              <Button type={'link'}
                      style={{ display: 'block', marginTop: '10px' }}
                      onClick={() => {
                      }}
                      onDragStart={(event) => onDragStart(event, 'text')}
                      draggable
                      icon={<img src="/icons/text.svg" alt="icon" style={{ width: 16, height: 16 }} />}
              ></Button>
            </div>


          </Panel>

          <Panel position="top-right">
            <span>{searchRstName}</span>
            <Input style={{ width: 100, backgroundColor: 'rgba(255, 255, 255, 0.5)', marginLeft: 15 }}
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                     setSearchName(e.target.value);
                   }}
                   onPressEnter={searchNode}
                   allowClear
            >
            </Input>
            <Button shape="circle" icon={<DownOutlined />} onClick={searchLast} />
            <Button shape="circle" icon={<UpOutlined />} onClick={searchNext} />
            <Button shape="circle" icon={<SearchOutlined />} onClick={searchNode} />
          </Panel>
        </ReactFlow>
      </div>
      <Drawer
        title={'新表默认字段'}
        key={'14'}
        open={defaultFieldModal !== OperateEnum.close}
        width={'80%'}
        destroyOnClose={true}
        maskClosable={false}
        footer={null}
        onClose={() => setDefaultFieldModalFn(OperateEnum.close)}
      >
        <div>
          <DefaultTableField
            databaseBoardId={props.databaseBoardId}
            setDefaultFieldModalFn={setDefaultFieldModalFn}
          />
        </div>
      </Drawer>
      <Drawer
        title={'从数据库同步'}
        key={'15'}
        open={ddlFromDatabaseModal !== OperateEnum.close}
        width={'50%'}
        destroyOnClose={true}
        maskClosable={false}
        footer={null}
        onClose={() => setDdlFromDatabaseFn(OperateEnum.close)}
      >
        <div>
          <DdlFromDatabase
            databaseBoardId={props.databaseBoardId}
            setAddOrUpdateModalFn={() => {
              setDdlFromDatabaseFn(OperateEnum.close);
              initData();
            }}
          />

        </div>
      </Drawer>
      <Drawer
        title={'跟数据对比数据'}
        key={'16'}
        open={compareFromDatabaseModal !== OperateEnum.close}
        width={'80%'}
        destroyOnClose={true}
        maskClosable={false}
        footer={null}
        onClose={() => setCompareFromDatabaseFn(OperateEnum.close)}
      >
        <div>
          <CompareFromDatabase
            databaseBoardId={props.databaseBoardId}
            setAddOrUpdateModalFn={() => {
              setCompareFromDatabaseFn(OperateEnum.close);
              initData();
            }}
          />

        </div>
      </Drawer>
      <Drawer
        title={'批量改颜色'}
        key={'16color'}
        open={colorModal !== OperateEnum.close}
        width={'80%'}
        destroyOnClose={true}
        maskClosable={false}
        footer={null}
        onClose={() => setColorFn(OperateEnum.close)}
      >
        <div>
          <BatchUpdateColor
            nodes={select?.nodes}
            databaseBoardId={props.databaseBoardId}
            closeComboTagModal={() => {
              setColorFn(OperateEnum.close);
              initData();
            }}
          />

        </div>
      </Drawer>


    </MyDataBaseContext.Provider>
  );
};

// https://codesandbox.io/s/elastic-elion-dbqwty?file=/src/App.js
// eslint-disable-next-line import/no-anonymous-default-export
const Visualizer: React.FC<VisualizerProps> = (props: VisualizerProps) => {
  return (
    <div style={{ width: '95vw', height: '91vh' }}>
      <ReactFlowProvider>
        <Flow
          databaseBoardId={props.databaseBoardId}
          MysqlTypeMap={props.MysqlTypeMap}
          closeBoardModalFn={props.closeBoardModalFn}
        />
      </ReactFlowProvider>
    </div>
  );
};


export default Visualizer;
