import { Reducer } from 'umi';
export interface IRuleState {
  rotatePositions: {};
  weights: {};
  isRelas: {};
}

export interface IModelRule {
  namespace: string;
  state: IRuleState;
  effects: {};
  reducers: {
    changeRotatePositions: Reducer;
    changeWeights: Reducer;
    changeIsRelas: Reducer;
  };
}
const Model: IModelRule = {
  namespace: 'rule',
  state: {
    rotatePositions: {},
    weights: {},
    isRelas: {},
  },
  effects: {},
  reducers: {
    changeRotatePositions: (state, { payload }) => {
      return {
        ...state,
        rotatePositions: {
          ...state.rotatePositions,
          ...payload,
        },
      };
    },
    changeWeights: (state, { payload }) => {
      return {
        ...state,
        rotatePositions: {
          ...state.weights,
          ...payload,
        },
      };
    },
    changeIsRelas: (state, { payload }) => {
      return {
        ...state,
        rotatePositions: {
          ...state.isRelas,
          ...payload,
        },
      };
    },
  },
};

export default Model;
