<template>
  <div class="view view-main">
    <router-view></router-view>
    <div class="page-content my" style="background:#efeff4;">
      <div class="navbar">
        <div class="navbar-inner navbar-on-center">
          <div class="left"></div>
          <div class="center" style="left: 10px;">我的</div>
          <div class="right">
            <img src="../../images/scan.png">
          </div>
        </div>
      </div>
      <div>
        <div class="list-block media-list Mytop" style="margin-top:0;margin-bottom:0;">
          <ul>
            <router-link to="/accountSetting" class="item-link" tag="li">
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-title-row" style="align-items:center;justify-content: flex-start;">
                    <div class="item-title">
                      <img :src="`${myInfo.Profile && myInfo.Profile.Avatar || defaultAvatar}`">
                    </div>
                    <div class="item-after" v-text="myInfo.Profile !== undefined ? myInfo.Profile.NickName : ''"></div>
                  </div>
                </div>
              </div>
            </router-link>
          </ul>
        </div>
        <div class="margin-content content-block">
          <div class="row" style="margin:0;">
            <router-link :to="{path:'my/orderSettlement', query: {status:2, index:1}}" class="col-20 item-content">
              <img src="../../images/pendingPayment.png"><br>
              <span>待付款</span>
            </router-link>
            <router-link :to="{path:'/my/orderSettlement', query: {status:3, index:2}}" class="col-20 item-content">
              <img src="../../images/shipmentPending.png"><br>
              <span>待发货</span>
            </router-link>
            <router-link :to="{path:'/my/orderSettlement', query: {status:4, index:3}}" class="col-20 item-content">
              <img src="../../images/shipped.png"><br>
              <span>已发货</span>
            </router-link>
            <router-link :to="{path:'/my/orderSettlement', query: {status:5, index:4}}" class="col-20 item-content">
              <img src="../../images/completed.png"><br>
              <span>已完成</span>
            </router-link>
            <router-link :to="{path:'/my/orderSettlement', query: {status:'whole', index:0}}" class="col-20 item-content">
              <img src="../../images/fullOrder.png"><br>
              <span>全部订单</span>
            </router-link>
          </div>
        </div>
        <div class="list-block Mycenter" style="margin-top:10px;">
          <ul>
            <li>
              <router-link to="/deliveryAddress" class="item-link item-content">
                <div class="item-inner">
                  <div class="item-title-row">
                    <div class="item-title">
                      <img src="../../images/address.png">&nbsp;我的收货地址
                    </div>
                  </div>
                </div>
              </router-link>
            </li>
            <li>
              <a href="#" class="item-link item-content">
                <div class="item-inner">
                  <div class="item-title-row">
                    <div class="item-title">
                      <img src="../../images/news.png">&nbsp;我的消息
                    </div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <router-link to="/feedback" class="item-link item-content">
                <div class="item-inner">
                  <div class="item-title-row">
                    <div class="item-title">
                      <img src="../../images/feedback.png">&nbsp;意见反馈
                    </div>
                  </div>
                </div>
              </router-link>
            </li>
            <li>
              <router-link to="/setting" class="item-link item-content">
                <div class="item-inner">
                  <div class="item-title-row">
                    <div class="item-title">
                      <img src="../../images/set.png">&nbsp;设置
                    </div>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    import defaultAvatar from '../../images/blank-avatar.png';
    import {mapState} from 'vuex';
    import WeVue from 'we-vue';
    export default {
      data() {
       return {
         isLogin: false,
         defaultAvatar: defaultAvatar
       };
      },
      beforeRouteEnter (to, from, next) {
        next(vm => {
          if (!vm.$store.state.userInfo.Profile && localStorage.getItem('userInfo') === null) {
                vm.$router.push('./login');
          }
          vm.$store.commit('isMenu', true);
        });
      },
      created() {
        this.$nextTick(() => {
          this.$store.commit('isLoading', false);
        });
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
        getUserProfile(userId) {
          WeVue.Indicator.open({
            text: 'loading',
            spinnerType: 'double-snake'
          });
          this.axios({
            method: 'get',
            url: this.$store.state.passportUrl + '/api/Membership/GetUserProfile?userId=' + userId
          }).then((res) => {
            res = res.data;
            if (!res.IsError) {
              WeVue.Indicator.close();
              this.$store.commit('CurrentUser', res.Data);
            } else {
              WeVue.Indicator.close();
              this.tipToast(res.Message);
            }
          }).catch(() => {
            WeVue.Indicator.close();
            this.tipToast('网络超时，请稍后再试！');
          });
        }
      },
      mounted() {
        if (this.myInfo.UserId) {
          this.getUserProfile(this.myInfo.UserId);
        }
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
