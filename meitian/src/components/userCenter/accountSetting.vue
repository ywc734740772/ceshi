<template>
  <div class="views">
    <div class="view view-main index-page" data-page="Myinfo">
      <div class="navbar">

        <div class="navbar-inner page-disabled navbar-on-center">
          <div class="left" @click="$router.back(-1)">
            <a href="javascript:" class="back link">
              <img src="../../images/back.png" width="25">
            </a>
          </div>
          <div class="center sliding">账号设置</div>
          <div class="right"></div>
        </div>
      </div>
      <div class="pages">

        <div class="page navbar-through no-toolbar Myinfo page-on-center">
          <div class="page-content">
            <div>
              <div class="content-block Myinfotop" style="text-align: center;margin: 25px 0 0 0;height: 110px;">
                <div style="height: 60px;width: 60px;margin: 0 auto;border-radius: 3px;">
                  <vue-core-image-upload
                    class="btn btn-primary"
                    :crop="false"
                    @imageuploaded="imageuploaded"
                    :max-file-size="5242880"
                    :url="`${this.$store.state.passportUrl}/api/FileUpload/UploadFile`"
                    style="display:inline-block;height: 60px;width: 60px;">
                    <img :src="`${src || (myInfo.Profile && myInfo.Profile.Avatar)}`" width="60" height="60" alt="">
                  </vue-core-image-upload>
                </div>
                <button v-if="isUpload" class="button" @click="modifyAvatar">修改</button>
              </div>
              <div class="content-block-title" style="margin-top: 20px;">个人信息</div>
              <div class="list-block Myinfocenter">
                <ul>
                    <router-link to="/modifyNickName" class="item-link item-content" tag="li">
                      <div class="item-inner">
                        <div class="item-title label">昵称</div>
                        <div class="item-after" v-text="myInfo.Profile && myInfo.Profile.NickName"></div>
                      </div>
                    </router-link>
                    <router-link to="/modifyName" class="item-link item-content" tag="li">
                      <div class="item-inner">
                        <div class="item-title label">姓名</div>
                        <div class="item-after" v-text="myInfo.Profile && myInfo.Profile.RealName"></div>
                      </div>
                    </router-link>
                </ul>
              </div>
              <div class="content-block-title">联系方式</div>
              <div class="list-block Myinfocenter">
                <ul>
                  <router-link to="/modifyEmail" class="item-link item-content" tag="li">
                      <div class="item-inner">
                        <div class="item-title label">邮箱</div>
                        <div class="item-after" v-text="myInfo.Profile && myInfo.Profile.Email"></div>
                      </div>
                  </router-link>
                  <router-link to="/modifyPhone" class="item-link item-content" tag="li">
                      <div class="item-inner">
                        <div class="item-title label">手机</div>
                        <div class="item-after" v-text="myInfo.Profile && myInfo.Profile.Mobile"></div>
                      </div>
                  </router-link>
                </ul>
              </div>
              <div class="list-block Myinfocenter" style="margin:35px 0;">
                <ul>
                  <router-link to="/modifyPassword" class="item-link item-content" tag="li">
                      <div class="item-inner">
                        <div class="item-title label">修改密码</div>
                        <div class="item-after"></div>
                      </div>
                  </router-link>
                </ul>
              </div>
              <div class="list-block" style="margin-top: 0;">
                <ul>
                  <li>
                    <button class="button" @click="logout" style="height:45px;width: 100%;border: none">退出当前账号</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
      import {mapState} from 'vuex';
      import VueCoreImageUpload from 'vue-core-image-upload';
      import WeVue from 'we-vue';
      import qs from 'qs';
      import defaultAvatar from '../../images/blank-avatar.png';
      export default {
        data() {
          return {
            src: null,
            isUpload: false
          };
        },
        mounted() {
        },
        components: {
          'vue-core-image-upload': VueCoreImageUpload
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
          imageuploaded(res) {
            if (!res.IsError) {
                this.src = this.$store.state.passportUrl + res.Data.originalFile;
                this.isUpload = true;
            } else {
              WeVue.Toast({
                duration: 2000,
                message: '网络超时，上传失败！',
                type: 'text'
              });
            }
          },
          modifyAvatar() {
            if (!this.src || this.src === '') {
              this.tipToast('修改失败，请重新上传！');
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
                    Avatar: this.src
                  }
                })
              }).then((res) => {
                res = res.data;
                if (!res.IsError) {
                  WeVue.Indicator.close();
                  this.$store.commit('CurrentUser', {Avatar: this.src, type: 'Avatar'});
                  this.isUpload = false;
                  this.tipToast('修改成功！');
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
          logout() {
            WeVue.Dialog.confirm(WeVue.Dialog.setDefaults({
              title: '提示',
              message: '是否退出当前账号？',
              confirmText: '退出',
              cancelText: '取消',
              showCancelBtn: true
            })).then(action => {
              this.$store.commit('CurrentUser', {type: 'logout'});
              this.$store.commit('addCart', 'subOrder');
              this.$store.commit('goodsInfos', 'subOrder');
              localStorage.removeItem('goodsInfo');
              localStorage.removeItem('CartInfo');
              this.$router.replace('/login');
            });
          }
        },
        activated () {
          this.isUpload = false;
          this.src = null;
          this.$nextTick(() => {
            this.$store.commit('isLoading', false);
          });
        }
      };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .Myinfo
    .page-content
      background-color #f7f7f8
      .Myinfocenter
        font-size 15px
      .button
        width 60px
        height 25px
        line-height 25px
        margin 20px auto 0 auto
        border solid 1px #333
        color #333
</style>
