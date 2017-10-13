<template>
  <div class="views view-main">
    <div class="navbar">
      <div class="navbar-inner navbar-on-center">
        <div class="left" @click="$router.back(-1)">
          <a href="javascript:" class="back link">
            <img src="../../images/back.png">
          </a>
        </div>
        <div class="center" style="left: -145.5px;">我的地址</div>
      </div></div>
    <div class="pages navbar-through toolbar-through">

      <div data-page="deliveryAddress" class="page deliveryAddress page-on-center">
        <div class="page-content">
          <div class="list-block Mycenter" style="margin:10px 0;">
            <ul>
              <li @click="addAddress">
                <a href="javascript:" class="item-content">
                  <div class="item-inner">
                    <div class="item-input" style="text-align:center;">
                      <img src="../../images/add.png">&nbsp;添加新收货地址
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div class="list-block" style="margin:10px 0; font-size: 15px;">
            <ul>
              <li v-for="addressListItem in addressList" @click="editAddress(addressListItem)">
                <div class="item-link item-content">
                  <router-link :to="{path:'/addAddress'}" class="item-inner" style="align-items: flex-start; flex-direction: column; justify-content: center; background-size: 15px 20px;">
                    <div class="item-title">
                      <div class="item-title">
                         <span v-text="addressListItem.Consignee"></span>
                         <span v-text="addressListItem.Telephone"></span>
                         <span v-text="`[${addressListItem.Alias}]`" style="color: #ff6318"></span>
                      </div>
                    </div>
                    <div v-text="addressListItem.AddressDetail" style="font-size: 12px; color: #8e8e93;"></div>
                  </router-link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex';
  import WeVue from 'we-vue';
  export default {
    data() {
      return {
        addressList: []
      };
    },
    methods: {
      tipToast (msg) {
        WeVue.Toast({
          duration: 2000,
          message: msg,
          type: 'text'
        });
      },
      addAddress() {
        this.$store.commit('editAddress', {});
        this.$router.push('./addAddress');
      },
      editAddress(data) {
        this.$store.commit('editAddress', data);
      }
    },
    computed: mapState({
      myInfo: (data) => {
        if (!data.userInfo.Profile && localStorage.getItem('userInfo')) {
          data.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        }
        return data.userInfo;
      }
    }),
    activated() {
      this.$nextTick(() => {
        this.$store.commit('isLoading', false);
        WeVue.Indicator.open({
          text: 'loading',
          spinnerType: 'double-snake'
        });
        this.axios({
          method: 'get',
          url: this.$store.state.apiUrl + '/app/Order/Getddresses?owner=' + this.myInfo.UserId
        }).then((res) => {
          res = res.data;
          WeVue.Indicator.close();
          if (!res.IsError) {
            this.addressList = res.Data;
          } else {
            this.tipToast(res.Message);
          }
        }).catch(() => {
          WeVue.Indicator.close();
          this.tipToast('网络超时，请稍后再试！');
        });
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .views
    z-index: 6000;
</style>
