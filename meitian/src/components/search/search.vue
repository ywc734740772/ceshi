<template>
  <div class="views">
    <div class="view view-main" data-page="search">
      <div class="navbar">
        <div class="navbar-inner navbar-on-center">
          <div class="center search-navbar" style="left: 0;width: 100%;display: flex;max-width: initial;">
            <form class="searchbar searchbar-init searchbar-active" @submit.prevent="submitSearch">
              <div class="searchbar-input">
                <input type="search" placeholder="水果" v-model="searchVal">
                <a href="javascript:" class="searchbar-clear" :style="`pointer-events:auto;opacity: ${searchVal ? 1 : 0}`" @click="clearSearchVal"></a>
              </div>
            </form>
          </div>
          <div class="right" @click="$router.back(-1)">
            <a href="javascript:">取消</a>
          </div>
        </div>
      </div>
      <div class="pages navbar-through toolbar-through">
        <div class="page search page-on-center" style="background:#ffffff;">
          <div class="page-content">
              <div class="content-block-title" v-if="searchHistory.length">
                搜索历史
                <span @click="deleteHistory" style="padding: 0 5px;">
                      <img src="../../images/delete.png" width="15">
                  </span>
              </div>
              <div class="content-block">
                <div class="content-block-inner border-none">
                  <router-link :to="{path: './hotSearch', qurey: {search: searchHistoryItem}}" v-for="(searchHistoryItem, index) in searchHistory" :key="index" class="item-link item-content">
                    <div class="chip">
                      <div class="chip-label" v-text="searchHistoryItem"></div>
                    </div>
                  </router-link>
                </div>
              </div>
              <div class="content-block-title">
                热门搜索
              </div>
              <div class="content-block">
                <div class="content-block-inner border-none">
                  <router-link to="./hotSearch" class="item-link item-content">
                    <div class="chip">
                      <div class="chip-label">粽子</div>
                    </div>
                  </router-link>
                  <a href="#" class="item-link item-content">
                    <div class="chip">
                      <div class="chip-label">佳沛市异果</div>
                    </div>
                  </a>
                  <a href="#" class="item-link item-content">
                    <div class="chip">
                      <div class="chip-label">阿根廷红虾</div>
                    </div>
                  </a>
                  <a href="#" class="item-link item-content">
                    <div class="chip">
                      <div class="chip-label">鱼</div>
                    </div>
                  </a>
                  <a href="#" class="item-link item-content">
                    <div class="chip">
                      <div class="chip-label">水</div>
                    </div>
                  </a>
                  <a href="#" class="item-link item-content">
                    <div class="chip">
                      <div class="chip-label">蔬菜</div>
                    </div>
                  </a>
                  <a href="#" class="item-link item-content">
                    <div class="chip">
                      <div class="chip-label">咖啡</div>
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
  export default {
    data() {
      return {
        searchVal: this.searchVal,
        searchHistory: []
      };
    },
    created() {
      if (JSON.parse(localStorage.getItem('searchHistory'))) {
        this.searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
      }
    },
    methods: {
      submitSearch() {
        this.searchHistory.push(this.searchVal);
        localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
        this.$router.replace({path: '/hotSearch', query: {search: this.searchVal}});
      },
      deleteHistory() {
        localStorage.removeItem('searchHistory');
        this.searchHistory = [];
      },
      clearSearchVal () {
        this.searchVal = '';
      }
    },
    activated() {
      this.searchVal = '';
      if (localStorage.getItem('searchHistory')) {
        this.searchHistory = JSON.parse(localStorage.getItem('searchHistory')).reverse().slice(0, 10);
      }
      this.$nextTick(() => {
        this.$store.commit('isLoading', false);
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .searchbar:after
    background: none
</style>
