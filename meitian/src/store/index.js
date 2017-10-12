import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './types';

Vue.use(Vuex);

const state = {
  loading: true,
  isLogin: false,
  isMenu: true,
  userInfo: {},
  goodsInfo: {},
  CartInfo: [],
  createOrderInfo: {},
  locationAddress: {},
  address: {},
  direction: 'forward',
  imgLazyLoad: 'http://t1.itsmore.com:62006/ios.v2/img/cover.png',
  passportUrl: 'http://61.172.255.31:9001',
  apiUrl: 'http://at.itsmore.com',
  shopId: 28
};
const mutations = {
  isLoading (state, data) {
    state.loading = data;
  },
  isLogin (state, data) {
    state.isLogin = data;
  },
  CurrentUser (state, data) {
      if (data.type === 'logout') {
        state.userInfo = {};
        localStorage.removeItem('userInfo');
        return;
      }
      if (data.UserId && data.UserId !== '') {
        state.userInfo = data;
      } else {
        state.userInfo.Profile[data.type] = data[data.type];
      }
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
  },
  isMenu (state, data) {
    state.isMenu = data;
  },
  goodsInfos (state, data) {
    if (data === 'subOrder') {
      // state.goodsInfo = {};
      state.goodsInfo.count = 0;
      delete state.goodsInfo.Quantity;
      state.goodsInfo.OrderQuantity = 0;
    } else {
      state.goodsInfo = data;
    }
    localStorage.setItem('goodsInfo', JSON.stringify(state.goodsInfo));
  },
  addCart (state, data) {
    if (data.count) {
      state.CartInfo.push(data);
    }
    state.CartInfo.forEach((val, index) => {
      val._index = index;
    });
    if (data === 'subOrder') {
        let len = state.CartInfo.length;
        for (let i = 0; i < len; i++) {
          if (state.CartInfo[i] && state.CartInfo[i].isChecked) {
            state.CartInfo.splice(i--, 1);
          }
        }
    }
    localStorage.setItem('CartInfo', JSON.stringify(state.CartInfo));
  },
  ModifyQuantity (state, data) {
    if (!data.count) {
      state.CartInfo[state.CartInfo.indexOf(data)].isChecked = true;
      state.CartInfo.splice(state.CartInfo.indexOf(data), 1);
    }
    if (state.CartInfo.length) {
      state.CartInfo.forEach((val, index) => {
        val._index = index;
      });
      localStorage.setItem('CartInfo', JSON.stringify(state.CartInfo));
    } else {
      localStorage.removeItem('CartInfo');
    }
  },
  selectGoods (state, data) {
    if (data.isChecked) {
      if (data.count) {
        state.CartInfo[state.CartInfo.indexOf(data)].isChecked = data.isChecked;
      }
    } else {
      state.CartInfo[state.CartInfo.indexOf(data)].isChecked = data.isChecked;
    }
    localStorage.setItem('CartInfo', JSON.stringify(state.CartInfo));
  },
  select (state, data) {
    state.CartInfo.forEach((val, index) => {
      val.isChecked = data;
    });
    localStorage.setItem('CartInfo', JSON.stringify(state.CartInfo));
  },
  saveOrderInfo (state, data) {
    state.createOrderInfo = data;
    localStorage.setItem('createOrderInfo', JSON.stringify(state.createOrderInfo));
  },
  address (state, data) {
    state.address = data;
  },
  locationAddress (state, data) {
    state.locationAddress = data;
  },
  [types.UPDATE_DIRECTION](state, payload) {
    state.direction = payload.direction;
  }
};
const actions = {
  // goodsInfos: ({commit}) => commit('goodsInfos')
};
const getters = {
  // goodsInfos (state) {
  //   return state.goodsInfo;
  // }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
