<template>
  <br>  <br>
  <el-input v-model="sname" placeholder="查询景点" style="width:50%"></el-input>
  <el-button type="danger"  @click="SeafchForm" >查询</el-button>
  <br>  <br>
  <div class="wrapper">

    <h2 class="title">景点</h2>
    <div class="tabs">
      <div :class="['tab', currentIndex === index ? 'active' : '']" v-for="(type, index) in typeList" :key="index" @click="handleScenicClick(index)">{{ type.tname }}</div>
    </div>
    <div class="spots">
      <div class="spot" v-for="(Spot, index) in SpotListType[currentIndex]" :key="index">
        <div class="inner">
          <div class="cover">
            <img :src="require(`@/assets/uploadfile/${Spot.spic}`)" class="image" />
          </div>
          <span>{{ Spot.sname }}</span>
        </div>
      </div>
    </div>

    <!-- <div  v-for="(type, index) in typeList" :key="index">
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
    </div> -->

  </div>
</template>
<script>
// import axios from "@/util/request"
import axios from "axios"
import { useRouter } from "vue-router"
import { ref, reactive, toRefs, onMounted } from "vue"
import {useStore} from "vuex";
export default {
  name: "userMain",
  setup() {
    const store = useStore();
    const router = useRouter();
    const currentIndex = ref(0);
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
    const handleScenicClick = (index)  => {
      currentIndex.value = index
    }
      // 所有的变量和方法，需要在return返回，外界才能访问
    return {
      ...toRefs(data),
      currentIndex,
      SeafchForm,
      handleScenicClick
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

.wrapper {
  width: 1032px;
  margin: 0 auto;
}
.title {
  margin-bottom: 16px;
  font-size: 22px;
  font-weight: 700;
  text-align: left;
  color: #222;
}
.tabs {
  display: flex;
}
.tab {
  box-sizing: border-box;
  -webkit-flex-basis: 120px;
  -ms-flex-preferred-size: 120px;
  flex-basis: 120px;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  padding: 14px 16px;
  margin-right: 16px;
  border-radius: 3px;
  font-size: 17px;
  text-align: center;
  border: 0.5px solid #d8d8d8;
  white-space: nowrap;
  cursor: pointer;
}
.tab.active {
  color: #fff;
  background-color: #00848A;
}

.spots {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin: 0 -8px;
}
.spot {
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 33.33333%;
  padding: 8px;
}
.inner {

}
.cover {
  position: relative;
  box-sizing: border-box;
  padding: 66.66% 8px 0;
  border-radius: 3px;
  overflow: hidden;
  cursor: pointer;
}

.cover img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

