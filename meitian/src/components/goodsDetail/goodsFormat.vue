<template>
  <transition name="move">
    <div class="specifications" :class="{'topmove':isMove}">
      <div style="position: relative;height:100%;" @touchmove.prevent2>
        <div class="goods">
          <img :src="goodsInfo.image|| defaultImg" alt="" width="60" height="60">
          <div class="goodsInfo">
            <div class="price" v-text="`¥ ${goodsInfo.price||goodsInfo.Price}`"></div>
            <div class="goodsId" v-text="`商品编号：${goodsInfo.goodsId||goodsInfo.Number}`"></div>
          </div>
          <i class="iconfont colseMask" @click="closeLayer">&#xe641;</i>
        </div>
        <div style="display:flex;height:69%;overflow: hidden;">
          <div ref="GoodsSpecifications" style="margin: 20px 0;">
            <ul>
              <li class="GoodsSpecifications" v-if="goodsInfo.IsPackage" v-for="(GoodsPackageItem, index) in GoodsPackage">
                <div class="title" v-text="GoodsPackageItem.Base.Name"></div>
                <div class="category">
                <span v-if="GoodsPackage.length" :class="{'active': SubGoodsItem.isActive}"
                      v-for="SubGoodsItem in GoodsPackageItem.SubGoods" v-text="SubGoodsItem.Name"
                      @click="isActives(GoodsPackageItem, SubGoodsItem, index)"></span>
                </div>
              </li>
              <li class="GoodsSpecifications" v-if="!goodsInfo.IsPackage">
                <div class="title">规格</div>
                <div class="category">
                <span class="active"
                      v-text="`${goodsInfo.weight||goodsInfo.Name} / ${(goodsInfo.UnitQuantity + goodsInfo.Unit)||goodsInfo.unit}`"></span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="Determine" @click="DetermineSpecifications(goodsInfo, GoodsPackage)">确定</div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Bscroll from 'better-scroll';
  import {mapState} from 'vuex';
  import WeVue from 'we-vue';
  import defaultImg from '../../images/11.jpg';
  export default {
    props: ['goodsInfo', 'isMove', 'GoodsPackage'],
    data() {
      return {
        defaultImg: defaultImg
      };
    },
    computed: mapState({
      myInfo: (data) => {
        if (!data.userInfo.Profile && localStorage.getItem('userInfo')) {
          data.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        }
        return data.userInfo;
      }
    }),
    methods: {
      tipToast (msg) {
        WeVue.Toast({
          duration: 2000,
          message: msg,
          type: 'text'
        });
      },
      closeLayer() {
        this.$emit('isClose', false);
      },
      DetermineSpecifications(item, GoodsPackage) {
        if (this.myInfo.Profile !== undefined) {
//        if (this.$store.state.CartInfo.length) {
          if (item.IsPackage) {
            let CartIndex = -1;
            this.$store.state.CartInfo.forEach((val, shopIndex) => {
              if (val.GoodsId === this.goodsInfo.GoodsId) {
                let isForeach = true;
  //              if (val.SubGoods.length && this.goodsInfo.SubGoods.length) {
                for (let [i, item] of new Map(val.SubGoods.map((item, i) => [i, item]))) {
                  if (item.GoodsId !== this.goodsInfo.SubGoods[i].GoodsId) {
  //                  this.goodsInfo.count = null;
  //                  this.goodsInfo.OrderQuantity = null;
                    isForeach = false;
                    break;
                  }
                }
  //                val.SubGoods.forEach((data, index) => {
  //                  if (data.GoodsId !== this.goodsInfo.SubGoods[index].GoodsId) {
  //                   if (isForeach) {
  //                      this.goodsInfo.count = null;
  //                      this.goodsInfo.OrderQuantity = null;
  //                      isForeach = false;
  //                      this.addCarts();
  //                      setTimeout(() => {
  //                        isForeach = true;
  //                      }, 100);
  //                   }
  //                  }
  //                });
                if (isForeach) {
                  CartIndex = shopIndex;
                }
  //              }
  //            } else {
  //              console.log('购物未找到该商品！');
  //              this.addCarts();
              }
            });
            if (CartIndex > -1) {
              // 重复，数量+1
              if (this.goodsInfo.count) {
                this.goodsInfo.count++;
                this.goodsInfo.OrderQuantity++;
                console.log(this.goodsInfo.count);
                console.log(this.$store.state.CartInfo[this.goodsInfo._index].count);
                if (this.goodsInfo.count !== this.$store.state.CartInfo[this.goodsInfo._index].count) {
                  this.$store.state.CartInfo[this.goodsInfo._index].count++;
                  this.$store.state.CartInfo[this.goodsInfo._index].OrderQuantity++;
                }
                this.$store.commit('goodsInfos', this.goodsInfo);
                this.$store.commit('addCart', 1);
              }
            } else {
              // 不重复，新增
              this.addCarts();
            }
  //        } else {
  //          console.log('购物车为空！');
  //          this.addCarts();
  //        }
          }
          this.$emit('isClose', false);
        } else {
          this.$router.push('./login');
        }
      },
      addCarts() {
       // if (!this.goodsInfo.count) {
          this.$set(this.goodsInfo, 'count', 1);
          this.$set(this.goodsInfo, 'OrderQuantity', 1);
          if (this.goodsInfo.isChecked === undefined) {
            this.$set(this.goodsInfo, 'isChecked', true);
          }
        function clone(obj) {
          let result = {};
          for (let key in obj) {
            result[key] = obj[key];
          }
          return result;
        }
          this.$store.commit('addCart', clone(this.goodsInfo));
     //   }
      },
      isActives(item, item2, index) {
        this.$nextTick(() => {
          item.SubGoods.forEach((val) => {
            this.$set(val, 'isActive', false);
          });
          this.$set(item2, 'isActive', true);
//          this.$emit('tabGoods', item, index);

          if (this.GoodsPackage.length) {
            this.goodsInfo.SubGoods = [];
            this.GoodsPackage.forEach((val) => {
              val.SubGoods.forEach((value, index) => {
                if (value.isActive) {
                  value._index = index;
                  this.goodsInfo.SubGoods.push(value);
                }
              });
            });
            this.$store.commit('goodsInfos', this.goodsInfo);
          }
        });
      },
      loadPackage() {
        this.scroll = new Bscroll(this.$refs.GoodsSpecifications, {
          click: true
        });
      }
    },
    created() {
    },
    activated() {
      setTimeout(() => {
          this.loadPackage();
      }, 200);
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .specifications
    position: fixed
    left: 0
    top: 100%
    bottom: 0
    z-index: 14000
    width: 100%;
    height: 70%;
    background: #fff;
    transform: translate3d(0, 0, 0);
    transition: all 0.1s linear;
    .goods
      display: flex;
      justify-content: flex-start;
      padding: 10px;
      border-bottom: solid 1px rgba(204, 204, 204, 0.3);
      .goodsInfo
        flex-grow: 1;
        padding-left: 10px;
        align-self: flex-end;
        .price
          color: #ff0000;
          font-size: 16px;
          padding-bottom: 2px;
        .goodsId
          font-size: 14px;
          color: #8e8e93;
      .colseMask
        padding: 2px 0 10px 15px;
        display: table;
    .GoodsSpecifications
      padding: 0 10px;
      .title
        margin: 5px 0 10px 0;
        color: #666;
      .category
        display: flex;
        flex-wrap: wrap;
        span
          border: solid 1px #ccc;
          border-radius: 3px;
          padding: 4px 8px;
          margin: 0 15px 10px 0;
          font-size: 12px;
        .active
          color: #ff0000;
          border: solid 1px rgba(255, 0, 0, .4);
    .Determine
      background: #ff4b52;
      color: #fff;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px 0;
      text-align: center;
      font-size: 18px;
      letter-spacing: 10px;
</style>
