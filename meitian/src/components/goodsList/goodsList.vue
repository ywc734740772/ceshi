<template>
  <li>
    <router-link to="/goodsDetail" class="item-content">
      <div class="item-media">
        <!--<img :src="newGoodsItem.image" width="110">-->
        <x-img :src="newGoodsItem.image" :webp-src="`${newGoodsItem.image}?type=webp`" :default-src="$store.state.imgLazyLoad"
               style="width: 110px;" container=".page-content"></x-img>
      </div>
      <div class="item-inner">
        <div class="item-title-row">
          <div class="item-title" v-text="newGoodsItem.Name"></div>
        </div>
        <div class="item-text" v-if="newGoodsItem.title" v-text="newGoodsItem.title"></div>
        <div class="row">
          <div class="col-33" v-if="newGoodsItem.origin">
            <div v-text="newGoodsItem.origin"></div>
            <div class="item-text">产地</div>
          </div>
          <div class="col-66" v-if="newGoodsItem.diameter">
            <div v-text="newGoodsItem.diameter + 'mm'"></div>
            <div class="item-text">国径</div>
          </div>
        </div>
        <div v-if="newGoodsItem.oldPrice" class="commodity-money">
          <span class="money price" v-text="'已降¥' + newGoodsItem.oldPrice.toFixed(2)"></span>
        </div>
        <div class="commodity-money">
          <span class="money" v-text="'¥' + Number(newGoodsItem.Price).toFixed(2)"></span>
          <span class="unit" v-text="'/' + newGoodsItem.Unit"></span>
        </div>
      </div>
      </router-link>
  </li>
</template>

<script type="text/ecmascript-6">
  import { XImg } from 'vux';
  export default {
    props: ['newGoodsItem'],
    data () {
      return {};
    },
    components: {
      XImg
    },
    methods: {
    },
    mounted () {}
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
