<template>
  <div class="views">
    <div class="view view-main">
      <div class="navbar">
        <div class="navbar-inner navbar-on-center">
          <div class="left"  @click="$router.back(-1)">
            <a href="javascript:" class="back link">
              <img src="../../images/back.png">
            </a>
          </div>
          <div class="center" style="left: 3px;">发票信息</div>
          <div class="right">保存</div>
        </div></div>
      <div class="pages navbar-through toolbar-through">
        <div data-page="invoiceInformation" class="page invoiceInformation page-on-center">
          <div class="page-content">
            <div class="list-block media-list">
              <ul>
                <li>
                  <div class="item-content">
                    <div class="item-inner">
                      <div class="item-title-row">
                        <div class="item-title">发票抬头</div>
                      </div>
                      <div class="item-text" style="height:100%;">
                        <div class="buttons-row">
                          <router-link to="/invoiceInformation/paperInvoice" replace class="button tab-link">纸质发票</router-link>
                          <router-link to="/invoiceInformation/electronicInvoice" replace class="button tab-link">电子发票</router-link>
                          <router-link to="/invoiceInformation/valueAddedInvoice" replace class="button tab-link">增值税发票</router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="tabs">
              <router-view></router-view>
            </div>
          </div>
        </div></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {};
    },
    mounted() {
//      this.$router.push('./invoiceInformation/paperInvoice');
    },
    created() {
      this.$nextTick(() => {
        this.$store.commit('isLoading', false);
      });
    },
    activated() {
      this.$nextTick(() => {
        this.$store.commit('isLoading', false);
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .tabs .tab
    display: block;
    .item-text
      input[type=radio]
        vertical-align middle
</style>
