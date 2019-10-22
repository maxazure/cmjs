import { queryDfields, addDfield, updateDfield, removeDfield, querydfield } from './service';

const Model = {
  namespace: 'dfield',

  state: {
    data: {},
  },

  effects: {
    * fetch({ payload }, { call, put }) {
      const response = yield call(queryDfields, payload);

      yield put({ type: 'save', payload: response });
    },
    * show({ payload, callback }, { call, put }) {
      const response = yield call(querydfield, payload);

      yield put({ type: 'single', payload: response });
      if (callback && typeof callback === 'function') {
        callback();
      }
    },
    * add({ payload }, { call, put }) {
      yield call(addDfield, payload);
      yield put({ type: 'fetch' });
    },
    * remove({ payload, callback }, { call }) {
      yield call(removeDfield, payload);
      if (callback && typeof callback === 'function') {
        callback();
      }
    },
    * update({ payload, callback }, { call }) {
      yield call(updateDfield, payload);
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