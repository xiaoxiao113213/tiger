import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Resizable } from 're-resizable';
import { createReactBlockSpec } from '@blocknote/react';
import { defaultProps } from '@blocknote/core';
import { getUserToken } from '@/store/userStore.ts';

// 自定义 音频组件
const MyVideoComponent = (props) => {
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
  }, [props.block.props.fileKey]);

  const handleResizeStop = (e, direction, ref, d) => {
    props.editor.updateBlock(props.block, {
      type: 'myVideo',
      props: { width: ref.style.width, height: ref.style.height },
    });
  };

  return (
    <div className="video-container">
      <Resizable
        defaultSize={{
          width: props.block.props.width || 500,
          height: props.block.props.height || 500,
        }}
        onResizeStop={handleResizeStop}
      >
        <ReactPlayer
          url={blobUrl}
          width="100%"
          height="100%"
          controls={true}
          id={props.block.id}
          key={props.block.id}
          pip={false}
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload',
              },
            },
            soundcloud: {
              options: {
                show_artwork: false,
              },
            },
          }}
        />
      </Resizable>
    </div>
  );
};

// The Alert block.
export const MyVideo = createReactBlockSpec(
  {
    type: 'myVideo',
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
        default: 300,
      },
    },
    content: 'inline',
  },
  {
    render: (props) => {
      return <div ref={props.contentRef}>
        <MyVideoComponent {...props} />
      </div>;
    },
  },
);

// CSS to hide the more options button
// const style = document.createElement('style');
// style.innerHTML = `
//     .video-container video::-webkit-media-controls-panel {
//         display: none !important;
//         -webkit-appearance: none;
//     }
//     .video-container video::-webkit-media-controls-play-button {
//         display: block !important;
//         -webkit-appearance: inherit;
//     }
//     .video-container video::-webkit-media-controls-volume-slider {
//         display: block !important;
//         -webkit-appearance: inherit;
//     }
// `;
// document.head.appendChild(style);
