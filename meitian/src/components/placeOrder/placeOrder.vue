<template>
  <div class="views">
    <div class="view view-main">
      <div class="navbar">
        <div class="navbar-inner navbar-on-center">
          <div class="left" @click="goBack">
            <a href="javascript:" class="back link">
              <img src="../../images/back.png">
            </a>
          </div>
          <div class="center">订单详情</div>
          <div class="right"></div>
        </div>
      </div>
      <div class="pages navbar-through toolbar-through">
        <div data-page="placeOrder" class="page placeOrder page-on-center">
          <div class="toolbar tabbar tabbar-labels">
            <div class="toolbar-inner">
              <div class="column-top list-block media-list" style="margin:0;">
                <ul>
                  <li>
                    <div class="item-link item-content">
                      <div class="item-inner">
                        <div class="item-title-row">
                          <div class="item-title">
                          </div>
                          <div class="item-after">
                            <a href="javascript:" class="button" @click="cancelOrder(createOrderInfo.OrderId)">取消订单</a>&nbsp;&nbsp;
                            <a href="javascript:" class="button" @click="ContinuePay(createOrderInfo)">继续支付</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="page-content">
            <div class="list-block media-list" style="margin:15px 0;">
              <ul>
                <li>
                  <div class="item-content">
                    <div class="item-inner">
                      <div class="item-title-row">
                        <div class="item-title">收货人：橘子</div>
                        <div class="item-after">18118725189</div>
                      </div>
                      <div class="item-text">上海市卢湾区南昌路203号202室</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="list-block media-list margin-content">
              <ul>
                <li v-for="(OrderGoodsList, index) in OrderGoodsInfos" :key="index">
                  <a href="javascript:" class="item-content">
                    <div class="item-media">
                      <img src="../../images/11.jpg" width="60">
                    </div>
                    <div class="item-inner">
                      <div class="item-title-row">
                        <div class="item-title" v-text="OrderGoodsList.Name"></div>
                        <div class="item-after">
                          {{OrderGoodsList.UnitPrice * OrderGoodsList.Quantity | formatMoney}}
                        </div>
                      </div>
                      <div class="item-text" style="height: auto;">
                        {{'规格：'}}
                        <span v-if="OrderGoodsList.SubGoods.length"
                              v-for="(OrderGoodsListSubGoods, index) in OrderGoodsList.SubGoods"
                              :key="index"
                              v-text="`${OrderGoodsListSubGoods.Name} / `"></span>
                        <span v-if="!OrderGoodsList.SubGoods"
                              v-text="`${OrderGoodsList.UnitQuantity}/${OrderGoodsList.Unit}`"></span>
                      </div>
                      <div class="item-text">
                        {{'单价：'}}{{OrderGoodsList.UnitPrice | formatMoney}}{{'/' + OrderGoodsList.Unit }}    {{'数量：' + OrderGoodsList.Quantity}}
                      </div>
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
                          商品小计
                        </div>
                        <div class="item-after" v-text="goodsSubtotal"></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-link item-content">
                    <div class="item-inner">
                      <div class="item-title-row">
                        <div class="item-title">
                          实付款
                        </div>
                        <div class="item-after" v-text="goodsSubtotal"></div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="margin-none list-block media-list" v-if="createOrderInfo.Invoice">
              <ul>
                <li>
                  <router-link to="/invoiceInformation/paperInvoice" class="item-link item-content"
                               style="padding-left:10px;">
                    <div class="item-inner" style="margin-left:10px;">
                      <div class="item-title-row">
                        <div class="item-title">发票</div>
                        <div class="item-after">明细（纸质）- 橘子</div>
                      </div>
                    </div>
                  </router-link>
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
                          下单时间
                        </div>
                        <div class="item-after" v-text="orderInfo.Base && orderInfo.Base.OrderTime">
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-link item-content">
                    <div class="item-inner">
                      <div class="item-title-row">
                        <div class="item-title">
                          订单编号
                        </div>
                        <div class="item-after" v-text="orderInfo.Base && orderInfo.Base.SnNumber"></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-link item-content">
                    <div class="item-inner">
                      <div class="item-title-row">
                        <div class="item-title">
                          支付方式
                        </div>
                        <div class="item-after">{{orderInfo.Base && orderInfo.Base.PayStatus | PayAmount}}</div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-link item-content">
                    <div class="item-inner">
                      <div class="item-title-row">
                        <div class="item-title">
                          交易流水号
                        </div>
                        <div class="item-after" v-text="orderInfo.Base && orderInfo.Base.SerialNo"></div>
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
  import {mapState} from 'vuex';
  import WeVue from 'we-vue';
  import qs from 'qs';
  export default {
    data() {
      return {
        orderInfo: {},
        OrderGoodsInfos: [],
        goodsSubtotal: 0
      };
    },
    filters: {
      PayAmount: (val) => {
        let pay = {
          '0': '待付款',
          '2': '现金',
          '3': '银联支付',
          '4': '支付宝',
          '5': '微信支付'
        };
        return pay[val];
      },
      formatMoney: (val) => {
        if (Number(val)) {
          return '¥ ' + Number(val).toFixed(2);
        } else {
          return val;
        }
      }
    },
    activated() {
        WeVue.Indicator.open({
          text: 'loading',
          spinnerType: 'double-snake'
        });
        this.axios({
          method: 'get',
          url: this.$store.state.apiUrl + '/app/Order/GetOrderByGuid?orderGuid=' + this.createOrderInfo.orderGuid
        }).then((res) => {
          WeVue.Indicator.close();
          if (!res.data.IsError) {
            res = res.data.Data;
            this.orderInfo = res;
            let TotalMoney = 0;
            this.orderInfo.Items.forEach((val) => {
              TotalMoney += val.Amount;
            });
            this.goodsSubtotal = '¥ ' + TotalMoney.toFixed(2);

            this.OrderGoodsInfos = this.orderInfo.Items;
          } else {
            this.tipToast(res.data.Message);
          }
        }).catch(() => {
          WeVue.Indicator.close();
          this.tipToast('网络超时，请稍后再试！');
        });
    },
    computed: {
      ...mapState({
        createOrderInfo: (data) => {
          if (!data.createOrderInfo.OrderId && localStorage.getItem('createOrderInfo')) {
            data.createOrderInfo = JSON.parse(localStorage.getItem('createOrderInfo'));
          }
          return data.createOrderInfo;
        }
      })
    },
    methods: {
      tipToast (msg) {
        WeVue.Toast({
          duration: 2000,
          message: msg,
          type: 'text'
        });
      },
      cancelOrder(id) {
        WeVue.Indicator.open({
          text: 'loading',
          spinnerType: 'double-snake'
        });
        this.axios({
          method: 'post',
          url: this.$store.state.apiUrl + '/app/Order/CancelOrder?orderGuid=' + this.createOrderInfo.orderGuid
        }).then((res) => {
          WeVue.Indicator.close();
          if (!res.data.IsError) {
            this.tipToast('订单取消成功！');
            this.$router.replace('./home');
          } else {
            this.tipToast(res.data.Message);
          }
        }).catch(() => {
          WeVue.Indicator.close();
          this.tipToast('网络超时，请稍后再试！');
        });
      },
      ContinuePay(item) {
//        WeVue.Indicator.open({
//          text: 'loading',
//          spinnerType: 'double-snake'
//        });
//        this.axios({
//          method: 'post',
//          url: '/api/cashier/Cashier/CreateCashierOrderPayments',
//          data: qs.stringify({OrderId: item.OrderId, PayType: item.PayAmount})
//        }).then((res) => {
//          WeVue.Indicator.close();
//          res = res.data.Data;
          this.$router.push('./payment');
//        }).catch(() => {
//          WeVue.Indicator.close();
//          this.tipToast('网络超时，请稍后再试！');
//        });
      },
      goBack() {
        this.$router.back(-1);
      }
    },
    created() {
    },
    mounted() {
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
