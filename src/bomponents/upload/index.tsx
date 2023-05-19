import React, { FC, useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import useModel from 'flooks';
import useToken from '@/hooks/useToken';
import canvasModel from '@/models1/canvasModel';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import { API_URL } from '@/utils/apiurl';
import { getCurrentUser, removeCurrentUser } from '@/utils/user';

export interface IUploadProps {
  onUploadSuccess?: (data?:any) => void;
  type?: string;
}

const MyUpload: FC<IUploadProps> = props => {
  const { onUploadSuccess, type } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const { canvasRef } = useModel(canvasModel);

  let user = getCurrentUser();
  const handleBeforeUpload = (file: any, options_: any) => {
    if (file.size > 5242880) {
      message.error('上传图片不能超过5M');
      return false;
    }
  };

  const uploadProps = {
    name: 'file',
    action: `${API_URL}/storage/file/upload`,
    showUploadList: false,
    headers: {
      Authorization: localStorage.getItem('token')? localStorage.getItem('token') : '',
    },
    accept: '.jpg, .jpeg, .png',
    maxCount: 1,
    beforeUpload: handleBeforeUpload,
    onChange({ file }: any) {
      setLoading(true);
      if (file.status !== 'uploading') {
      }
      if (file.status === 'done') {
        if (file.response.code == 0) {
          setLoading(false);
          onUploadSuccess?.(file.response.data);
          if (file) {
            if (type == 'bg') {
              canvasRef?.addLocalBgImage(`https://gateway.irked.cn/bus/oss/${file.response.data}`);
            } else {
              canvasRef?.addLocalImage(`https://gateway.irked.cn/bus/oss/${file.response.data}`);
            }
          }
        } else {
          setLoading(false);
          message.error('图片上传失败');
        }
      } else if (file.status === 'error') {
        setLoading(false);
        message.error(`${file.name} 文件上传失败.`);
      }
    },
  };
  return (
    <Upload {...uploadProps}>
      <Button
        style={{ width: '110px', borderRadius: '5px'}}
        loading={loading}
        icon={<UploadOutlined />}
      >
        上传图片
      </Button>
    </Upload>
  );
};

export default MyUpload;
