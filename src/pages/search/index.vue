<template>
  <div>
    <!-- 搜索框 -->
    <div class="search">
      <div class="search-input">
        <input type="text" v-model="query" placeholder="请输入要搜索的内容">
        <icon type="search" size="16"></icon>
      </div>
      <div v-if="query.length === 0 ? false: true" @click="ccancle" class="mybtn">取消</div>
    </div>
    <!-- 历史搜索 -->
    <div class="history">
      <div class="titile">
        <div class="left">历史搜索</div>
        <icon class="clear" type="clear" size="16"></icon>
      </div>
      <div class="his-item">
        <div class="item">小米</div>
        <div class="item">小米智能电视</div>
        <div class="item">小米空气净化器</div>
        <div class="item">西门洗碗机</div>
        <div class="item">华为手机</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: ''
    }
  },
  methods: {
    ccancle() {
      this.query = ''
    }
  }
}
</script>

<style scoped lang="less">
@import './index.less';
</style>
