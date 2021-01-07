<template>
	<view class="my-search-container" :style="{'background-color': bgcolor}">
    <view class="my-search-box" :style="{'border-radius': radius + 'px'}" @click="searchBoxHandler">
      <!-- 使用 uni-ui 提供的图标组件 -->
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
	</view>
</template>

<script>
	export default {
    props: {
      // 背景颜色
      bgcolor: {
        type: String,
        default: '#C00000'
      },
      // 圆角尺寸
      radius: {
        type: Number,
        default: 18 // px
      }
    },
		data() {
			return {
				
			};
		},
    methods: {
      searchBoxHandler() {
        console.log('123')
        this.$emit('click')
      }
    }
	}
</script>

<style lang="scss">
.my-search-container {
  display: flex;
  align-items: center;
  height: 50px;
 padding: 0 10px;
  // background-color: #C00000;
  .my-search-box {
    width: 100%;
    height: 36px;
    background-color: #FFFFFF;
    // border-radius: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    .placeholder {
      font-size: 15px;
      margin-left: 5px;
    }
  }
}
</style>
