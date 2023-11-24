<template>
  <div class="cart">
    <div style="width: 90vw; margin: auto">
      <div>
        <el-table
          :data="cartList"
          @selection-change="handleSelectionChange"
          table-layout="auto"
          :header-cell-style="{
            textAlign: 'center',
          }"
          :cell-style="{ textAlign: 'center' }"
        >
          <el-table-column type="selection" width="80" />
          <el-table-column type="index" label="序号" width="80" />
          <el-table-column label="景点名称" prop="sname" />
          <el-table-column label="封面" width="100">
            <template #default="scope">
              <div v-if="scope.row.spic != null">
                <img :src="require(`@/assets/uploadfile/${scope.row.spic}`)" width="80" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="单价" prop="saleprice" />
          <el-table-column label="数量" prop="num">
            <template #default="scope">
              <el-input-number
                v-model="cartList[scope.$index].num"
                :min="1"
                :max="100"
                @change="handleChange(scope.row.num, scope.row.cid)"
              />
            </template>
          </el-table-column>

          <el-table-column label="小计" prop="totalPrice">
            <template #default="scope">
              {{ scope.row.num * scope.row.saleprice }}
            </template>
          </el-table-column>

          <el-table-column>
            <template #header><span>操作</span> </template>
            <template #default="scope">
              <el-popconfirm title="确定要删除吗？" @confirm="handleDelete(scope.$index, scope.row.cid)">
                <template #reference>
                  <el-button type="danger">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 40px; display: flex; justify-content: space-around; flex-grow: 1">
          <div></div>
          <div style="text-align: right; margin: 10px 40px">
            已选商品{{ totalNum }}件 合计：<span style="margin-right: 40px">{{ totalPrice }}元</span>
            <el-button type="danger" @click="handleCart">结算</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import headView from '@/components/HeaderView.vue'
import { reactive, toRefs, onMounted, computed, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useStore } from 'vuex'
export default {
  name: 'cart',
  components: {
    headView,
  },
  setup() {
    // 定义数据
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    const data = reactive({
      cartList: [],
      user: {},
      totalPrice: 0,
      totalNum: 0,
      cartChoise: [],
      cartData: [],
    })

    // 初始化
    onMounted(() => {
      data.user = null
      data.user = JSON.parse(window.sessionStorage.getItem('user'))
      // 判断是否已经登录
      if (data.user != null) {
        axios
          .get('/shop/getCart?uid=' + data.user.uid)
          .then((res) => {
            data.cartList = res.data.cartList
          })
          .catch((error) => {
            console.log('error', error)
          })
      } else {
        alert('请你先登录！')
        window.location.href = '/user/login'
      }
    })
    // 修改商品数量
    const handleChange = (num, cid) => {
      // 更新数据库
      axios
        .post('/shop/updateCart', {
          cid: cid,
          num: num,
        })
        .then((res) => {
          console.log('res', res.data)
        })
        .catch((error) => {
          console.log('error', error)
        })

      /**********更新总价************/
      if (data.cartChoise.length > 0) {
        let sum = 0
        data.cartChoise.forEach((v) => {
          sum += v.num * v.saleprice
        })
        data.totalPrice = sum
        /****************************/
      }
    }
    //  删除商品
    const handleDelete = (index, cid) => {
      // 从页面删除当前商品
      data.cartList.splice(index, 1)
      axios
        .get('/shop/deleteCartByCid?cid=' + cid)
        .then((res) => {
          console.log('res', res.data)
        })
        .catch((error) => {
          console.log('error', error)
        })
    }
    // 多选
    const handleSelectionChange = (val) => {
      data.totalNum = val.length
      console.log('data.totalNum', data.totalNum)

      let sum = 0
      val.forEach((v) => {
        sum += v.num * v.saleprice
      })
      data.totalPrice = sum
      /****************************/
      data.cartChoise = val
    }
    // ********************************************************8
    // 购买商品
    const handleCart = () => {
      if (data.cartChoise.length > 0) {
        store.commit('setCartList', JSON.stringify(data.cartChoise))

        router.push({
          path: '/shop/orderConfirm',
          query: {
            totalPrice: data.totalPrice,
          },
        })
      } else {
        alert('请选择要购买的商品')
      }
    }
    // 所有的变量和方法，需要在return返回，外界才能访问
    return {
      ...toRefs(data),
      handleDelete,
      handleChange,
      handleSelectionChange,
      handleCart,
    }
  },
}
</script>
<style scoped lang="less">
.cart {
  margin: 20px 0 20px;
  .el-table {
    :deep(thead) {
      color: #606266;
      th {
        background-color: #f5f7fa !important;
      }
    }
  }
}
</style>
