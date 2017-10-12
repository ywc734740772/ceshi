<template>
  <div class="view view-main">
    <div class="navbar">
      <div class="navbar-inner navbar-on-center">
        <div class="left"></div>
        <div class="center" style="left: 10px;">分类</div>
        <div class="right">
          <router-link to="/search">
            <img src="../../images/search.png">
          </router-link>
        </div>
      </div>
    </div>

    <div class="page-content classificationSelection" style="background: #fff;padding-top: 44px;">
      <div>
        <!--<img :src="converImage" class="width100">-->
        <x-img :src="converImage" :webp-src="`${converImage}?type=webp`" :default-src="$store.state.imgLazyLoad" class="width100"></x-img>
      </div>
      <div class="margin-content content-block index-column1">
        <div class="row">
          <router-link to="/order" v-for="(goodsClassItem, index) in goodsClass" :key="index" class="item-link item-content col-33">
            <!--<img :src="goodsClassItem.image">-->
            <x-img :src="goodsClassItem.image" :webp-src="`${goodsClassItem.image}?type=webp`" :default-src="$store.state.imgLazyLoad"
                   container=".page-content" class="width100"></x-img>
            <div v-text="goodsClassItem.Name" style="padding: 5px 0;font-size: 14px;"></div>
          </router-link>
          <a href="javascript:" class="item-link item-content col-33"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { XImg } from 'vux';
  import WeVue from 'we-vue';
  export default {
    props: {},
    data() {
      return {
        converImage: '',
        goodsClass: []
      };
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('isLoading', true);
      });
    },
    created() {
      this.axios.get('static/data.json').then((res) => {
        res = res.data;
//        this.goodsClass = res.goodsClass;
        this.converImage = res.goodsClass[0].converImage;
        console.log(this.converImage);
      }).catch(function (err) {
        console.log(err);
      });

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
    },
    activated() {
      this.$nextTick(() => {
        this.$store.commit('isLoading', false);
      });
    },
    methods: {
      tipToast (msg) {
        WeVue.Toast({
          duration: 2000,
          message: msg,
          type: 'text'
        });
      }
    },
    computed: {
//      goodsClassFilter: function () {
//        return this.goodsClass.splice(2, this.goodsClass.length);
//      }
    },
    components: {
      XImg
    },
    mounted() {}
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
