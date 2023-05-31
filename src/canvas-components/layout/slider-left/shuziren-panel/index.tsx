import React, { FC, useState } from 'react';
import { Button } from 'antd';
import useModel from 'flooks';
import canvasDataModel from '@/models1/canvasDataModel';
import canvasModel from '@/models1/canvasModel';
import './index.less';

export interface IBGPanelProps {
  personList?: any;
  selectPerson: (data:any) => void;
}

const BGPanel: FC<IBGPanelProps> = props => {
  const { canvasRef } = useModel(canvasModel);
  const [selectPersonId, setSelectPersonId] = useState('195803445');

  const addShuziren = (item: any) => {
    canvasRef?.addShuzirenImage(item.cover);
	setSelectPersonId(item.id);
	sessionStorage.setItem('sceneId', item.id);
	sessionStorage.setItem('sceneUrl', item.cover);
	props.selectPerson({sceneId: item.id, sceneUrl: item.cover});
  };

  return (
    <div className="shuziren-boxs">
      {props.personList.length > 0 &&
        props.personList.map((item: any, index: number) => {
          return (
            <div key={index} className={item.id == selectPersonId? 'shuziren-list person-active' : 'shuziren-list'}>
              <img onClick={() => addShuziren(item)} src={item.cover} />;
            </div>
          );
        })}
    </div>
  );
};

export default BGPanel;
