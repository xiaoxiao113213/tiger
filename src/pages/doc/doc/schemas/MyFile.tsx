import { defaultProps } from '@blocknote/core';
import { createReactBlockSpec } from '@blocknote/react';
import React, { useEffect, useState } from 'react';

import { FileUnknownTwoTone } from '@ant-design/icons';
import { getUserToken } from '@/store/userStore.ts';

// Custom functional component for rendering the image
const MyFileComponent = (props) => {
  const [blobUrl, setBlobUrl] = useState<string>('');
  const token = getUserToken();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = `${import.meta.env.VITE_APP_BASE_API}/devops-server/public/biz/download/0/${props.block.props.fileKey}?token=${token?.fileToken}`;
        setBlobUrl(url);
      } catch (error) {
        console.error('Error fetching the image:', error);
      }
    };
    fetchImage();
  }, []);


  return (
    <div>
      <FileUnknownTwoTone style={{ marginRight: 10 }} />
      <a href={blobUrl}
         onClick={() => {
           window.open(blobUrl);
         }}
      >{props.block.props.fileName}</a>

      {/*<Tooltip trigger={'hover'}*/}
      {/*         placement={"bottom"}*/}
      {/*         title={<div>*/}
      {/*             <Button type={"link"} onClick={() => {*/}
      {/*             }}>文档</Button>*/}
      {/*             <Button type={"link"}>表格</Button>*/}
      {/*             <Button icon={<DisconnectOutlined />} type={"link"} onClick={() => {*/}
      {/*             }}></Button>*/}
      {/*         </div>*/}
      {/*         }*/}
      {/*>*/}
      {/*    <a href={blobUrl}*/}
      {/*       onClick={() => {*/}
      {/*           window.open(blobUrl);*/}
      {/*       }}*/}
      {/*    >{props.block.props.fileName}</a>*/}
      {/*</Tooltip>*/}
    </div>
  );
};

// The Alert block.
export const MyFile = createReactBlockSpec(
  {
    type: 'myFile',
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      fileKey: {
        default: '',
      },
      fileName: {
        default: '',
      },
      docTreeId: {
        default: 0,
      },
      // width: {
      //     default: 100
      // },
      // height: {
      //     default: 50
      // }
    },
    content: 'inline',
  },
  {
    render: (props) => {
      return <div ref={props.contentRef}>
        <MyFileComponent {...props} />
      </div>;
    },
  },
);
