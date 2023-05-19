import { Effect, Reducer } from 'umi';
import { fetchAccountLogin, fetchAccountLogout } from '@/services/login';
import { history } from 'umi';
import {
  setCurrentUser,
  removeCurrentUser,
  getCurrentUser,
} from '@/utils/user';

export interface IStateLogin {
  status?: string;
}

export interface IModelLogin {
  namespace: string;
  state: IStateLogin;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer;
  };
}
const Model: IModelLogin = {
  namespace: 'login',
  state: {
    status: '',
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fetchAccountLogin, {
        account: payload.UserName,
        password: payload.Password,
      });
      const user = response.data;
      yield put({
        type: 'changeLoginStatus',
        payload: user,
      });
      setCurrentUser(user);
      window.location.href = '/';
    },

    *logout(_, { call, put, select }) {
      const currentUser = getCurrentUser();
      yield call(fetchAccountLogout, {
        accessId: currentUser.accessId,
        accessKey: currentUser.accessKey,
      });
      removeCurrentUser();
      window.location.href = '/';
    },
  },
  reducers: {
    changeLoginStatus: (state, { payload }) => {
      return {
        ...state,
        user: payload,
      };
    },
  },
};

export default Model;
