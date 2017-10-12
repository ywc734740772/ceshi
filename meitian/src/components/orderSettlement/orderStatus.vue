<template>
  <div class="tabs">
    <div class="page-content tab active">
      <div v-if="!OrderDetail.length" class="orderTitle" v-text="isTitle"></div>
      <div v-for="(OrderItem, index) in OrderDetail" :key="index">
        <div class="margin-content list-block media-list" style="margin:10px 0 0 0;">
          <ul>
            <li>
              <div class="item-link item-content">
                <div class="item-inner">
                  <div class="item-title-row">
                    <div class="item-title" v-text="`订单号：${OrderItem.Base.SnNumber}`">
                    </div>
                    <div class="item-after">
                      {{OrderItem.Base.OrderStatus | OrderStatus}}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="list-block media-list margin-none">
          <ul>
            <li v-for="(OrderDetailItem, index) in OrderItem.Items" :key="index" v-if="OrderItem.Items.length===1">
              <a href="javascript:" class="item-content">
                <div class="item-media">
                  <img src="../../images/11.jpg" width="60">
                </div>
                <div class="item-inner">
                  <div class="item-title-row">
                    <div class="item-title" v-text="OrderDetailItem.Name"></div>
                    <div class="item-after">{{OrderDetailItem.UnitPrice * OrderDetailItem.Quantity|formatMoney}}</div>
                  </div>
                  <div class="item-text" v-text="`规格：${OrderDetailItem.UnitQuantity}/${OrderDetailItem.Unit}`"></div>
                  <div class="item-text">
                    {{'单价：'}}{{OrderDetailItem.UnitPrice | formatMoney}}{{'/' + OrderDetailItem.Unit}}   {{'数量：' + OrderDetailItem.Quantity}}
                  </div>
                </div>
              </a>
            </li>
            <li v-if="OrderItem.Items && OrderItem.Items.length>1">
                  <a href="javascript:" class="item-link item-content">
                    <div class="item-inner">
                      <div class="item-title-row">
                        <div class="item-title" style="width: 100%;">
                          <div class="swiper-container swiper-container-order6">
                            <div class="swiper-wrapper">
                              <div class="swiper-slide"  style="width: 60px; text-align: center; margin-right: 10px;" v-for="(OrderDetailItem, index) in OrderItem.Items" :key="index">
                                <img src="../../images/11.jpg" width="60">
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
            </li>
          </ul>
        </div>
        <div class="column-top list-block media-list" style="margin:0;">
          <ul>
            <li>
              <div class="item-link item-content">
                <div class="item-inner">
                  <div class="item-title-row">
                    <div class="item-title">

                    </div>
                    <div class="item-after">
                      合计：{{OrderItem.TotalMoney | formatMoney}}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="column-top list-block media-list" style="margin:0;" v-if="OrderItem.Base.OrderStatus === 2">
          <ul>
            <li>
              <div class="item-link item-content">
                <div class="item-inner">
                  <div class="item-title-row">
                    <div class="item-title">
                    </div>
                    <div class="item-after">
                      <a href="javascript:" class="button"  @click="cancelOrder(OrderItem.Base.OrderGuid)">取消订单</a>&nbsp;&nbsp;
                      <a href="javascript:" class="button" @click="ContinuePay(OrderItem.Base.OrderGuid)">继续支付</a>
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
</template>

<script type="text/ecmascript-6">
/* eslint-disable no-new */
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  import WeVue from 'we-vue';
  export default {
    props: {
      OrderDetail: {
        type: Array
      },
      isTitle: {
        type: String
      }
    },
    data () {
      return {
      };
    },
    filters: {
      OrderStatus: (val) => {
        let status = {
          '0': '已取消',
          '1': '已完成',
          '2': '待付款',
          '3': '正在配送',
          '4': '已审核'
        };
        return status[val];
      },
      formatMoney: (val) => {
        if (Number(val)) {
          return '¥ ' + Number(val).toFixed(2);
        } else {
          return val;
        }
      }
    },
    computed: {},
    mounted() {
    },
    methods: {
      tipToast(msg) {
        WeVue.Toast({
          duration: 2000,
          message: msg,
          type: 'text'
        });
      },
      cancelOrder(orderGuid) {
        WeVue.Indicator.open({
          text: 'loading',
          spinnerType: 'double-snake'
        });
        this.axios({
          method: 'post',
          url: this.$store.state.apiUrl + '/app/Order/CancelOrder?orderGuid=' + orderGuid
        }).then((res) => {
          WeVue.Indicator.close();
          if (!res.data.IsError) {
            this.tipToast('订单取消成功！');
            this.$router.replace('./my');
          } else {
            this.tipToast(res.data.Message);
          }
        }).catch(() => {
          WeVue.Indicator.close();
          this.tipToast('网络超时，请稍后再试！');
        });
      }
    },
    activated() {
//      if (this.OrderDetail.length) {
        setTimeout(() => {
          new Swiper('.swiper-container-order6', {
            slidesPerView: 5,
            spaceBetween: 10
          });
        }, 500);
      }
//    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
      .orderTitle
        text-align center
        padding 15px
</style>
