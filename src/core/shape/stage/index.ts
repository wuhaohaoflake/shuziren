import Konva from 'konva';
import { StageConfig } from 'konva/lib/Stage';
import Canvas from '../../Canvas';
import { isBg } from '../../utils/util';
import {
  rectangleStart,
  rectangleMove,
  rectangleEnd,
  rectangleVisible,
} from '../../utils/group';
import { createContextMenu } from '../../context-menu';
import { DatModelItem, DataModel, ImageModel } from '@/typing';

class Satge {
  stage: Konva.Stage;
  contextMenu: HtmlDivElement;
  currNode: Konva.Shape | null;
  constructor(config: StageConfig, canvas: Canvas) {
    const stage = new Konva.Stage(config);
    this.stage = stage;
    this.currNode = null;
    stage.on('click', event => {
      // 框选框是否显示
	//   console.log(rectangleVisible())
      if (rectangleVisible()) {
        return;
      }
      if (!isBg(event.target.attrs)) {
        // && event.target.attrs.type !== 'text-input'
        const metaPressed =
          event.evt.shiftKey || event.evt.ctrlKey || event.evt.metaKey;
        const isSelected = canvas.tr.nodes().indexOf(event.target) >= 0;
        if (!metaPressed && !isSelected) {
          canvas.tr.nodes([event.target]);
        } else if (metaPressed && isSelected) {
          const nodes = canvas.tr.nodes().slice(); // use slice to have new copy of array
          nodes.splice(nodes.indexOf(event.target), 1);
          canvas.tr.nodes(nodes);
        } else if (metaPressed && !isSelected) {
          const nodes = canvas.tr.nodes().concat([event.target]);
          canvas.tr.nodes(nodes);
        }
        canvas.layer.add(canvas.tr); // TODO: 可能重复添加
      } else {
        canvas.tr.nodes([]);
      }
    });
    stage.on('mousedown', e => {
      if (!isBg(e.target.attrs)) {
        return;
      }
      if (e.evt.button === 0) {
        // rectangleStart(stage, canvas);
      }
    });
    stage.on('mousemove', () => {
      // rectangleMove(stage, canvas);
    });

    stage.on('mouseup', () => {
    //   rectangleEnd(stage, canvas);
    });

    this.contextMenu = createContextMenu(this, canvas);

    stage.on('contextmenu', (e: Konva.KonvaEventObject<any>) => {
      e.evt.preventDefault();
      if (isBg(e.target.attrs)) {
        return;
      }
      this.currNode = e.target as Konva.Shape;
      this.contextMenu.style.display = 'initial';
      this.contextMenu.style.top = `${e?.evt?.clientY + 1}px`;
      this.contextMenu.style.left = `${e?.evt?.clientX + 1}px`;
    });
  }
}

export default Satge;
