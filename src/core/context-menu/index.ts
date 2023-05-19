import Stage from '../shape/stage/index';
import Canvas from '../Canvas';
import { uuid } from '../../utils/util';
import { DatModelItem, DataModel, ImageModel } from '@/typing';

export const createContextMenu = (
  stage: Stage,
  canvas: Canvas,
): HTMLDivElement => {
  const contextMenu = document.querySelector('.core-context-menu');
  if (contextMenu) {
    contextMenu.remove();
  }
  const box = document.createElement('div');
  box.className = 'core-context-menu';
  box.innerHTML = `<div>
    <button id="context-menu-copy">复制</button>
    <button id="context-menu-del">删除</button>
  </div>
  `;

  document.body.appendChild(box);
  window.addEventListener('click', () => {
    if (box) {
      box.style.display = 'none';
    }
  });

  document
    .getElementById('context-menu-move-up')
    ?.addEventListener('click', () => {
      stage.currNode?.moveUp();
    });
  document
    .getElementById('context-menu-move-down')
    ?.addEventListener('click', () => {
      stage.currNode?.moveDown();
    });

  document
    .getElementById('context-menu-move-top')
    ?.addEventListener('click', () => {
      stage.currNode?.moveToTop();
    });

  document
    .getElementById('context-menu-move-bottom')
    ?.addEventListener('click', () => {
      stage.currNode?.moveToBottom();
      stage.currNode?.moveUp();
    });

  document
    .getElementById('context-menu-copy')
    ?.addEventListener('click', () => {
      if (stage.currNode) {
        const modelItem = stage.currNode.attrs;
        modelItem.id = uuid();
        modelItem.x += 20;
        modelItem.y += 20;
        canvas.copy(modelItem);
  
      }
    });

  document.getElementById('context-menu-del')?.addEventListener('click', () => {
    canvas.selectBg();
    canvas.tr.nodes([]);
    stage.currNode?.destroy();
  });
  return box;
};
