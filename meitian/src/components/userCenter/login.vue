<template>
  <div class="login views">
    <div class="navbar">
      <div class="navbar-inner navbar-on-center">
        <div class="left" @click="$router.push('/home')">
          <a href="javascript:" class="back link">
            <img src="../../images/back.png" width="25"></a></div>
        <div class="center sliding" style="left: 0;">登录</div>
        <div class="right"></div>
      </div>
    </div>
    <div class="pages">
      <div class="page navbar-through userlogin">
        <div class="page-content">
          <div class="list-block user_login">
            <wv-group>
              <wv-input label="手机号：" placeholder="请输入手机号" type="number" v-model="loginTel"></wv-input>
              <wv-input label="密 &nbsp&nbsp&nbsp码：" placeholder="请输入密码" type="password" v-model="loginPass"></wv-input>
            </wv-group>
          </div>
          <div class="content-block" style="margin: 60px 0 35px 0">
            <a href="javascript:" data-href="/new/mys.html" class="button button-big login-button btnLogin" @click="btnLogin">确认</a>
          </div>
          <div class="copy">
            <router-link to="/forgotPassword">忘记密码?</router-link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <router-link to="/register">注册</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import WeVue from 'we-vue';
  import qs from 'qs';
  export default {
    data () {
      return {
        loginTel: this.loginTel,
        loginPass: this.loginPass
      };
    },
    created () {
    },
    methods: {
      tipToast(msg) {
        WeVue.Toast({
          duration: 2000,
          message: msg,
          type: 'text'
        });
      },
      btnLogin() {
        let regTel = /^1(3|4|5|7|8)\d{9}$/;
        if (!regTel.test(this.loginTel)) {
          this.tipToast('手机号码格式有误！');
          return;
        }
        WeVue.Indicator.open({
          text: 'loading',
          spinnerType: 'double-snake'
        });
        let data =
        this.axios({
          method: 'post',
          url: this.$store.state.passportUrl + '/api/Membership/ValidateUser',
          data: qs.stringify({
            LoginName: this.loginTel,
            Password: this.loginPass
          })
        }).then((res) => {
          res = res.data;
          if (!res.IsError) {
            this.getUserProfile(res.Data.UserId);
          } else {
            WeVue.Indicator.close();
            this.tipToast(res.Message);
          }
        }).catch(() => {
          WeVue.Indicator.close();
          this.tipToast('登录超时，请稍后再试！');
        });
      },
      getUserProfile(userId) {
        this.axios({
          method: 'get',
          url: this.$store.state.passportUrl + '/api/Membership/GetUserProfile?userId=' + userId
        }).then((res) => {
          res = res.data;
          if (!res.IsError) {
            WeVue.Indicator.close();
            this.$store.commit('CurrentUser', res.Data);
            this.getUserAccounting(userId);
          } else {
            WeVue.Indicator.close();
            this.tipToast(res.Message);
          }
        }).catch(() => {
          WeVue.Indicator.close();
          this.tipToast('网络超时，请稍后再试！');
        });
      },
      getUserAccounting(userId) {
        this.axios({
          method: 'get',
          url: this.$store.state.passportUrl + '/api/Membership/GetUserAccounting?userId=' + userId
        }).then((res) => {
          res = res.data;
          if (!res.IsError) {
            this.$store.commit('CurrentUser', {Mobile: res.Data.Mobile, type: 'Mobile'});
            WeVue.Indicator.close();
            this.$router.back(-1);
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
    activated () {
      this.loginPass = '';
      this.$nextTick(() => {
        this.$store.commit('isLoading', false);
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .weui-toast_text
    padding 1em 0 !important
  .weui-cells
    .weui-label
      width 80px !important
    .weui-input
      height auto !important
      font-size 16px !important
</style>
