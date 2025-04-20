import { defaultProps } from '@blocknote/core';
import { createReactBlockSpec } from '@blocknote/react';
import { Image } from 'antd';
import { Resizable } from 're-resizable';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getUserToken } from '@/store/userStore';


// Custom functional component for rendering the image
const MyImageComponent = (props) => {
  const [blobUrl, setBlobUrl] = useState<string>('');
  const token = getUserToken();

  useEffect(() => {
    const fetchImage = async () => {
      try {

        const response = await axios.get(import.meta.env.VITE_APP_BASE_API + '/devops-server/public/biz/download/0/' + props.block.props.fileKey + '?token=' + token?.fileToken, {
          responseType: 'blob', // Ensure the response type is Blob
        });
        const blob = new Blob([response.data], { type: response.data.type });
        setBlobUrl(URL.createObjectURL(blob));
      } catch (error) {
        console.error('Error fetching the image:', error);
      }
    };
    fetchImage();
  }, []);

  const handleResizeStop = (e, direction, ref, d) => {
    props.editor.updateBlock(props.block, {
      type: 'myImage',
      props: { width: ref.style.width, height: ref.style.height },
    });
  };

  return (
    <div>
      <Resizable
        defaultSize={{
          width: props.block.props.width || 500,
          height: props.block.props.height || 500,
        }}
        // onResizeStop={handleResizeStop}
        onResize={handleResizeStop}
      >
        <Image width={'100%'} height={'100%'} src={blobUrl}
        />
      </Resizable>
    </div>
  );
};

// The Alert block.
export const MyImage = createReactBlockSpec(
  {
    type: 'myImage',
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      fileKey: {
        default: '',
      },
      docTreeId: {
        default: 0,
      },
      fileName: {
        default: '',
      },
      width: {
        default: 500,
      },
      height: {
        default: 500,
      },
    },
    content: 'inline',
  },
  {
    render: (props) => {
      return <div ref={props.contentRef}>
        <MyImageComponent {...props} />
      </div>;
    },
  },
);
