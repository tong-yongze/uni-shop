<template>
	<view class="my-settle-container">
		 <!-- 全选区域 -->
		  <label class="radio" @click="changeAllState">
		    <radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
		  </label>
		
		  <!-- 合计区域 -->
		  <view class="amount-box">
		    合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
		  </view>
		
		  <!-- 结算按钮 -->
		  <view class="btn-settle">结算({{checkedCount}})</view>
      
	</view>

</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  
	export default {
    computed: {
      ...mapGetters('m_cart', ['checkedCount', 'total','checkedGoodsAmount']),
      isFullCheck() {
      return  this.total === this.checkedCount
      }
    },
		data() {
			return {};
		},
    methods: {
      ...mapMutations('m_cart', ['updateAllGoodsState']),
      changeAllState() {
        console.log(!this.isFullCheck)
       this.updateAllGoodsState(!this.isFullCheck)
      },
    }
	}
</script>

<style lang="scss">
.my-settle-container {
  height: 50px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  .radio{
    display: flex;
    align-items: center;

  }
  .amount-box {
    .amount {
      font-weight: bold;
      color: #b82a51;
    }
  }
  .btn-settle {
    height: 50px;
    min-width: 100px;
    background-color: #c00000;
    line-height: 50px;
    text-align: center;
    color: white;
     padding: 0 10px;
  }
}
</style>
