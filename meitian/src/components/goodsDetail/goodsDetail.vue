<template>
  <!--<transition name="move">-->
  <div class="detail">
    <div class="views">
      <div class="view view-main">
        <div class="pages navbar-through toolbar-through">
          <div class="page detail page-on-center">

            <div class="navbar">
              <div class="navbar-inner navbar-on-center">
                <div class="left" @click="$router.back(-1)">
                  <a href="javascript:" class="back link">
                    <img src="../../images/back.png">
                  </a>
                </div>
                <div class="center" style="left: 0;">
                  商品详情
                </div>
                <div class="right">
                  <img src="../../images/share.png">
                </div>
              </div>
            </div>

            <div class="toolbar tabbar tabbar-labels">
              <div class="toolbar-inner list-block" style="margin: 0;">
                <div class="row">
                  <a href="javascript:" class="open-panel col-66" @click="cartSettlement"
                     style="padding-left: 8px;">
                    <i>
                      <img src="../../images/shopping.png">
                      <span class="badge bg-red" v-if="cartCount>0" v-text="cartCount"></span>
                    </i>
                  </a>
                  <a href="javascript:" class="csettlement col-33" @click.stop.prevent="addCart">
                    加入购物车
                  </a>
                </div>
              </div>
            </div>

            <div class="page-content" style="padding-top:44px;">

              <div class="swiper-container swiper-container-s" style="height:200px;">
                <div class="swiper-wrapper">
                  <div class="swiper-slide">
                    <a href="#">
                      <img src="../../images/u1460.jpg">
                    </a>
                  </div>
                  <div class="swiper-slide">
                    <a href="#">
                      <img src="../../images/u1462.jpg">
                    </a>
                  </div>
                  <div class="swiper-slide">
                    <a href="#">
                      <img src="../../images/u1464.jpg">
                    </a>
                  </div>
                  <div class="swiper-slide">
                    <a href="#">
                      <img src="../../images/u1466.jpg">
                    </a>
                  </div>
                </div>
                <div class="swiper-pagination"></div>
              </div>

              <div class="pic-desc list-block media-list" style="margin:0 0 10px 0;">
                <ul>
                  <li>
                    <div class="item-link item-content">
                      <div class="item-inner">
                        <div class="item-title" v-text="goodsList.name2||goodsList.Name"></div>
                        <div class="item-text" v-text="goodsList.title2||goodsList.Comments"></div>
                        <div class="commodity-money">
                          <span class="money price"
                                v-text="'¥'+ Number(goodsList.price || goodsList.Price).toFixed(2) +'/'+ (goodsList.unit||goodsList.Unit)"></span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="list-block column-detail margin-content">
                <div class="list-group">
                  <ul>
                    <li class="item-link">
                      <a href="javascript:" @click="selectSpecification">
                        <div class="item-content">
                          <div class="item-inner" v-if="!goodsList.IsPackage">
                            <div class="item-title" v-text="`已选择：${goodsList.Name}`"></div>
                          </div>
                          <div class="item-inner" v-else>
                            <div class="item-title">
                              已选择：
                              <span v-for="(SubGoodsItem, index) in goodsList.SubGoods" :key="index" v-text="`${index == 0  ? SubGoodsItem.Name : ' / ' + SubGoodsItem.Name}`"></span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="list-block column-detail margin-none">
                <div class="list-group">
                  <ul>
                    <li>
                      <div class="item-content">
                        <div class="item-inner">
                          <div class="item-title" v-text="`商品含量：${goodsList.UnitQuantity}${goodsList.Unit}`"></div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="item-content">
                        <div class="item-inner">
                          <div class="item-title" v-text="`产地：${goodsList.origin||'中国'}`"></div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="recommend">
                <div class="column-product content-block column">
                    <span>
                        <img src="../../images/up.png">&nbsp;为你推荐
                    </span>
                </div>
                <div class="content-block ks-grid margin-content" style="padding:0 10px;">
                  <div class="row">
                    <shopCartLikeList></shopCartLikeList>
                    <shopCartLikeList></shopCartLikeList>
                    <shopCartLikeList></shopCartLikeList>
                    <a href="#" class="item-link item-content col-50">
                      <img src="../../images/11.jpg">
                      <div class="title">美国加州车厘美国加州车</div>
                      <div class="discount">
                        <span class="unit" style="text-decoration:line-through">¥ 100.90/盒</span>
                      </div>
                      <div class="hotsearch-pay commodity-money">
                        <span class="money price">¥ 49.90/盒</span>
                        <span class="icon">
                                    <img src="../../images/plus.png">
                                </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div class="margin-content content-block detailImg">
                <img src="../../images/u1460.jpg">
                <img src="../../images/u1462.jpg">
                <img src="../../images/u1466.jpg">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <goodsFormat :isMove="isMove" @isClose="closeLay" :goodsInfo="goodsList" :GoodsPackage="GoodsPackage"></goodsFormat>`
    <div class="modal-overlay modal-overlay-visible" v-if="isMove" @click="closeLayer"></div>
  </div>
  <!--</transition>-->
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-new */
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  import WeVue from 'we-vue';
  import {mapState} from 'vuex';

  import shopCartLikeList from '../../components/shopCartLikeList/shopCartLikeList.vue';
  import goodsFormat from '../../components/goodsDetail/goodsFormat.vue';

  export default {
    data() {
      return {
        isMove: false,
        GoodsPackage: []
      };
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (!vm.$store.state.goodsInfo.Name && localStorage.getItem('goodsInfo') === null) {
          vm.$router.replace('./order');
        }
      });
    },
    mounted() {
      new Swiper('.swiper-container-s', {
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 2000,
        autoplayDisableOnInteraction: false
      });
    },
    created() {
    },
    activated() {
      this.$nextTick(() => {
        this.loadPackage();
        this.$store.commit('isLoading', false);
      });
    },
    computed: mapState({
      CartListInfo: (data) => {
        if (!data.CartInfo.length && localStorage.getItem('CartInfo')) {
          data.CartInfo = JSON.parse(localStorage.getItem('CartInfo'));
        }
        return data.CartInfo;
      },
      goodsList: (data) => {
         if (!data.goodsInfo.count && localStorage.getItem('CartInfo')) {
          data.goodsInfo = JSON.parse(localStorage.getItem('goodsInfo'));
          JSON.parse(localStorage.getItem('CartInfo')).forEach((val) => {
            if (val.GoodsId === data.goodsInfo.GoodsId) {
              data.goodsInfo.count = val.count;
              data.goodsInfo._index = val._index;
              data.goodsInfo.isChecked = val.isChecked;
            }
          });
        } else if (!data.goodsInfo.count && localStorage.getItem('goodsInfo')) {
          data.goodsInfo = JSON.parse(localStorage.getItem('goodsInfo'));
        }
        return data.goodsInfo;
      },
      cartCount: (data) => {
        let cartCount = 0;
        if (!data.CartInfo.length && localStorage.getItem('CartInfo')) {
          data.CartInfo = JSON.parse(localStorage.getItem('CartInfo'));
        }
        if (data.CartInfo.length) {
          data.CartInfo.forEach((val) => {
            cartCount += val.count;
          });
          return cartCount;
        }
        return cartCount;
      },
      myInfo: (data) => {
        if (!data.userInfo.Profile && localStorage.getItem('userInfo')) {
          data.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        }
        return data.userInfo;
      }
    }),
    methods: {
      tipToast(msg) {
        WeVue.Toast({
          duration: 2000,
          message: msg,
          type: 'text'
        });
      },
      defaultPackage() {
        //  默认选择套餐规格第一个
        this.goodsList.SubGoods = [];
        this.GoodsPackage.forEach((val, index) => {
          val.SubGoods.forEach((data, _index) => {
            if (_index === 0) {
              data.isActive = true;
              data._index = _index;
              this.goodsList.SubGoods.push(data);
            }
          });
          if (!val.SubGoods.length) {
            this.GoodsPackage.splice(index, 1);
          }
        });
      },
      loadPackage() {
        if (this.goodsList.IsPackage) {
          WeVue.Indicator.open({
            text: 'loading',
            spinnerType: 'double-snake'
          });
          this.axios.get(this.$store.state.apiUrl + '/app/Goods/GetGoodsById?goodsId=' + this.goodsList.GoodsId).then((res) => {
            if (!res.data.IsError) {
              res = res.data.Data;
              WeVue.Indicator.close();
              this.GoodsPackage = res.GoodsPackageGroups;
              let cartGoodsPackage = [];
              if (this.CartListInfo.length) {
                let isDefaultPackage = false;
                this.CartListInfo.forEach((val, index) => {
                  if (val.GoodsId === this.goodsList.GoodsId) {
                    val.SubGoods.forEach((data, _index) => {
                      cartGoodsPackage.push(data);
                    });
                    isDefaultPackage = false;
                  } else {
                    isDefaultPackage = true;
                  }
                });
                if (isDefaultPackage) {
                  this.defaultPackage();
                }
              } else {
                this.defaultPackage();
              }
              this.GoodsPackage.forEach((val, index) => {
                if (!val.SubGoods.length) {
                  this.GoodsPackage.splice(index, 1);
                }
              });
              //  根据购物车存储上次选择的规格
              if (cartGoodsPackage.length) {
                cartGoodsPackage.forEach((val, index) => {
                  this.GoodsPackage[index].SubGoods[cartGoodsPackage[index]._index].isActive = true;
                });
              }
            } else {
              this.tipToast(res.data.Message);
            }
          }).catch(() => {
            WeVue.Indicator.close();
            this.tipToast('网络超时，请稍后再试！');
          });
        }
      },
      addCart() {
        if (this.myInfo.Profile !== undefined) {
          if (!!this.goodsList.price || !!this.goodsList.Price) {
            if (this.goodsList.IsPackage && this.goodsList.SubGoods) {
              this.isMove = true;
              return;
            }
              if (!this.goodsList.count) {
                this.$set(this.goodsList, 'count', 1);
                this.$set(this.goodsList, 'OrderQuantity', 1);
                if (this.goodsList.isChecked === undefined) {
                  this.$set(this.goodsList, 'isChecked', true);
                }
                this.$store.commit('addCart', this.goodsList);
              } else {
                this.goodsList.count++;
                this.goodsList.OrderQuantity++;
                if (this.goodsList.count !== this.$store.state.CartInfo[this.goodsList._index].count) {
                  this.$store.state.CartInfo[this.goodsList._index].count++;
                  this.$store.state.CartInfo[this.goodsList._index].OrderQuantity++;
                }
                this.$store.commit('goodsInfos', this.goodsList);
                this.$store.commit('addCart', 1);
              }
            }
        } else {
          this.$router.push('./login');
        }
      },
      cartSettlement() {
        this.$router.push('./shoppingCart');
      },
      selectSpecification() {
        this.isMove = true;
      },
      closeLayer() {
        this.isMove = false;
      },
      closeLay(val) {
        this.isMove = val;
      }
//      tabGoods(item, index) {
//        this.GoodsPackage[index] = item;
//      }
    },
    components: {
      shopCartLikeList,
      goodsFormat
    }
  }
  ;
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .maskLayer
    position: fixed
    left: 0
    top: 0
    bottom: 0
    z-index: 6000
    width: 100%
    background: rgba(0, 0, 0, .1);

  .detail
    position: fixed
    left: 0
    top: 0
    bottom: 0
    z-index: 6000
    width: 100%
    background: #fff
    transform: translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition: all 0.15s linear
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    .topmove
      top: 30% !important;
      transform: translate3d(0, 0, 0)
      transition: all 0.15s linear
</style>
