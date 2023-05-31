import Konva from 'konva';
import Canvas from '../../Canvas';
import { DatModelItem, DataModel, ImageModel } from '@/typing';

class Image {
  constructor(
    shape: ImageModel,
    canvas: Canvas,
    cbk?: (node: Konva.Shape) => void,
  ) {
    Konva.Image.fromURL(shape.url, (darthNode: Konva.Shape) => {
      cbk?.(darthNode);
      darthNode.setAttrs({
        ...shape,
        dragBoundFunc: function(pos:any) {
			let canvasWidth = canvas.canvasAttr.width;
			let canvasHeight = canvas.canvasAttr.height;
			let imageWidth = darthNode.attrs.width;
			let imageHeight = darthNode.attrs.height;
			let scaleX = darthNode.attrs.scaleX;
			let scaleY = darthNode.attrs.scaleY;
			return {
				y: pos.y < 1? 5 : pos.y > (Number(canvasHeight) - Number(imageHeight) * scaleY)? (Number(canvasHeight) - Number(imageHeight) * scaleY) : pos.y,
				x: pos.x < 1? 5 : pos.x > (Number(canvasWidth) - Number(imageWidth) * scaleX)? (Number(canvasWidth) - Number(imageWidth) * scaleX) : pos.x
			};
		}
      });
      darthNode.on('dragend', (event: any) => {
        // console.log('event', event);
      });
      canvas.layer.add(darthNode);
      // this.layer.batchDraw();
    });
  }
}

export default Image;
