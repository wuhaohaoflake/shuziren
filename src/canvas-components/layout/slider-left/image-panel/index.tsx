import React, { FC } from 'react';
import Upload from '../../../../bomponents/upload/index';

import './imagePanel.less';

export interface IPanelPanelProps {}

const ImagePanel: FC<IPanelPanelProps> = props => {
  const onUploadSuccess = () => {};
  return (
    <div className="img-panel">
      <Upload type="other" onUploadSuccess={onUploadSuccess} />
    </div>
  );
};

export default ImagePanel;
