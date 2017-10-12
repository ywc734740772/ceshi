<template>
  <!--<transition name="move">-->
    <div class="order">
      <div class="views">
        <div class="view view-main">
          <div class="navbar">
            <div class="navbar-inner navbar-on-center">
              <div class="left" @click="$router.back(-1)">
                <a href="javascript:" class="back link">
                  <img src="../../images/back.png">
                </a>
              </div>
              <div class="center" style="left: 17.5px;">
                水果蔬菜
              </div>
              <div class="right">
                <router-link to="/search" class="open-panel">
                  <img src="../../images/search.png">
                </router-link>
                <router-link to="/shoppingCart" class="open-panel">
                  <i>
                    <img src="../../images/shopping.png">
                    <span class="badge bg-red" v-if="cartCount" v-text="cartCount"></span>
                  </i>
                </router-link>
              </div>
            </div>
          </div>

          <div class="page-content" style="margin-top: 44px;padding-bottom: 0; ">
            <div class="row-order">
              <div class="col-20" ref="menuWrapper">
                <a href="javascript:" class="tab-link" v-for="(GroupListItem, index) in GroupList" :key="index" :class="{'active':orderIndex===index}" @click="selectMenu(index,$event)">
                  <div v-text="GroupListItem.Name"></div>
                </a>
              </div>
              <div class="col-80 order-left" id="ulItem" ref="foodsWrapper">
                <ul id="ulTabs" style="padding-bottom: 45px;">
                  <li class="tabs" v-for="(GroupListItem, index) in GroupList">
                    <div class="tabClass" v-text="GroupListItem.Name"></div>
                    <orderList v-for="(GroupListGoodsItem, index) in GroupListItem.Goods" :key="index" :GroupListGoods="GroupListGoodsItem" @click.native="setGoodsInfo(GroupListGoodsItem)"></orderList>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  <!--</transition>-->
</template>

<script type="text/ecmascript-6">
  import Bscroll from 'better-scroll';
  import orderList from '../../components/orderList/orderList.vue';
  import WeVue from 'we-vue';
  import {mapState} from 'vuex';
  export default {
    data () {
      return {
        GroupList: [],
        GroupListGoods: [],
        listHeight: [],
        scrollY: 0
      };
    },
    created() {
      WeVue.Indicator.open({
        text: 'loading',
        spinnerType: 'double-snake'
      });
      this.axios.get(this.$store.state.apiUrl + '/app/Goods/GetShopGroupGoods?shopId=' + this.$store.state.shopId).then((res) => {
        if (!res.data.IsError) {
          res = res.data.Data;
          this.GroupList = res;
          this.GroupList.sort((a, b) => {
            return b.GroupId - a.GroupId;
          });
          setTimeout(() => {
            WeVue.Indicator.close();
          }, 1000);
          this.$nextTick(() => {
//          this.$store.commit('isLoading', false);
            this._initScroll();
            this._calculateHeight();
          });
        } else {
          this.tipToast(res.data.Message);
        }
      }).catch(() => {
        WeVue.Indicator.close();
        this.tipToast('网络超时，请稍后再试！');
      });
    },
    mounted() {
    },
    activated() {
      setTimeout(() => {
        if (this.GroupList.length) {
          WeVue.Indicator.close();
//          this.$store.commit('isLoading', false);
        }
      }, 1000);
    },
    computed: mapState({
      cartCount: (data) => {
        let cartCount = 0;
        data.CartInfo.forEach((val) => {
          cartCount += val.count;
        });
        return cartCount;
      },
      orderIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      }
    }),
    methods: {
      tipToast(msg) {
        WeVue.Toast({
          duration: 2000,
          message: msg,
          type: 'text'
        });
      },
      setGoodsInfo(GroupListGoodsItem) {
        this.$store.commit('goodsInfos', GroupListGoodsItem);
      },
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('tabs');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      _initScroll() {
        this.meunScroll = new Bscroll(this.$refs.menuWrapper, {
          click: true
        });

        this.foodsScroll = new Bscroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        });

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('tabs');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    },
    components: {
      orderList
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .order
    position: fixed
    left: 0
    top: 0
    bottom: 0
    z-index: 6000
    width: 100%
    background: #fff
    transform: translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition: all 0.1s linear
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
  .tabClass
    background: #f8f8f8;
    font-size: 14px;
    padding: 5px 5px 5px 10px;
</style>
