import { queryBricks, addBrick, updateBrick, removeBrick, querybrick } from './service';

const Model = {
  namespace: 'brick',

  state: {
    data: {},
  },

  effects: {
    * fetch({ payload }, { call, put }) {
      const response = yield call(queryBricks, payload);

      yield put({ type: 'save', payload: response });
    },
    * show({ payload, callback }, { call, put }) {
      const response = yield call(querybrick, payload);

      yield put({ type: 'single', payload: response });
      if (callback && typeof callback === 'function') {
        callback();
      }
    },
    * add({ payload }, { call, put }) {
      yield call(addBrick, payload);
      yield put({ type: 'fetch' });
    },
    * remove({ payload, callback }, { call }) {
      yield call(removeBrick, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
    },
    * update({ payload, callback }, { call }) {
      yield call(updateBrick, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    single(state, action) {
      return {
        ...state,
        single: action.payload,
      };
    },
  },
};

export default Model;