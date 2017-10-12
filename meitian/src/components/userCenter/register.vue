<template>
  <div class="register views">
    <div class="navbar">
      <div class="navbar-inner navbar-on-center">
        <div class="left" @click="$router.back(-1)">
          <a href="javascript:" class="back link">
            <img src="../../images/back.png" width="25">
          </a>
        </div>
        <div class="center sliding" style="left: 0;">注册</div>
        <div class="right"></div>
      </div>
    </div>

    <div class="pages">
      <div class="page navbar-through userregister">
        <div class="page-content">
          <div class="indicator">
            <ol class="step clearfix">
              <li class="step-item current" :class="{'active': isOne}">1.验证手机</li>
              <li class="step-item" :class="{'active': !isOne}">2.基本信息</li>
            </ol>
          </div>
          <div v-if="isOne">
            <div class="list-block user_register">
              <wv-group>
                <wv-input label="手 &nbsp机 号：" placeholder="请输入手机号" type="number" v-model="valueTel">
                  <button class="weui-vcode-btn" slot="ft" @click="getVerifyCode" :disabled="disabled" v-text="verifyText"></button >
                </wv-input>
                <wv-input label="验 &nbsp证 码：" placeholder="请输入验证码" type="number" v-model="valueVerify"></wv-input>
                <wv-input label="密 &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp码：" placeholder="请输入密码" type="password" v-model="valuePass"></wv-input>
                <wv-input label="确认密码：" placeholder="请输入确认密码" type="password" v-model="valuePass2"></wv-input>
              </wv-group>
            </div>
            <div class="list-block">
              <ul>
                <li>
                  <div class="list-block">
                    <div class="item-content">
                      <div class="item-inner">
                        <div class="item-input" style="width: 70px;margin-top: 0;">
                          <wv-switch v-model="switchValue" :is-in-cell="false"></wv-switch>
                        </div>
                        <div class="item-title label1" style="color: #1F2124;min-width:245px;font-size:15px;margin-left: 3px;">
                          我已阅读并同意签署<router-link to="/agreement" style="color:#ff0033">《网站服务协议》</router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="content-block">
              <a href="javascript:" class="link button button-big signup-next-button btnRegister" :disabled="!switchValue" @click="btnRegister">下一步</a>
            </div>
          </div>
          <div v-else>
            <div class="list-block">
              <wv-group>
                <wv-input label="昵称：" placeholder="请输入昵称" v-model="valueTitle"></wv-input>
                <wv-input label="姓名：" placeholder="请输入姓名" v-model="valueName"></wv-input>
                <wv-cell title="性别：" is-link :value="ticket | pickerValueFilter" @click.native="ticketPickerShow = true"></wv-cell>

                <wv-cell title="生日：" :value="birthday | datetimeFilter('date')" is-link @click.native="$refs.picker.open()"></wv-cell>

                <wv-input label="邮箱：" placeholder="123@163.com" type="email" v-model="valueEmail"></wv-input>
              </wv-group>

              <wv-picker v-model="ticketPickerShow" :slots="ticketSlots" @confirm="confirmTicket"></wv-picker>

              <wv-datetime-picker
                type="date"
                ref="picker"
                v-model="value"
                :start-date="new Date(new Date('1960'))"
                :end-date="new Date()"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日"
                @confirm="handleConfirm"></wv-datetime-picker>
            </div>
            <div class="content-block">
              <a href="javascript:" class="link button button-big signup-next-button btnRegister" @click="btnRegister">确认</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import WeVue from 'we-vue';
  import qs from 'qs';
  import formatDate from '../../date';
  let time = null;
  export default {
    data () {
      return {
        isOne: false,
        disabled: false,
        verifyText: '获取验证码',
        verifyTime: 60,
        switchValue: true,
        valueTel: this.valueTel,
        valueVerify: this.valueVerify,
        valuePass: this.valuePass,
        valuePass2: this.valuePass2,
        valueTitle: this.valueTitle,
        valueName: this.valueName,
        valueEmail: this.valueEmail,
        ticketPickerShow: false,
        ticket: ['男'],
        ticketSlots: [
          {
            values: [
              '男',
              '女'
            ],
            defaultIndex: 1
          }
        ],
        pickerValue: this.pickerValue,
        value: new Date(),
        birthday: null,
        userId: ''
      };
    },
    filters: {
      datetimeFilter (value, type) {
        if (value !== null && typeof value === 'object') {
          let year = value.getFullYear();
          let month = value.getMonth() + 1;
          let date = value.getDate();
          let hour = value.getHours();
          let minute = value.getMinutes();
          return type === 'date' ? `${year}年${month}月${date}日` : `${year}-${month}-${date} ${hour}:${minute}`;
        } else {
          return value;
        }
      },
      pickerValueFilter (val) {
        if (Array.isArray(val)) {
          return val.toString();
        } else {
          return '请选择';
        }
      }
    },
    created () {
    },
    methods: {
      onChange (picker, value) {
        this.$nextTick(() => {
          console.log(picker.getValues());
        });
      },
      confirmTicket (picker) {
        this.ticket = picker.getValues();
      },
      openPicker() {
        this.$refs.picker.open();
      },
      handleConfirm (value) {
        this.birthday = formatDate(value, 'yyyy-MM-dd');
      },
      tipToast(msg) {
        WeVue.Toast({
          duration: 2000,
          message: msg,
          type: 'text'
        });
      },
      btnRegister() {
        let regTel = /^1(3|4|5|7|8)\d{9}$/;
        let regEmail = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
        if (this.isOne) {
          if (!regTel.test(this.valueTel)) {
            this.tipToast('手机号码格式有误！');
          } else if (!this.valueVerify) {
            this.tipToast('验证码不能为空！');
          } else if (!this.valuePass) {
            this.tipToast('密码不能为空！');
          } else if (this.valuePass.length < 6) {
            this.tipToast('密码长度不能小于六位！');
          } else if (!this.valuePass2) {
            this.tipToast('确认密码不能为空！');
          } else if (this.valuePass !== this.valuePass2) {
            this.tipToast('两次输入密码不一样！');
          } else {
            this.axios({
              method: 'post',
              url: this.$store.state.passportUrl + '/api/Membership/RegisterUserByMobile',
              data: qs.stringify({
                LoginNameType: 3,
                LoginName: this.valueTel,
                Password: this.valuePass,
                Code: this.valueVerify,
                Source: 'web'
              })
            }).then((res) => {
              res = res.data;
              this.$store.commit('isLoading', false);
              console.log(res);
              if (!res.IsError) {
                this.userId = res.Data.UserId;
                WeVue.Dialog.confirm(WeVue.Dialog.setDefaults({
                  title: '提示',
                  message: '注册成功！您还未添加个人资料。',
                  confirmText: '立即完善'
                })).then(action => {
                  this.birthday = formatDate(new Date(), 'yyyy-MM-dd');
                  this.isOne = false;
                });
              } else {
                this.tipToast(res.Message);
              }
            }).catch(() => {
              this.$store.commit('isLoading', false);
              this.tipToast('连接超时，请稍后再试！');
            });
          }
        } else {
          if (!this.valueTitle.trim().length) {
            this.tipToast('昵称不能为空！');
          } else if (!this.valueName.trim().length) {
            this.tipToast('姓名不能为空！');
          } else if (!regEmail.test(this.valueEmail)) {
            this.tipToast('邮箱格式有误！');
          } else if (this.userId === '') {
            this.isOne = true;
          } else {
            let sex = {
              '男': 1,
              '女': 2
            };
            this.axios({
              method: 'post',
              url: this.$store.state.passportUrl + '/api/Membership/UpdateUserProfile',
              data: qs.stringify({
                UserId: this.userId,
                Profile: {
                  RealName: this.valueTitle,
                  NickName: this.valueName,
                  Sex: sex[this.ticket[0]],
                  Birthday: this.birthday,
                  Email: this.valueEmail
                }
              })
            }).then((res) => {
              res = res.data;
              console.log(res);
              if (!res.IsError) {
                WeVue.Dialog.confirm(WeVue.Dialog.setDefaults({
                  title: '提示',
                  message: '资料保存成功！',
                  confirmText: '立即登录'
                })).then(action => {
                  this.$router.replace('/login');
                });
              } else {
                this.tipToast(res.Message);
              }
            }).catch(() => {
              this.$store.commit('isLoading', false);
              this.tipToast('网络超时，请稍后再试！');
            });
          }
        }
      },
      getVerifyCode() {
        let regTel = /^1(3|4|5|7|8)\d{9}$/;
        if (!regTel.test(this.valueTel)) {
          this.tipToast('手机号码格式有误！');
          return;
        }
        if (!this.disabled) {
          WeVue.Indicator.open({
            text: 'loading',
            spinnerType: 'double-snake'
          });
          this.valueVerify = '';
          this.verifyTime = 60;
          this.disabled = true;
          time = setInterval(() => {
            this.verifyTime --;
            this.verifyText = this.verifyTime + '(s)重新获取';
            if (this.verifyTime === 0) {
              clearInterval(time);
              this.disabled = false;
              this.verifyText = '重新获取';
            }
          }, 1000);
          this.axios({
            method: 'post',
            url: this.$store.state.passportUrl + '/api/VerifyCode/SendVerifyCodeByMobile',
            data: qs.stringify({
              Source: 'VerifyDevice',
              Target: this.valueTel,
              UserId: '',
              JSON: '{}'
            })
          }).then((res) => {
            res = res.data;
            WeVue.Indicator.close();
            if (!res.IsError) {
            } else {
              this.tipToast(res.Message);
            }
          }).catch(() => {
            WeVue.Indicator.close();
            this.tipToast('网络超时，请稍后再试！');
          });
        }
      }
    },
    activated () {
      clearInterval(time);
      this.valueTel = '';
      this.valueVerify = '';
      this.valuePass = '';
      this.valuePass2 = '';
      this.valueTitle = '';
      this.valueName = '';
      this.valueEmail = '';
      this.userId = '';
      this.isOne = true;
      this.$nextTick(() => {
        this.$store.commit('isLoading', false);
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .register
    .active
      color red !important
    .weui-cells
      .weui-label
        width 90px !important
        font-size 16px
      .weui-input
        height auto !important
        font-size 15px !important
      .weui-vcode-btn
        min-width 97px
        height auto
        line-height normal
        color #1F2124;
        border 1px solid #1F2124
        border-radius 5px
        font-size 15px
        padding: 3px 5px;
      p
        margin 0
</style>
