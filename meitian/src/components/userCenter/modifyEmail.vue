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
          <div class="center sliding">修改邮箱</div>
          <div class="right"><a href="javascript:" class="link contactsave" @click="contactSave">保存</a></div>
        </div>
      </div>

      <div class="pages">
        <div class="page no-toolbar username">
          <div class="page-content">
            <div class="list-block user_name" style="margin:52px 0;">
              <ul>
                <li>
                    <wv-group>
                      <wv-input label="邮 &nbsp&nbsp&nbsp箱：" placeholder="123@qq.com" type="email" v-model="modifyEmail"></wv-input>
                    </wv-group>
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
  export default {
    data() {
      return {
        modifyEmail: this.modifyEmail
      };
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
      contactSave() {
        let regEmail = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
        if (!regEmail.test(this.modifyEmail)) {
          this.tipToast('邮箱格式有误！');
        } else if (!this.myInfo.UserId) {
          this.$router.push('/login');
        } else {
          WeVue.Indicator.open({
            text: 'loading',
            spinnerType: 'double-snake'
          });
          this.axios({
            method: 'post',
            url: this.$store.state.passportUrl + '/api/Membership/UpdateUserProfile',
            data: qs.stringify({
              UserId: this.myInfo.UserId,
              Profile: {
                Email: this.modifyEmail
              }
            })
          }).then((res) => {
            res = res.data;
            if (!res.IsError) {
              WeVue.Indicator.close();
              this.$store.commit('CurrentUser', {Email: this.modifyEmail, type: 'Email'});
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
      this.modifyEmail = '';
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
    p
      margin 0
</style>
