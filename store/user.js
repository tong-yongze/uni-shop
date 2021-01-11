export default {
  // 开启命名空间
  namespaced: true,
  
  // 数据
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}')
  }),
  // 方法
  mutations: {
      // 更新收货地址
    updateAddress(state, address) {
      state.address = address
      
      this.commit('m_user/saveAddressToStorage')
    },
    saveAddressToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    }
  },
    // 数据包装器
  getters: {
    addStr(state) {
      if(!state.address.provinceName) return ''
      // 拼接 并且返回给用户
        return state.address.provinceName + state.address.cityName+ state.address.countyName+ state.address.detailInfo
    }
  }
}