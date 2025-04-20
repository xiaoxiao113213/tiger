import { Typography, Upload } from 'antd';
import { UploadProps } from 'antd/es/upload';
import { useEffect, useState } from 'react';

import { fBytes } from '@/utils/format-number';

import { Iconify } from '../icon';

import { StyledUploadAvatar } from './styles';
import { beforeAvatarUpload } from './utils';
import { getUserToken } from '@/store/userStore.ts';

interface Props extends UploadProps {
  defaultAvatar?: string;
  helperText?: React.ReactElement | string;
  setNewKeyFn: (key: string) => void;
}

export function UploadAvatar({ helperText, defaultAvatar = '', setNewKeyFn, ...other }: Props) {
  const [imageUrl, setImageUrl] = useState<string>(defaultAvatar);

  const [isHover, setIsHover] = useState(false);
  const handelHover = (hover: boolean) => {
    setIsHover(hover);
  };

  const handleChange: UploadProps['onChange'] = ({ file, fileList }) => {
    if (file.status === 'uploading') {
      return;
    }
    if (file?.response?.data?.fileKey) {
      let newUrl = file?.response?.data?.fullPath;
      setImageUrl(newUrl);
      setNewKeyFn(file?.response?.data?.fileKey);
    }

  };

  const renderPreview = <img src={imageUrl} alt="" className="absolute rounded-full" />;

  useEffect(() => {
    console.log('imageUrl', imageUrl);
    setImageUrl(defaultAvatar);
  }, [defaultAvatar]);

  const renderPlaceholder = (
    <div
      style={{
        backgroundColor: !imageUrl || isHover ? 'rgba(22, 28, 36, 0.64)' : 'transparent',
        color: '#fff',
      }}
      className="absolute z-10 flex h-full w-full flex-col items-center justify-center"
    >
      <Iconify icon="solar:camera-add-bold" size={32} />
      <div className="mt-1 text-xs">Upload Photo</div>
    </div>
  );

  const renderContent = (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full"
      onMouseEnter={() => handelHover(true)}
      onMouseLeave={() => handelHover(false)}
    >
      {imageUrl ? renderPreview : null}
      {!imageUrl || isHover ? renderPlaceholder : null}
    </div>
  );

  const defaultHelperText = (
    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
      Allowed *.jpeg, *.jpg, *.png, *.gif
      <br /> max size of {fBytes(3145728)}
    </Typography.Text>
  );
  const renderHelpText = <div className="text-center">{helperText || defaultHelperText}</div>;

  return (
    <StyledUploadAvatar>
      <Upload
        name="file"
        showUploadList={false}
        listType="picture-circle"
        className="avatar-uploader !flex items-center justify-center"
        {...other}
        beforeUpload={beforeAvatarUpload}
        onChange={handleChange}
        action={import.meta.env.VITE_APP_BASE_API + '/devops-server/b/fileStore/upload/0/0'}
        headers={{ 'Authorization': getUserToken()?.accessToken ?? '' }}
      >
        {renderContent}
      </Upload>
      {renderHelpText}
    </StyledUploadAvatar>
  );
}
