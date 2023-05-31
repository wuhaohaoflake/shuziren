import { uuid, getCenterXY } from '@/utils/util';
import { DataModel, DatModelItem } from '@/typing';
import _ from 'lodash';
import canvasModel from './canvasModel';

export type CanvasModel = {
  width: number;
  height: number;
  nodes: DataModel;
};

const initData: DataModel = [];
const newData: any = [];

const recordPush = (nodes: any, undoRedoData: any, updateUndoRedoData: any) => {
  const newNodes = undoRedoData.activeSnapshot || nodes;
  updateUndoRedoData({ type: 'push', data: newNodes });
  return newNodes;
};
const canvasDataModel = ({ get, set }: any) => ({
  width: 814,
  height: 460,
  nodes: newData || initData,
  changeCanvasModel: (currCanvasModel: any) => {
    set(currCanvasModel);
  },
  changeCanvasModelDataItem: (currDataModelItem: DatModelItem) => {
    const { nodes } = get();
    const { changeCanvas, updateUndoRedoData, undoRedoData } = get(canvasModel);
    changeCanvas({
      selectNode: currDataModelItem,
    });
    const currNodes = undoRedoData.activeSnapshot || nodes;
    updateUndoRedoData({ type: 'push', data: currNodes });
    set((state: any) => {
      let index = currNodes.findIndex(
        (item: DatModelItem) => item.id === currDataModelItem.id,
      );
      currNodes[index] = currDataModelItem;
      return {
        nodes: [...currNodes],
      };
    });
  },
  addGroup: (groupKey: string, group: Array<DatModelItem>) => {
    const { changeCanvas, updateUndoRedoData, undoRedoData } = get(canvasModel);
    set((state: any) => {
      _.remove(state.nodes, n => {
        const index = group.findIndex(f => f.id === n.id);
        return index != -1;
      });
      const index = state.nodes.findIndex(
        (f: DatModelItem) => f.id === groupKey,
      );
      let currNode = null;
      if (index !== -1) {
        currNode = { ...state.nodes[index], children: group };
        state.nodes[index] = currNode;
      } else {
        currNode = {
          id: groupKey,
          type: 'group',
          draggable: true,
          children: group,
        };
        state.nodes.push(currNode);
      }
      changeCanvas({
        selectNode: currNode,
      });

      return {
        nodes: [...state.nodes],
      };
    });
  },
  removeGroup: (groupKey: string) => {
    set((state: any) => {
      const index = state.nodes.findIndex(
        (f: DatModelItem) => f.id === groupKey,
      );
      const currGroup = state.nodes?.[index];
      if (!currGroup) {
        return;
      }
      currGroup.children?.forEach((item: any) => {
        item.child = undefined;
        item.draggable = true;
        item.x = item.x + currGroup.x;
        item.y = item.y + currGroup.y;
        item.offsetX = item.width / 2;
        item.offsetY = item.height / 2;
        item.rotation = currGroup.rotation;
        item.skewX = item.skewX + currGroup.skewX;
        item.scaleX = currGroup.scaleX;

        item.skewY = currGroup.skewY;
        item.scaleY = currGroup.scaleY;
        state.nodes.push(item);
      });
      _.remove(state.nodes, n => {
        return n.id == groupKey;
      });

      return {
        nodes: [...state.nodes],
      };
    });
  },

  addNode: (node: DatModelItem, nodeWidth: number, nodeHeight: number) => {
    const { width, height, nodes } = get();
    const { changeCanvas, undoRedoData, updateUndoRedoData } = get(canvasModel);
    const [x, y] = getCenterXY(width, height, nodeWidth, nodeHeight);
    node.x = x;
    node.y = y;
    const newNodes = recordPush(nodes, undoRedoData, updateUndoRedoData);
    set((state: any) => {
      return {
        nodes: [...newNodes, node],
      };
    });

    changeCanvas({
      selectNode: node,
    });
  },
  addText: () => {
    const { addNode } = get();
    const textWidth = 360;
    const textHeight = 60;
    const currTextDateItem: DatModelItem = {
      x: 0,
      y: 0,
      id: uuid(),
      fontSize: 60,
      type: 'text-input',
      text: '双击编辑文字',
      fill: '#000000',
      width: textWidth,
      height: textHeight,
    };
    addNode(currTextDateItem, textWidth, textHeight);
  },
  addImage: (url: string) => {
    const { addNode } = get();
    const textWidth = 400;
    const textHeight = 200;
    const currTextDateItem: DatModelItem = {
      id: uuid(),
      type: 'image',
      url,
    };
    addNode(currTextDateItem, textWidth, textHeight);
  },
  removeNode: (id: string) => {
    const { nodes } = get();
    const { undoRedoData, updateUndoRedoData } = get(canvasModel);
    const currNodes = recordPush(nodes, undoRedoData, updateUndoRedoData);
    set((state: any) => {
      let newNodes = currNodes.filter((item: DatModelItem) => item.id !== id);
      return {
        nodes: [...newNodes],
      };
    });
  },
  copyNode: (item: DatModelItem) => {
    const { nodes } = get();
    const { changeCanvas, undoRedoData, updateUndoRedoData } = get(canvasModel);
    item.id = uuid();
    item.x += 20;
    item.y += 20;
    const newNodes = recordPush(nodes, undoRedoData, updateUndoRedoData);
    set((state: any) => {
      return {
        nodes: [...newNodes, item],
      };
    });
    changeCanvas({
      selectNode: item,
    });
  },
  setTemplate: (data: any) => {
    const { setTemplate } = get(canvasModel);
    set((state: any) => {
      setTemplate(data);
      return {
        width: data.width,
        height: data.height,
        nodes: data.nodes,
      };
    });
  },
});

export default canvasDataModel;
