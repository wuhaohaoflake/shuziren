import { Effect, Reducer } from 'umi';

export interface IGlobalState {
  menus: [];
}

export interface IGlobalModel {
  namespace: string;
  state: IGlobalState;
  //   effects: Effect;
  reducers: {
    setMenus: Reducer;
  };
}

const GlobalModel: IGlobalModel = {
  namespace: 'global',
  state: {
    menus: [],
  },
  //   effects: {

  //   },
  reducers: {
    setMenus: (state, { menus }) => {
      return {
        ...state,
        menus,
      };
    },
  },
};

export default GlobalModel;
