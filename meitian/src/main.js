import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import WeVue from 'we-vue';
import 'we-vue/lib/style.css';
import App from './App';
import store from './store';
import home from './components/home/home.vue';
import classification from './components/classification/classification.vue';
import shoppingCart from './components/shoppingCart/shoppingCart.vue';
import my from './components/my/my.vue';
import setting from './components/my/setting.vue';
import about from './components/my/about.vue';
import feedback from './components/my/feedback.vue';
import order from './components/order/order.vue';
import goodsDetail from './components/goodsDetail/goodsDetail.vue';
import selectAddress from './components/selectAddress/selectAddress.vue';
import addAddress from './components/addAddress/addAddress.vue';
import deliveryAddress from './components/deliveryAddress/deliveryAddress.vue';
import moreAddress from './components/moreAddress/moreAddress.vue';
import search from './components/search/search.vue';
import hotSearch from './components/search/hotSearch.vue';
import settlement from './components/settlement/settlement.vue';
import settlementList from './components/settlementList/settlementList.vue';
import placeOrder from './components/placeOrder/placeOrder.vue';
import payment from './components/payment/payment.vue';
import invoiceInformation from './components/invoiceInformation/invoiceInformation.vue';
import paperInvoice from './components/paperInvoice/paperInvoice.vue';
import electronicInvoice from './components/electronicInvoice/electronicInvoice.vue';
import valueAddedInvoice from './components/valueAddedInvoice/valueAddedInvoice.vue';
import orderSettlement from './components/orderSettlement/orderSettlement.vue';
import login from './components/userCenter/login.vue';
import register from './components/userCenter/register.vue';
import agreement from './components/userCenter/agreement.vue';
import forgotPassword from './components/userCenter/forgotPassword.vue';
import accountSetting from './components/userCenter/accountSetting.vue';
import modifyName from './components/userCenter/modifyName.vue';
import modifyNickName from './components/userCenter/modifyNickName.vue';
import modifyEmail from './components/userCenter/modifyEmail.vue';
import modifyPhone from './components/userCenter/modifyPhone.vue';
import modifyPassword from './components/userCenter/modifyPassword.vue';

Vue.use(WeVue);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

const routes = [{
  path: '*',
  redirect: '/home'
},
  {
    path: '/home',
    component: home,
    meta: { keepAlive: true }
  }, {
    path: '/classification',
    component: classification,
    meta: { keepAlive: true }
  }, {
    path: '/shoppingCart',
    component: shoppingCart
  }, {
    path: '/my',
    component: my,
    children: [{
      path: 'orderSettlement', component: orderSettlement
    }]
  }, {
    path: '/order',
    component: order
  }, {
    path: '/setting',
    component: setting
  }, {
    path: '/feedback',
    component: feedback
  }, {
    path: '/about',
    component: about
  }, {
    path: '/goodsDetail',
    component: goodsDetail
  }, {
    path: '/selectAddress',
    component: selectAddress
  }, {
    path: '/addAddress',
    component: addAddress
  }, {
    path: '/deliveryAddress',
    component: deliveryAddress
  }, {
    path: '/moreAddress',
    component: moreAddress
  }, {
    path: '/search',
    component: search
  }, {
    path: '/hotSearch',
    component: hotSearch
  }, {
    path: '/settlement',
    component: settlement
  }, {
    path: '/settlementList',
    component: settlementList
  }, {
    path: '/placeOrder',
    component: placeOrder
  }, {
    path: '/payment',
    component: payment
  }, {
    path: '/invoiceInformation',
    component: invoiceInformation,
    children: [{
      path: 'paperInvoice', component: paperInvoice
    },
      {
        path: 'electronicInvoice', component: electronicInvoice
      },
      {
        path: 'valueAddedInvoice', component: valueAddedInvoice
      }
    ]
  }, {
    path: '/login',
    component: login
  }, {
    path: '/register',
    component: register
  }, {
    path: '/agreement',
    component: agreement
  }, {
    path: '/forgotPassword',
    component: forgotPassword
  }, {
    path: '/accountSetting',
    component: accountSetting
  }, {
    path: '/modifyName',
    component: modifyName
  }, {
    path: '/modifyNickName',
    component: modifyNickName
  }, {
    path: '/modifyEmail',
    component: modifyEmail
  }, {
    path: '/modifyPhone',
    component: modifyPhone
  }, {
    path: '/modifyPassword',
    component: modifyPassword
  }];

const router = new VueRouter({
  // mode: 'history',
  linkActiveClass: 'active',
  routes
});

/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
router.beforeEach((to, from, next) => {
  // vm.$store.commit('isLoading', true);
  next();
});
router.afterEach((to, from) => {
  // if (from.path === '/my/orderSettlement') {
  setTimeout(() => {
    vm.$store.commit('isLoading', false);
  }, 300);
  // }
});
// router.push('/home');

const history = window.sessionStorage;
history.clear();
let historyCount = history.getItem('count') * 1 || 0;
history.setItem('/', 0);

router.beforeEach(function (to, from, next) {
  const toIndex = history.getItem(to.path);
  const fromIndex = history.getItem(from.path);

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('UPDATE_DIRECTION', {direction: 'forward'});
    } else {
      store.commit('UPDATE_DIRECTION', {direction: 'reverse'});
    }
  } else {
    ++historyCount;
    history.setItem('count', historyCount);
    to.path !== '/' && history.setItem(to.path, historyCount);
    store.commit('UPDATE_DIRECTION', {direction: 'forward'});
  }
  next();
});

vm.mt = null;
Vue.filter('formatMoney', function (val) {
  if (Number(val)) {
    return '¥ ' + Number(val).toFixed(2);
  } else {
    return val;
  }
});
