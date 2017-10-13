<template>
  <div class="views">
    <div class="view view-main index-page" data-page="username">
      <div class="navbar">
        <div class="navbar-inner navbar-on-center">
          <div class="left" @click="$router.back(-1)">
            <a href="javascript:" class="back link">
              <img src="../../images/back.png" width="25">
            </a>
          </div>
          <div class="center sliding">修改绑定手机号</div>
          <div class="right"><a href="javascript:" class="link contactsave" @click="contactSave">保存</a></div>
        </div>
      </div>

      <div class="pages">
        <div class="page no-toolbar username">
          <div class="page-content">
            <div class="list-block user_name" style="margin:49px 0;">
              <ul>
                <li>
                  <div class="list-block user_register">
                    <div class="content-block-title desc" style="font-size:15px;padding-top: 20px;">
                      <span class="current-email">您当前的手机号码：
                          <span id="current-phone">{{myInfo.Profile && myInfo.Profile.Mobile && myInfo.Profile.Mobile | currentPhone}}</span>
                      </span>
                    </div>
                    <wv-group>
                      <wv-input label="手 机 号：" placeholder="请输入手机号" type="number" v-model="modifyTel">
                        <button class="weui-vcode-btn" slot="ft" @click="queryPhoneNumber" :disabled="disabled" v-text="verifyText"></button >
                      </wv-input>
                      <wv-input label="验 证 码：" placeholder="请输入验证码" type="number" v-model="modifyVerify"></wv-input>
                    </wv-group>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex';
  import WeVue from 'we-vue';
  import qs from 'qs';
  let time = null;
  export default {
    data() {
      return {
        disabled: false,
        modifyTel: this.modifyTel,
        modifyVerify: this.modifyVerify,
        verifyText: '获取验证码'
      };
    },
    filters: {
      currentPhone(val) {
        let phone = '';
        if (val) {
          phone = val.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        }
        return phone;
      }
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
      queryPhoneNumber() {
        let regTel = /^1(3|4|5|7|8)\d{9}$/;
        if (!regTel.test(this.modifyTel)) {
          this.tipToast('手机号码格式有误！');
          return;
        }
        WeVue.Indicator.open({
          text: 'loading',
          spinnerType: 'double-snake'
        });
        this.axios({
          method: 'get',
          url: this.$store.state.passportUrl + '/api/Membership/IsMobileExists?mobile=' + this.modifyTel
        }).then((res) => {
          res = res.data;
          if (!res.IsError) {
            if (res.Data.Exists) {
              WeVue.Indicator.close();
              this.tipToast('当前手机号码已被其他账号绑定！');
            } else {
              this.sendVerify();
            }
          } else {
            WeVue.Indicator.close();
            this.tipToast(res.Message);
          }
        }).catch(() => {
          WeVue.Indicator.close();
          this.tipToast('网络超时，请稍后再试！');
        });
      },
      sendVerify() {
          if (!this.disabled) {
            this.valueVerify = '';
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
                Source: 'VerifyDevice',
                Target: this.modifyTel,
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
          } else {
            WeVue.Indicator.close();
          }
      },
      contactSave() {
        let regTel = /^1(3|4|5|7|8)\d{9}$/;
        if (!regTel.test(this.modifyTel)) {
          this.tipToast('手机号格式有误！');
        } else if (!this.modifyVerify) {
          this.tipToast('验证码不能为空！');
        } else if (!this.myInfo.UserId) {
          this.$router.push('/login');
        } else {
          WeVue.Indicator.open({
            text: 'loading',
            spinnerType: 'double-snake'
          });
          this.axios({
            method: 'post',
            url: this.$store.state.passportUrl + '/api/Membership/ValidateMobile',
            data: qs.stringify({
              UserId: this.myInfo.UserId,
              Mobile: this.modifyTel,
              VerifyCode: this.modifyVerify
            })
          }).then((res) => {
            res = res.data;
            if (!res.IsError) {
              WeVue.Indicator.close();
              this.$store.commit('CurrentUser', {Mobile: this.modifyTel, type: 'Mobile'});
              this.tipToast('资料更新成功！');
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
      }
    },
    activated () {
      clearInterval(time);
      this.modifyTel = '';
      this.modifyVerify = '';
      this.verifyText = '获取验证码';
      this.$nextTick(() => {
        this.$store.commit('isLoading', false);
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .weui-cells
    .weui-label
      width 80px !important
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
