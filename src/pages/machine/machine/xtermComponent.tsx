import React, { useEffect, useRef, useState } from 'react';
import '@xterm/xterm/css/xterm.css';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit/src/FitAddon.ts';
import { AttachAddon } from '@xterm/addon-attach/src/AttachAddon.ts';
import { ClipboardAddon } from '@xterm/addon-clipboard/src/ClipboardAddon.ts';
import { SearchAddon } from '@xterm/addon-search';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { WebglAddon } from '@xterm/addon-webgl';
import { Badge, Button, Input } from 'antd';
import './xtermComponent.css';
import { getUserToken } from '@/store/userStore.ts';
import { Helmet } from 'react-helmet-async';
import { MachineDetailVo } from '@/pages/machine/machine/ApiBo.ts';
import { machineGetOneApi } from '@/pages/machine/machine/api.tsx';
import { getUrlParams } from '@/utils/utils.ts';

const XtermComponent = () => {
  const terminalRef = useRef<HTMLElement>(null);
  const searchAddonRef = useRef<SearchAddon>(null);
  const wsRef = useRef<WebSocket>(null);
  const [connected, setConnected] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [terminal, setTerminal] = useState<Terminal>();
  const [size, setSize] = useState<{ cols: number, rows: number }>();
  const [machineId, setMachineId] = useState<number>();
  const [machine, setMachine] = useState<MachineDetailVo>();


  const getWsPrefix = () => {
    const baseApi = import.meta.env.VITE_APP_BASE_API;
    if (baseApi && baseApi.length > 0) {
      return import.meta.env.VITE_APP_BASE_API
        .replace('http://', 'ws://')
        .replace('https://', 'wss://');
    } else {
      return (window.location.protocol === 'https:' ? 'wss://' : 'ws://') + window.location.host;
    }
  };

  //   stty size # 查看当前终端大小
  // WebSocket 连接函数
  const connectWebSocket = (terminal: Terminal, machineId: number) => {
    const accessToken = getUserToken()?.accessToken;
    const url = getWsPrefix() + '/devops-server/ssh/' + machineId + '/' + accessToken;
    const ws = new WebSocket(url);
    wsRef.current = ws;
    const attachAddon = new AttachAddon(ws);
    terminal.loadAddon(attachAddon);
    ws.onopen = () => {
      setConnected(true);
    };
    ws.onclose = () => setConnected(false);
    ws.onerror = () => setConnected(false);

    terminal.onResize((size) => {
      console.log('重置窗口大小', size);
      setSize(size);
    });
  };

  useEffect(() => {
    const machineId = parseInt(getUrlParams().get('machineId'))!!;
    if (!machineId) {
      return () => {
        if (wsRef.current) wsRef.current.close();
      };
    } else {
      setMachineId(machineId);
    }
    // 初始化 Xterm 终端
    const terminal = new Terminal({
      cursorBlink: true,  // 光标闪烁
      // cursorStyle: 'underline',  // 光标闪烁样式
      // rendererType: "canvas",  // 渲染类型
      theme: { background: '#1d242b', selectionBackground: 'rgba(245, 108, 108, 0.5)' },  // 主题样式
      fontFamily: 'Consolas, Menlo, Monaco, "Courier New", monospace',
      scrollback: 10000,
    });
    setTerminal(terminal);
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);


    connectWebSocket(terminal, machineId); // 初始连接

    const clipboardAddon = new ClipboardAddon();
    terminal.loadAddon(clipboardAddon);

    const searchAddon = new SearchAddon();
    terminal.loadAddon(searchAddon);
    searchAddonRef.current = searchAddon;

    const webLinksAddon = new WebLinksAddon();
    terminal.loadAddon(webLinksAddon);

    const webglAddon = new WebglAddon();
    terminal.loadAddon(webglAddon);
    terminal.open(terminalRef.current);
    fitAddon.fit();


    // 清理 WebSocket 和终端
    return () => {
      terminal.dispose();
      if (wsRef.current) wsRef.current.close();
    };
  }, []);

  useEffect(() => {
    if (size && connected && wsRef.current) {
      console.log('发送窗口大小', size);
      wsRef.current.send('stty cols ' + size.cols + ' rows ' + size.rows + '\r');
    }
  }, [size, connected, wsRef]);


  useEffect(() => {
    if (machineId) {
      // 获取机器详情
      machineGetOneApi({ machineId }).then(rst => {
        setMachine(rst.data);
      });
    }
  }, [machineId]);


  // 处理搜索功能
  const handleSearch = () => {

    if (searchValue && searchAddonRef.current) {
      searchAddonRef.current.findNext(searchValue);
    }
  };

  // 处理断开连接
  const handleDisconnect = () => {
    console.log('断开连接');
    wsRef?.current?.close(1000, '主动断开连接');
  };

  // 处理重新连接
  const handleReconnect = () => {
    if (terminal && machineId) {
      connectWebSocket(terminal, machineId);
    }
  };

  useEffect(() => {
    if (!terminal) return;

    // 监听终端的选区变化事件
    const selectionChangeHandler = () => {
      const selectedText = terminal.getSelection(); // 获取当前选中的文本
      if (selectedText) {
        navigator.clipboard.writeText(selectedText)
          .then(() => {
            // console.log('选中文本已复制到剪贴板:', selectedText);
          })
          .catch((err) => {
            // console.error('复制到剪贴板失败:', err);
          });
      }
    };

    const disposable = terminal.onSelectionChange(selectionChangeHandler);

    // 清理事件监听
    return () => {
      disposable.dispose(); // 移除 onSelectionChange 的监听器
    };
  }, [terminal]);

  return (
    <>
      <Helmet>
        <title>{machine?.host}</title>
        <meta name="description" content="这个是机器管理页面" />
      </Helmet>
      <div style={{ position: 'relative', height: '100vh', background: '#F5F5F5FF' }}>
        {/* 工具栏 */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            background: '#F5F5F5FF',
            // color: '#fff',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 1000,
          }}
        >
          <div>
            <Input placeholder={'搜索'}
                   onChange={(e) => {
                     setSearchValue(e.target.value);
                   }}
                   allowClear
                   onPressEnter={handleSearch}
                   style={{ width: '200px', marginRight: '20px' }} />
            {/*<Tooltip title="鼠标左键选值，点击右键可实现快捷复制到剪切板， alt+ins 实现插入">*/}
            {/*  <QuestionCircleTwoTone />*/}
            {/*</Tooltip>*/}
          </div>
          <span>状态：{connected ? <span><Badge status={'success'} /> 已连接 </span> : <span><Badge status={'error'} /> 已断开 </span>}</span>
          <span>
          <Button onClick={() => {
            window.open(`/#/machine/file?machineId=${machineId}`);
          }}
                  type={'link'} style={{ marginRight: '10px' }}
          >上传文件</Button>
            {connected &&
              <Button onClick={handleDisconnect} type={'link'} style={{ marginRight: '10px' }}>
                🔌 断开连接
              </Button>
            }
            {
              !connected &&
              <Button onClick={handleReconnect} type={'link'} style={{ marginRight: '10px' }}>
                🔄 重连
              </Button>
            }
        </span>
        </div>

        {/* Xterm 终端 */}
        <div
          ref={terminalRef}
          style={{
            position: 'absolute',
            top: '50px', // 工具栏的高度
            left: 0,
            width: '100%',
            height: 'calc(100vh - 50px)',
            backgroundColor: '#1e1e1e',
          }}
        />
      </div>
    </>
  );
};

export default XtermComponent;
