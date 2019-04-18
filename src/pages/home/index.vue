<template>
  <div>
    <!-- 搜索 -->
    <tophead />
    <!-- 轮播图 -->
    <swiper class="loop" circular indicator-dots autoplay>
      <block v-for="(item, index) in imgList" :key="index">
        <swiper-item>
          <a :href="item.navigator_url">
            <image :src="item.image_src" mode="aspectFill" />
          </a>
        </swiper-item>
      </block>
    </swiper>
    <!-- 分类选项 -->
    <div class="cate">
      <div class="item" v-for="(item, index) in cateList" :key="index">
        <image :src="item.image_src" mode="aspectFit"></image>
      </div>
    </div>
    <!-- 楼层 -->
    <div class="floor" v-for="(item, index) in floorList" :key="index">
      <div class="title">
        <image :src="item.floor_title.image_src" mode="aspectFit"></image>
      </div>
      <div class="content">
        <div class="left">
          <a :href="'/pages/searchlist/main?query=' + item.product_list[0].name">
            <image :src="item.product_list[0].image_src" mode="aspectFit"></image>
          </a>
        </div>
        <div class="right">
          <a v-if="subindex != 0" :href="'/pages/searchlist/main?query=' + subitem.name" v-for="(subitem, subindex) in item.product_list" :key="subindex">
            <image :src="subitem.image_src" mode="aspectFit"></image>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入自定义组件
import tophead from '../../components/tophead.vue'
// 引入 request
import request from '../../utils/request.js'
export default {
  data() {
    return {
      imgUrls: ['https://aecpm.alicdn.com/simba/img/TB1JNHwKFXXXXafXVXXSutbFXXX.jpg', 'https://img.alicdn.com/tfs/TB1NXHYQCzqK1RjSZFLXXcn2XXa-520-280.jpg_q90_.webp'],
      imgList: [],
      cateList: [],
      floorList: []
    }
  },
  // 请求页面中的数据
  async mounted() {
    this.getData()
  },
  methods: {
    async getData() {

      // 重新请求轮播图，分类选项，楼层数据
      // 发送请求：请求轮播图的数据
      var url1 = "https://itjustfun.cn/api/public/v1/home/swiperdata"
      var reslunbo = await request(url1)
      // 解构赋值
      var { data } = reslunbo.data
      this.imgList = data
      // 遍历这里的数据给每一个路径添加一个 main : /pages/goods_detail?goods_id=55578
      this.imgList.forEach(v => {
        v.navigator_url = '/pages/goods_detail/main?id=' + v.navigator_url.split('=')[1]
      })

      // 发送请求：请求分类选项数据
      var url2 = "https://itjustfun.cn/api/public/v1/home/catitems"
      var resCate = await request(url2)
      this.cateList = resCate.data.data

      // 发送请求：请求楼层数据
      var url3 = "https://itjustfun.cn/api/public/v1/home/floordata"
      var resFloor = await request(url3)
      this.floorList = resFloor.data.data
      console.log(this.floorList)
    }
  },
  components: {
    tophead
  },
  onPullDownRefresh() {
    this.getData()
    wx.stopPullDownRefresh()
  }
}
</script>

<style lang="less">
// 引用 index.less
@import './index.less';
</style>
