<template>
    <div class="views" style="background: #f7f7f8;">
      <div class="view view-main">
        <div class="navbar">
          <div class="navbar-inner navbar-on-center">
            <div class="left" @click="$router.back(-1)">
              <a href="javascript:" class="back link">
                <img src="../../images/back.png">
              </a>
            </div>
            <div class="center">
              收银台
            </div>
            <div class="right"></div>
          </div>
        </div>

        <div class="page-content payment" style="margin-top: 44px;">
            <div class="list-block media-list total-money">
              <ul>
                <li>
                  <div class="item-content">
                    <div class="item-inner">
                      <div class="item-title-row totalmoney">
                        <div class="item-title">
                          合计金额
                        </div>
                        <div class="item-after">
                          <span class="spanPayValue" v-text="goodsSubtotal"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="content-block-title">选择支付方式</div>

            <div class="list-block media-list">
                <ul class="pay-way">
                    <li @click="SelectivePay(5)" ref="SelectivePay">
                        <div class="item-content">
                            <div class="item-inner">
                                <div class="item-title-row">
                                    <div class="item-title">
                                        <img src="../../images/wechat.png"/>&nbsp;&nbsp;<span>微信支付</span>
                                    </div>
                                    <div class="item-after checks img-radio active">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li @click="SelectivePay(4)" ref="SelectivePay">
                        <div class="item-content">
                            <div class="item-inner">
                                <div class="item-title-row">
                                    <div class="item-title">
                                        <img src="../../images/alipay.png"/>&nbsp;&nbsp;<span>支付宝支付</span>
                                    </div>
                                    <div class="item-after checks img-radio active">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li @click="SelectivePay(3)" ref="SelectivePay">
                        <div class="item-content">
                            <div class="item-inner">
                                <div class="item-title-row">
                                    <div class="item-title">
                                        <img src="../../images/card.png"/>&nbsp;&nbsp;<span>银联支付</span>
                                    </div>
                                    <div class="item-after checks img-radio active">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="content-block">
              <div class="payememt btn-color">
                  <a href="javascript:" class="button button-raised" @click="subPay">确认支付</a>
              </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex';
  import WeVue from 'we-vue';
  export default {
    data() {
      return {
        isActive: false,
        orderInfo: {},
        goodsSubtotal: 0
      };
    },
    mounted() {
      let payWay = document.getElementsByClassName('pay-way')[0];
      let oli = payWay.getElementsByTagName('li');
      for (let i = 0; i < oli.length; i++) {
        oli[i].onclick = function () {
          for (let j = 0; j < oli.length; j++) {
            oli[j].getElementsByClassName('checks')[0].innerHTML = '';
          }
          this.getElementsByClassName('checks')[0].innerHTML = '<i class="iconfont">&#xe62b;</i>';
        };
      }
    },
    activated() {
      WeVue.Indicator.open({
        text: 'loading',
        spinnerType: 'double-snake'
      });
      this.$nextTick(() => {
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
          } else {
            this.tipToast(res.data.Message);
          }
        }).catch(() => {
          WeVue.Indicator.close();
          this.tipToast('网络超时，请稍后再试！');
        });
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
      SelectivePay(way) {
//        console.log(way);
      },
      subPay() {
        this.tipToast('支付功能正在开发中！');
        setTimeout(() => {
          this.$router.replace('./home');
        }, 1000);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .payment
    .list-block.media-list
      .item-title-row
        width: 100%;
      .item-title
        font-size: 14px;
        align-self: center;
        img
          width: 30px;
          height: 30px;
      .pay-way .active
        color: #ff452c;
        padding-top: 4px;
  .content-block .payememt
    background: #009fe8;
    border-radius: 5px;
    padding: 5px 0;
    a
      border: none;
      font-size: 16px;
      color: #fff;
</style>
