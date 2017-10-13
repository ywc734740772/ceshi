<template>
  <div class="views">
    <div class="view view-main">
      <div class="navbar">
        <div class="navbar-inner navbar-on-center">
          <div class="left" @click="$router.back(-1)">
            <a href="javascript:" class="back link">
              <img src="../../images/back.png">
            </a>
          </div>
          <div class="center" style="left:0;">商品信息</div>
          <div class="right"></div>
        </div></div>
      <div class="pages navbar-through toolbar-through">
        <div data-page="settlementList" class="page settlementList page-on-center">
          <div class="page-content">
            <div v-for="(OrderGoodsInfosItem, index) in OrderGoodsInfos">
              <div class="margin-content list-block media-list" style="margin:15px 0 0 0;">
              <ul>
                <li>
                  <div class="item-link item-content">
                    <div class="item-inner">
                      <div class="item-title-row">
                        <div class="item-title" v-text="`包裹${index+1}`"></div>
                        <div class="item-after" v-text="`共${OrderGoodsInfosItem.count}件`"></div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
              <div class="list-block media-list margin-none">
              <ul>
                <li>
                  <a href="#" class="item-link item-content">
                    <div class="item-media">
                      <img :src="defaultImg" width="60">
                    </div>
                    <div class="item-inner">
                      <div class="item-title-row">
                        <div class="item-title" v-text="OrderGoodsInfosItem.Name||OrderGoodsInfosItem.name2"></div>
                        <div class="item-after">{{(OrderGoodsInfosItem.Price||OrderGoodsInfosItem.price) * OrderGoodsInfosItem.count|formatMoney}}</div>
                      </div>
                      <div class="item-text" style="height: auto;">
                        {{'规格：'}}
                        <span v-if="OrderGoodsInfosItem.SubGoods.length" v-for="OrderGoodsListSubGoods in OrderGoodsInfosItem.SubGoods" v-text="`${OrderGoodsListSubGoods.Name} / `"></span>
                        <span v-if="!OrderGoodsInfosItem.SubGoods" v-text="`${OrderGoodsInfosItem.UnitQuantity||OrderGoodsInfosItem.weight}/${OrderGoodsInfosItem.Unit||OrderGoodsInfosItem.unit}`"></span>
                      </div>
                      <div class="item-text">{{'单价：'}}{{OrderGoodsInfosItem.Price||OrderGoodsInfosItem.price|formatMoney}}{{'/'+ (OrderGoodsInfosItem.Unit||OrderGoodsInfosItem.unit)}}   {{'数量：'+ OrderGoodsInfosItem.count + (OrderGoodsInfosItem.Unit||OrderGoodsInfosItem.unit)}}</div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            </div>
          </div>
        </div></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex';
  import defaultImg from '../../images/11.jpg';
  export default {
    data() {
      return {
        defaultImg: defaultImg
      };
    },
    computed: {
      ...mapState({
        OrderGoodsInfos: (data) => {
          let OrderGoodsInfos = [];
          data.CartInfo.forEach((val) => {
            if (val.isChecked) {
              OrderGoodsInfos.push(val);
            }
          });
          return OrderGoodsInfos;
        },
        ParcelNum: (data) => {
          let ParcelNum = 0;
          data.CartInfo.forEach((val) => {
            if (val.isChecked) {
              ParcelNum += val.count;
            }
          });
          return ParcelNum;
        }
      })
    },
    activated() {
      this.$nextTick(() => {
        this.$store.commit('isLoading', false);
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
