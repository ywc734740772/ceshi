<template>
  <div class="views view-main">
    <div class="navbar">
      <div class="navbar-inner navbar-on-center">
        <div class="left" @click="$router.back(-1)">
          <a href="javascript:" class="back link">
            <img src="../../images/back.png">
          </a>
        </div>
        <div class="center" style="left: -145.5px;">我的地址</div>
      </div></div>
    <div class="pages navbar-through toolbar-through">

      <div data-page="deliveryAddress" class="page deliveryAddress page-on-center">
        <div class="page-content">
          <div class="list-block Mycenter" style="margin:10px 0;">
            <ul>
              <li>
                <router-link to="/addAddress" class="item-content">
                  <div class="item-inner">
                    <div class="item-input" style="text-align:center;">
                      <img src="../../images/add.png">&nbsp;添加新收货地址
                    </div>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
          <div class="list-block media-list" style="margin:10px 0;">
            <ul>
              <li>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title-row">
                      <div class="item-title">橘子 18118725189</div>
                    </div>
                    <div class="item-text">上海市卢湾区南昌路203号202室</div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title-row">
                      <div class="item-title">lisa 18221819403</div>
                    </div>
                    <div class="item-text">上海市浦东新区张杨路3611号1座211商铺</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {};
    },
    activated() {
      this.$nextTick(() => {
        this.$store.commit('isLoading', false);
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .views
    z-index: 6000;
</style>
