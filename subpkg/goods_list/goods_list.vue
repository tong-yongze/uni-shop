<template>
  <view>
    <view class="goods-list">
      <view v-for="(goods,i) in goodsList" :key="i" @click="gotoDetail(goods)">
        <my-goods :goods="goods"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 请求参数对象
        queryObj: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goodsList: [],
        total: 0,
        // 是否正在请求数据  
        isloading: false
      };
    },
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      // console.log(this.queryObj)

      this.getGoodsList()
    },
    methods: {
      // 获取商品列表数据的方法
      async getGoodsList(cb) {
        // 开启节流阀
        this.isloading = true
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        // 关闭节流阀
        this.isloading = false
        // 只要数据请求完毕 就立即按需调用 cb 回调函数  调用了就会关闭下拉
        cb && cb()
        
        if (res.meta.status !== 200) return uni.$showMsg()
        // this.goodsList = res.message.goods
        // 为数据赋值 通过展开运算符的形式 进行新旧数据的拼接
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
      },
      gotoDetail(goods) {
        uni.navigateTo({
          // url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
          url: `/subpkg/goods_detail/goods_detail?goods_id=${goods.goods_id}`
        })
      }
    },
    // 触底事件
    onReachBottom () {
      if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')
      // 判断是否在请求数据  如果在请求 就return 没有就继续下面代码 
      if(this.isloading) return 
      this.queryObj.pagenum += 1
      // 重新获取列表数据
      this.getGoodsList()
    },
    // 下拉刷新的事件
    onPullDownRefresh() {
      // 1. 重置关键数据
      this.queryObj.pagenum = 1
      this.total = 0
      this.isloading  = false
      this.goodsList = []
      
      // 2.重新发请求
      this.getGoodsList(() => uni.stopPullDownRefresh())
    }
  }
</script>

<style lang="scss">
  
</style>
