<template>
  <div class="views view-main">
    <div class="navbar">
      <div class="navbar-inner navbar-on-center">
        <div class="left" @click="$router.back(-1)">
          <a href="javascript:" class="back link">
            <img src="../../images/back.png">
          </a>
        </div>
        <div class="center" style="left: 3px;" v-text="state"></div>
        <div class="right" @click="saveAddress">
          <a href="javascript:">保存</a>
        </div>
      </div></div>
    <div class="pages navbar-through toolbar-through">

      <div data-page="addAddress" class="page selectAddress no-toolbar toolbar-fixed page-on-center">
        <div class="page-content">
          <div class="list-block margin-content">
            <ul>
              <li>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title label" style="width: 21%">收货地址</div>
                    <router-link to="/moreAddress" class="item-input" tag="div">
                      <input type="text" placeholder="小区/写字楼/学校" v-model="deliveryAddress">
                    </router-link>
                  </div>
                </div>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title label" style="width: 20%"></div>
                    <div class="item-input">
                      <input type="text" placeholder="具体信息（楼号/楼层/房号）" v-model="detailedAddress">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title label" style="width: 21%">联系人</div>
                    <div class="item-input">
                      <input type="text" placeholder="您的姓名" v-model="consignee">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title label" style="width: 21%">手机号</div>
                    <div class="item-input">
                      <input type="tel" placeholder="配送员联系您的手机号" v-model="telephone">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title label" style="width: 21%">标签</div>
                    <div class="item-input">
                      <input type="text" placeholder="选择“家、公司”标签" v-model="alias">
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex';
  import WeVue from 'we-vue';
  import qs from 'qs';
  export default {
    data() {
      return {
        state: '我的地址1',
        province: '',
        district: '',
        deliveryAddress: this.deliveryAddress,
        detailedAddress: this.detailedAddress,
        consignee: this.consignee,
        telephone: this.telephone,
        alias: this.alias
      };
    },
    created() {
    },
    computed: mapState({
      myInfo: (data) => {
        if (!data.userInfo.Profile && localStorage.getItem('userInfo')) {
          data.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        }
        return data.userInfo;
      }
    }),
    methods: {
      tipToast (msg) {
        WeVue.Toast({
          duration: 2000,
          message: msg,
          type: 'text'
        });
      },
      saveAddress() {
        let regTel = /^1(3|4|5|7|8)\d{9}$/;
        if (this.deliveryAddress === ('' || undefined)) {
          this.tipToast('收货地址不能为空！');
        } else if (this.consignee === ('' || undefined)) {
          this.tipToast('收货人不能为空！');
        } else if (!regTel.test(this.telephone)) {
          this.tipToast('手机号码格式有误！');
        } else if (!this.myInfo.UserId) {
          this.$router.push('/login');
        } else {
          WeVue.Indicator.open({
            text: 'loading',
            spinnerType: 'double-snake'
          });
          if (this.$store.state.editAddress.AddressId === ('' || undefined)) {
            this.axios({
              method: 'post',
              url: this.$store.state.apiUrl + '/app/Order/CreateAddress',
              data: qs.stringify({
                AddressId: 0,
                Source: 'app',
                Owner: this.$store.state.userInfo.UserId,
                Alias: this.alias,
                Consignee: this.consignee,
                Telephone: this.telephone,
                AddressDetail: this.deliveryAddress + this.detailedAddress
              })
            }).then((res) => {
              res = res.data;
              WeVue.Indicator.close();
              if (!res.IsError) {
                this.tipToast('收货地址保存成功！');
                setTimeout(() => {
                  this.$router.push('./deliveryAddress');
                }, 1000);
              } else {
                this.tipToast(res.Message);
              }
            }).catch(() => {
              WeVue.Indicator.close();
              this.tipToast('网络超时，请稍后再试！');
            });
          } else {
            this.axios({
              method: 'post',
              url: this.$store.state.apiUrl + '/app/Order/UpdateAddress',
              data: qs.stringify({
                AddressId: this.$store.state.address.AddressId,
                Source: 'app',
                Owner: this.$store.state.userInfo.UserId,
                Alias: this.alias,
                Consignee: this.consignee,
                Telephone: this.telephone,
                AddressDetail: this.deliveryAddress + this.detailedAddress
              })
            }).then((res) => {
              res = res.data;
              WeVue.Indicator.close();
              if (!res.IsError) {
                this.tipToast('收货地址保存成功！');
                setTimeout(() => {
                  this.$router.push('./deliveryAddress');
                }, 1000);
              } else {
                this.tipToast(res.Message);
              }
            }).catch(() => {
              WeVue.Indicator.close();
              this.tipToast('网络超时，请稍后再试！');
            });
          }
        }
      }
    },
    activated() {
      this.$nextTick(() => {
        this.$store.commit('isLoading', false);
        this.alias = '';
        this.consignee = '';
        this.deliveryAddress = '';
        this.detailedAddress = '';
        this.district = '';
        this.province = '';
        this.state = '';
        this.telephone = '';
        if (this.$store.state.locationAddress.info) {
          this.province = this.$store.state.locationAddress.addressComponent ? this.$store.state.locationAddress.addressComponent.province : this.$store.state.locationAddress.regeocode.addressComponent.province;
          this.district = this.$store.state.locationAddress.addressComponent ? this.$store.state.locationAddress.addressComponent.district : this.$store.state.locationAddress.regeocode.addressComponent.district;
          this.detailedAddress = this.$store.state.address.name ? this.$store.state.address.name : '';
          this.deliveryAddress = this.$store.state.address.address ? this.province + this.district + this.$store.state.address.address : '';
        }
        setTimeout(() => {
          if (this.$store.state.editAddress.AddressId !== ('' || undefined)) {
            this.state = '修改地址';
            this.deliveryAddress = this.$store.state.editAddress.AddressDetail;
            this.consignee = this.$store.state.editAddress.Consignee;
            this.telephone = this.$store.state.editAddress.Telephone;
            this.alias = this.$store.state.editAddress.Alias;
          } else {
            this.state = '添加地址';
          }
        }, 30);
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .views
    z-index: 6000;
</style>
