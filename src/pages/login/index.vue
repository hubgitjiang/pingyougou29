<template>
  <div>
    <button @click="login">登录</button>
  </div>
</template>

<script>
import request from '../../utils/request.js'
export default {
  data() {
    return {
      code: '',
      encryptedData: '',
      iv: '',
      rawData: '',
      signature: ''
    }
  },
  methods: {
    login() {
      // 接收参数：
      // 得到 code: wx.login
      wx.login({
        success: (res) => {
          this.code = res.code

          // 接收参数 code 之外的参数
          wx.getUserInfo({
            success: async res => {
              this.encryptedData = res.encryptedData
              this.iv = res.iv
              this.rawData = res.rawData
              this.signature = res.signature

              // 获取登录 token
              var url = 'https://itjustfun.cn/api/public/v1/users/wxlogin'
              var res = await request.post(url, {
                code: this.code,
                encryptedData: this.encryptedData,
                rawData: this.rawData,
                signature: this.signature,
                iv: this.iv
              })
              // 将　token 保存到 storage 中
              wx.setStorageSync('token', res.data.data.token)
              // 重新跳转回购物车页面
              wx.switchTab({
                url: '/pages/cart/main'
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style>

</style>
