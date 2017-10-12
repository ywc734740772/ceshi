<template>
  <div class="swiper-container swiper-container-h">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in converImage" >
        <img :src="item.image" alt="">
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable no-new */
  export default {
    props: ['converImage']
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .swiper-container-h{
    height: 200px;
  }
  .swiper-container-h .swiper-slide img {
    width: 100%;
    height:100%;
  }
</style>
