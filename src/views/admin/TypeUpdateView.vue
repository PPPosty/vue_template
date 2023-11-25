<template>
  <div style="width: 60vw; margin: 40px auto">
    <div class="panel-heading">景点修改</div>
    <div class="panel-body">
      <el-form ref="ruleFormRef" :model="Type" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="景点分类:" prop="tname">
          <el-input v-model="Type.tname" autocomplete="off" />
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="submitForm(Type)">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive, toRefs, ref } from 'vue'
import axios from 'axios'
import { genFileId } from 'element-plus'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
export default {
  name: 'type',
  setup() {
    const route = useRoute()
    const router = useRouter()
    //页面初始化方法
    const data = reactive({
      Type: {},
    })
    //实现页面初始化
    onMounted(() => {
      //获得修改商品分类
      data.Type = JSON.parse(window.sessionStorage.getItem('Type'))

      data.currPage = route.query.currPage
    })
    // 图片替换

    const submitForm = (Type) => {
      axios.post('/admin/updateType', Type).then((res) => {
        if (res.data === 'ok') {
          alert('修改成功！')
          router.push('/admin/showType?currPage=' + data.currPage)
        } else {
          alert('修改失败！')
        }
      })
    }
    // 所有的变量和方法，需要在return返回，外界才能访问
    return {
      ...toRefs(data),

      submitForm,
    }
  },
}
</script>
<style scoped>
.panel-heading {
  font-weight: 700;
  font-size: 20px;
}
</style>
