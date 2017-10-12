<template>
  <div class="views view-main">
    <div class="navbar">
      <div class="navbar-inner navbar-on-center">
        <div class="left" @click="$router.back(-1)">
          <a href="javascript:" class="back link">
            <img src="../../images/back.png">
          </a>
        </div>
        <div class="center" style="left: 0;width: 100%;display: flex;max-width: initial;overflow: visible;">
          <form class="searchbar searchbar-init" style="height: auto;overflow: visible;">
            <div class="searchbar-input">
              <input id="pickerInput" type="text" placeholder="请输入您的收货地址" autocomplete="off">
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="pages navbar-through toolbar-through">
      <div class="page moreAddress page-on-center">
        <div class="page-content" style="padding-bottom: 0;">
          <div id="container" class="mainAddress"></div>
          <div class="list-block" style="margin:0;height: 60%">
            <div class="item-content" style="padding-left: 0;">
                <ul class="item-inner address">
                  <li class="item-title" :class="{active: isActive===0}" @click="tabAddress(0, allAddress)">全部</li>
                  <li class="item-title" :class="{active: isActive===1}" @click="tabAddress(1, '写字楼')">写字楼</li>
                  <li class="item-title" :class="{active: isActive===2}" @click="tabAddress(2, '小区')">小区</li>
                  <li class="item-title" :class="{active: isActive===3}" @click="tabAddress(3, '学校')">学校</li>
                </ul>
              </div>
            <div class="list-group" style="overflow-y:scroll;height:calc((100% - 44px));">
              <ul ref="mapList">
                <li v-for="(nearbyAddressItem, index) in nearbyAddress" :key="index" @click="address(nearbyAddressItem)">
                  <div class="item-content">
                    <div class="item-inner item-address">
                      <div class="item-title" v-text="isActive === 0 && index===0 ? '[当前位置]' + nearbyAddressItem.name : nearbyAddressItem.name" style="font-size: 15px;"></div>
                      <div class="item-title" v-text="nearbyAddressItem.address"></div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-new */
  /* eslint-disable no-undef */
  import WeVue from 'we-vue';
  export default {
    data() {
      return {
        nearbyAddress: [],
        allAddress: '',
        addressType: this.allAddress,
        isActive: 0,
        isload: true,
        cpoint: {},
        sMap: null,
        center: null,
        picker: {}
      };
    },
    created() {
//      let script = document.createElement('script');
//      let scriptUI = document.createElement('script');
//      script.async = 'async';
//      scriptUI.async = 'async';
//      script.type = 'text/javascript';
//      scriptUI.type = 'text/javascript';
//      scriptUI.src = '//webapi.amap.com/ui/1.0/main.js?v=1.0.10';
//      script.src = '//webapi.amap.com/maps?v=1.3&key=3af6803926c67029bd42f83b4ad2d2fe&plugin=AMap.ToolBar';
//      document.head.appendChild(script);
//      setTimeout(() => {
//        document.head.appendChild(scriptUI);
//      }, 500);
    },
    mounted() {
      document.onreadystatechange = () => {
        if (document.readyState === 'complete') {
            var time = setInterval(() => {
              this.loadJScript();
              clearInterval(time);
            }, 1000);
        }
      };
    },
    methods: {
      loadJScript () {
        let that = this;
       let setTime = setTimeout(() => {
          WeVue.Dialog.confirm(WeVue.Dialog.setDefaults({
            title: '提示',
            message: '网络超时，刷新重试！',
            confirmText: '确认',
            cancelText: '取消',
            showCancelBtn: true
          })).then(action => {
            that.loadJScript();
          });
        }, 10000);
        if (window.AMap === undefined && window.AMapUI === undefined) {
          that.$store.commit('isLoading', false);
          clearTimeout(setTime);
          setTime;
          return;
        } else {
          clearTimeout(setTime);
        }
        let isFrist = true;
        var geolocation;
        that.sMap = AMap;
        var map = new AMap.Map('container', {
          zoom: 16,
          scrollWheel: false,
          resizeEnable: true
        });

        map.plugin('AMap.Geolocation', function () {
          geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, // 是否使用高精度定位，默认:true
            timeout: 500,         // 超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            panToLocation: true,
            showCircle: false
          });
          map.addControl(geolocation);
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, 'complete', onComplete); //  返回定位信息
          AMap.event.addListener(geolocation, 'error', onError);       //  返回定位出错信息
        });

        // 解析定位结果
        function onComplete (data) {
          that.center = [data.position.lng, data.position.lat];
          that.$store.commit('locationAddress', data);
          if (window.AMapUI !== undefined) {
            that.$store.commit('isLoading', false);
            AMapUI.loadUI(['misc/PositionPicker'], function (PositionPicker) {
              let positionPicker = new PositionPicker({
                mode: 'dragMap',
                map: map
              });
              that.picker = positionPicker;
              positionPicker.on('success', function (positionResult) {
                if (positionResult.info === 'OK' && isFrist) {
                  isFrist = false;
                  that.cpoint = positionResult.position;
                  that.$store.commit('locationAddress', positionResult);
                  that.onComplete(positionResult.position, that.sMap);
                  setTimeout(() => {
                    isFrist = true;
                  }, 500);
                }
              });
              positionPicker.on('fail', function (positionResult) {
              });
              positionPicker.start();
              map.panBy(0, 1);
              map.addControl(new AMap.ToolBar({
                liteStyle: true
              }));
            });
            AMapUI.loadUI(['misc/PoiPicker'], function (PoiPicker) {
              var poiPicker = new PoiPicker({
                //            city: '上海',
                input: 'pickerInput'
              });
              // 初始化poiPicker
              poiPickerReady(poiPicker);
            });
          } else {
            that.$store.commit('isLoading', false);
            WeVue.Dialog.confirm(WeVue.Dialog.setDefaults({
              title: '提示',
              message: '获取位置信息失败，刷新重试！',
              confirmText: '确认',
              cancelText: '取消',
              showCancelBtn: true
            })).then(action => {
              window.location.reload();
            });
          }
        }

        // 解析定位错误信息
        function onError (data) {
          console.log('定位失败');
        }
        function poiPickerReady(poiPicker) {
          window.poiPicker = poiPicker;
          // 选取了某个POI
          poiPicker.on('poiPicked', function(poiResult) {
              console.log(poiResult);
              document.getElementById('pickerInput').value = poiResult.item.name;
              that.cpoint = poiResult.item.location;
              that.picker.start([poiResult.item.location.lng, poiResult.item.location.lat]);
          });
        }
      },
      tabAddress(index, type) {
        this.onComplete(this.cpoint, this.sMap, type);
        this.addressType = type;
        this.isActive = index;
      },
      onComplete(data, sMap, type) {
        let that = this;
        sMap.service(['AMap.PlaceSearch'], function() {
          let placeSearch = new sMap.PlaceSearch({  // 构造地点查询类
            pageSize: 40,
            type: type
          });
          let cpoint = [data.lng, data.lat];  // 中心点坐标
          placeSearch.searchNearBy('', cpoint, 2000, function(status, result) {
            that.nearbyAddress = [];
            if (result.info === 'OK') {
              that.nearbyAddress = result.poiList.pois;
              that.isload = false;
            }
          });
        });
      },
      address(data) {
        this.$store.commit('address', data);
        this.$router.push('./addAddress');
      }
    },
    activated() {
      this.$nextTick(() => {
        if (this.isload) {
            if (document.readyState === 'complete') {
              var time = setInterval(() => {
                this.loadJScript();
                clearInterval(time);
              }, 1000);
            }
        } else {
          this.$store.commit('isLoading', false);
        }
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .views
    z-index: 6000;
    .amap-zoomcontrol
      display none
    .searchbar-input
      .dock-bottom
        text-align left
        font-size 14px
        li
          padding px 5px 0px 23px
    .mainAddress
      height 40%
      width 100%
      background #fff
    .address
      padding 0
      font-size 16px
      align-self center
      li
        padding 10px 0
        flex-grow 1
        text-align center
      .active
        color #3fa0ff
        border-bottom solid 2px #3fa0ff
    .item-address
      font-size 14px
      display flex
      flex-direction column
      align-items flex-start
</style>
