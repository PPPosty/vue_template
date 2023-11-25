<template>
  <h3>套餐搜索：</h3>
  <div class="wrapper">
    <!-- <div>
     <div >
        <el-row :gutter="20">
          <el-col v-for="(Spot, index) in ComboList" :key="index" :span="4">
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
    <div class="spots">
      <div class="spot" v-for="(spot, index) in ComboList" :key="index" @click="handleSpotClick(spot)">
        <div class="inner">
          <div class="cover">
            <img :src="require(`@/assets/uploadfile/${spot.spic}`)" class="image" />
          </div>
          <div class="name">{{ spot.sname }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from "@/util/request"
import axios from 'axios'
import { reactive, toRefs, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'userMain',
  setup() {
    // 初始化,获得主页面所需数据
    const store = useStore()
    const router = useRouter()
    onMounted(() => {
      data.sname = store.state.sname
      axios.post('/user/selectComboBySname?sname=' + data.sname).then((res) => {
        data.ComboList = res.data.ComboList
      })
    })
    const data = reactive({
      ComboList: [],
      sname: '',
    })
    const handleSpotClick = (spot) => {
      router.push(`/user/ComboDetails?sid=${spot.sid}`)
    }
    // 所有的变量和方法，需要在return返回，外界才能访问
    return {
      ...toRefs(data),
      handleSpotClick,
    }
  },
}
</script>
<style scoped lang="less">
.wrapper {
  padding: 4px 0 25px;
  width: 1032px;
  margin: 0 auto;
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
.spot:hover {
  .cover img {
    transform: scale(1.1);
  }

  .name {
    color: #000;
  }
}
.spot {
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 33.33333%;
  padding: 8px;
  cursor: pointer;
}
.spot .name {
  padding: 4px 0;
  line-height: 16px;
  font-size: 16px;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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
  transition: 0.3s;
}
</style>
