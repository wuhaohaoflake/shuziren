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
  const onUploadSuccess = () => {};
  return (
    <div className="img-panel">
    	<Upload type="other" onUploadSuccess={onUploadSuccess} />
		<div className='Image_box'>
			{
				props.picList && props.picList.length > 0 && props.picList.map((i:any) => {
					return (
						<div key={i.url} className="image_list" onClick={() => addImage(i.url)}>
							<img src={i.url} alt={i.name} />
						</div>
					)
				})
			}
			
		</div>
    </div>
  );
};

export default ImagePanel;
