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
          <icon type="success" @click="select(value)" size="20" :color="value.selected ? 'red': 'gray'"></icon>
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
                <span class="index">x{{ value.num }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="total">所有商品总价：{{ totalPrice }}</div>
    </div>
    <!-- 支付按钮 -->
    <div>
      <button @click="pay">支付</button>
    </div>
  </div>
</template>


<script>
import request from '../../utils/request.js'

export default {
  data() {
    return {
      address: {},
      goodsList: {}
    }
  },
  methods: {
    chooseAddress() {
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
    },
    // 支付
    async pay() {
      // 支付之前需要先判断当前订单是否已经支付
      var url = 'https://itjustfun.cn/api/public/v1/my/orders/chkOrder'
      var data = {
        order_number: wx.getStorageSync('number')
      }
      var header = {
        Authorization: wx.getStorageSync('token')
      }
      var res = await request.auth(url, data, header)
      // console.log(res) 因为接口有问题

      // 请求支付接口
      var urlPay = 'https://itjustfun.cn/api/public/v1/my/orders/req_unifiedorder'
      var resPay = await request.auth(urlPay, data, header)
      var { wxorder } = resPay.data.data // 对象的解构
      console.log(wxorder)
      // 调用微信支付
      wx.requestPayment({
        timeStamp: wxorder.timeStamp,
        nonceStr: wxorder.nonceStr,
        package: wxorder.package,
        signType: wxorder.signType,
        paySign: wxorder.paySign,
        success(res) {
          console.log(res)
          // 跳转到订单页面
          wx.navigateTo('/pages/orderList/main')
        },
        fail(res) {
          console.log(res)
        }
      })
    }
  },
  onShow() {
    // 得到 stroage 中的地址
    this.address = wx.getStorageSync('address') || null
    // 得到订单数据
    var res = wx.getStorageSync('goods') || {}
    // 找到数据中所有选中的元素
    Object.keys(res).forEach(v => {
      if (res[v].selected == true) {
        this.goodsList[v] = res[v]
      }
    })
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
      Object.keys(this.goodsList).forEach(v => {
        // 先判断当前的商品是否选中
        if (this.goodsList[v].selected) {
          sum += this.goodsList[v].goods_price * this.goodsList[v].num
        }
      })
      return sum
    }
  }
}
</script>

<style scoped lang="less">
.page {
  padding-bottom: 100rpx;
}

.address {
  border-bottom: 20rpx solid #f4f4f4;
  .no-address {
    display: flex;
    padding: 0 20rpx;
    justify-content: space-between;
    height: 100rpx;
    line-height: 100rpx;
    .word {}
    .iright {}
  }
  .yes-address {
    height: 200rpx;
    padding: 0 20rpx;
    .uname {
      display: flex;
      justify-content: space-between;
      line-height: 100rpx;
    }
    .uadress {}
  }
  .img {
    width: 100%;
    height: 14rpx;
    display: block;
  }
}

.goodsList {
  .title {
    height: 88rpx;
    line-height: 88rpx;
    padding-left: 30rpx;
    border-bottom: 1px solid #ddd;
  }
  .item {
    display: flex;
    .check {
      width: 88rpx;
      height: 205rpx;
      text-align: center;
      line-height: 205rpx;
    }
    .goods {
      flex: 1;
      height: 205rpx;
      border-bottom: 1px solid #ddd;
      display: flex;
      .left {
        width: 160rpx;
        image {
          margin-top: 22rpx;
          width: 160rpx;
          height: 160rpx;
        }
      }
      .right {
        .mess {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          padding: 20rpx 30rpx 0rpx;
          font-size: 16px;
        }
        .pricenum {
          padding: 40rpx 18rpx 0rpx 30rpx;
          display: flex;
          justify-content: space-between;
          .price {
            color: red;
          }
          .num {
            display: flex;
            span {
              border: 4px solid #666666;
              width: 52rpx;
              height: 42rpx;
              text-align: center;
              line-height: 42rpx;
            }
            .index {
              border: none;
              line-height: 50rpx;
            }
          }
        }
      }
    }
  }
}
</style>
