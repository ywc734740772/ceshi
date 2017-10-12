<template>
    <div class="views view-main">
      <div class="navbar">
        <div class="navbar-inner navbar-on-center">
          <div class="left" @click="$router.back(-1)">
            <a href="javascript:" class="back link">
              <img src="../../images/back.png">
            </a>
          </div>
          <div class="center" style="left: -145.5px;">全部订单</div>
        </div>
      </div>
      <div class="pages navbar-through toolbar-through">
        <div class="page orderSettlement page-on-center">
          <div class="buttons-row" style="margin-top:44px;">
              <a href="javascript:" class="button tab-link" :class="{'active': isActive===0}" @click="statusTab('whole', 0)">全部</a>
              <a href="javascript:" class="button tab-link" :class="{'active': isActive===1}" @click="statusTab(2, 1)">待付款</a>
              <a href="javascript:" class="button tab-link" :class="{'active': isActive===2}" @click="statusTab(3, 2)">待发货</a>
              <a href="javascript:" class="button tab-link" :class="{'active': isActive===3}" @click="statusTab(4, 3)">已发货</a>
              <a href="javascript:" class="button tab-link" :class="{'active': isActive===4}" @click="statusTab(5, 4)">已完成</a>
            </div>
          <div class="page-content" style="padding-top:0; padding-bottom: 95px;">
            <orderStatus :OrderDetail="orderStatus" :isTitle="isTitle"></orderStatus>
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import orderStatus from './orderStatus.vue';
  import WeVue from 'we-vue';

  export default {
    data() {
      return {
        isActive: null,
        allOrder: [],
        orderStatus: [],
        isTitle: '订单加载中...'
      };
    },
    beforeRouteLeave (to, from, next) {
      this.$store.commit('isMenu', true);
      next();
    },
    created() {
      WeVue.Indicator.open({
        text: 'loading',
        spinnerType: 'double-snake'
      });
      this.axios({
          method: 'get',
          url: this.$store.state.apiUrl + '/app/Order/GetOrders?owner=' + this.$store.state.userInfo.UserId
        }).then((res) => {
          if (!res.data.IsError) {
            res = res.data.Data;
            this.allOrder = [];
            res.forEach((val) => {
              this.orderDetail(val.OrderGuid);
            });
          } else {
            WeVue.Indicator.close();
            this.tipToast(res.data.Message);
          }
        }).catch(() => {
          WeVue.Indicator.close();
          this.tipToast('网络超时，请稍后再试！');
        });

      this.$nextTick(() => {
        this.$store.commit('isLoading', false);
        this.$store.commit('isMenu', false);
      });
    },
    mounted() {
      this.activeTab(this.$route.query.index);
    },
    activated() {
    },
    methods: {
      tipToast (msg) {
        WeVue.Toast({
          duration: 2000,
          message: msg,
          type: 'text'
        });
      },
      orderDetail(Num) {
        WeVue.Indicator.open({
          text: 'loading',
          spinnerType: 'double-snake'
        });
        this.axios({
          method: 'get',
          url: this.$store.state.apiUrl + '/app/Order/GetOrderByGuid?orderGuid=' + Num
        }).then((res) => {
          WeVue.Indicator.close();
          if (!res.data.IsError) {
            res = res.data.Data;
            this.allOrder.push(res);
            this.allOrder.forEach((val) => {
              let money = 0;
              val.Items.forEach((data) => {
                money += data.Quantity * data.UnitPrice;
              });
              this.$set(val, 'TotalMoney', money);
            });
            this.statusTab(this.$route.query.status, this.$route.query.index);
          } else {
            WeVue.Indicator.close();
            this.tipToast(res.data.Message);
          }
        }).catch(() => {
          WeVue.Indicator.close();
//          this.tipToast('网络超时，请稍后再试！');
        });
      },
      activeTab(index) {
        this.isActive = index;
      },
      statusTab(status, index) {
        this.isActive = index;
        if (this.allOrder.length) {
          this.orderStatus = [];
          if (status === 'whole') {
            this.allOrder.forEach((val) => {
              if (val.Items !== null) {
                this.orderStatus.push(val);
              }
            });
          } else {
            this.allOrder.forEach((val) => {
              if (val.Base.OrderStatus === status) {
                  this.orderStatus.push(val);
              }
            });
          }
          if (!this.orderStatus.length) {
            this.isTitle = '当前还没有相关订单！';
          }
        }
      }
    },
    components: {
      orderStatus
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .views
    z-index: 6000;
    .orderSettlement
      .button
        /*padding 0*/
        /*border-radius 0 !important*/
</style>
