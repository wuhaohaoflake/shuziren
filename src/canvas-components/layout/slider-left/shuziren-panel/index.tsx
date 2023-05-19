import React, { FC } from 'react';
import { Button } from 'antd';
import useModel from 'flooks';
import canvasDataModel from '@/models1/canvasDataModel';
import canvasModel from '@/models1/canvasModel';
import './index.less';

export interface IBGPanelProps {
  personList?: any;
}

const BGPanel: FC<IBGPanelProps> = props => {
  const { canvasRef } = useModel(canvasModel);
  const addShuziren = (item: string) => {
    canvasRef?.addShuzirenImage(item.cover);
	sessionStorage.setItem('sceneId', item.id);
	sessionStorage.setItem('sceneUrl', item.cover);
  };

  return (
    <div className="shuziren-boxs">
      {props.personList.length > 0 &&
        props.personList.map((item: any) => {
          return (
            <div key={item.id} className={item.cover == 'https://digital-public.obs.cn-east-3.myhuaweicloud.com/model/2023/05/04/6456a3f5669d008e340d593d9b696ca3.png'? 'shuziren-list' : 'shuziren-list person-active'}>
              <img onClick={() => addShuziren(item)} src={item.cover} />;
            </div>
          );
        })}
    </div>
  );
};

export default BGPanel;
