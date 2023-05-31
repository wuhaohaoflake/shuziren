import Konva from 'konva';
import { TextConfig } from 'konva/lib/shapes/Text';
import Canvas from '../../Canvas';

import { isBg } from '../../utils/util';
import { equalOne } from '../../../utils/util';
import {
  rectangleStart,
  rectangleMove,
  rectangleEnd,
  rectangleVisible,
} from '../../utils/group';
import { createContextMenu } from '../../context-menu';
import { DatModelItem, DataModel, ImageModel } from '@/typing';
import text from '@/components/text';

class Text {
  text: Konva.Text;
  constructor(config: TextConfig, canvas: Canvas) {
    this.text = new Konva.Text(config);
    canvas.layer.add(this.text);
    const textNode = this.text;
    const stage = canvas.stage;
    textNode.on('dblclick dbltap', () => {
      // hide text node and transformer:
      textNode.hide();
      canvas.tr.hide();
      // tr.hide(); // TODO 用之前的是否可以

      // create textarea over canvas with absolute position
      // first we need to find position for textarea
      // how to find it?

      // at first lets find position of text node relative to the stage:
      var textPosition = textNode.absolutePosition();

      // then lets find position of stage container on the page:
      var stageBox = stage.container().getBoundingClientRect();

      // so position of textarea will be the sum of positions above:
      var areaPosition = {
        x: stageBox.left + textPosition.x,
        y: stageBox.top + textPosition.y,
      };

      // create textarea and style it
      var textarea = document.createElement('textarea');
      document
        .getElementsByClassName('konvajs-content')[0]
        .appendChild(textarea);

      // apply many styles to match text on canvas as close as possible
      // remember that text rendering on canvas and on the textarea can be different
      // and sometimes it is hard to make it 100% the same. But we will try...
      textarea.value = textNode.text();
      textarea.style.position = 'absolute';
      textarea.style.top = textPosition.y + 'px';
      textarea.style.left = textPosition.x + 'px';

      textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
      textarea.style.height = textNode.height() + 'px';
      textarea.style.fontSize = textNode.fontSize() + 'px';
	  
      textarea.style.paddingTop = '0';
      textarea.style.paddingBottom = '0px';
      textarea.style.margin = '0px';
      textarea.style.overflow = 'hidden';
      textarea.style.background = 'none';
      textarea.style.outline = 'block';
      textarea.style.resize = 'none';
      textarea.style.lineHeight = textNode.lineHeight();
      textarea.style.fontFamily = textNode.fontFamily();
      textarea.style.transformOrigin = 'left top';
      textarea.style.textAlign = textNode.align();
      textarea.style.color = textNode.fill();
      var px = 0;
      var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
      if (isFirefox) {
        px += 2 + Math.round(textNode.fontSize() / 20);
      }

      textarea.focus();
      sessionStorage.setItem('textEdit', 'true');
      function removeTextarea() {
        textarea.parentNode.removeChild(textarea);
        window.removeEventListener('click', handleOutsideClick);
        textNode.show();
        canvas.tr.show();
        // tr.forceUpdate();
      }

      function setTextareaWidth(newWidth) {
        if (!newWidth) {
          // set width for placeholder
          newWidth = textNode.placeholder.length * textNode.fontSize();
        }
        // some extra fixes on different browsers
        var isSafari = /^((?!chrome|android).)*safari/i.test(
          navigator.userAgent,
        );
        var isFirefox =
          navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isSafari || isFirefox) {
          newWidth = Math.ceil(newWidth);
        }

        var isEdge = document.documentMode || /Edge/.test(navigator.userAgent);
        if (isEdge) {
          newWidth += 1;
        }
        // console.log('newWidth', newWidth);
        textarea.style.width = newWidth + 'px';
      }

      textarea.addEventListener('keydown', function(e) {
        // hide on enter
        // but don't hide on shift + enter
        if (e.keyCode === 13 && !e.shiftKey) {
          textNode.text(textarea.value);
          removeTextarea();
        }
        // on esc do not set value back to node
        if (e.keyCode === 27) {
          removeTextarea();
        }
      });
      textarea.addEventListener('keyup', function(e) {
        if (textNode && textNode.attrs) {
        //   canvas.updateShapeAttrsById(textNode.attrs.id, {
        //     height: Number(textarea.style.height.slice(0, -2)) + 30,
        //   });
          canvas.updateShapeAttrsById(textNode.attrs.id, {
            width: textNode.width(),
          });
          textNode.text(textarea.value);
          
        }
      });
      textarea.addEventListener('keydown', function(e) {
        const scale = textNode.getAbsoluteScale().x;
        setTextareaWidth(textNode.width());
		textarea.style.height = '10px';
        textarea.style.height = e.target.scrollHeight + 'px';
      });
      textarea.addEventListener('blur', function(e) {
		console.log(textarea.style.height)
		canvas.updateShapeAttrsById(textNode.attrs.id, {
            height: Number(textarea.style.height.slice(0, -2)),
        });
        textNode.text(textarea.value);
        textNode.show();
		sessionStorage.setItem('textEdit', 'false');
      });
      function handleOutsideClick(e) {
        if (e.target !== textarea) {
          textNode.text(textarea.value);
          removeTextarea();
        }
      }
      setTimeout(() => {
        window.addEventListener('click', handleOutsideClick);
      });
    });

    textNode.on('transform', e => {
      const an = canvas.tr.getActiveAnchor();
      if (an === 'middle-left' || an === 'middle-right') {
        textNode.setAttrs({
          width: textNode.width() * textNode.scaleX(),
          scaleX: 1,
        });
      } else if (an === 'bottom-center') {
		textNode.setAttrs({
			height: textNode.height() * textNode.scaleY(),
			scaleX: 1,
		});
	  } else {
        textNode.setAttrs({
          width: textNode.width() * textNode.scaleX(),
          scaleX: 1,
          fontSize: textNode.fontSize() * textNode.scaleX(),
        });
      }
    });
	textNode.setAttrs({
		dragBoundFunc: function(pos:any) {
			let canvasWidth = canvas.canvasAttr.width;
			let canvasHeight = canvas.canvasAttr.height;
			let imageWidth = textNode.attrs.width;
			let imageHeight = textNode.attrs.height;
			let scaleX = textNode.attrs.scaleX;
			let scaleY = textNode.attrs.scaleY;
			return {
				y: pos.y < 1? 5 : pos.y > (Number(canvasHeight) - Number(imageHeight) * scaleY)? (Number(canvasHeight) - Number(imageHeight) * scaleY) : pos.y,
				x: pos.x < 1? 5 : pos.x > (Number(canvasWidth) - Number(imageWidth) * scaleX)? (Number(canvasWidth) - Number(imageWidth) * scaleX) : pos.x
			};
		}
	})
  }
}

export default Text;
