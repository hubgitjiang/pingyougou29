<template>
  <div>
    <div class="mytop" :style="{position: isScroll}">
      <!-- 头部搜索 -->
      <div class="search">
        <div class="serach_input">
          <input type="text" v-model="query">
          <div class="word">
            <icon type="search" size="20"></icon>
          </div>
        </div>
      </div>
      <!-- 顶部 tab -->
      <div class="tab">
        <div @click="selectedIndex = index" :class="{active: selectedIndex === index}" v-for="(item, index) in tabList" :key="index">{{ item }}</div>
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="goodsList" :style="{marginTop: margintop}">
      <a :href="'/pages/goods_detail/main?id=' + item.goods_id" class="item" v-for="(item, index) in goodsList" :key="index">
        <div class="box">
          <div class="left">
            <image :src="item.goods_small_logo"></image>
          </div>
          <div class="right">
            <div class="word">{{item.goods_name}}</div>
            <div class="price">
              <span>￥</span>
              <span>{{item.goods_price}}</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
<script>
// 引入 request 
import request from '../../utils/request.js'
export default {
  data() {
    return {
      tabList: ['综合', '销量', '价格'],
      selectedIndex: 0,
      goodsList: [],
      query: '',
      pagenum: 1,
      pagesize: 10,
      isend: false, // 设置当前上拉的数据是否请求完成
      isScroll: 'static', // 设置元素默认为静态定位
      margintop: '0rpx'
    }
  },
  methods: {
    async getDataList() {
      // 发送请求之前需要判断：判断当前数据是否请求完
      if (this.isend) {
        // 提示信息
        wx.showToast({
          title: '数据已经加载完',
          icon: 'none',
          duration: 2000
        })
        return
      }
      // 根据关键字去查询数据
      var url = 'https://itjustfun.cn/api/public/v1/goods/search'
      let res = await request.get(url, {
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
      // 当返回的数据的长度为 0 时就应该停止请求
      if (res.data.data.goods.length == 0) {
        this.isend = true
      }
      if (this.goodsList.length == 0) {
        this.goodsList = res.data.data.goods
      } else {
        this.goodsList = this.goodsList.concat(res.data.data.goods)
      }

      wx.hideLoading()
      // 隐藏下拉框
      wx.stopPullDownRefresh()
    }
  },
  mounted() {
    // this.goodsList = []
    // 接收参数
    this.query = this.$root.$mp.query.query
    this.getDataList()
  },
  // 上拉事件
  onReachBottom() {
    this.pagenum = this.pagenum + 1
    this.getDataList()
  },
  onUnload() {
    this.goodsList = []
  },
  onPageScroll(scroll) {
    // 当事件被触发时将头部设置为固定定位，否则（没有固定定位）
    // 操作 dom
    if (scroll.scrollTop == 0) {
      this.isScroll = 'static'
      this.margintop = '0rpx'
    } else {
      this.isScroll = 'fixed'
      this.margintop = '200rpx'
    }
  },
  onPullDownRefresh() {
      this.selectedIndex = 0
      this.goodsList = []
      this.pagenum = 1
      this.pagesize = 10
      this.isend = false // 设置当前上拉的数据是否请求完成
      this.isScroll = 'static' // 设置元素默认为静态定位
      // 重新发送请求
      this.getDataList()
  }
}
</script>

<style scoped lang="less">
@import './index.less';
</style>
