<template>
  <div class="views">
    <div class="view view-main" data-page="hotsearch">
      <div class="navbar">

        <div class="navbar-inner navbar-on-center">
          <div class="left" @click="$router.back(-1)">
            <a href="javascript:" class="back link">
              <img src="../../images/back.png">
            </a>
          </div>
          <div class="center hot-search-navbar search-navbar"
               style="left: 0;width: 100%;display: flex;max-width: initial;">
            <form class="searchbar searchbar-init" @submit.prevent="submitSearch">
              <div class="searchbar-input">
                <input type="search" placeholder="水果" v-model="searchVal">
                <a href="javascript:" class="searchbar-clear" :style="`pointer-events:auto;opacity: ${searchVal ? 1 : 0}`" @click="clearSearchVal"></a>
              </div>
            </form>
          </div>
          <div class="right">
            <router-link to="/shoppingCart">
              <i>
                <img src="../../images/shopping.png">
                <span class="badge bg-red" v-if="cartCount" v-text="cartCount"></span>
              </i>
            </router-link>
          </div>
        </div>
      </div>
      <div class="pages navbar-through toolbar-through">

        <div class="page hotsearch page-on-center">
          <div class="page-content">
            <div class="content-block ks-grid margin-content" style="padding:0 10px;">
              <div class="row">
                <a href="" class="item-link item-content col-50">
                  <img src="../../images/11.jpg">
                  <div class="title">美国加州车厘美国加州车</div>
                  <div class="hotsearch-pay">
                    ¥ 49.90/盒
                    <span>
                      <img src="../../images/plus.png">
                    </span>
                  </div>
                </a>
                <a href="" class="item-link item-content col-50">
                  <img src="../../images/u739.png">
                  <div class="title">全身94%的水分，炎炎夏日补水就它了！</div>
                  <div class="hotsearch-pay">
                    ¥ 49.90/盒
                    <span>
                                <img src="../../images/plus.png">
                    </span>
                  </div>
                </a>
                <a href="" class="item-link item-content col-50">
                  <img src="../../images/u739.png">
                  <div class="title">生态种植，自然成熟，还荔枝一个清净......</div>
                  <div class="hotsearch-pay">
                    ¥ 49.90/盒
                    <span>
                      <img src="../../images/plus.png">
                    </span>
                  </div>
                </a>
                <a href="" class="item-link item-content col-50">
                  <img src="../../images/u739.png">
                  <div class="title">巨无霸个头，清新果肉，不逊金果甜蜜</div>
                  <div class="hotsearch-pay">
                    ¥ 49.90/盒
                    <span>
                      <img src="../../images/plus.png">
                    </span>
                  </div>
                </a>
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
  export default {
    data () {
      return {
        searchVal: this.searchVal,
        searchHistory: []
      };
    },
    created() {
      if (localStorage.getItem('searchHistory')) {
        this.searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
      }
    },
    computed: mapState({
      cartCount: (data) => {
        let cartCount = 0;
        data.CartInfo.forEach((val) => {
          cartCount += val.count;
        });
        return cartCount;
      }
    }),
    mounted() {
      this.$nextTick(() => {
        this.searchVal = this.$route.query.search;
      });
    },
    methods: {
      submitSearch() {
        this.searchHistory.push(this.searchVal);
        localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
      },
      clearSearchVal () {
        this.searchVal = '';
      }
    },
    activated() {
      this.searchVal = '';
      this.$nextTick(() => {
        this.$store.commit('isLoading', false);
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
