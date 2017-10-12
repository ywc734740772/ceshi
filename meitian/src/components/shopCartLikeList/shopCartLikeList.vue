<template>
  <router-link to="/goodsDetail" class="item-link item-content col-50 commodity-money">
    <!--<img src="../../images/11.jpg">-->
    <x-img :src="defaultImg" :webp-src="`${defaultImg}?type=webp`" :default-src="$store.state.imgLazyLoad"
           container=".page-content"></x-img>
    <div class="title">美国加州车厘美国加州车</div>
    <div class="price" style="text-decoration:line-through">¥ 100.90/盒</div>
    <div class="hotsearch-pay">
      <span class="money">¥ 49.90/盒</span>
      <span class="img">
        <img src="../../images/plus.png">
      </span>
    </div>
  </router-link>
</template>

<script type="text/ecmascript-6">
  import { XImg } from 'vux';
  import defaultImg from '../../images/11.jpg';
  export default {
    props: {},
    data () {
      return {
        defaultImg: defaultImg
      };
    },
    components: {
      XImg
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
