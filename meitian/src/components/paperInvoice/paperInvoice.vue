<template>
  <div id="tab1" class="tab active">
    <div class="list-block media-list">
      <ul>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title-row">
                <div class="item-title">发票抬头</div>
              </div>
              <div class="item-text">
                <input name="personal" id="personal" type="radio" checked value=""> <label for="personal">个人</label>&nbsp;&nbsp;
                <input name="personal" id="personal2" type="radio" value=""> <label for="personal2">单位</label>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
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
  .tab
    .item-text
      input[type=radio]
        vertical-align middle
</style>
