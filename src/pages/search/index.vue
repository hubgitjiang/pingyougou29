<template>
  <div>
    <!-- 搜索框 -->
    <div class="search">
      <div class="search-input">
        <input type="text" @input="inputThink" @confirm="search" v-model="query" placeholder="请输入要搜索的内容">
        <icon type="search" size="16"></icon>
        <div v-show="query != ''" class="think">
          <div class="item" @click="dorpsearch(item.goods_name)" v-for="(item, index) in thinkList" :key="index">{{item.goods_name}}</div>
        </div>
      </div>
      <div v-if="query.length === 0 ? false: true" @click="ccancle" class="mybtn">取消</div>
    </div>
    <!-- 历史搜索 -->
    <div class="history">
      <div class="titile">
        <div class="left">历史搜索</div>
        <icon class="clear" @click="clearStoarge" type="clear" size="16"></icon>
      </div>
      <div class="his-item">
        <div class="item" v-for="(item, index) in searchList" @click="searchtag(item)" :key="index">{{item}}</div>
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
      query: '',
      searchList: [],
      thinkList: [],
      timer: null,// 用来保存定时器
    }
  },
  methods: {
    ccancle() {
      this.query = ''
    },
    // 点击完成时的搜索方法：
    search() {
      // 1.0 获取当前输入框中输入的内容
      // 2.0 跳转到搜索页面
      wx.navigateTo({
        url: '/pages/searchlist/main?query=' + this.query
      })
      // 添加到数组之前应该判断当前的数据在 searchList 中是否存在 
      // this.searchList.forEach( v => {
      //   if (v == this.query) {
      //     console.log(v, this.query)
      //     return // 直接结束 break
      //   }
      // })
      // for(var i = 0 ; i < this.searchList.length; i ++) {
      //   if (this.searchList[i] === this.query) {
      //     return
      //   }
      // }
      // 要将 搜索 的内容保存起来
      this.searchList.unshift(this.query) // push pop shift unshift
      // 使用 set 去重
      this.searchList = [...new Set(this.searchList)]
      // 将数据存储到 Storage 中
      wx.setStorageSync('history', this.searchList)
      // 清除输入框中的内容
      this.query = ''
    },
    // 点击下方的 tag 图标，可以直接进行搜索 
    searchtag(item) {
      // 更新 query
      this.query = item
      this.search()
    },
    // 点击清空搜索记录
    clearStoarge() {
      // 进行提示：
      wx.showModal({
        title: '警告',
        content: '是否确定删除数据',
        success: res => {
          if (res.confirm) {
            // 1.0 清除 searchList 
            this.searchList = []
            // 2.0 清除 stroage 中的数据
            try {
              wx.removeStorageSync('history')
            } catch (res) {
              console.log(res.message)
            }
          } else if (res.cancel) {
            console.log('已取消')
          }
        }
      })
    },
    // 当在输入框中输入内容时，会触发
    inputThink(e) {
      // 得到输入的内容：
      var value = e.target.value
      // 如果在两秒之内有新的输入内容，之前的定时器需要清除掉
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(async () => {
        // 发送请求到服务器进行联想
        var res = await request.get('https://itjustfun.cn/api/public/v1/goods/qsearch?query=' + value)
        this.thinkList = res.data.data
      }, 2000)
    },
    // 点击联想内容时，触发
    dorpsearch(name) {
      var query = name.split(' ')[0]
      this.query = query
      this.search()
    }
  },
  mounted() {
    // 得到 stroage 中的 数据
    this.searchList = wx.getStorageSync('history') || []
  }
}
</script>

<style scoped lang="less">
@import './index.less';
</style>
