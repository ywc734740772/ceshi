<template>
  <div v-if="CartListInfos.count" class="cartList">
    <div class="list-block media-list left-delete" style="margin:10px 0 0 0;">
        <swipeout>
          <swipeout-item :threshold=".5" underlay-color="#ccc" @touchstart.native="swipeoutClose($event)" @on-open="handleEvents($refs[`swipeoutItem${CartListInfos._index}`])" :ref="`swipeoutItem${CartListInfos._index}`" transition-mode="follow">
            <div slot="right-menu">
              <swipeout-button @click.native="goodsDel('delete', CartListInfos)" background-color="#ff3b30">删除</swipeout-button>
            </div>
            <div slot="content" class="demo-content vux-1px-tb">
              <ul>
                <li class="swipeout">
                <a href="javascript:" class="move swipeout-content item-content">
                  <div class="item-media">
                    <input type="checkbox" value="78" class="check" name="newslist" :id="`newslist-${CartListInfos._index}`">
                    <label :for="`newslist-${CartListInfos._index}`" :class="{'check':CartListInfos.isChecked}"
                           @click="selectGoods(CartListInfos)"></label>
                    <img src="../../images/11.jpg" width="90">
                  </div>
                  <router-link to="/goodsDetail" class="swipeout-content item-content">
                    <div class="item-inner">
                      <div class="item-title-row">
                        <div class="item-title" v-text="CartListInfos.Name"></div>
                      </div>
                      <!--<div class="item-text" v-text="CartListInfos.Comments"></div>-->
                      <div class="item-text" v-for="SubGoodsItem in CartListInfos.SubGoods" v-text="`${SubGoodsItem.Name} /${SubGoodsItem.Unit}`" style="height: 16px;"></div>
                      <div class="cart-top">
                        <div class="commodity-money">
                          <span class="money price" v-show="CartListInfos.oldPrice"
                                v-text="`已降¥ ${CartListInfos.oldPrice}`"></span>
                        </div>
                        <div class="commodity-money">
                          <span class="money"
                                v-text="`¥ ${Number(CartListInfos.price||CartListInfos.Price).toFixed(2)}/${CartListInfos.unit||CartListInfos.Unit}`"></span>&nbsp;&nbsp;
                          <span v-show="CartListInfos.oldPrice" class="unit" style="text-decoration:line-through">¥ 100.90/盒</span>
                        </div>
                      </div>
                    </div>
                  </router-link>
                </a>
              </li>
              </ul>
            </div>
          </swipeout-item>
      </swipeout>
    </div>
    <div class="column-top list-block media-list" style="margin:0;">
      <ul>
        <li>
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title-row">
                <div class="item-title commodity-money" style="font-weight:normal;">
                  <span class="price">小计：</span>
                  <span class="money"
                        v-text="`¥${Number(CartListInfos.count * CartListInfos.price||CartListInfos.count * CartListInfos.Price).toFixed(2)}`"></span>
                </div>
                <div class="item-after">
                  <span class="aCart" @click="changeNum(CartListInfos, '-1');">
                    <img src="../../images/minus.png" width="20">
                  </span>
                  <input class="numa" id="num1" type="text" ref="input" :value="CartListInfos.count"
                         @change="filtersVal(CartListInfos)">
                  <span class="aCart" @click="changeNum(CartListInfos, '1');">
                    <img src="../../images/add1.png" width="20">
                  </span>
                  <span v-text="CartListInfos.unit||CartListInfos.Unit" class="cartUnit"></span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex';
  import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux';

  let els = null;
  export default {
    props: ['CartListInfos', 'CartListIndex'],
    data() {
      return {
        isOpen: true,
        isChecks: this.isCheck
      };
    },
    filters: {},
    mounted() {
        let that = this;
          document.addEventListener('touchstart', (ev) => {
            if (that.isOpen) {
              that.isOpen = false;
              if (ev.target.className !== 'vux-swipeout-button') {
                that.delHide();
              }
              setTimeout(() => {
                that.isOpen = true;
              }, 100);
            }
          }, false);
    },
    computed: mapState({}),
    methods: {
      changeNum(item, way) {
        if (way > 0) {
          item.count++;
          item.OrderQuantity++;
        } else {
          item.count--;
          item.OrderQuantity--;
          if (way < 0) {
            way = 0;
          }
        }
        this.$store.commit('ModifyQuantity', item);
      },
      selectGoods(item) {
        item.isChecked = !item.isChecked;
        this.$store.commit('selectGoods', item);
      },
      filtersVal(item) {
        if (Number(this.$refs.input.value) > 0) {
          item.count = Number(this.$refs.input.value);
          item.OrderQuantity = Number(this.$refs.input.value);
          this.$store.commit('ModifyQuantity', item);
        }
      },
      delHide(e) {
        if (els !== null) {
          els.close();
        }
      },
      handleEvents(item) {
        els = item;
      },
      swipeoutClose(ev) {
        if (ev.target.className !== 'vux-swipeout-button') {
                this.delHide();
        }
      },
      goodsDel(type, item) {
        if (type === 'delete') {
          item.count = 0;
          this.$store.commit('ModifyQuantity', item);
        }
      }
    },
    activated () {
      this.delHide();
    },
    components: {
      Swipeout,
      SwipeoutItem,
      SwipeoutButton
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .list-block .item-content
    justify-content: flex-start;
  /*.move
    transition: all 0.2s linear;
  .delMove
    left: 0;
    transition: all 0.2s linear;
    transform: 'translateX(100%)';*/
  .swipeout-delete
    width: 100%;
    display: flex;
    justify-content: center;
    white-space: nowrap;

  .aCart
    min-width: 20px;
    padding: 0 5px;
    display: inline-block;
    text-align center;

  #num1
    width: 30px;
    text-align: center;
    margin-top: -1px;

  .cartUnit
    display: inline-block;
    text-align center;
    margin: 2px 0 0 5px;
</style>
