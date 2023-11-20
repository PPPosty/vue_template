<template>
  <div>
     <div >
        <el-row :gutter="20">
          <el-col v-for="(Spot, index) in SpotList" :key="index" :span="4">
            <el-card :body-style="{ padding: '0px' }">
              <a :href="'/user/SpotDetails?sid='+Spot.sid">
              <img :src="require(`@/assets/uploadfile/${Spot.spic}`)" class="image" />
              <div style="padding: 14px">
                <span>{{ Spot.sname }}</span>
              </div>
              </a>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
</template>
<script>
// import axios from "@/util/request"
import axios from "axios"
import { reactive, toRefs, onMounted } from "vue"
import {useStore} from "vuex";
export default {
  name: "userMain",
  setup() {
       // 初始化,获得主页面所需数据
    const store = useStore();
    onMounted(() => {
      data.sname = store.state.sname;
      axios.post("/user/selectSpotBySname?sname="+data.sname)
        .then(res => {
          data.SpotList = res.data.SpotList
        })
    })
    const data = reactive({
      SpotList:[],
      sname:'',
    })
      // 所有的变量和方法，需要在return返回，外界才能访问
    return {
      ...toRefs(data)
    }
  }
}
</script>
<style scoped>
.image {
  width: 100%;
  height: 350px;
  display: block;
}
</style>

