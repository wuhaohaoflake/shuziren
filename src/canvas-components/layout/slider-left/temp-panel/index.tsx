import React, { FC } from 'react';
import Upload from '../../../../bomponents/upload/index';
import canvasModel from '@/models1/canvasModel';
import useModel from 'flooks';
import './index.less';

export interface IPanelPanelProps {
	tempList?:any;
	selectTempAction: (data: any) => void;
}
const ImagePanel: FC<IPanelPanelProps> = props => {
  const { canvasRef } = useModel(canvasModel);
  const selectTemp = (data:any) => {
		props.selectTempAction(data);
  }
  return (
    <div className="temp-panel">
		<div className='temp_box'>
			{
				props.tempList.length > 0 && props.tempList.map((item:any, index: number) => {
					return (
						<div key={index} className='list' onClick={() =>selectTemp(item.content)}>
							<div className='temp_list'>
								<div className='thumb-box' style={{background: item.content.nodes.filter((k:any) => k.id == 'bg').length > 0? item.content.nodes.filter((k:any) => k.id == 'bg')[0].type == 'bg-image'? `url(${item.content.nodes.filter((k:any) => k.id == 'bg')[0].url})` : item.content.nodes.filter((k:any) => k.id == 'bg')[0].fill : `url('https://gateway.irked.cn/bus/oss/all/png/2023-05-17/5e74f04cc0aa421cb381ef88aa185f8d.png')`}}>
									{
										item.content.nodes && item.content.nodes.map((i:any, s:number) => {
											if (i.id === 'shuziren') {
												return (
													<img style={{top: item.content.footerVisible? i.y * 2.3 : i.y * 1.95, left: item.content.footerVisible? i.x * 2.3 : i.x * 1.95, width: item.content.footerVisible? i.width * 2.3 : i.width * 1.95, height: item.content.footerVisible? i.height * 2.3 : i.height * 1.95}} key={s} className='shuziren-image' src={i.url} alt="" />
												)
											} else if (i.type == 'text-input') {
												return (
													<span key={s} className='text-span font' style={{display: 'block', top: item.content.footerVisible? i.y * 2.3 : i.y * 1.95, left: item.content.footerVisible? i.x * 2.3 : i.x * 1.95, width: item.content.footerVisible? i.width * 2.3 : i.width * 1.95, height: item.content.footerVisible? i.height * 2.3 : i.height * 1.95, fontSize: item.content.footerVisible? i.fontSize * 2.3 : i.fontSize * 1.95, color: i.fill, lineHeight: i.lineHeight, whiteSpace: 'pre-wrap'}}>{i.text}</span>
												)
											} if (i.type === 'image') {
												return (
													<img className='thumb-img' style={{top: item.content.footerVisible? i.y * 2.1 : i.y * 1.7, left: item.content.footerVisible? i.x * 2 : i.x * 1.6, width: item.content.footerVisible? i.width * 1 : i.width * 1, height: item.content.footerVisible? i.height * 1.5 : i.height * 1.5}} key={s} src={i.url} alt="" />
												)
											}
										})

									}
								</div>
							</div>
							<div className='temp_name'>{item.name}</div>
						</div>
					)
				})
			}
			
		</div>
    </div>
  );
};

export default ImagePanel;
