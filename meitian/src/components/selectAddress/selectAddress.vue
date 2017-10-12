<template>
  <div class="views page selectAddress page-on-center">
    <div class="navbar">
      <div class="navbar-inner navbar-on-center">
        <div class="left" @click="$router.back(-1)">
          <a href="javascript:" class="back link">
            <img src="../../images/back.png">
          </a>
        </div>
        <div class="center" style="left: 16px;">选择收货地址</div>
        <div class="right">
          <router-link to="/addAddress">新增地址</router-link>
        </div>
      </div>
    </div>

    <div class="page-content">
      <form data-search-list=".list-block-search" data-search-in=".item-title" class="searchbar searchbar-init">
        <div class="searchbar-input">
          <input type="search" placeholder="请输入您的收货地址"><a href="#" class="searchbar-clear"></a>
        </div><a href="#" class="searchbar-cancel">Cancel</a>
      </form>
      <div class="list-block" style="margin: 10px 0">
        <div class="list-group">
          <ul>
            <li class="list-group-title">当前地址</li>
            <li class="address">
              <div class="item-content">
                <div class="item-inner item-address" v-if="!isReposition" @click="address(currentAddress)" style="justify-content: center;">
                  <div class="item-title" v-text="currentAddress.name || seekFailed"></div>
                  <div style="font-size: 14px;" v-text="currentAddress.address"></div>
                </div>
                <div class="item-inner" v-if="isReposition">
                  <div class="item-title" v-text="seekFailed"></div>
                  <div class="item-after" v-if="isReposition" @click="reposition">
                    <img src="../../images/location2.png">
                    &nbsp;&nbsp;重新定位
                  </div>
                </div>
              </div>
            </li>
            <li class="list-group-title">附近地址</li>
            <li v-for="nearbyAddressItem in nearbyAddress" @click="address(nearbyAddressItem)">
              <div class="item-content">
                <div class="item-inner item-address">
                  <div class="item-title" v-text="nearbyAddressItem.name" style="font-size: 15px;"></div>
                  <div class="item-title" v-text="nearbyAddressItem.address"></div>
                </div>
              </div>
            </li>
            <li v-if="nearbyAddress.length">
              <router-link to="/moreAddress" class="item-link">
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title">更多地址</div>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div id="container" class="map"></div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-new */
  /* eslint-disable no-undef */

  export default {
    data() {
      return {
        nearbyAddress: [],
        currentAddress: {},
        seekFailed: '正在获取位置信息...',
        isReposition: false,
        isload: true
      };
    },
    created() {
//      let script = document.createElement('script');
//      let scriptUI = document.createElement('script');
//      script.type = 'text/javascript';
//      scriptUI.type = 'text/javascript';
//      script.src = '//webapi.amap.com/maps?v=1.3&key=3af6803926c67029bd42f83b4ad2d2fe&plugin=AMap.ToolBar';
//      scriptUI.src = '//webapi.amap.com/ui/1.0/main.js?v=1.0.10';
//      document.head.appendChild(script);
//      setTimeout(() => {
//        document.head.appendChild(scriptUI);
//      }, 500);
    },
    mounted() {
          clearInterval(time);
          var time = setInterval(() => {
            this.loadJScript();
            this.isload = false;
            clearInterval(time);
          }, 500);
    },
    methods: {
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
        var map, geolocation;
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
          console.log(data);
          if (data.info === 'FAILED') {
            that.seekFailed = '定位失败';
            that.isReposition = true;
          }
        }
      },
      reposition() {
        this.loadJScript();
      },
      address(data) {
        this.$store.commit('address', data);
        this.$router.push('./addAddress');
      }
    },
    activated() {
      this.$nextTick(() => {
        this.$store.commit('isLoading', false);
        if (this.isload) {
          this.loadJScript();
        }
      });
    },
    components: {
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .views
    z-index: 6000;
    .map
      /*height 20%*/
      width 100%
      display none
      position absolute !important
      top 0
      background #fff
    .item-address
      display flex
      flex-direction column
      align-items flex-start
      .item-title
        font-size 14px
</style>
