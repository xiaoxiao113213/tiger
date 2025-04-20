import { Block, BlockNoteEditor, BlockNoteSchema, defaultBlockSpecs, defaultInlineContentSpecs, filterSuggestionItems, PartialBlock } from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useEffect, useMemo, useState } from 'react';
import { DefaultReactSuggestionItem, getDefaultReactSlashMenuItems, SuggestionMenuController } from '@blocknote/react';
import { fileItem } from './menus/FileMenu.tsx';
import { MyImage } from './schemas/MyImage.tsx';
import { MyVideo } from './schemas/MyVideo.tsx';
import { MyAudio } from './schemas/MyAudio.tsx';
import { MyFile } from './schemas/MyFile.tsx';
import { Mention } from './schemas/Mention.tsx';
import { DocTreeTypeEnum } from '@/pages/doc/doc/index.tsx';
import { getDocTreeContentApi, updateDocTreeContentApi } from '@/pages/doc/doc/api/docTreeApi.tsx';
import { checkApiRst } from '@/utils/utils.ts';
import { uploadFileApi } from '@/pages/system/account/accountApi.tsx';
import { bizTypeEnum } from '@/pages/system/account/ApiBo.ts';

async function saveToStorage(jsonBlocks: Block[], docTreeId: number) {
  updateDocTreeContentApi({ docTreeId: docTreeId, content: JSON.stringify(jsonBlocks) }).then(rst => {
  });
}

const schema = BlockNoteSchema.create({
  blockSpecs: {
    // Adds all default blocks.
    ...defaultBlockSpecs,
    myImage: MyImage,
    myVideo: MyVideo,
    myAudio: MyAudio,
    myFile: MyFile,
  },
  inlineContentSpecs: {
    // Adds all default inline content.
    ...defaultInlineContentSpecs,
    // Adds the mention tag.
    mention: Mention,
  },
});


// List containing all default Slash Menu Items, as well as our custom one.
const getCustomSlashMenuItems = (
  editor: BlockNoteEditor,
  props: { docTreeId: number },
): DefaultReactSuggestionItem[] => {
  const a = getDefaultReactSlashMenuItems(editor);
  // 去掉 视频 音频 文件 图片
  // console.log("a = ", a)
  return [
    ...a.filter(item => item.key !== 'video' && item.key !== 'audio' && item.key !== 'file' && item.key !== 'image'),
    // insertHelloWorldItem(editor),
    fileItem(editor, props),
  ];
};
const getCustomAtMenuItems = (
  editor: BlockNoteEditor,
  props: { docTreeId: number },
): DefaultReactSuggestionItem[] => {
  const users = ['Steve', 'Bob', 'Joe', 'Mike'];

  return users.map((user) => ({
    title: user,
    onItemClick: () => {
      editor.insertInlineContent([
        {
          type: 'mention',
          props: {
            user,
          },
        },
        ' ', // add a space after the mention
      ]);
    },
  }));
};

export default function EditContent(props: { docTreeId: number, docTreeType: DocTreeTypeEnum }) {
  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | 'loading'
  >('loading');
  // Loads the previously stored editor contents.
  useEffect(() => {
    // debugger
    if (props.docTreeId) {
      getDocTreeContentApi({ docTreeId: props.docTreeId }).then(rst => {
        if (checkApiRst(rst)) return;
        // message.success(rst.msg)
        setInitialContent((JSON.parse(rst.data.content) as PartialBlock[]));
      });
    }

  }, [props.docTreeId]);

  // can delay the creation of the editor until the initial content is loaded.
  const editor = useMemo(() => {
    if (props.docTreeType == DocTreeTypeEnum.excel) return undefined;
    if (initialContent === 'loading') {
      return undefined;
    }
    // console.log("initialContent = ", initialContent)
    return BlockNoteEditor.create({ schema, initialContent });
  }, [initialContent]);


  const handlePaste = async (event: ClipboardEvent, editor) => {
    const items = event.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (file) {
            event.preventDefault();
            const formData = new FormData();
            formData.append('file', file);
            console.log('file = ', file);
            const response = await uploadFileApi(formData, bizTypeEnum.DocContent, props.docTreeId);
            if (response && response.data.fullPath) {
              const fileKey = response.data.fileKey;
              const currentPosition = editor.getTextCursorPosition();
              if (currentPosition) {
                const blockId = currentPosition.block.id;
                const mimeType = response.data.mimeType;
                // 根据媒体类型 判断是 图片还是视频 还是音频 或者就是文件 然后插入对应的block
                if (mimeType.includes('image')) {
                  editor.insertBlocks(
                    [{
                      type: 'myImage',
                      props: {
                        fileKey: fileKey,
                        docTreeId: props.docTreeId,
                        fileName: file.name,
                      },
                    }],
                    blockId,
                    'after',
                  );
                } else if (mimeType.includes('video')) {
                  editor.insertBlocks(
                    [{
                      type: 'myVideo',
                      props: {
                        fileKey: fileKey,
                        docTreeId: props.docTreeId,
                        fileName: file.name,
                      },
                    }],
                    blockId,
                    'after',
                  );
                } else if (mimeType.includes('audio')) {
                  editor.insertBlocks(
                    [{
                      type: 'myAudio',
                      props: {
                        fileKey: fileKey,
                        docTreeId: props.docTreeId,
                        fileName: file.name,
                      },
                    }],
                    blockId,
                    'after',
                  );
                } else {
                  editor.insertBlocks(
                    [{
                      type: 'myFile',
                      props: {
                        fileKey: fileKey,
                        docTreeId: props.docTreeId,
                        fileName: file.name,
                      },
                    }],
                    blockId,
                    'after',
                  );
                }

              }
            }
          }
        }
      }
    }
  };
  useEffect(() => {
    const handlePasteEvent = (event: ClipboardEvent) => handlePaste(event, editor);
    document.addEventListener('paste', handlePasteEvent);
    return () => {
      document.removeEventListener('paste', handlePasteEvent);
    };
  }, [editor]);
  if (editor === undefined) {
    return '';
  }


  return (
    <BlockNoteView
      editor={editor}
      theme={'light'}
      onChange={() => {
        saveToStorage(editor.document, props.docTreeId!);
      }}
      onSelectionChange={() => {
      }}
      slashMenu={false}
    >
      <SuggestionMenuController
        triggerCharacter={'/'}
        // Replaces the default Slash Menu items with our custom ones.
        getItems={async (query) =>
          filterSuggestionItems(getCustomSlashMenuItems(editor, props), query)
        }
      />
      <SuggestionMenuController
        triggerCharacter={'@'}
        // Replaces the default Slash Menu items with our custom ones.
        getItems={async (query) =>
          filterSuggestionItems(getCustomAtMenuItems(editor, props), query)
        }
      />
    </BlockNoteView>


  );
}
