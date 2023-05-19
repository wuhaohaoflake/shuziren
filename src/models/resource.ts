import { Effect, Reducer } from 'umi';
import { fetchResources } from '@/services/resource';

export interface IResourceSate {
  resources: [];
  resourceNode: [];
}
interface IModelResource {
  namespace: string;
  state: IResourceSate;
  effects: {
    fetchResources: Effect;
  };
  reducers: {
    saveResources: Reducer;
    saveResourceNode: Reducer;
  };
}

const Resource: IModelResource = {
  namespace: 'resource',
  state: {
    resources: [],
    resourceNode: [],
  },
  effects: {
    *fetchResources({ payload }, { call, put }) {
      const result = yield call(fetchResources, payload);
      yield put({
        type: 'saveResources',
        payload: result.data.map(
          (item: { resourceId: string }) => item.resourceId,
        ),
      });
      yield put({
        type: 'saveResourceNode',
        payload: result.data,
      });
    },
  },
  reducers: {
    saveResources: (state, { payload }) => {
      return {
        ...state,
        resources: payload,
      };
    },
    saveResourceNode: (state, { payload }) => {
      return {
        ...state,
        resourceNode: payload,
      };
    },
  },
};

export default Resource;
