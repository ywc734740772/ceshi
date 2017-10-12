<template>
  <div id="tab3" class="tab">
    <div class="list-block media-list" style="margin:0 0 10px 0;">
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
              <div class="item-title"><span>单位名称：</span>上海亿狮摩信息技术有限公司</div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title"><span>纳税人编号：</span>3105343445344</div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title"><span>注册地址：</span>上海市闵行区兴梅路</div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title"><span>开户银行：</span>农行</div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title"><span>银行账号：</span>434443123232334</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="list-block media-list" style="margin:10px 0;">
      <ul>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title label">收票人信息</div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title"><span>收票人姓名：</span>上海亿狮摩信息技术有限公司</div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title"><span>收票人手机：</span>18763829784</div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title"><span>所在地区：</span>上海市黄浦区</div>
            </div>
          </div>
        </li>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title"><span>详细地址：</span>南昌路</div>
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

</style>
