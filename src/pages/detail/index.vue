<template>
  <div>
    <!-- 轮播图 -->
    <swiper class="lunbo" indicator-dots autoplay>
      <block v-for="(item, index) in detailObj.pics" :key="index">
        <swiper-item>
          <image :src="item.pics_big" class="slide-image" mode="aspcetFill" />
        </swiper-item>
      </block>
    </swiper>
    <!-- 商品信息 -->
    <div class="box">
      <div class="price">￥{{detailObj.goods_price}}</div>
      <div class="mess">
        <div class="word">{{detailObj.goods_name}}</div>
        <div class="shoucang">
          <span class="iconfont iconshoucang"></span>
          <span>分享
          </span>
          <button class="mybtn" open-type="share"></button>
        </div>
      </div>
      <div class="pass">快递：免运费</div>
    </div>
    <!-- 图文介绍 -->
    <div class="jieshao">
      <div class="title">图文介绍</div>
      <div class="msg" v-html="detailObj.goods_introduce"></div>
    </div>
    <!-- bottomtab -->
    <div class="bottom">
      <div class="callme">
        <span class="iconfont icontongyong-lianxikefutubiao"></span>
        <span>联系客服</span>
        <button open-type="contact"></button>
      </div>
      <div class="cart">
        <span class="iconfont icongouwuche"></span>
        <span @click="toCart">购物车</span>
      </div>
      <div class="incart" @click="addCart">加入购物车</div>
      <div class="buy">立即购买</div>
    </div>
  </div>
</template>

<script>
// 引入 request 
import request from '../../utils/request.js'
export default {
  data() {
    return {
      detailObj: {},
      goods_id: '',
      goodsList: {}, // 保存所有的购物车中的商品信息
    }
  },
  methods: {
    aa() {
      wx.showShareMenu()
    },
    // 跳转到购物车：
    toCart() {
      wx.switchTab({
        url: '/pages/cart/main'
      })
    },
    // 加入购物车的方法
    addCart() {
      // console.log(this.detailObj)
      // 将当前商品信息保存起
      this.goodsList[this.detailObj.goods_id] = this.detailObj
      // 存储到 storage 中
      try {
        wx.setStorageSync('goods', this.goodsList)
        wx.showToast({
          title: '加入购物车成功',
          icon: 'success',
          duration: 2000
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  async mounted() {
    // 接收参数
    this.goods_id = this.$root.$mp.query.id
    var url = 'https://itjustfun.cn/api/public/v1/goods/detail'
    var res = await request.get(url, {
      goods_id: this.goods_id
    })
    this.detailObj = res.data.data
    // 将购物车中原来的数据读取出来
    try {
      this.goodsList = wx.getStorageSync('goods') || {}
    } catch (error) {
      console.log(error) // log 将当前的异常信息保存到 log 中，log: 日志
    }
  },
  onShareAppMessage(res) {
    return {
      title: '震惊-据专家研究得到，烧开的水不能直接饮用',
      path: '/pages/detail/main?goods_id=' + this.goods_id,
      imageUrl: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=4116997908,4289274602&fm=173&app=49&f=JPEG?w=218&h=146&s=DA2382457C36780D5522D57203009031'
    }
  }
}
</script>

<style scoped lang="less">
@import "./index.less";
</style>
