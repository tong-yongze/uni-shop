export default {
  // 为当前模块开启命名空间
  namespaced: true,

  // 模块的 state 数据
  state: () => ({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
  }),

  // 模块的 mutations 方法
  mutations: {
    addToCart(state, goods) {
      const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
        // console.log(findResult)
      if(!findResult) {
        state.cart.push(goods)
      } else {
        findResult.goods_count++
      }
      // console.log(state.cart)
      this.commit('m_cart/saveToStorage')
    },
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    // 更新购物车中商品的勾选状态  参数goods是外界传过来的商品信息对象
    updateGoodsState(state,goods) {
      // 根据 goods_id 查询购物车中对应商品的信息对象
    const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      // 有对应的商品信息对象
    if(findResult) {
       // 更新对应商品的勾选状态
      findResult.goods_state = goods.goods_state
          // 持久化存储到本地
       this.commit('m_cart/saveToStorage')
     }
    },
    // 更新商品的数量
    updateGoodsCount(state,goods) {
      const findResult= state.cart.find(x => x.goods_id === goods.goods_id)
      
      if(findResult) {
        findResult.goods_count = goods.goods_count
         this.commit('m_cart/saveToStorage')
      }
    },
    // 根据 id 删除对应的商品
    removeGoodsByID(state, goods_id) {
    state.cart = state.cart.filter(x => x.goods_id !== goods_id)
    this.commit('m_cart/saveToStorage')
    }
     
  },

  // 模块的 getters 属性
  getters: {
    total(state) {
      let c = 0
      state.cart.forEach(goods => c += goods.goods_count)
      return c
    }
  },
}