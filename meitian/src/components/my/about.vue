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
          <div class="center" style="">关于我们</div>
          <div class="right"></div>
        </div></div>
      <div class="pages navbar-through toolbar-through">

        <div data-page="aboutUs" class="page aboutUs page-on-center">
          <div class="page-content">
            <div class="about-us">
              <br>
              <br>
              <br>
              <br>
              <img src="../../images/u6.png">
              <br>
              <br>
              <div>美天</div>
              <div>版本：V2.1</div>
            </div>
          </div>
        </div></div>
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
