import React, { FC } from 'react';
import { Button } from 'antd';
import useModel from 'flooks';
import canvasDataModel from '@/models1/canvasDataModel';
import canvasModel from '@/models1/canvasModel';
import { TextPanel } from '../../../shape-panel';

import styles from './textPanel.less';

export interface ITextPanelProps {}

const TextPanelBox: FC<ITextPanelProps> = props => {
  const { canvasRef } = useModel(canvasModel);

  return (
    <div className={styles.panel}>
		<TextPanel />
    </div>
  );
};

export default TextPanelBox;
