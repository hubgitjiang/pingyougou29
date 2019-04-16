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
        <span>购物车</span>
      </div>
      <div class="incart">加入购物车</div>
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
      goods_id: ''
    }
  },
  methods: {
    aa() {
      wx.showShareMenu()
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
    console.log(res.data.data)
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
