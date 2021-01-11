<template>
  <view>
    <!-- 收获地址组件 -->
    <my-address></my-address>

   <!-- 商品列表的标题区域 -->
   <view class="cart-title">
     <uni-icons type="shop" size="18"></uni-icons>
     <view class="cart-title-text">购物车</view>
   </view>
   
   <!-- 商品列表区域 -->
   <uni-swipe-action>
     <block v-for="(goods, i) in cart" :key="i"> 
     <uni-swipe-action-item :right-options="options" @click="swipeItemClickHandler(goods)">
       <my-goods :goods="goods" :show-radio="true" @radio-change="radioChangeHandler" :show-num="true" @num-change="numChangeHandler"></my-goods>
     </uni-swipe-action-item>
     </block>
   </uni-swipe-action>
   
   
  </view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js'
import { mapState, mapMutations} from 'vuex'

  export default {
    computed:{
      ...mapState('m_cart', ['cart'])
    },
   mixins: [badgeMix], 
    data() {
      return {
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#C00000'
          }
        }]
      };
    },
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState','updateGoodsCount','removeGoodsByID']),
      radioChangeHandler(e) {
        // console.log(e)
        // 商品的勾选状态发生了变化
        this.updateGoodsState(e)
      },
      numChangeHandler(e) {
       this.updateGoodsCount(e)
      },
      swipeItemClickHandler(goods) {
        // console.log(goods)
        this.removeGoodsByID(goods.goods_id)
      }
    }
    
  }
</script>

<style lang="scss">
.cart-title {
  display: flex;
  align-items: center;
  height: 40px;
   font-size: 14px;
    padding-left: 5px;
     border-bottom: 1px solid #efefef;
     .cart-title-text {
         margin-left: 10px;
       }
}
</style>
