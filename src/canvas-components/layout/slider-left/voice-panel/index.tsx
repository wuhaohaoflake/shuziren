import React, { FC, useEffect, useState, useRef } from 'react';
import { Button } from 'antd';
import useModel from 'flooks';
import { SoundOutlined } from '@ant-design/icons';

import canvasDataModel from '@/models1/canvasDataModel';
import canvasModel from '@/models1/canvasModel';
import Icon from '@/components/PageIcon';


import './index.less';

export interface voiceProps {
  soundsList?: any;
}

const VoicePanel: FC<voiceProps> = props => {
  const { canvasRef } = useModel(canvasModel);
  const [selectVoice, setSelectVoice] = useState(743);
  const [voiceSrc, setVoiceSrc] = useState(new Audio());

  useEffect(() => {

  }, []);
  useEffect(() => {

  }, [props.soundsList]);

  const selectVoiceAction = (item: any) => {
    setSelectVoice(item.id);
	sessionStorage.setItem('sperkerId', item.id);
  };
  const playSounds = (e:any, item: any) => {
	e.stopPropagation();
	if (voiceSrc.src == item.audition) {
		if (voiceSrc.paused) {
			voiceSrc.play();
		} else {
			voiceSrc.pause();
		}
	} else {
		voiceSrc.src = item.audition;
    	voiceSrc.play();
	}
  }
  return (
    <div className="voice-boxs">
      {props.soundsList.length > 0 &&
        props.soundsList.map((item: any, index: number) => {
          return (
            <div onClick={() => { selectVoiceAction(item) }} key={index} className={ selectVoice == item.id ? 'voice-list active' : 'voice-list'}>
			  <Icon type="icon-shengyin_o" onClick={(e) => playSounds(e, item)} style={{ fontSize: 20, marginRight: '10px' }} />
			  <div className='sounds-name'>{item.name}</div>
            </div>
          );
        })}
    </div>
  );
};

export default VoicePanel;
