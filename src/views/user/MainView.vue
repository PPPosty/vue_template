<template>
  <br>  <br>
  <el-input v-model="sname" placeholder="查询景点" style="width:50%"></el-input>
  <el-button type="danger"  @click="SeafchForm" >查询</el-button>
  <br>  <br>
  <div>

    <div  v-for="(type, index) in typeList" :key="index">
      <div  style="text-align: left; font-size: 15px;background-color:#3d6a86;color:white;height: 30px;">{{ type.tname }}</div>
      <div >
        <el-row :gutter="20">
          <el-col v-for="(Spot, index) in SpotListType[index]" :key="index" :span="4">
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

  </div>
</template>
<script>
// import axios from "@/util/request"
import axios from "axios"
import { useRouter } from "vue-router"
import { reactive, toRefs, onMounted } from "vue"
import {useStore} from "vuex";
export default {
  name: "userMain",
  setup() {
    const store = useStore();
    const router = useRouter();
       // 初始化,获得主页面所需数据
    onMounted(() => {
      axios.get("/user/selectSpotForMain")
        .then(res => {

          data.typeList = res.data.typeList
          console.log("类型", data.typeList)
          data.SpotListType = res.data.SpotListType
          console.log("多种数据", data.SpotListType)
          data.SpotList = res.data.SpotList
        })
    })
    const data = reactive({

      typeList: [],
      //按照类型保存对应玩具信息
      SpotListType: [], sname:'',
    })
    const SeafchForm = () => {
      store.commit("setSname",data.sname)
      router.push("/user/ShowSpot");
    }
      // 所有的变量和方法，需要在return返回，外界才能访问
    return {
      ...toRefs(data),
      SeafchForm
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

