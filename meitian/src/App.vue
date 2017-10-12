<template>
  <div id="app">
    <!--<div id="loading" v-if="$store.state.loading">-->
      <!--<vue-loading type="spin" color="rgb(32, 160, 255)" :size="{ width: '40px', height: '40px' }"></vue-loading>-->
    <!--</div>-->
    <div class="toolbar tabbar tabbar-labels" v-if="$store.state.isMenu">
      <div class="toolbar-inner">
        <router-link to="/home" class="tab-link">
          <i class="iconfont">&#xe637;</i>
          <span class="tabbar-label">首页</span>
        </router-link>
        <router-link to="/classification" class="tab-link">
          <i class="iconfont">&#xe664;</i>
          <span class="tabbar-label">分类</span>
        </router-link>
        <router-link to="/shoppingCart" class="tab-link">
          <span class="cartNum" v-if="cartCount" v-text="cartCount"></span>
          <i class="iconfont">&#xe604;</i>
          <span class="tabbar-label">购物车</span>
        </router-link>
        <router-link to="/my" class="tab-link">
          <i class="iconfont">&#xe6d6;</i>
          <span class="tabbar-label">我的</span>
        </router-link>
      </div>
    </div>
    <!--<transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">-->
    <!--<transition name="vux-pop-in">-->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <!--<router-view v-if="!$route.meta.keepAlive"></router-view>-->
    <!--</transition>-->
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-new */
  import vueLoading from 'vue-loading-template';
  import {mapState} from 'vuex';

  export default {
    data() {
      return {};
    },
    computed: {
      ...mapState({
        cartCount: (data) => {
          let cartCount = 0;
          if (!data.CartInfo.length && localStorage.getItem('CartInfo')) {
            data.CartInfo = JSON.parse(localStorage.getItem('CartInfo'));
          }
          data.CartInfo.forEach((val) => {
            cartCount += val.count;
          });
          return cartCount;
        },
        direction: state => state.direction
      })
    },
    mounted() {
//      this.axios.get('/pspt/auth/ajax/currentuser.ashx?id=8B1866A2-AAC0-4CC9-92FC-D38F541E6879').then((res) => {
//        res = res.data;
//        console.log(res);
//      }).catch(function (err) {
//        console.log(err);
//      });
    },
    methods: {},
    components: {
      vueLoading
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../static/css/reset.css";
  @import "../static/css/framework7.ios.min.css";
  @import "../static/css/public.css";
  @import "../static/css/app.css";

  #app
    position: relative
    height: 100%
    width: 100%
  #loading
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(197, 197, 197, .5);
    left: 0;
    top: 0;
    z-index: 6666;
    display: flex;
    justify-content: center;
  .views
    z-index: 6000;
  .tabbar-labels
    position: absolute;
    background: #ffffff;
    font-size: 13px;
    width: 100%
    height: 50px
    backface-visibility: hidden;
    transform: translate3d(0, 0, 0);
    box-sizing: border-box;
    color: #929292;
    left: 0;
    bottom: 0;
    z-index: 5001;
    .toolbar-inner
      width: 100%;
      height: 100%;
      padding: 4px 0;
      overflow: hidden
      .tab-link
        padding-top: 1px;
        position: relative;
        .iconfont
          font-size: 20px;
        .cartNum
          min-width: 10px;
          height: 10px;
          line-height 10px;
          padding: 1px;
          text-align: center;
          border-radius: 10px;
          color: red;
          font-size: 10px;
          border: solid 1px red;
          background: #fff;
          position: absolute;
          left: 52%;
          top: 0;
      .active
        color: #66CC66
  .vux-pop-out-enter-active,
  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active,
  .vux-pop-in-leave-active
    will-change: transform;
    transition: all 350ms
    height: 100%
    top: 0
    position: absolute
    backface-visibility: hidden
    perspective: 1000
  .vux-pop-out-enter
    opacity: 0
    transform: translate3d(-100%, 0, 0)
  .vux-pop-out-leave-active
    opacity: 0
    transform: translate3d(100%, 0, 0)
  .vux-pop-in-enter
    opacity 0
    transform translate3d(100%, 0, 0)
  .vux-pop-in-leave-active
    opacity 0
    transform translate3d(-100%, 0, 0)
</style>

