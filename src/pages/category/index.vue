<template>
  <div>
    <!-- 头部搜索 -->
    <div class="mytop">
      <tophead />
    </div>
    <!-- 内容区域 -->
    <div class="content">
      <div class="nav">
        <div class="nav-item" @click="setRightData(index)" :class="{active: selectedIndex == index}" v-for="(item, index) in dataList" :key="index">{{item.cat_name}}</div>
      </div>
      <div class="goods">
        <image class="topimg" src="https://img.alicdn.com/simba/img/TB1WhQTO7voK1RjSZPfSutPKFXa.jpg" mode="aspectFill"></image>
        <div class="list" v-for="(item, index) in rightList" :key="index">
          <div class="title">
            <span>/</span> {{item.cat_name}}
            <span>/</span>
          </div>
          <div class="item-list">
            <a :href="'/pages/searchlist/main?query=' + subitem.cat_name" class="item" v-for="(subitem, subindex) in item.children" :key="subindex">
              <image :src="'https://itjustfun.cn/' + subitem.cat_icon" mode="aspectFill"></image>
              <span>{{subitem.cat_name}}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入组件
import tophead from '../../components/tophead.vue'
// 引入自己封装的 request
import request from '../../utils/request.js'
export default {
  data() {
    return {
      selectedIndex: 0,
      // dataList
      dataList: [],
      rightList: []
    }
  },
  components: {
    tophead
  },
  methods: {
    setRightData(index) {
      this.selectedIndex = index
      // 根据 index 得到当前点击的左侧菜单
      this.rightList = this.dataList[index].children
      console.log(this.rightList)
    }
  },
  // 获取左侧菜单
  async mounted() {
    var url = 'https://itjustfun.cn/api/public/v1/categories'
    let res = await request(url)
    this.dataList = res.data.data
    // 打开页面给左侧内容动态赋值
    this.rightList = this.dataList[this.selectedIndex].children
    console.log(this.dataList)
  }
}
</script>

<style lang="less">
@import "./index.less";
</style>
