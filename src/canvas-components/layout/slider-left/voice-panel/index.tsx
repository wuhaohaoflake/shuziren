import React, { FC, useEffect, useState, useRef } from 'react';
import { Button } from 'antd';
import useModel from 'flooks';
import canvasDataModel from '@/models1/canvasDataModel';
import canvasModel from '@/models1/canvasModel';

import './index.less';

export interface voiceProps {
  soundsList?: any;
}

const VoicePanel: FC<voiceProps> = props => {
  const { canvasRef } = useModel(canvasModel);
  const [selectVoice, setSelectVoice] = useState(284);
  const [voiceSrc, setVoiceSrc] = useState(new Audio());

  useEffect(() => {

  }, []);
  useEffect(() => {

  }, [props.soundsList]);

  const selectVoiceAction = (item: any) => {
    voiceSrc.src = item.audition;
    voiceSrc.play();
    setSelectVoice(item.id);
	sessionStorage.setItem('sperkerId', item.id);
  };

  return (
    <div className="voice-boxs">
      {props.soundsList.length > 0 &&
        props.soundsList.map((item: any, index: number) => {
          return (
            <div
              onClick={() => {
                selectVoiceAction(item);
              }}
              key={index}
              className={
                selectVoice == item.id ? 'voice-list active' : 'voice-list'
              }
            >
              {item.name}
            </div>
          );
        })}
    </div>
  );
};

export default VoicePanel;
