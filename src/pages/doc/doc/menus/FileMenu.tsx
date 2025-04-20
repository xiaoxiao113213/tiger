import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { uploadFileApi } from '@/pages/system/account/accountApi.tsx';
import { bizTypeEnum } from '@/pages/system/account/ApiBo.ts';

export const insertHelloWorldItem = (editor: BlockNoteEditor) => ({
  title: 'Insert Hello World',
  onItemClick: () => {
    // Block that the text cursor is currently in.
    const currentBlock = editor.getTextCursorPosition().block;
    // New block we want to insert.
    const helloWorldBlock: PartialBlock = {
      type: 'paragraph',
      content: [{ type: 'text', text: 'Hello World', styles: { bold: true } }],
    };
    // Inserting the new block after the current one.
    editor.insertBlocks([helloWorldBlock], currentBlock, 'after');
  },
  aliases: ['helloworld', 'hw'],
  group: 'Media',
  // icon: <HiOutlineGlobeAlt size={18}/>,
  // subtext: "Used to insert a block with 'Hello World' below.",
});
export const fileItem = (editor: BlockNoteEditor, props: { docTreeId: number }) => ({
  title: '文件',
  onItemClick: () => {
    // 弹出系统文件选择框 选择文件  然后调用上传接口  然后把返回的url插入到当前光标位置
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '*/*';
    input.click();
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
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
    };
  },
  // aliases: ["helloworld", "hw"],
  group: 'Media',
  // icon: <HiOutlineGlobeAlt size={18}/>,
  // subtext: "Used to insert a block with 'Hello World' below.",

});