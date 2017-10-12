<template>
    <div class="list-block media-list">
      <ul>
        <li>
          <router-link to="/goodsDetail" class="item-link item-content">
            <div class="item-media">
              <img src="../../images/2.png">
              <!--<x-img :src="defaultImg" :webp-src="`${defaultImg}?type=webp`" :default-src="$store.state.imgLazyLoad"></x-img>-->
            </div>
            <div class="item-inner">
              <div class="item-title-row">
                <div class="item-title" v-text="GroupListGoods.Name"></div>
              </div>
              <div class="item-subtitle">地标地产、新鲜上市、清爽甘甜</div>
              <div class="item-text">
                <div class="row">
                  <div class="commodity-money">
                    <span class="money">{{GroupListGoods.Price|formatMoney}}</span>
                    <span class="unit" v-text="`/${GroupListGoods.Unit}`"></span>
                  </div>
                  <div>
                    <img src="../../images/plus.png">
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
</template>

<script type="text/ecmascript-6">
  import { XImg } from 'vux';
  import defaultImg from '../../images/2.png';
  export default {
    props: ['GroupListGoods'],
    data () {
      return {
        defaultImg: defaultImg
      };
    },
    created () {
    },
    components: {
      XImg
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .list-block:last-child ul::after
      content: none;
</style>
