<template>
  <div class="views">
    <div class="view view-main index-page">
      <div class="navbar">
        <div class="navbar-inner navbar-on-center">
          <div class="left" @click="$router.back(-1)">
            <a href="javascript:" class="back link">
              <img src="../../images/back.png" width="25">
            </a>
          </div>
          <div class="center sliding" style="left: 0;">找回密码</div>
          <div class="right"></div>
        </div>
      </div>

      <div class="pages">
        <div class="page navbar-through no-toolbar userpassword page-on-center">
          <div class="page-content">
              <div class="list-block user_register">
                <wv-group>
                  <wv-input label="手 &nbsp机 &nbsp号：" placeholder="请输入手机号" type="number" v-model="forPassTel">
                    <button class="weui-vcode-btn" slot="ft" @click="getVerifyCode" :disabled="disabled" v-text="verifyText"></button >
                  </wv-input>
                  <wv-input label="验 &nbsp证 &nbsp码：" placeholder="请输入验证码" type="number" v-model="forPassVerify"></wv-input>
                  <wv-input label="密 &nbsp &nbsp &nbsp 码：" placeholder="请输入密码" type="password" v-model="forPass"></wv-input>
                  <wv-input label="确认密码：" placeholder="请输入确认密码" type="password" v-model="forPass2"></wv-input>
                </wv-group>
              </div>
              <a href="javascript:" class="button button-big signup-next-button password-button btnRegister" @click="btnRegister">确定</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import WeVue from 'we-vue';
  import qs from 'qs';
  let time = null;
  export default {
    data () {
      return {
        forPassTel: this.forPassTel,
        forPassVerify: this.forPassVerify,
        forPass: this.forPass,
        forPass2: this.forPass2,
        verifyTime: 60,
        disabled: false,
        verifyText: '获取验证码'
      };
    },
    created () {
    },
    methods: {
      tipToast (msg) {
        WeVue.Toast({
          duration: 2000,
          message: msg,
          type: 'text'
        });
      },
      btnRegister () {
          let regTel = /^1(3|4|5|7|8)\d{9}$/;
          if (!regTel.test(this.forPassTel)) {
            this.tipToast('手机号码格式有误！');
          } else if (this.forPassVerify === undefined) {
            this.tipToast('验证码不能为空！');
          } else if (this.forPass === undefined) {
            this.tipToast('密码不能为空！');
          } else if (this.forPass.length < 6) {
            this.tipToast('密码长度不能小于六位！');
          } else if (!this.forPass2) {
            this.tipToast('确认密码不能为空！');
          } else if (this.forPass !== this.forPass2) {
            this.tipToast('两次输入密码不一样！');
          } else {
            WeVue.Indicator.open({
              text: 'loading',
              spinnerType: 'double-snake'
            });
            this.axios({
              method: 'post',
              url: this.$store.state.passportUrl + '/api/Membership/ResetPassword',
              data: qs.stringify({
                NewPassword: this.forPass,
                VerifyCode: this.forPassVerify,
                Target: this.forPassTel,
                TargetType: 2
              })
            }).then((res) => {
              res = res.data;
              if (!res.IsError) {
                WeVue.Indicator.close();
                WeVue.Dialog.confirm(WeVue.Dialog.setDefaults({
                  title: '提示',
                  message: '密码找回成功！',
                  confirmText: '立即登录'
                })).then(action => {
                  clearInterval(time);
                  this.$router.replace('/login');
                });
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
      getVerifyCode() {
        let regTel = /^1(3|4|5|7|8)\d{9}$/;
        if (!regTel.test(this.forPassTel)) {
          this.tipToast('手机号码格式有误！');
          return;
        }
        if (!this.disabled) {
          WeVue.Indicator.open({
            text: 'loading',
            spinnerType: 'double-snake'
          });
          this.forPassVerify = '';
          this.verifyTime = 60;
          this.disabled = true;
            time = setInterval(() => {
            this.verifyTime --;
            this.verifyText = this.verifyTime + '(s)重新获取';
            if (this.verifyTime === 0) {
              clearInterval(time);
              this.disabled = false;
              this.verifyText = '重新获取';
            }
          }, 1000);
          this.axios({
            method: 'post',
            url: this.$store.state.passportUrl + '/api/VerifyCode/SendVerifyCodeByMobile',
            data: qs.stringify({
              Source: 'RetrievePassword',
              Target: this.forPassTel,
              UserId: '',
              JSON: '{}'
            })
          }).then((res) => {
            res = res.data;
            WeVue.Indicator.close();
            if (!res.IsError) {
            } else {
              this.tipToast(res.Message);
            }
          }).catch(() => {
            WeVue.Indicator.close();
            this.tipToast('网络超时，请稍后再试！');
          });
        }
      }
    },
    activated () {
      clearInterval(time);
      this.forPass = undefined;
      this.forPass2 = undefined;
      this.forPassTel = undefined;
      this.forPassVerify = undefined;
      this.verifyText = '获取验证码';
      this.disabled = false;
      this.$nextTick(() => {
        this.$store.commit('isMenu', false);
        this.$store.commit('isLoading', false);
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .user_register
    .weui-cells
      .weui-label
        width 90px !important
        font-size 16px
      .weui-input
        height auto !important
        font-size 15px !important
      .weui-vcode-btn
        height auto
        line-height normal
        color #1F2124;
        border 1px solid #1F2124
        border-radius 5px
        font-size 15px
        padding: 3px 5px;
      p
        margin 0
</style>
