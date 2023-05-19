import React, { FC } from 'react';
import { Select, Button, Tooltip } from 'antd';
import PanelTitle from '../panel-title';
import useModel from 'flooks';
import canvasDataModel from '@/models1/canvasDataModel';
import canvasModel from '@/models1/canvasModel';
import styles from './imagePanel.less';
import Upload from '../../../bomponents/upload/index';

export interface ITextPanelProps {}

const TextPanel: FC<ITextPanelProps> = props => {
  const onUploadSuccess = () => {};
  return (
    <div className={styles.textPanel}>
      <div className={styles.item}>
        <div className={styles.content}>
          <Upload type="other" onUploadSuccess={onUploadSuccess} />
        </div>
      </div>
    </div>
  );
};

export default TextPanel;
