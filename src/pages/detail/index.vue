<template>
  <div>
    <!-- 轮播图 -->
    <swiper class="lunbo" indicator-dots autoplay>
      <block v-for="(item, index) in imgList" :key="index">
        <swiper-item>
          <image :src="item" class="slide-image" mode="aspcetFill" />
        </swiper-item>
      </block>
    </swiper>
    <!-- 商品信息 -->
    <div class="box">
      <div class="price">￥279</div>
      <div class="mess">
        <div class="word">婴儿床杆子圆床通用支架挂杆两用杆实木杆遮光杆支架遮光架婴儿床杆子圆床通用支架挂杆两用杆实木杆遮光杆支架遮光架</div>
        <div class="shoucang">
          <span>星</span>
          <span>收藏</span>
        </div>
      </div>
      <div class="pass">快递：免运费</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgList: [
        "https://img.alicdn.com/tps/i3/TB2EDmkqv9TBuNjy0FcXXbeiFXa_!!0-juitemmedia.jpg_180x180q90.jpg_.webp",
        "https://gma.alicdn.com/bao/uploaded/i1/31432549/O1CN01itOM061UhU4bRirMM_!!0-saturn_solar.jpg_200x200.jpg_.webp"
      ]
    }
  }
}
</script>

<style scoped lang="less">
@import "./index.less";
</style>
