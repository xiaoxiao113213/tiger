import { useEffect, useState } from 'react';
import './style.css';
import '@univerjs/design/lib/index.css';
import '@univerjs/ui/lib/index.css';
import '@univerjs/sheets-ui/lib/index.css';
import '@univerjs/sheets-formula/lib/index.css';
import '@univerjs/docs-ui/lib/index.css';


import DesignZhCN from '@univerjs/design/locale/zh-CN';
import UIZhCN from '@univerjs/ui/locale/zh-CN';
import DocsUIZhCN from '@univerjs/docs-ui/locale/zh-CN';
import SheetsZhCN from '@univerjs/sheets/locale/zh-CN';
import SheetsUIZhCN from '@univerjs/sheets-ui/locale/zh-CN';
import SheetsFormulaZhCN from '@univerjs/sheets-formula/locale/zh-CN';

import { LocaleType, Tools, UnitModel, Univer, UniverInstanceType } from '@univerjs/core';
import { defaultTheme } from '@univerjs/design';
import { UniverDocsPlugin } from '@univerjs/docs';
import { UniverDocsUIPlugin } from '@univerjs/docs-ui';
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula';
import { UniverRenderEnginePlugin } from '@univerjs/engine-render';
import { UniverSheetsPlugin } from '@univerjs/sheets';
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula';
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui';
import { UniverUIPlugin } from '@univerjs/ui';
import { FUniver } from '@univerjs/facade';

import { IDisposable } from '@wendellhu/redi';
import { getDocTreeContentApi, updateDocTreeContentApi } from '@/pages/doc/doc/api/docTreeApi.tsx';
import { checkApiRst } from '@/utils/utils.ts';

const ExcelContent = (props: { docTreeId: number }) => {
  const [univer, setUniver] = useState<Univer | undefined>(undefined);
  const [univerAPI, setUniverAPI] = useState<FUniver | undefined>(undefined);
  const [workbook, setWorkbook] = useState<UnitModel | undefined>(undefined);
  const [disposable, setDisposable] = useState<IDisposable | undefined>(undefined);

  const initUniver = async () => {
    const rst = await getDocTreeContentApi({ docTreeId: props.docTreeId });
    if (checkApiRst(rst)) return;
    const data = JSON.parse(rst.data.content);

    const univer = new Univer({
      theme: {
        ...defaultTheme,
        // ...customTheme,
      },
      locale: LocaleType.ZH_CN,
      locales: {
        [LocaleType.ZH_CN]: Tools.deepMerge(
          SheetsZhCN,
          DocsUIZhCN,
          SheetsUIZhCN,
          SheetsFormulaZhCN,
          UIZhCN,
          DesignZhCN,
        ),
      },
      //
    });
    setUniver(univer);
    univer.registerPlugin(UniverRenderEnginePlugin);
    univer.registerPlugin(UniverFormulaEnginePlugin);

    univer.registerPlugin(UniverUIPlugin, {
      container: 'app',
      header: true,
      footer: true,
      contextMenu: true,
    });

    univer.registerPlugin(UniverDocsPlugin, {
      hasScroll: false,
    });
    univer.registerPlugin(UniverDocsUIPlugin);

    univer.registerPlugin(UniverSheetsPlugin);
    univer.registerPlugin(UniverSheetsUIPlugin);
    univer.registerPlugin(UniverSheetsFormulaPlugin);
// create univer sheet instance
    const workbook = univer.createUnit(UniverInstanceType.UNIVER_SHEET, data);
    setWorkbook(workbook);
    const univerAPI = FUniver.newAPI(univer);
    setUniverAPI(univerAPI);
    const disposable = univerAPI.onCommandExecuted((command) => {

      const { id, type, params } = command;
      if (id == 'sheet.operation.set-selections'
        || id == 'sheet.operation.set-active-sheet'
        || id == 'sheet.operation.set-active-cell'
        || id == 'sheet.operation.set-activate-cell-edit'
        || id == 'doc.operation.set-selections'
        || id == 'formula.mutation.set-formula-data'
        || id == 'sheet.command.set-scroll-relative'
        || id == 'sheet.operation.set-scroll'
        || id == 'formula-ui.operation.help-function'
        || id == 'formula-ui.operation.search-function'
        || id == 'formula.mutation.set-formula-calculation-notification'
        || id == 'sheet.operation.set-cell-edit-visible'
      ) {

      } else {
        console.log('command executed', command);
        let snapshot = univerAPI.getActiveWorkbook()?.getSnapshot();
        saveToStorage(snapshot, props.docTreeId);
      }


    });
    setDisposable(disposable);
  };


  async function saveToStorage(data, docTreeId: number) {
    updateDocTreeContentApi({ docTreeId: docTreeId, content: JSON.stringify(data) }).then(rst => {
    });
  }


  useEffect(() => {
    // 在组件挂载或更新后执行操作
    initUniver();
    const docTreeId = props.docTreeId;

    return () => {
      // 在组件卸载前执行清理操作
      // let snapshot = univerAPI.getActiveWorkbook()?.getSnapshot();
      console.log('Component will unmount', docTreeId);
      // saveToStorage(snapshot, docTreeId);
      univer?.dispose();
      workbook?.dispose();
      disposable?.dispose();
    };
  }, [props.docTreeId]); // 第二个参数表示依赖项
  return (
    <div id="app" style={{ overflow: 'auto', height: '90vh' }}></div>)
    ;
};

export default ExcelContent;