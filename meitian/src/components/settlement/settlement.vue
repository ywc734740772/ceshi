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
          <div class="center">确认订单</div>
          <div class="right"></div>
        </div>
      </div>
      <div class="pages navbar-through toolbar-through">
        <div class="page settlement page-on-center">
          <div class="toolbar tabbar tabbar-labels two-menu">
            <div class="toolbar-inner">
              <div class="row">
                <div class="col-66 commodity-money" style="text-align: left;">
                  <span>实付款：</span>
                  <span class="money" v-text="`¥${TotalMoney}`"></span>
                </div>
                <a href="javascript:" class="col-33 settlement" @click="settlement(ParcelInfo)">
                  提交订单
                </a>
              </div>
            </div>
          </div>
          <div class="page-content">
            <div class="margin-none list-block media-list">
              <ul>
                <li>
                  <a href="#" class="item-link item-content" style="padding-left:10px;">
                    <div class="item-media">
                      <img src="../../images/location.png" width="20">
                    </div>
                    <div class="item-inner" style="margin-left:10px;">
                      <div class="item-title-row">
                        <div class="item-title">美天APP配送点</div>
                        <div class="item-after">18221819403</div>
                      </div>
                      <div class="item-text">上海市卢湾区南昌路203号202室</div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div class="margin-content list-block media-list">
              <ul>
                <li>
                  <div class="item-link item-content">
                    <div class="item-inner">
                      <div class="item-title-row">
                        <div class="item-title">
                          <img src="../../images/time.png" width="20">&nbsp;送达时间
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="margin-none list-block media-list shopping-number">
              <ul>
                <li>
                  <router-link to="/settlementList" class="item-link item-content">
                    <div class="item-inner">
                      <div class="item-title-row">
                        <div class="item-title" style="width: 100%;">
                          <div class="swiper-container swiper-container-order swiper-init ks-carousel-slider swiper-container-horizontal">
                            <div class="swiper-wrapper">
                              <div class="swiper-slide" v-for="ParcelItem in ParcelInfo">
                                <img :src="ParcelItem.image|| defaultImg" width="60">
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="item-after">
                          <div v-text="`共${ParcelNum}件`"></div>
                          <div v-text="`${ParcelInfo.length}个包裹`"></div>
                        </div>
                      </div>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
            <div class="margin-content list-block media-list" style="margin:0 0 15px 0;">
              <ul>
                <li>
                  <div class="item-link item-content">
                    <div class="item-inner">
                      <div class="item-title-row">
                        <div class="item-title">

                        </div>
                        <div class="item-after commodity-money">
                          合计：
                          <span class="money" v-text="`¥${TotalMoney}`"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="margin-content list-block media-list">
              <ul>
                <li>
                  <div class="item-link item-content">
                    <div class="item-inner">
                      <div class="item-title-row">
                        <div class="item-title">
                          开具发票
                        </div>
                        <div class="item-after">
                          <div class="item-input" style="width: 70px;margin-top: -3px;">
                            <wv-switch v-model="switchValue" :is-in-cell="false"></wv-switch>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-new */
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  import {mapState} from 'vuex';
  import WeVue from 'we-vue';
  import qs from 'qs';
  import defaultImg from '../../images/11.jpg';
  export default {
    data() {
      return {
        switchValue: true,
        defaultImg: defaultImg
      };
    },
    computed: mapState({
      ParcelInfo: (data) => {
        let ParcelInfo = [];
        data.CartInfo.forEach((val) => {
          if (val.isChecked) {
            val.Quantity = val.count;
            val.UnitPrice = val.Price;
            val.Amount = val.Price * val.count;
            val.ShippingGuid = 0;
            val.IsNeedShipping = true;
            val.ParentItemId = val.GoodsId;
            val.IsPackageItem = true;
            ParcelInfo.push(val);
          }
        });
        return ParcelInfo;
      },
      ParcelNum: (data) => {
        let ParcelNum = 0;
        data.CartInfo.forEach((val) => {
          if (val.isChecked) {
            ParcelNum += val.count;
          }
        });
        return ParcelNum;
      },
      TotalMoney: (data) => {
        let TotalMoney = 0;
        data.CartInfo.forEach((val) => {
          if (val.isChecked) {
            TotalMoney += val.count * (val.price || val.Price);
          }
        });
        return TotalMoney.toFixed(2);
      },
      myInfo: (data) => {
        if (!data.userInfo.Profile && localStorage.getItem('userInfo')) {
          data.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        }
        return data.userInfo;
      }
    }),
    mounted() {
    },
    activated() {
      setTimeout(() => {
        this.$store.commit('isLoading', false);
        new Swiper('.swiper-container-order', {
          slidesPerView: 4,
          spaceBetween: 10
        });
      }, 300);
    },
    methods: {
      tipToast (msg) {
        WeVue.Toast({
          duration: 2000,
          message: msg,
          type: 'text'
        });
      },
      settlement(ParcelInfo) {
        WeVue.Indicator.open({
          text: 'loading',
          spinnerType: 'double-snake'
        });
        let data = {
          Owner: this.myInfo.UserId,
          IsNeedInvoice: this.switchValue,
          Comments: '',
          Items: ParcelInfo
        };
        this.axios({
          method: 'post',
          url: this.$store.state.apiUrl + '/app/Order/CreateOrder',
          data: qs.stringify(data)
        }).then((res) => {
          res = res.data.Data;
          WeVue.Indicator.close();
          this.$store.commit('saveOrderInfo', {orderGuid: res, Invoice: this.switchValue});
          this.$store.commit('addCart', 'subOrder');
          this.$store.commit('goodsInfos', 'subOrder');
          localStorage.removeItem('goodsInfo');
          localStorage.removeItem('CartInfo');
          this.$router.replace('./placeOrder');
        }).catch(() => {
          WeVue.Indicator.close();
          this.tipToast('网络超时，请稍后再试！');
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
