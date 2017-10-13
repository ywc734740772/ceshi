<template>
  <div class="views">
    <div class="view view-main">
      <div class="navbar">
        <div class="navbar-inner navbar-on-center">
          <div class="left" @click="$router.back(-1)">
            <a href="javascript:" class="back link">
              <img src="../../images/back.png">
            </a>
          </div>
          <div class="center" style="left: 3px;">意见反馈</div>
          <div class="right" @click="saveMessage">提交</div>
        </div>
      </div>
      <div class="pages navbar-through toolbar-through">
        <div class="page myMessage page-on-center">
          <div class="page-content">
            <div class="list-block" style="margin:10px 0;">
              <ul>
                <!-- Textarea -->
                <li class="align-top">
                  <div class="item-content" style="padding-left:0;">
                    <div class="item-inner" style="padding-right: 0;">
                      <div class="item-input">
                        <wv-group>
                          <wv-textarea placeholder="给我留言" :rows="10" v-model="valueContent" :max-length="300"></wv-textarea>
                        </wv-group>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-content">
                    <div class="item-inner">
                      <div class="item-input">
                        <div class="z_photo">
                            <vue-core-image-upload
                              class="btn btn-primary"
                              :crop="false"
                              :credentials="false"
                              :inputAccept="'image/jpg,image/jpeg,image/png,image/gif'"
                              @imageuploaded="imageuploaded"
                              :max-file-size="5242880"
                              :url="`${this.$store.state.passportUrl}/api/FileUpload/UploadFile`"
                            style="display:inline-block;width: 60px;height: 60px;margin: 0 9px 10px 0;">
                              <div class="z_file"></div>
                            </vue-core-image-upload>

                          <div class="z_addImg" v-for="(uploadItem, index) in src" :key="index" @click="delImg(index)">
                            <img :src="uploadItem">
                          </div>
                        </div>
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
  </div>
</template>

<script type="text/ecmascript-6">
  import VueCoreImageUpload from 'vue-core-image-upload';
  import WeVue from 'we-vue';
  export default {
    data() {
      return {
        valueContent: this.valueContent,
        src: []
      };
    },
    activated () {
      this.$nextTick(() => {
        this.src = [];
        this.valueContent = '';
        this.$store.commit('isLoading', false);
      });
    },
    components: {
      'vue-core-image-upload': VueCoreImageUpload
    },
    methods: {
      tipToast (msg) {
        WeVue.Toast({
          duration: 2000,
          message: msg,
          type: 'text'
        });
      },
      imageuploaded(res) {
        if (res.Result === 1) {
          if (this.src.length < 5) {
            this.src.push(this.$store.state.passportUrl + res.Data.originalFile);
          } else {
            WeVue.Toast({
              duration: 2000,
              message: '最多只能上传5张图片！',
              type: 'text'
            });
          }
        }
      },
      delImg(index) {
        WeVue.Dialog.confirm(WeVue.Dialog.setDefaults({
          message: '确定要删除这张图片吗？',
          showCancelBtn: true,
          confirmText: '确认',
          cancelText: '取消'
          })).then(action => {
          this.src.splice(index, 1);
        });
      },
      saveMessage() {
        if (this.valueContent === '') {
          this.tipToast('请先输入您宝贵的意见！');
        } else {
          this.tipToast('意见反馈正在开发中！');
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .myMessage
    .weui-cells
      margin 0;
      .weui-cell
        padding 8px 8px 5px 8px
        .weui-textarea,.weui-textarea-counter
          height auto
          font-size 14px
          padding 0
    .z_photo
      display flex
      flex-direction row
      justify-content flex-start
      flex-wrap wrap
      .z_addImg
        height 60px
        margin: 0 9px 10px 0;
        img
          width 60px
          height 60px
      form
        width 100% !important
</style>
