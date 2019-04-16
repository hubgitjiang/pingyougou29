<template>
  <div>
    <!-- 搜索 -->
    <tophead />
    <!-- 轮播图 -->
    <swiper class="loop" circular indicator-dots autoplay>
      <block v-for="(item, index) in imgList" :key="index">
        <swiper-item>
          <image :src="item.image_src" mode="aspectFill" />
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
          <image :src="item.product_list[0].image_src" mode="aspectFit"></image>
        </div>
        <div class="right">
          <image v-if="subindex != 0" v-for="(subitem, subindex) in item.product_list" :key="subindex" :src="subitem.image_src" mode="aspectFit"></image>
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
    // 发送请求：请求轮播图的数据
    var url1 = "https://itjustfun.cn/api/public/v1/home/swiperdata"
    var reslunbo = await request(url1)
    // 解构赋值
    var { data } = reslunbo.data
    this.imgList = data

    // 发送请求：请求分类选项数据
    var url2= "https://itjustfun.cn/api/public/v1/home/catitems"
    var resCate = await request(url2)
    this.cateList = resCate.data.data

    // 发送请求：请求楼层数据
    var url3 = "https://itjustfun.cn/api/public/v1/home/floordata"
    var resFloor = await request(url3)
    this.floorList = resFloor.data.data
    console.log(this.floorList)
  },
  components: {
    tophead
  }
}
</script>

<style lang="less">
// 引用 index.less
@import './index.less';
</style>
