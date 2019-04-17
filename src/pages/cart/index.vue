<template>
  <div class="page">
    <!-- 收货地址 -->
    <div class="address">
      <!-- 没有选择地址的状态 -->
      <div v-if="address == null ? true : false" class="no-address" @click="chooseAddress">
        <div class="word">请选择收货地址</div>
        <div class="iright">
          <span class="iconfont iconright"></span>
        </div>
      </div>
      <!-- 选择地址后的状态 -->
      <div v-else class="yes-address">
        <div class="uname">
          <div class="name">
            收件人： {{ address.userName }}
          </div>
          <div class="phone">
            {{ address.telNumber }}
            <span class="iconfont iconright"></span>
          </div>
        </div>
        <div class="uadress">
          {{ detailAddree }}
        </div>
      </div>
      <img class="img" src="../../../static/images/cart_border@2x(1).png" alt="">
    </div>
    <!-- goodsList -->
    <div class="goodsList">
      <div class="title">
        <span class="iconfont iconGroup-"></span>优购生活馆</div>
      <div class="item" v-for="(value, key) in goodsList" :key="key">
        <div class="check">
          <icon type="success" size="20" color="red"></icon>
        </div>
        <div class="goods">
          <div class="left">
            <image mode="aspectFill" :src="value.goods_small_logo"></image>
          </div>
          <div class="right">
            <div class="mess">
              {{ value.goods_name }}
            </div>
            <div class="pricenum">
              <div class="price">￥{{ value.goods_price }}</div>
              <div class="num">
                <span>-</span>
                <span class="index">3</span>
                <span>+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="total">
      <div class="check">
        <icon type="success" size="20" color="red"></icon>
      </div>
      <div class="word">全选</div>
      <div class="totalp">
        <div class="top">
          合计：
          <span>￥{{totalPrice}}</span>
        </div>
        <div class="mes">
          包含运费
        </div>
      </div>
      <div class="pay">
        <button>结算</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      address: null,
      goodsList: {}
    }
  },
  methods: {
    chooseAddress() {
      // 得到小程序中的收货地址
      wx.chooseAddress({
        success: res => {
          this.address = {
            ...res
          }
          // 将收货地址信息保存到 storage 中
          try {
            wx.setStorageSync('address', this.address)
          } catch (error) {
            console.log(error)
          }
        }
      })
    }
  },
  computed: {
    detailAddree: function() {
      if (this.address) {
        return this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo;
      } else {
        return '';
      }
    },
    totalPrice: function() {
      // 定义一个和
      var sum = 0
      // 遍历一个对象
      Object.keys(this.goodsList).forEach(v=> {
        sum += this.goodsList[v].goods_price
      })
      return sum
    }
  },
  onShow() {
    console.log('onShow')
    try {
      // 动态获取收货地址
      this.address = wx.getStorageSync('address') || null
      // 动态获取购物车中的数据
      this.goodsList = wx.getStorageSync('goods') || {}
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style scoped lang="less">
@import './index.less';
</style>
