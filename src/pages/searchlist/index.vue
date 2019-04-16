<template>
  <div>
    <div class="mytop">
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
    <div class="goodsList">
      <div class="item" v-for="(item, index) in goodsList" :key="index">
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
      </div>
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
      pagesize: 10
    }
  },
  methods: {
    async getDataList() {
      // 根据关键字去查询数据
      var url = 'https://itjustfun.cn/api/public/v1/goods/search'
      let res = await request.get(url, {
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
      if (this.goodsList.length == 0) {
        this.goodsList = res.data.data.goods
      } else {
        this.goodsList = this.goodsList.concat(res.data.data.goods)
      }
    }
  },
  mounted() {
    // 接收参数
    this.query = this.$root.$mp.query.query
    this.getDataList()
  },
  // 上拉事件
  onReachBottom() {
    this.pagenum = this.pagenum + 1
    this.getDataList()
  }
}
</script>

<style scoped lang="less">
@import './index.less';
</style>
