import Konva from 'konva';

/**
 * 画布内元素类型
 */
export type ElementType =
  | 'color'
  | 'image'
  | 'text'
  | 'rect'
  | 'text-input'
  | 'bg-image'
  | 'shuziren-image'
  | 'group';

export type BaseModel = {
  id: string;
  name?: string;
  type: ElementType;
  draggable?: boolean;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

/**
 * 画布背景类
 */
export type BgModel = BaseModel & {
  color?: string; // 背景颜色
  url?: string; // 背景图片
};

/**
 * 文本类
 */
export type TextModel = BaseModel & Konva.TextConfig;

/**
 * 矩形类
 */
export type ReactModel = BaseModel & Konva.RectConfig;
/**
 * 矩形类
 */
export type ImageModel = BaseModel & Konva.RectConfig;

export type GroupModel = BaseModel & {
  children: Array<DatModelItem>;
};

/**
 * DataModel Item
 */
export type DatModelItem =
  | BgModel
  | TextModel
  | ReactModel
  | GroupModel
  | ImageModel;

// 画布内数据类
export type DataModel = Array<DatModelItem>;

export type ShapePanelType = 'canvas' | 'text';

// 节点位置信息
export type LocationItem = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  l: number; // 左侧对齐线
  r: number; // 右侧对齐线
  t: number; // 顶部对齐线
  b: number; // 底部对齐线
  lc: number; // 左侧居中对齐线
  tc: number; // 顶部居中弄对齐线
};

export type UndoRedoActionType = {
  type: 'push' | 'undo' | 'redo';
  data: DatModelItem | null;
};

export type PaginationParams = {
  pageIndex: number;
  pageSize: number;
};

export type IInfiniteScrollListResponseData = {
  rows: Array<Record<string, any>>;
  count: number;
};
