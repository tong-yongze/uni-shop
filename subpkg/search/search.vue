<template>
  <view>
    <view class="search-box">
      <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
    </view>

    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="searchResults.length !==0">
      <view class="sugg-item" v-for="(item,i) in searchResults" :key="i" @click="gotoDetail(item)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="17"></uni-icons>
      </view>
    </view>

    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <!-- 搜索标题 -->
      <view class="history-title">
        <text>历史记录</text>
        <uni-icons type="trash" size="17" @click="clean"></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <uni-tag :text="item" v-for="(item,i) in histories" :key="i" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        kw: '', // 存储input中的输入值
        searchResults: [], // 搜索结果列表
        // historyList: ['a','app','apple']
        historyList: []
      };
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    methods: {
      // 输入事件的处理函数
      input(e) {
        // console.log(e.value)
        clearTimeout(this.timer)

        this.timer = setTimeout(() => {
          // console.log(e.value)
          this.kw = e.value
          // 根据关键词 查询搜索框建议列表
          this.getSearchList()
        }, 500)
      },
      // 根据商品搜索关键词 搜索商品建议列表
      async getSearchList() {
        if (this.kw.length === 0) {
          this.searchResults = []
          return
        }
        // const {data: res} = await uni.$http.get('/api/public/v1/goods/qsearch', {
        //   query: this.kw })
          const {data: res} = await uni.$http.get(`/api/public/v1/goods/qsearch?query=${this.kw}`)
        // console.log(res)
        if (res.meta.status !== 200) return uni.$showMsg()
        this.searchResults = res.message

        this.saveSearchHistory()
      },
      gotoDetail(item) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
      saveSearchHistory() {
        // this.historyList.push(this.kw)
        const set = new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)
        this.historyList = Array.from(set)
        //  将 记录持久化存储在本地
        uni.setStorageSync('kw', JSON.stringify(this.historyList))
      },
      //  清空本地历史记录
      clean() {
        // 先清空data数据中的搜索历史记录
        this.historyList = []
        // 然后清空本地存储的记录 
        uni.setStorageSync('kw', '[]')
      },
      gotoGoodsList(kw) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + kw
        })
      }
    },
    computed: {
      // 用计算属性实现页面的渲染
      histories() {
        return [...this.historyList].reverse()
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .sugg-list {
    padding: 0 5px;

    .sugg-item {
      font-size: 12px;
      padding: 13px 0;
      border: 1px solid #efefef;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .goods-name {
        // 溢出部分隐藏
        overflow: hidden;
        // 文字不允许换行（单行文本）
        white-space: nowrap;
        // 文本溢出后，使用 ... 代替
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }

  .history-box {
    padding: 0 5px;

    .history-title {
      height: 40px;
      display: flex;
      font-size: 12px;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #efefef;
    }

    .history-list {
      display: flex;
      flex-wrap: wrap;

      .uni-tag {
        margin-top: 5px;
        margin-right: 5px;
      }
    }

  }
</style>
