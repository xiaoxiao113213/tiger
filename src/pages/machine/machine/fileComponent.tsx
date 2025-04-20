import React, { useEffect, useState } from 'react';
import { FileInfoVo, MachineDetailVo } from '@/pages/machine/machine/ApiBo.ts';
import { getFileList, machineGetOneApi } from '@/pages/machine/machine/api.tsx';
import { Button, Drawer, Input, message, Modal, Spin, Table, TableProps } from 'antd';
import { Helmet } from 'react-helmet-async';
import { FileTwoTone } from '@ant-design/icons';
import { machineTaskSaveApi } from '@/pages/machine/machine/machineTaskApi.tsx';
import { checkApiRst, getUrlParams } from '@/utils/utils.ts';
import { OperateEnum } from '@/utils/enum.ts';
import MachineTaskList from '@/pages/machine/machine/machineTaskList.tsx';
import MachineFileUpload from '@/pages/machine/machine/machineFileUpload.tsx';
import MachineDirUpload from '@/pages/machine/machine/machineDirUpload.tsx';


const FileComponent = () => {

  const [machineId, setMachineId] = useState<number>();
  const [machine, setMachine] = useState<MachineDetailVo>();
  const [dataSource, setDataSource] = useState<FileInfoVo[]>();
  const [parentPath, setParentPath] = useState<string>('');
  const [spinning, setSpinning] = useState(false);
  const [taskOpen, setTaskOpen] = useState(OperateEnum.close);
  const [uploadOpen, setUploadOpen] = useState(OperateEnum.close);
  const [uploadDirOpen, setUploadDirOpen] = useState(OperateEnum.close);

  const getDataSource = (machineId: number, dir: string) => {
    setSpinning(true);
    if (dir.startsWith('//')) {
      dir = dir.substring(1);
    }
    getFileList({ machineId, dir }).then(rst => {
      rst.data.forEach((item) => {
        let permissions = item.permissions;
        if (permissions.startsWith('d')) {
          item.type = '文件夹';
          item.size = -1;
        } else if (permissions.startsWith('l')) {
          item.type = '链接';
          item.size = -1;
        } else {
          item.type = '文件';
        }
      });
      setDataSource(rst.data.filter(item => item.fileName !== '.'));
      if (rst.data.length > 0) {
        setParentPath(rst.data[0].parentPath);
      }
      setSpinning(false);
    });

  };

  useEffect(() => {
    const queryParams = getUrlParams();
    const machineId = parseInt(queryParams.get('machineId'))!!;
    if (!machineId) {
    } else {
      setMachineId(machineId);
    }
    return () => {

    };
  }, []);
  useEffect(() => {
    if (machineId) {
      // 获取机器详情
      machineGetOneApi({ machineId }).then(rst => {
        setMachine(rst.data);
        getDataSource(rst.data.machineId, rst.data.initDir);
      });
    }
  }, [machineId]);


  const downloadFileFn = async (item: FileInfoVo) => {
    Modal?.confirm({
      title: '是否确认下载',
      content: item.parentPath + '/' + item.fileName,
      icon: null,
      onOk: async () => {

        let rst = await machineTaskSaveApi({
          machineId: machineId,
          remotePath: item.parentPath + '/' + item.fileName,
          isFile: item.type === '文件',
        });
        if (checkApiRst(rst)) return;
        message.success('下载任务添加成功,请到任务列表查看');

      },
    });
  };


  const columns: TableProps<FileInfoVo>['columns'] = [
    {
      title: '名称',
      dataIndex: 'fileName',
      key: 'fileName',
      render: (text, { type, fileName, parentPath }) => {
        if (type === '文件夹') {
          return <a
            type={'link'}
            onClick={() => {
              getDataSource(machineId!!, parentPath + '/' + fileName);
            }
            }
          ><img src="/icons/Files.svg" alt="icon" style={{ width: 16, height: 16, display: 'inline', marginRight: '5px' }} />{fileName}</a>;
        } else if (type === '链接') {
          return <a
            type={'link'}
            onClick={() => {
              getDataSource(machineId!!, parentPath + '/' + fileName);
            }
            }
          ><img src="/icons/2_链接.svg" alt="icon" style={{ width: 16, height: 16, display: 'inline', marginRight: '5px' }} />{fileName}</a>;
        } else {
          return <div><FileTwoTone style={{ marginRight: '5px' }} />{fileName}</div>;
        }
      },
    },
    {
      title: '大小',
      dataIndex: 'size',
      key: 'size',
      sorter: {
        compare: (a, b) => a.size - b.size,
      },
      render: (text, { type, size: size1 }) => {
        let size = size1;
        if (type === '文件夹') {
          return '-';
        } else if (type === '链接') {
          return '-';
        } else {
          // 按照大小格式化显示 对应的单位
          let unit = 'B';
          if (size > 1024) {
            size = size / 1024;
            unit = 'KB';
          }
          if (size > 1024) {
            size = size / 1024;
            unit = 'MB';
          }
          if (size > 1024) {
            size = size / 1024;
            unit = 'GB';
          }
          if (size > 1024) {
            size = size / 1024;
            unit = 'TB';
          }
          return size.toFixed(2) + unit;
        }
      },
    },
    {
      title: '权限',
      dataIndex: 'permissions',
      key: 'permissions',
    }, {
      title: '所属用户',
      dataIndex: 'owner',
      key: 'owner',
    }, {
      title: '所属组',
      dataIndex: 'group',
      key: 'group',
    }, {
      title: '修改时间',
      dataIndex: 'date',
      key: 'date',
      render: (text, record) => {
        return record.date + ' ' + record.time;
      },
    }, {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    }, {
      title: '操作',
      dataIndex: 'fileName',
      key: 'action',
      render: (text, item) => {
        if (item.fileName === '..') {
          return <></>;
        }

        if (item.type === '链接') {
          return <></>;
        } else {
          return <a
            type={'link'}
            onClick={() => {
              downloadFileFn(item);
            }}
          >下载</a>;
        }
      },
    },

  ];


  return (
    <div>
      <Helmet>
        <title>{machine?.host + '(文件管理)'}</title>
        <meta name="description" content="这个是机器管理页面" />
      </Helmet>
      <Spin tip="Loading..." spinning={spinning}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Input style={{ marginTop: '5px', marginBottom: '5px', display: 'inline', width: 'calc(100% - 330px)' }}
                 value={parentPath}
                 onChange={(e) => {
                   setParentPath(e.target.value);
                 }}
                 onPressEnter={(e) => {
                   getDataSource(machineId!!, e.target.value);
                 }}
          ></Input>
          <span>
            <a
              type={'link'}
              onClick={() => {
                getDataSource(machineId!!, parentPath);
              }
              }
            ><img src="/icons/刷新.svg" alt="icon" style={{ width: 16, height: 16, display: 'inline', marginRight: '5px' }} /></a>
            <Button type={'link'}
                    onClick={() => {
                      setUploadOpen(OperateEnum.add);
                    }}
            >文件上传</Button>
            <Button type={'link'}
                    onClick={() => {
                      setUploadDirOpen(OperateEnum.add);
                    }}
            >文件夹上传</Button>
            <Button type={'link'}
                    onClick={() => {
                      setTaskOpen(OperateEnum.add);
                    }}
            >任务列表</Button>
          </span>
        </div>
        <Table dataSource={dataSource} columns={columns} rowKey={'fileName'} size={'small'} pagination={false} />
      </Spin>

      <Drawer key={'taskList'} title={'任务列表'} open={taskOpen !== OperateEnum.close} onClose={() => setTaskOpen(OperateEnum.close)}
              width={'80%'}
              destroyOnClose={true}
      >
        <MachineTaskList
          machineId={machineId!!}
        ></MachineTaskList>
      </Drawer>
      <Drawer key={'uploadTask'} title={`上传文件(上传到的目录地址：${parentPath})`} open={uploadOpen !== OperateEnum.close}
              onClose={() => setUploadOpen(OperateEnum.close)}
              width={'80%'}
              keyboard={false}
              maskClosable={false}
              destroyOnClose={true}
      >
        <MachineFileUpload
          machineId={machineId!!}
          remotePath={parentPath}
        ></MachineFileUpload>
      </Drawer>
      <Drawer key={'uploadDirTask'} title={`上传文件夹(上传到的目录地址：${parentPath})`} open={uploadDirOpen !== OperateEnum.close}
              onClose={() => setUploadDirOpen(OperateEnum.close)}
              width={'80%'}
              keyboard={false}
              maskClosable={false}
              destroyOnClose={true}
      >
        <MachineDirUpload
          machineId={machineId!!}
          remotePath={parentPath}
        ></MachineDirUpload>
      </Drawer>


    </div>
  );
};

export default FileComponent;