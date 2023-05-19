import React, { FC } from 'react';
import { Form, Radio, Button, Space } from 'antd';
import { useImmer } from 'use-immer';
import { RadioChangeEvent } from 'antd';
import { ColorSelect } from '@/components';
import useModel from 'flooks';
import canvasDataModel from '@/models1/canvasDataModel';
import canvasModel from '@/models1/canvasModel';
import styles from './canvasPanel.less';
import Upload from '../../../bomponents/upload/index';

export interface ICanvasPanelProps {}

const canvasOptions = [
  { label: '颜色', value: 'color' },
  { label: '图片', value: 'bg' },
];

const CanvasPanel: FC<ICanvasPanelProps> = props => {
  const [form] = Form.useForm();
  const {
    width,
    height,
    changeCanvasModelDataItem,
    changeCanvasModel,
  } = useModel(canvasDataModel);
  const { selectNode, canvasRef } = useModel(canvasModel);

  const [state, setState] = useImmer({
    canvasOptionsValue: 'color',
  });

  const onChange = (e: RadioChangeEvent) => {
    setState(draft => {
      draft.canvasOptionsValue = e.target.value;
    });
  };

  const colorChange = (color: string) => {
    canvasRef?.replaceBgImage(color);
  };

  const onUploadSuccess = () => {};
  return (
    <div className={styles.canvasPanel}>
      <div className={styles.item}>
        <div
          className={styles.content}
          style={{ background: 'rgba(16, 38, 58, 0.04)', padding: '10px' }}
        >
          <div style={{ width: '100%' }}>
            <Radio.Group
              style={{ marginBottom: '10px' }}
              options={canvasOptions}
              onChange={onChange}
              value={state.canvasOptionsValue}
              optionType="button"
              buttonStyle="solid"
            />
            {state.canvasOptionsValue === 'color' ? (
              <ColorSelect value={selectNode?.fill} onChange={colorChange} />
            ) : (
              <div>
                <Upload type="bg" onUploadSuccess={onUploadSuccess} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasPanel;
