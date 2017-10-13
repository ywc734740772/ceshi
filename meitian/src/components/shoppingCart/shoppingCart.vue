<template>
  <div class="view view-main">
    <div class="navbar">
      <div class="navbar-inner navbar-on-center" v-if="myInfo">
        <div class="left" @click="$router.back(-1)">
          <a href="javascript:" class="back link">
            <img src="../../images/back.png">
          </a>
        </div>
        <div class="center">购物车</div>
        <div class="right"></div>
      </div>
    </div>
    <div class="pages shoppingCart">
      <div class="page-content" style="padding:43px 0 85px 0;">
        <shopCartList v-if="CartListInfo.length" v-for="(CartListItem, index) in CartListInfo" :key="index" :CartListInfos="CartListItem" :CartListIndex="index" @click.native="setGoodsInfo(CartListItem)"></shopCartList>
        <div v-if="!CartListInfo.length" class="cartTitle">购物车是空的！</div>
        <div class="love-column content-block column">
                <span class="">
                    <img src="../../images/love.png" style="width:20px;vertical-align:middle;">&nbsp;猜你喜欢
                </span>
        </div>

        <div class="content-block ks-grid margin-content love-list" style="padding:0 10px;">
          <div class="row">
            <shopCartLikeList></shopCartLikeList>
            <shopCartLikeList></shopCartLikeList>
            <shopCartLikeList></shopCartLikeList>
            <shopCartLikeList></shopCartLikeList>
          </div>
        </div>

      </div>
      <div class="toolbar tabbar tabbar-labels two-menu" style="margin-bottom:50px;" v-show="CartListInfo.length">
        <div class="toolbar-inner">
          <div class="row">
            <div class="col-30">
              <input type="checkbox" value="" id="newslist">
              <label for="newslist" :class="{'check':isCheck}" @click="select(CartListInfo)"></label>
              全选
            </div>
            <div class="total commodity-money" style="flex-grow: 1;order: 1;overflow: hidden">合计：<span class="money" v-text="`¥${TotalMoney}`"></span></div>
            <a href="javascript:" class="col-30 settlement" @click="Settlement" style="order: 1;">去结算</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import shopCartList from '../../components/shopCartList/shopCartList.vue';
  import shopCartLikeList from '../../components/shopCartLikeList/shopCartLikeList.vue';
  import {mapState} from 'vuex';

  export default {
    data() {
      return {
        isCheck: false
      };
    },
    created() {
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (!vm.$store.state.userInfo.Profile && localStorage.getItem('userInfo') === null) {
          vm.$router.push('./login');
        }
      });
    },
    activated() {
      this.$nextTick(() => {
        this.$store.commit('isLoading', false);
      });
    },
    methods: {
      select(data) {
        this.isCheck = !this.isCheck;
        this.$store.commit('select', this.isCheck);
      },
      Settlement() {
        if (Number(this.TotalMoney)) {
          this.$router.push('./settlement');
        }
      },
      setGoodsInfo(GroupListGoodsItem) {
        this.$store.commit('goodsInfos', GroupListGoodsItem);
      }
    },
    computed: mapState({
      CartListInfo: (data) => {
        if (!data.CartInfo.length && localStorage.getItem('CartInfo')) {
          data.CartInfo = JSON.parse(localStorage.getItem('CartInfo'));
        }
        if (data.userInfo.UserId !== undefined || localStorage.getItem('userInfo') !== null) {
          if ((data.CartInfo.length && data.CartInfo[0].UserId) !== ((data.userInfo && data.userInfo.UserId) || JSON.parse(localStorage.getItem('userInfo')).UserId)) {
            data.CartInfo = [];
            localStorage.removeItem('CartInfo');
          }
        }
        return data.CartInfo;
      },
      TotalMoney: (data) => {
        let TotalMoney = 0;
        data.CartInfo.forEach((val) => {
          if (val.isChecked) {
            TotalMoney += val.count * (val.price || val.Price);
          }
        });
        return TotalMoney.toFixed(2);
      },
      myInfo: (data) => {
        if (!data.userInfo.Profile && localStorage.getItem('userInfo')) {
          data.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        }
        return data.userInfo;
      }
    }),
    components: {
      shopCartList,
      shopCartLikeList
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
    .cartTitle
      min-height 50px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
</style>
