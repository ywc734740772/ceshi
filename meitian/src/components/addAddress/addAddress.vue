<template>
  <div class="views view-main">
    <div class="navbar">
      <div class="navbar-inner navbar-on-center">
        <div class="left" @click="$router.back(-1)">
          <a href="javascript:" class="back link">
            <img src="../../images/back.png">
          </a>
        </div>
        <div class="center" style="left: 3px;">我的地址</div>
        <div class="right">
          <router-link to="/deliveryAddress">保存</router-link>
        </div>
      </div></div>
    <div class="pages navbar-through toolbar-through">

      <div data-page="addAddress" class="page selectAddress no-toolbar toolbar-fixed page-on-center">
        <div class="page-content">
          <div class="list-block margin-content">
            <ul>
              <li>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title label" style="width: 21%">收货地址</div>
                    <router-link to="/moreAddress" class="item-input" tag="div">
                      <input type="text" placeholder="小区/写字楼/学校" :value="`${$store.state.address.address ? province + district + $store.state.address.address: ''}`">
                    </router-link>
                  </div>
                </div>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title label" style="width: 20%"></div>
                    <div class="item-input">
                      <input type="text" placeholder="具体信息（楼号/楼层/房号）" :value="`${$store.state.address.name ? $store.state.address.name : ''}`">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title label" style="width: 21%">联系人</div>
                    <div class="item-input">
                      <input type="text" placeholder="您的姓名">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title label" style="width: 21%">手机号</div>
                    <div class="item-input">
                      <input type="text" placeholder="配送员联系您的手机号">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title label" style="width: 21%">标签</div>
                    <div class="item-input">
                      <input type="text" placeholder="选择“家、公司”标签">
                    </div>
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
      return {
        province: '',
        district: ''
      };
    },
    created() {
    },
    activated() {
      this.$nextTick(() => {
        this.$store.commit('isLoading', false);
        if (this.$store.state.locationAddress.info) {
          this.province = this.$store.state.locationAddress.addressComponent ? this.$store.state.locationAddress.addressComponent.province : this.$store.state.locationAddress.regeocode.addressComponent.province;
          this.district = this.$store.state.locationAddress.addressComponent ? this.$store.state.locationAddress.addressComponent.district : this.$store.state.locationAddress.regeocode.addressComponent.district;
        }
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .views
    z-index: 6000;
</style>
