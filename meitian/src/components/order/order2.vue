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

        <div class="page-content" style="padding-bottom:0;padding-top: 44px;">
          <div class="row-order">
            <div class="col-20">
              <a href="javascript:" class="tab-link" v-for="(GroupListItem, index) in GroupList" :class="{'active':orderIndex==index}" @click="selectGoods(GroupListItem, index)">
                <div v-text="GroupListItem.Name"></div>
              </a>
            </div>
            <div class="col-80 order-left" id="ulItem">
              <div class="tabs">
                <orderList v-for="(GroupListGoodsItem, index) in GroupListGoods" :key="index" :GroupListGoods="GroupListGoodsItem" @click.native="setGoodsInfo(GroupListGoodsItem)"></orderList>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  <!--</transition>-->
</template>

<script type="text/ecmascript-6">
  //  import BScroll from 'better-scroll';
  import orderList from '../../components/orderList/orderList.vue';
  import {mapState} from 'vuex';
  export default {
    data () {
      return {
        GroupList: [],
        GroupListGoods: [],
        orderIndex: 0
      };
    },
    created() {
      this.axios.get(this.$store.state.apiUrl + '/app/Goods/GetGoodsById?goodsId=28').then((res) => {
        res = res.data;
        this.GroupList = res.Data;
        this.$nextTick(() => {
          this.selectGoods(this.GroupList[0], 0);
        });
      }).catch(() => {
        this.$store.commit('isLoading', false);
      });
    },
    activated() {
      setTimeout(() => {
        this.$store.commit('isLoading', false);
      }, 500);
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
    methods: {
      selectGoods(item, index) {
//        this.$store.commit('isLoading', true);
        this.orderIndex = index;
        this.axios.get(this.$store.state.apiUrl + '/cashier/Cashier/GetGoodsListInCashierGroup?cashierGroup=' + item.GroupId).then((res) => {
          res = res.data;
          this.GroupListGoods = res.Data;
          this.$store.commit('isLoading', false);
        }).catch(() => {
          this.$store.commit('isLoading', false);
        });
      },
      setGoodsInfo(GroupListGoodsItem) {
        this.$store.commit('goodsInfos', GroupListGoodsItem);
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
</style>
