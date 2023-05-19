import React, { useEffect, useState, FC } from 'react';
import { Form, Radio, Button, Space } from 'antd';
import { useImmer } from 'use-immer';
import { RadioChangeEvent } from 'antd';
import { ColorSelect } from '@/components';
import useModel from 'flooks';
import canvasDataModel from '@/models1/canvasDataModel';
import canvasModel from '@/models1/canvasModel';
import styles from './canvasPanel.less';
import Upload from '../bomponents/upload/index';

const canvasOptions = [
  { label: '颜色', value: 'color' },
  { label: '图片', value: 'bg' },
];
import './background.less';
interface IFormProps {
	pagesList?:any;
	type?: string;
	onClose?:() => void;
}
const BackReplace: React.FC<IFormProps> = ({ pagesList, type, onClose }) => {
	const { selectNode, canvasRef } = useModel(canvasModel);
	const [soundsList, setSoundsList] = useState<any>([]);
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
		if (type == 'all') {
			let list = [...pagesList];
			if (list.length > 0) {
				list.map((i:any, index: number) => {
					if (i.nodes.length > 0) {
						i.nodes.map((s:any) => {
							if (s.id == 'bg') {
								s.type = 'color';
								s.url = ``;
								s.fill = color;
							}
						})
					}
				})
			}
		} else {
		}
		onClose();
	};
  
	const onUploadSuccess = (data:any) => {
		if (type == 'all') {
			let list = [...pagesList];
			if (list.length > 0) {
				list.map((i:any, index: number) => {
					if (i.nodes.length > 0) {
						i.nodes.map((s:any) => {
							if (s.id == 'bg') {
								s.type = 'bg-image';
								s.url = `https://gateway.irked.cn/bus/oss/${data}`;
							}
						})
					}
				})
			}
		}
		onClose();
	};
	return (
		<div id="BackReplace" style={{ padding: 0 }}>
			<div className={styles.canvasPanel}>
				<div className={styles.item}>
					<div className={styles.content} style={{ background: 'rgba(16, 38, 58, 0.04)', padding: '10px' }}>
						<div style={{ width: '100%', boxSizing: 'border-box', height: '90px' }}>
							<Radio.Group
							style={{ marginBottom: '20px' }}
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
		</div>
	);
};

export default BackReplace;
