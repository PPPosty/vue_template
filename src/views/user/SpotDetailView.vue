<template>
  <div class="panel-body" style="text-align: left">
    <br />
    <div class="media" style="margin-left: 200px">
      <a class="pull-left" href="#">
        <img class="media-object" :src="require(`@/assets/uploadfile/${spic}`)" width="500" />
      </a>
      <div class="media-body" style="padding-left: 30px">
        <h3 class="media-heading">&nbsp; 景点名称：{{ Spot.sname }}</h3>
        <div class="col-md-8">
          <div class="heatView">门票销量：{{ Spot.salenum }}</div>
          <hr />
          <p>
            门票售价： <span style="color: red">{{ Spot.saleprice }} </span>
          </p>
          <!-- ********************实现购买的form表单***************************** -->
          <el-form label-width="120px" style="margin-left: -75px">
            <el-form-item label="数量:">
              <el-input-number v-model="num" :min="1" :max="100" @change="handleChange" style="width: 120px" />
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="addCart"> 加入购物车 </el-button>
            </el-form-item>
          </el-form>

          <!-- ******************************************************************* -->
        </div>
      </div>
    </div>

    <!-- *****************************************************8 -->
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { ElMessage } from 'element-plus'
// import axios from "@/util/request"
export default {
  name: 'SpotDetail',
  setup() {
    // 定义数据
    const route = useRoute()
    const data = reactive({
      Spot: {},
      spic: '41-L4n70mfL._AC_UY218_.jpg',
      num: 1,
      user: {},
      cart: {},
    })

    // 初始化函数
    onMounted(() => {
      //  按照id查询玩具
      axios.get('/shop/getSpotByID?sid=' + route.query.sid).then((res) => {
        data.Spot = res.data.Spot
        data.spic = data.Spot.spic
      })
    })
    // 加入购物车
    const addCart = () => {
      data.user = null
      data.user = JSON.parse(window.sessionStorage.getItem('user'))
      // 判断是否已经登录
      if (data.user != null) {
        data.cart.uid = data.user.uid
        data.cart.num = data.num
        data.cart.sid = data.Spot.sid
        axios
          .post('/shop/addCart', data.cart)
          .then((res) => {
            ElMessage({
              message: '添加成功！',
              type: 'success',
            })
          })
          .catch((error) => {
            ElMessage.error('添加失败！')
          })
      } else {
        alert('请你先登录！')
        window.location.href = '/user/login'
      }
    }
    // 修改玩具数量
    const handleChange = (num) => {
      console.log(num)
    }
    // 所有的变量和方法，需要在return返回，外界才能访问
    return {
      ...toRefs(data),
      handleChange,
      addCart,
    }
  },
}
</script>
<style scoped></style>
