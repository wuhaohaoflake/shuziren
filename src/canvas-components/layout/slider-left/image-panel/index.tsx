import React, { FC } from 'react';
import Upload from '../../../../bomponents/upload/index';
import canvasModel from '@/models1/canvasModel';
import useModel from 'flooks';
import './imagePanel.less';

export interface IPanelPanelProps {
  picList?:any;
}
const ImagePanel: FC<IPanelPanelProps> = props => {
  const { canvasRef } = useModel(canvasModel);
  const addImage = (url: string) => {
	canvasRef?.addLocalImage(url);
  }
  const addBg = (item: string) => {
    canvasRef?.addLocalBgImage(item);
  };
  const onUploadSuccess = () => {};
  return (
    <div className="img-panel">
    	<Upload type="other" onUploadSuccess={onUploadSuccess} />
		<div className='Image_box'>
			<div className='til'>背景图</div>
			<div className="img_box">
				{
					props.picList.bgList && props.picList.bgList.length > 0 && props.picList.bgList.map((i:any) => {
						return (
							<div key={i.url} className="image_list" onClick={() => addBg(i.url)}>
								<img src={i.url} alt={i.name} />
							</div>
						)
					})
				}
			</div>
			<div className='til'>icon</div>
			<div className="img_box">
				{
					props.picList.imgList && props.picList.imgList.length > 0 && props.picList.imgList.map((i:any) => {
						return (
							<div key={i.url} className="image_list icon_list" onClick={() => addImage(i.url)}>
								<img src={i.url} alt={i.name} />
							</div>
						)
					})
				}
			</div>
		</div>
    </div>
  );
};

export default ImagePanel;
