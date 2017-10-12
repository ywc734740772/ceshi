<template>
  <div class="view view-main">
    <div class="navbar">
      <div class="navbar-inner navbar-on-center">
        <div class="left">
          <router-link to="/selectAddress">
            <img src="../../images/location.png">
          </router-link>
        </div>
        <div class="center sliding" style="left: 17.5px; transform: translate3d(0px, 0px, 0px);">美天智享生活</div>
        <div class="right">
          <router-link to="/search" class="open-panel">
            <img src="../../images/search.png">
          </router-link>
          <a href="#" class="open-panel">
            <img src="../../images/scan.png">
          </a>
        </div>
      </div>
    </div>
    <div class="page-content pages" style="background:#fff;margin-top: 44px;">
      <swiper :converImage="converImage"></swiper>

      <div class="margin-content content-block index-column1" style="min-height: 82px">
        <div class="row">
          <router-link to="/order" v-for="(item, index) in goodsClass" :key="index" class="item-link item-content col-20">
            <x-img :src="item.image" :webp-src="`${item.image}?type=webp`" :default-src="$store.state.imgLazyLoad"
                   container=".page-content"></x-img>
            <div v-text="item.Name" style="padding-top: 4px;"></div>
          </router-link>
        </div>
      </div>

      <div class="column-delivery-point content-block column">
        <span>离您最近的配送点</span>
      </div>

      <div class="margin-content list-block media-list">
        <ul>
          <li>
            <router-link to="/moreAddress" class="item-link item-content" style="height: 59px;">
              <div class="item-media">
                <img src="../../images/location.png" class="img-width20">
              </div>
              <div class="item-inner item-title-row" style="align-items: flex-start;flex-direction: column;justify-content: center;background-size: 45px 20px;">
                <div class="item-title" v-text="currentAddress.name || seekFailed"></div>
                <div style="font-size: 14px;" v-text="currentAddress.address"></div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>

      <div class="column-product content-block column" v-if="newGoods.length">
        <span>新品抢先</span>
      </div>

      <div class="swiper-container swiper-container2 ks-carousel-slider" id="swiper-pagination-c4"
           style="margin-left: -39px;">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="newGoodsItem in newGoods" @click="setGoodsInfo(newGoodsItem)">
            <div class="margin-none list-block media-list border-none">
              <ul>
                <goodsList :newGoodsItem="newGoodsItem"></goodsList>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="column-product content-block column">
        <span>精选商品</span>
      </div>

      <div id="swiper-pagination-c3" v-for="selectedGoodsItem in selectedGoods">
        <!--<img :src="selectedGoodsItem.converImage" width="100%">-->
        <x-img :src="selectedGoodsItem.converImage" :webp-src="`${selectedGoodsItem.converImage}?type=webp`" :default-src="$store.state.imgLazyLoad"
               container=".page-content"  width="100%"></x-img>
        <div class="swiper-container swiper-container3 swiper-init ks-carousel-slider swiper-container-horizontal">
          <div class="swiper-wrapper">
            <div class="swiper-slide swiper-slide-active" v-for="goodsListItem in selectedGoodsItem.goodsList" style="width: 86.25px; margin-right: 10px;">
              <router-link to="/goodsDetail" class="item-link item-content">
                <img :src="goodsListItem.image" width="70">
                <div v-text="goodsListItem.name"></div>
                <div v-text="'¥'+ goodsListItem.price.toFixed(2) +'/'+ goodsListItem.unit"></div>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="column-product content-block column" v-if="newGoodsList.length">
        <span>新品抢先</span>
      </div>

      <div class="margin-content list-block media-list" id="column-new">
        <ul>
          <goodsList v-for="(newGoodsListItem,index) in newGoodsList" :key="index" :newGoodsItem="newGoodsListItem"></goodsList>
        </ul>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-new */
  /* eslint-disable no-undef */
  //  import BScroll from 'better-scroll';
//  import WeVue from 'we-vue';
  import vueLoading from 'vue-loading-template';
  import { XImg } from 'vux';
//  import { mapState } from 'vuex';
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  import WeVue from 'we-vue';

  import swiper from '../../components/swiper/swiper.vue';
  import goodsList from '../../components/goodsList/goodsList.vue';

  export default {
    props: {},
    data() {
      return {
        converImage: [],
        goodsClass: [],
        newGoods: [],
        selectedGoods: [],
        newGoodsList: [],
        localCount: 'localCount',
        nearbyAddress: [],
        currentAddress: {},
        seekFailed: '正在获取最近的配送点信息...',
        isReposition: false,
        isload: true
      };
    },
    created() {
      this.axios.get('static/data.json').then((res) => {
        res = res.data;
        this.converImage = res.converImage;
//        this.goodsClass = res.goodsClass;
//        this.newGoods = res.newGoods;
        this.selectedGoods = res.selectedGoods;
//        this.newGoodsList = res.newGoodsList;
        this.$nextTick(() => {
          new Swiper('.swiper-container-h', {
            pagination: '.swiper-pagination',
            slidesPerView: 1,
            paginationClickable: true,
            centeredSlides: true,
            autoplay: 4000,
            autoplayDisableOnInteraction: false
          });
          new Swiper('.swiper-container2', {
            slidesPerView: 1.3,
            spaceBetween: 10,
            centeredSlides: true
          });
          new Swiper('.swiper-container3', {
            slidesPerView: 4
          });
          this.$store.commit('isLoading', false);
        });
      }).catch(function (err) {
        this.$store.commit('isLoading', false);
        console.log(err);
      });
//      this.axios.get(this.$store.state.apiUrl + '/app/Goods/NewGoodsList?shopId=28&topCount=3').then((res) => {
//        res = res.data;
//        this.newGoodsList = res;
//      }).catch(function (err) {
//        console.log(err);
//      });
      this.axios({
        method: 'get',
        url: this.$store.state.apiUrl + '/app/Goods/GetGroupList?shopId=' + this.$store.state.shopId
      }).then((res) => {
        if (!res.data.IsError) {
          res = res.data.Data;
          this.goodsClass = res;
        } else {
          this.tipToast(res.data.Message);
        }
      }).catch((err) => {
        console.log(err);
      });
      this.axios({
        method: 'post',
        url: this.$store.state.apiUrl + '/app/Goods/NewGoodsList?shopId=' + this.$store.state.shopId + '&topCount=3'
      }).then((res) => {
        if (!res.data.IsError) {
          res = res.data.Data;
          this.newGoods = res.slice(0, 3);
          this.newGoodsList = res.slice(0, 10);
        } else {
          this.tipToast(res.data.Message);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    computed: {
//      goodsClassFilter: function () {
//        return this.goodsClass.splice(1, this.goodsClass.length);
//        return this.goodsClass;
//      }
    },
    mounted() {
//      clearInterval(time);
//      var time = setInterval(() => {
        this.loadJScript();
        this.isload = false;
//        clearInterval(time);
//      }, 500);
    },
    activated() {
      this.$nextTick(() => {
        this.$store.commit('isLoading', false);
        this.$store.commit('isMenu', true);
      });
    },
    methods: {
      tipToast(msg) {
        WeVue.Toast({
          duration: 2000,
          message: msg,
          type: 'text'
        });
      },
      setGoodsInfo(newGoodsItem) {
        this.$store.commit('goodsInfos', newGoodsItem);
      },
      loadJScript() {
        let that = this;
        if (!window.AMap) {
          clearTimeout(setTime);
          var setTime = setTimeout(() => {
            that.seekFailed = '定位超时';
            that.isReposition = true;
          }, 5000);
          return;
        } else {
          clearTimeout(setTime);
        }
        let map, geolocation;
        //  加载地图，调用浏览器定位服务
        map = new AMap.Map('container', {
          resizeEnable: true
        });
        map.plugin('AMap.Geolocation', function() {
          geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,  // 是否使用高精度定位，默认:true
            timeout: 500,          // 超过5秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20), //  定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition: 'RB'
          });
          map.addControl(geolocation);
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, 'complete', onComplete); // 返回定位信息
          AMap.event.addListener(geolocation, 'error', onError);       // 返回定位出错信息
        });

        // 解析定位结果
        function onComplete(data) {
          that.$store.commit('locationAddress', data);
          AMap.service(['AMap.PlaceSearch'], function() {
            var placeSearch = new AMap.PlaceSearch({  // 构造地点查询类
              pageSize: 5,
              type: '写字楼|餐饮|小区|学校',
              pageIndex: 1,
//              city: '上海',  // 城市
              map: map
            });
            var cpoint = [data.position.getLng(), data.position.getLat()];  // 中心点坐标
            placeSearch.searchNearBy('', cpoint, 2000, function(status, result) {
              if (result.info === 'OK') {
                that.nearbyAddress = result.poiList.pois;
                that.currentAddress = result.poiList.pois[0];
                that.isReposition = false;
              }
            });
          });
        }
        // 解析定位错误信息
        function onError(data) {
          if (data.info === 'FAILED') {
            that.seekFailed = '定位失败';
            that.isReposition = true;
          }
        }
      }
    },
    components: {
      vueLoading,
      swiper,
      goodsList,
      XImg
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .page-content
      padding-bottom: 90px
      .content-block
        padding: 0 10px
      .row .col-20
        width: 20%
        padding 5px 0
</style>
