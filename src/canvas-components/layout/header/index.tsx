import React, { FC } from 'react';
import { Button, message, Tooltip } from 'antd';
import useModel from 'flooks';
import { UndoOutlined, RedoOutlined } from '@ant-design/icons';
import canvasModel from '@/models1/canvasModel';
import canvasDataModel from '@/models1/canvasDataModel';
import { downloadURI } from '@/utils/util';
import styles from './header.less';

export interface IHeaderProps {}

const Header: FC<IHeaderProps> = props => {
  const { nodes } = useModel(canvasDataModel);
  const { canvasRef } = useModel(canvasModel);

  const download = () => {
    var dataURL = canvasRef.stage.toDataURL({ pixelRatio: 1 });
    downloadURI(dataURL, '画布图像.png');
  };
  const getTemplate = () => {
    const template = canvasRef.getTemplate();
  };

  const undo = () => {};

  const redo = () => {};
  return (
    <div className={styles.header}>
      <div className={styles.title}>图片编辑器</div>
      <div className={styles.center}>
        <Tooltip placement="bottom" title="撤销">
          <Button
            style={{ marginRight: 20 }}
            onClick={undo}
            type="primary"
            shape="circle"
            icon={<UndoOutlined />}
          />
        </Tooltip>
        <Tooltip placement="bottom" title="重做">
          <Button
            onClick={redo}
            type="primary"
            shape="circle"
            icon={<RedoOutlined />}
          />
        </Tooltip>
      </div>
      <div className={styles.right}>
        <Button type="primary" onClick={download}>
          下载
        </Button>
        <Button
          style={{ marginLeft: '10px' }}
          type="primary"
          onClick={getTemplate}
        >
          获取模板内容
        </Button>
      </div>
    </div>
  );
};

export default Header;
