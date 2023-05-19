import React, { FC, useEffect, useRef, useState, useCallback } from 'react';
import { CanvasPanel, TextPanel } from '../../shape-panel';
import { ShapePanelEnum } from '@/enum';
import useModel from 'flooks';
import canvasDataModel from '@/models1/canvasDataModel';
import canvasModel from '@/models1/canvasModel';
import { getShapePanelTypeBySelectNode } from '@/utils/util';
import classNames from 'classnames';
import { message, Tooltip, Drawer } from 'antd';
import Icon from '../../../components/PageIcon';

import {
  BorderOuterOutlined,
  AppstoreAddOutlined,
  LineHeightOutlined,
  FileImageOutlined,
  PictureOutlined,
  BarcodeOutlined,
  UserOutlined,
  SoundOutlined,
} from '@ant-design/icons';
import { useImmer } from 'use-immer';
// import TextPanel from './text-panel';
import ImagePanel from './image-panel';
import BGPanel from './bg-panel';
import ShuzirenPanel from './shuziren-panel';
import VoicePanel from './voice-panel';
import './slider.less';

const itemData = [
  {
    id: 'text',
    name: '文字',
	// icon: <Icon type="icon-wenbenkuang" style={{ fontSize: 20, color: '#fff' }} />,
    // activeIcon: (
	// 	<Icon type="icon-wenbenkuang" style={{ fontSize: 20, color: '#999' }} />
    // ),
  },
  {
    id: 'image',
    name: '图片',
    icon: <Icon type="icon-tupian" style={{ fontSize: 20, color: '#fff' }} />,
    activeIcon: (
		<Icon type="icon-tupian" style={{ fontSize: 20, color: '#999' }} />
    ),
  },
  {
    id: 'shuziren',
    name: '数字人',
    icon: <Icon type="icon-shuziren" style={{ fontSize: 26, color: '#fff' }} />,
    activeIcon: <Icon type="icon-shuziren" style={{ fontSize: 26, color: '#999' }} />,
  },
  {
    id: 'voice',
    name: '声音',
    icon: <Icon type="icon-yuyin" style={{ fontSize: 20, color: '#fff' }} />,
    activeIcon: <Icon type="icon-yuyin" style={{ fontSize: 20, color: '#999' }} />,
  },
];

export interface IHeaderProps {
  formRef?: any;
  soundsList?: any;
  personList?: any;
  editId?: string;
}

const Slider: FC<IHeaderProps> = props => {
  const [state, setState] = useImmer({active: 'background'});
  const [open, setOpen] = useState<boolean>(false);
  const [drawerTitle, setDrawerTitle] = useState<string>('背景');
  const { selectNode } = useModel(canvasModel);
  const shapePanelType = getShapePanelTypeBySelectNode(selectNode);
  const { canvasRef } = useModel(canvasModel);

	useEffect(() => {
		if (selectNode && selectNode.type == 'text-input') {
			setState({ active: 'text' });
			setDrawerTitle('文字');
			setOpen(true);
		}
  	}, [selectNode])
  const handleItemClick = (key: string, name: string) => {
	setDrawerTitle(name);
    setState({ active: key });
	setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const toggleDetail = () => {
	setOpen(!open);
  }
  return (
    <div className='slider'>
	  <div style={{width: open? '280px' : '0'}} id="infoDetail">
		{/* <div className="info-left" onClick={toggleDetail}></div> */}
		<div className='info-right'>
			<div className='info-title'>
				<div className="close" onClick={onClose}>
					<Icon type="icon-round_close_fill_light" style={{ fontSize: 20, color: '#fff' }} />
				</div>
				<div className="text">{drawerTitle}</div>
			</div>
			{state.active === 'text' && (
				<TextPanel />
			)}
			{state.active === 'image' && (
				<ImagePanel />
			)}
			{state.active === 'shuziren' && (
				<ShuzirenPanel personList={props.personList} />
			)}
			{state.active === 'voice' && (
				<VoicePanel soundsList={props.soundsList} />
			)}
			{state.active === 'background' && <BGPanel />}
		</div>
      </div>
      <div className='toolbar'>
        {itemData.map(item => {
          return (
            <Tooltip key={item.id} placement="right" title={item.name}>
              <div
                onClick={() => handleItemClick(item.id, item.name)}
                className={`item ${
                  state.active === item.id ? 'active' : ''
                }`}
              >
                {/* {state.active === item.id ? item.icon : item.activeIcon} */}
				<div className={ state.active === item.id ? `icon-image ${item.id}_a` : `icon-image ${item.id}_n`}></div>
				<p style={{fontSize: '14px', marginTop: '10px'}}>{item.name}</p>
              </div>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
