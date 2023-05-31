import Konva from 'konva';
import { Image, Stage, Text, Transformer } from './shape';
import { DatModelItem, DataModel, BgModel } from '@/typing';
import { removeLines, detectionToLine } from '@/core/utils/line';
import { uuid, getCenterXY } from '../utils/util';
import { addRectangle } from './utils/group';

type canvasAttr = {
  width: number;
  height: number;
  scale: number;
};

type EventKey = 'clickNode';
type Callback = (data: DatModelItem) => void;
type Listener = {
  [x: string]: Array<Callback>;
};

class Canvas {
  data: DataModel;
  canvasAttr: canvasAttr;
  stage: Konva.Stage;
  layer: Konva.Layer;
  tr: Konva.Transformer;
  listener: Listener;
  bgNode: Konva.Shape | null;
  shuzirenNode: Konva.Shape | null;
  constructor(id: string, width: number, height: number) {
    this.data = [];
    this.bgNode = null;
    this.shuzirenNode = null;
    this.listener = {};
    this.canvasAttr = {
      width,
      height,
      scale: 1,
    };

    this.stage = new Stage(
      {
        container: id,
        width: width,
        height: height,
      },
      this,
    ).stage;

    this.tr = new Transformer({rotateEnabled: false}, this).transformer;

    this.stage.on('click', event => {
      const modelItem = event.target.attrs as any;
      this.emit('clickNode', modelItem);
    });

    this.layer = new Konva.Layer({});

    // 辅助线
    this.layer.on('dragmove', e => {
	//   console.log(e)
      detectionToLine(this.layer, e.target as Konva.Shape);
    });
    this.layer.on('dragend', e => {
      removeLines(this.layer);
    });

    // 框选矩形
    addRectangle(this.layer);

    this.stage.add(this.layer);
  }

  /**
   * 初始化数据
   */
  init(data: DataModel): void {
    // this.layer.destroyChildren();
    this.data = data;
    this._renderShape(data);
  }

  selectBg(): void {
    const bg = this.layer.find('#bg');
    if (bg.length > 0) {
      this.emit('clickNode', bg[0].attrs);
    }
  }
  /**
   * 添加一个图形
   * @param item
   */
  add(item: DatModelItem): void {
    this.data.push(item);
    this._renderItemShape(item);
  }
  copy(item: DatModelItem): void {
    this.add(item);
  }

  addNode(node: DatModelItem, nodeWidth: number, nodeHeight: number): void {
    const [x, y] = getCenterXY(
      this.canvasAttr.width,
      this.canvasAttr.height,
      nodeWidth,
      nodeHeight,
    );
    node.x = x;
    node.y = y;
    (node.name = 'node'), (node.draggable = true), this.add(node);
  }
  addShuziren(node: DatModelItem): void {
    (node.name = 'node'), (node.draggable = true), this.add(node);
  }
  addText(): void {
    const textWidth = 300;
    const textHeight = 30;
    const currTextDateItem: DatModelItem = {
      id: uuid(),
      fontSize: 22,
      fontFamily: 'Microsoft YaHei',
      type: 'text-input',
	  fontStyle: 'normal',
      text: '双击编辑文字',
      fill: '#ffffff',
      width: textWidth,
	  height: textHeight,
	  wrap: 'char',
	  fillPriority: '#ffffff',
      visible: true,
    };
    this.addNode(currTextDateItem, textWidth, textHeight);
  }

  addImage(url: string): void {
    const width = 400;
    const height = 200;
    const currTextDateItem: DatModelItem = {
      id: uuid(),
      type: 'image',
      url,
      width,
      height,
    };
    this.addNode(currTextDateItem, width, height);
  }

  addBgImage(url: string): void {
    const id = 'bg';
    const { width, height } = this.canvasAttr;
    const node: DatModelItem = {
      x: 0,
      y: 0,
      id,
      width,
      height,
      type: 'bg-image',
      url,
    };
    this.bgNode?.destroy();
    this.add(node);
  }
  addShuzirenImage(url: string): void {
    const id = 'shuziren';
    const width = 220;
    const height = 430;
    const node: DatModelItem = {
      x: 590,
      y: 30,
      id,
      width,
      height,
      type: 'shuziren-image',
      url,
    };
    this.shuzirenNode?.destroy();
    this.addShuziren(node);
  }
  replaceOtherImage(url: string): void {
    const id = 'bg';
    const { width, height } = this.canvasAttr;
    const node: DatModelItem = {
      x: 0,
      y: 0,
      id,
      width,
      height,
      type: 'image',
      url,
    };
    this.bgNode?.destroy();
    this.add(node);
  }
  addLocalImage(file: any): void {
    let url = file;
    const width = 300;
    const height = 150;
    const currTextDateItem: DatModelItem = {
      id: uuid(),
      type: 'image',
      url,
      width,
      height,
    };
    this.addNode(currTextDateItem, width, height);
  }
  addLocalBgImage(file: any): void {
    const id = 'bg';
    const { width, height } = this.canvasAttr;
    let url = file;
    const node: DatModelItem = {
      x: 0,
      y: 0,
      id,
      width,
      height,
      type: 'bg-image',
      url,
    };
    this.bgNode?.destroy();
    this.add(node);
  }
  replaceBgImage(color: string): void {
    const id = 'bg';
    const { width, height } = this.canvasAttr;
    const node: DatModelItem = {
      id,
      width,
      height,
      type: 'color',
      fill: color,
    };
    this.bgNode?.destroy();
    this.add(node);
  }
  private _renderShape(data: DataModel): void {
    data.forEach(item => {
      this._renderItemShape(item);
    });
    this.layer.draw();
  }

  private _renderItemShape(shape: DatModelItem): void {
    switch (shape.type) {
      case 'color':
        const color = new Konva.Rect({
          ...shape,
          width: this.canvasAttr.width,
          height: this.canvasAttr.height,
        });
        this.bgNode = color;
        setTimeout(() => {
          color.moveToBottom(); // TODO: 放到最底层
        }, 0);
        this.layer.add(color);
        return;

      case 'bg-image':
        new Image(shape, this, node => {
          this.bgNode = node;
          setTimeout(() => {
            node.moveToBottom(); // TODO: 放到最底层
			this.layer.add(node);
			sessionStorage.setItem('canvasChange', new Date().valueOf().toString());
          }, 0);
        });

        return;
      case 'shuziren-image':
        new Image(shape, this, node => {
          this.shuzirenNode = node;
        });
        return;
      case 'text-input':
        new Text(shape, this);
        return;
      case 'image':
        new Image(shape, this);
        return;
      default:
        break;
    }
  }

  redo(): void {}

  undo(): void {}

  updateCanvasAttr(scale: number): void {
    const { width, height } = this.canvasAttr;
    const newWidth = width * scale;
    const newHeight = height * scale;
    const canvasAttr = {
      width: width,
      height: height,
      scale: scale,
    };
    this.canvasAttr = canvasAttr;
    this.stage.setAttrs({
      width: newWidth,
      height: newHeight,
      scaleX: scale,
      scaleY: scale,
    });
    // this.layer.draw();
  }

  /**
   * 根据id修改图形的属性
   * @param id
   * @param item
   */
  updateShapeAttrsById(id: string, item: DatModelItem): void {
    const currItem = this.layer.find(`#${id}`);
    if (currItem.length > 0) {
      currItem[0].setAttrs(item);
    }
  }
  removeItem(id: string): void {
    const currItem = this.layer.find(`#${id}`);
    if (currItem.length > 0) {
      this.selectBg();
      this.tr.nodes([]);
      currItem[0].remove();
    }
  }
  on(type: EventKey, cbk: (item: DatModelItem) => void): void {
    if (this.listener[type]) {
      this.listener[type].push(cbk);
    } else {
      this.listener[type] = [cbk];
    }
  }

  emit(type: EventKey, modelItem: DatModelItem): void {
    this.listener[type]?.forEach(cbk => {
      cbk?.(modelItem);
    });
  }

  private zoom(type: 'zoomIn' | 'zoomOut'): canvasAttr {
    const { width, height, scale } = this.canvasAttr;
    let oldScale = this.stage.scaleX();
    let newScale = scale;
    if (type === 'zoomIn') {
      newScale = oldScale + 0.1;
    } else {
      newScale = oldScale - 0.1;
    }
    newScale = parseFloat(newScale.toFixed(1));
    if (newScale <= 0.3 || newScale >= 1.8) {
      return this.canvasAttr;
    }
    this.updateCanvasAttr(newScale);
    return this.canvasAttr;
  }

  zoomIn(): canvasAttr {
    return this.zoom('zoomIn');
  }

  zoomOut(): canvasAttr {
    return this.zoom('zoomOut');
  }

  getTemplate() {
    const res = this.layer.toObject();
    return res.children.map((child: any) => {
      if (child.attrs != '{}') {
		if (child.attrs.type && child.attrs.id != 'bg' &&  !child.attrs.y ) {
			console.log('没有y坐标');
			console.log(child.attrs)
		}
		if (child.attrs.type == 'text-input' && !child.attrs.width) {
			console.log('文本框没有宽度');
			child.attrs.width = 600;
			return {
				...child.attrs,
			};
		} else if (child.attrs.type == 'text-input' && !child.attrs.height) {
			console.log('文本框没有高度');
			if (child.attrs.width && child.attrs.text) {
				child.attrs.height = (child.attrs.text.length * child.attrs.fontSize / child.attrs.width) * child.attrs.fontSize * child.attrs.lineHeight;
			} else {
				child.attrs.height = 100;
			}
			return {
				...child.attrs,
			};
		} else if (child.attrs.type == 'text-input' && child.attrs.visible === false && child.attrs.text) {
			console.log('文本框消失');
			console.log(child.attrs)
			child.attrs.visible = true;
			return {
				...child.attrs,
			};
		} else {
			return {
				...child.attrs,
			};
		}
      }
    });
  }
}

export default Canvas;
