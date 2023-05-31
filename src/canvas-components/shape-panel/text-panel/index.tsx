import React, { FC, useState, useEffect } from 'react';
import { Select, Button, Tooltip } from 'antd';
import PanelTitle from '../panel-title';
import useModel from 'flooks';
import { ColorSelect } from '@/components';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
} from '@ant-design/icons';
import canvasDataModel from '@/models1/canvasDataModel';
import canvasModel from '@/models1/canvasModel';
import { useThrottleFn } from 'ahooks';
import styles from './textPanel.less';
import { deepClone } from '@/utils/index'


const { Option } = Select;
const fonts = [
  { name: '微软雅黑', value: 'Microsoft YaHei' },
  { name: '微软正黑', value: 'Microsoft JhengHei' },
  { name: '黑体', value: 'SimHei' },
  { name: '宋体', value: 'SimSun' },
  { name: '新宋体', value: 'NSimSun' },
  { name: '仿宋', value: 'FangSong' },
  { name: '楷体', value: 'KaiTi' },
  { name: '新细明体', value: 'PMingLiU' },
  { name: '幼圆', value: 'YouYuan' },
  { name: '华文彩云', value: 'STCaiyun' },
];
const fontSizes = [
  12,
  14,
  16,
  18,
  20,
  22,
  24,
  26,
  28,
  30,
  32,
  34,
  36,
  40,
  42,
  44,
  46,
  48,
  50,
  54,
  56,
  60,
  64,
  68,
  72,
  76,
  84,
  96,
  108,
  120,
  140,
];
const lineHeight = [0.5, 0.8, 1, 1.2, 1.5, 1.8, 2, 2.2, 2.5, 3]
export interface ITextPanelProps {}

const TextPanel: FC<ITextPanelProps> = props => {
  const {
    width,
    height,
    changeCanvasModelDataItem,
    changeCanvasModel,
  } = useModel(canvasDataModel);
  const { selectNode, canvasRef } = useModel(canvasModel);
  const [fontObj, setFontObj] = useState(selectNode);
  useEffect(() => {
	setFontObj(deepClone(selectNode));
  }, [selectNode])
  useEffect(() => {

  }, [fontObj])
  const changeFont = (key: string, value: string) => {
    let obj = { ...fontObj };
    obj[key] = value;
	setFontObj(obj);
    canvasRef?.updateShapeAttrsById(selectNode.id, { [key]: value });
  };

  const { run } = useThrottleFn(
    (key: string, value: string) => {
      changeFont(key, value);
    },
    {
      wait: 200,
    },
  );
  const addText = () => {
    canvasRef?.addText();
  };
  return (
    <div className={styles.textPanel}>
      <div style={{textAlign: 'left', marginBottom: '6px', marginTop: '6px', paddingLeft: '10px'}}>
			<Button onClick={addText} style={{ width: '110px', borderRadius: '5px'}} type="primary">添加文字</Button>
		</div>
      <div className={styles.item}>
        <div className={styles.title}>
          <div>字体</div>
        </div>
        <div className={styles.content}>
          <Select
		  	placeholder="字体"
            style={{ width: '45%' }}
            value={selectNode.fontFamily}
            onChange={(value: string) => changeFont('fontFamily', value)}
          >
            {' '}
            {fonts.map(item => {
              return (
                <Option key={item.value} value={item.value}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </div>
      </div>
	  <div className={styles.item}>
	  <div className={styles.title}>
          <div>字号/行高</div>
        </div>
		<div className={styles.content}>
			<Select
				style={{ width: '45%' }}
				value={selectNode.fontSize}
				placeholder="字号"
				onChange={(value: string) => changeFont('fontSize', value)}
			>
				{' '}
				{fontSizes.map(item => {
				return (
					<Option key={item} value={item}>
					{item}
					</Option>
				);
				})}
			</Select>

			<Select
				style={{ width: '45%' }}
				placeholder="行高"
				value={selectNode.lineHeight}
				onChange={(value: string) => changeFont('lineHeight', value)}
			>
				{' '}
				{lineHeight.map(item => {
				return (
					<Option key={item} value={item}>
					{item}
					</Option>
				);
				})}
			</Select>
			</div>
	  </div>
      <div className={styles.item}>
        <div className={styles.title}>
          <div>字体描述</div>
        </div>
        <div
          className={styles.content}
          style={{ background: 'rgba(16, 38, 58, 0.04)', padding: '10px' }}
        >
          <Tooltip placement="bottom" title="加粗">
            <Button
              type={fontObj.fontStyle == 'bold' ? 'primary' : 'default'}
              shape="circle"
              icon={<BoldOutlined />}
              onClick={() =>
                changeFont(
                  'fontStyle',
                  fontObj.fontStyle == 'bold' ? 'normal' : 'bold',
                )
              }
            />
          </Tooltip>
          <Tooltip placement="bottom" title="下划线">
            <Button
              type={
                fontObj?.textDecoration === 'underline' ? 'primary' : 'default'
              }
              shape="circle"
              icon={<UnderlineOutlined />}
              onClick={() =>
                changeFont(
                  'textDecoration',
                  fontObj.textDecoration === 'underline' ? '' : 'underline',
                )
              }
            />
          </Tooltip>
          <Tooltip placement="bottom" title="删除线">
            <Button
              type={
                fontObj?.textDecoration === 'line-through'
                  ? 'primary'
                  : 'default'
              }
              shape="circle"
              icon={<StrikethroughOutlined />}
              onClick={() =>
                changeFont(
                  'textDecoration',
                  fontObj.textDecoration === 'line-through'
                    ? ''
                    : 'line-through',
                )
              }
            />
          </Tooltip>
        </div>
      </div>

      <div className={styles.item}>
        <div className={styles.title}>
          <div>对齐方式</div>
        </div>
        <div
          className={styles.content}
          style={{ background: 'rgba(16, 38, 58, 0.04)', padding: '10px' }}
        >
          <Tooltip placement="bottom" title="左对齐">
            <Button
              type={selectNode.align === 'left' ? 'primary' : 'default'}
              shape="circle"
              icon={<AlignLeftOutlined />}
              onClick={() =>
                changeFont('align', selectNode.align === 'left' ? '' : 'left')
              }
            />
          </Tooltip>
          <Tooltip placement="bottom" title="居中对齐">
            <Button
              type={selectNode.align === 'center' ? 'primary' : 'default'}
              shape="circle"
              icon={<AlignCenterOutlined />}
              onClick={() =>
                changeFont(
                  'align',
                  selectNode.align === 'center' ? '' : 'center',
                )
              }
            />
          </Tooltip>
          <Tooltip placement="bottom" title="右对齐">
            <Button
              type={selectNode?.align === 'right' ? 'primary' : 'default'}
              shape="circle"
              icon={<AlignRightOutlined />}
              onClick={() =>
                changeFont('align', selectNode.align === 'right' ? '' : 'right')
              }
            />
          </Tooltip>
        </div>
      </div>

      <div className={styles.item}>
        <div className={styles.title}>
          <div>字体颜色</div>
        </div>
        <div
          className={styles.content}
          style={{ background: 'rgba(16, 38, 58, 0.04)', padding: '10px' }}
        >
          <ColorSelect
            value={selectNode?.fill}
            onChange={value => run('fill', value)}
          />
        </div>
      </div>
    </div>
  );
};

export default TextPanel;
