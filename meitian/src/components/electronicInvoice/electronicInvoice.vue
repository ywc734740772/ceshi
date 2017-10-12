<template>
  <div id="tab2" class="tab">
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
              <div class="name">
                <input type="text" value="李丹">
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <form class="list-block">
      <ul>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">发票信息</div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">收票人手机</div>
              <div class="item-input">
                <input type="text" placeholder="收票人手机">
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">收票人邮箱</div>
              <div class="item-input">
                <input type="text" placeholder="用来接收电子发票">
              </div>
            </div>
          </div>
        </li>
      </ul>
    </form>
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

</style>
