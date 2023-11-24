<template>
  <div class="wrapper">
    <div class="sc-wrapper">
      <h2 class="title">景点</h2>
      <div class="search-bar" @click="switchShowInput(true)">
        <div v-show="!showInput" class="text">查询景点</div>
        <el-input
          ref="inputRef"
          v-show="showInput"
          v-model="sname"
          class="text"
          placeholder="请输入查询内容"
          @blur="switchShowInput(false)"
        ></el-input>
        <div class="icon" @click.stop="SeafchForm">
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style="
              display: block;
              fill: none;
              height: 12px;
              width: 12px;
              stroke: currentcolor;
              stroke-width: 5.33333;
              overflow: visible;
            "
          >
            <g fill="none">
              <path
                d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"
              ></path>
            </g>
          </svg>
        </div>
      </div>
    </div>
    <el-scrollbar>
      <div class="tabs">
        <div
          :class="['tab', currentIndex === index ? 'active' : '']"
          v-for="(type, index) in typeList"
          :key="index"
          @click="handleScenicClick(index)"
        >
          {{ type.tname }}
        </div>
      </div>
    </el-scrollbar>
    <div class="spots">
      <div class="spot" v-for="(spot, index) in SpotListType[currentIndex]" :key="index" @click="handleSpotClick(spot)">
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
import { useRouter } from 'vue-router'
import { ref, reactive, toRefs, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'userMain',
  setup() {
    const store = useStore()
    const router = useRouter()
    const currentIndex = ref(0)
    const showInput = ref(false)
    const inputRef = ref()
    const switchShowInput = (val) => {
      showInput.value = val
      if (val) {
        inputRef.value.focus()
      }
      console.log(1)
    }
    // 初始化,获得主页面所需数据
    onMounted(() => {
      axios.get('/user/selectSpotForMain').then((res) => {
        data.typeList = res.data.typeList
        console.log('类型', data.typeList)
        data.SpotListType = res.data.SpotListType
        console.log('多种数据', data.SpotListType)
        data.SpotList = res.data.SpotList
      })
    })
    const data = reactive({
      typeList: [],
      //按照类型保存对应玩具信息
      SpotListType: [],
      sname: '',
    })
    const SeafchForm = () => {
      if (!data.sname.length) {
        return
      }
      store.commit('setSname', data.sname)
      router.push('/user/ShowSpot')
    }

    const handleScenicClick = (index) => {
      currentIndex.value = index
    }

    const handleSpotClick = (spot) => {
      router.push(`/user/SpotDetails?sid=${spot.sid}`)
    }

    // 所有的变量和方法，需要在return返回，外界才能访问
    return {
      ...toRefs(data),
      currentIndex,
      SeafchForm,
      handleScenicClick,
      handleSpotClick,
      showInput,
      switchShowInput,
      inputRef,
    }
  },
}
</script>

<style scoped lang="less">
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
  padding: 8px 0;
  display: flex;
  /* flex-wrap: wrap; */
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
  background-color: #00848a;
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
.sc-wrapper {
  padding: 50px 0;
  display: flex;
  align-items: center;
  height: 48px;
  gap: 32px;
}
.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 550px;
  height: 48px;
  box-sizing: border-box;
  padding: 0 8px;
  border: 1px solid #ddd;
  border-radius: 24px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
  }
  .text {
    padding: 0 16px;
    color: #444;
    font-weight: 600;
  }
  :deep(.el-input__wrapper) {
    box-shadow: none;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    color: #fff;
    background-color: #ff385c;
  }
}
</style>
