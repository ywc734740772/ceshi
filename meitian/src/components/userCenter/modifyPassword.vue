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
          <div class="center sliding" style="left: 0;">修改密码</div>
          <div class="right"><a href="javascript:" class="link contactsave" @click="contactSave">保存</a></div>
        </div>
      </div>

      <div class="pages">
        <div class="page navbar-through no-toolbar userpassword page-on-center">
          <div class="page-content">
            <div class="list-block user_register" style="margin: 0 0 35px 0;">
              <wv-group>
                <wv-input label="原 &nbsp&nbsp 密 &nbsp 码：" placeholder="请输入原始密码" type="password" v-model="oldPass"></wv-input>
                <wv-input label="新 &nbsp&nbsp 密 &nbsp 码：" placeholder="请输入新密码" type="password" v-model="modifyPass"></wv-input>
                <wv-input label="确认新密码：" placeholder="请确认新密码" type="password" v-model="modifyPass2"></wv-input>
              </wv-group>
            </div>
            <!--<a href="javascript:" class="button button-big signup-next-button password-button btnRegister" @click="btnRegister">确定</a>-->
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
  export default {
    data () {
      return {
        oldPass: this.oldPass,
        modifyPass: this.modifyPass,
        modifyPass2: this.modifyPass2
      };
    },
    created () {
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
      contactSave () {
        if (this.oldPass === undefined) {
          this.tipToast('原始密码不能为空！');
        } else if (this.modifyPass === undefined) {
          this.tipToast('新密码不能为空！');
        } else if (this.modifyPass.length < 6) {
          this.tipToast('新密码长度不能小于六位！');
        } else if (!this.modifyPass2) {
          this.tipToast('确认新密码不能为空！');
        } else if (this.modifyPass !== this.modifyPass2) {
          this.tipToast('两次输入密码不一样！');
        } else {
          WeVue.Indicator.open({
            text: 'loading',
            spinnerType: 'double-snake'
          });
          this.axios({
            method: 'post',
            url: this.$store.state.passportUrl + '/api/Membership/ChangePassword',
            data: qs.stringify({
              UserId: this.myInfo.UserId,
              OldPassword: this.oldPass,
              NewPassword: this.modifyPass
            })
          }).then((res) => {
            res = res.data;
            if (!res.IsError) {
              WeVue.Indicator.close();
              this.tipToast('密码修改成功！');
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
      this.oldPass = undefined;
      this.modifyPass = undefined;
      this.modifyPass2 = undefined;
      this.$nextTick(() => {
        this.$store.commit('isMenu', false);
        this.$store.commit('isLoading', false);
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .userpassword
    .weui-cells
      margin-top 5px
      .weui-label
        width 100px !important
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
