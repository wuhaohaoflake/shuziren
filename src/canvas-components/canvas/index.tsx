import React, { FC, useRef, useEffect, useState } from 'react';
import useModel from 'flooks';
import canvasDataModel from '@/models1/canvasDataModel';
import canvasModel from '@/models1/canvasModel';
import { Tooltip, Modal } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import { useSize, useUpdate } from 'ahooks';
import { Spin } from 'antd';
import CanvasClass from '@/core/Canvas';
import BackReplace from '@/components/BackReplace';
import './canvas.less';
import Icon from '@/components/PageIcon';


export interface ICanvasProps {
	canvasWidth?: number;
	canvasHeight?: number;
	pagesList?: any;
}

const Canvas: FC<ICanvasProps> = props => {
  const { changeCanvas, loading } = useModel(canvasModel);
  const { nodes } = useModel(canvasDataModel);
  const ref = useRef<HTMLDivElement>(null);
  const refCanvas = useRef<CanvasClass>();
  const [modalVisible, setModalVisible] = useState(false);
  const size = useSize(ref);
  const update = useUpdate();

  useEffect(() => {
    if (loading) {
      return;
    }
    let canvas = new CanvasClass(
      'container',
	  props.canvasWidth,
	  props.canvasHeight
    );
    canvas.init(nodes as any);
    canvas.on('clickNode', itemModel => {
      document.onkeydown = function(event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 8) {
			if (itemModel.id != 'bg' && itemModel.id != 'shuziren') {
				if (itemModel.type == 'text-input') {
					if (sessionStorage.getItem('textEdit') === 'false') {
						canvas.removeItem(itemModel.id)
					}
				} else {
					canvas.removeItem(itemModel.id)
				}
			}
        }
      };
      changeCanvas({
        selectNode: itemModel,
      });
    });
    window.canvas = canvas;
    refCanvas.current = canvas;

    if (ref.current) {
      canvas.updateCanvasAttr(1);
      changeCanvas({
        canvasRef: refCanvas.current,
        update: update,
      });
    }
    return () => {
      canvas.stage.destroyChildren();
      canvas.stage.destroy();
    };
  }, [loading, nodes, props.canvasWidth]);

  useEffect(() => {

  }, [refCanvas]);
  const changeBG = () => {
	setModalVisible(true);
  }
  return (
    <React.Fragment>
      <div className='canvas-main-box' ref={ref}>
        {loading ? (
          <Spin />
        ) : (
			<div id="container"></div>
        )}
		<Modal
			bodyStyle={{ padding: 0 }}
			style={{ top: '150px' }}
			className="elementModal"
			destroyOnClose
			forceRender={true}
			width={350}
			title="替换本页背景"
			open={modalVisible}
			onCancel={() => setModalVisible(false)}
			footer={null}
		>
			<BackReplace pagesList={props.pagesList} type="one" onClose={() =>setModalVisible(false)}   />
      	</Modal>
      </div>
    </React.Fragment>
  );
};

export default Canvas;
