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
          <div class="center">设置</div>
          <div class="right"></div>
        </div>
      </div>

      <div class="pages navbar-through toolbar-through">
        <div class="page set page-on-center">
          <div class="page-content">
            <div class="list-block Mycenter" style="margin-top:10px;">
              <ul>
                <li>
                  <router-link to="/about"  class="item-link item-content">
                    <div class="item-inner">
                      <div class="item-title-row">
                        <div class="item-title">
                          <img src="../../images/my.png">&nbsp;关于我们
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
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    activated () {
      this.$nextTick(() => {
        this.$store.commit('isLoading', false);
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
