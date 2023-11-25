<template>
  <div style="width: 60vw; margin: 40px auto">
    <div class="panel-heading">套餐修改</div>
    <div class="panel-body">
      <el-form ref="ruleFormRef" :model="Combo" status-icon label-width="120px" class="demo-ruleForm">
        <el-form-item label="套餐名:" prop="sname">
          <el-input v-model="Combo.sname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="套餐价格:" prop="saleprice">
          <el-input v-model="Combo.saleprice" type="number" autocomplete="off" />
        </el-form-item>
        <el-form-item class="cover" label="封面">
          <el-upload
            ref="upload"
            class="upload-demo"
            action="http://8.134.144.226:8888/api/admin/combo/fileInit"
            :limit="1"
            :on-exceed="handleExceed"
            list-type="picture"
          >
            <template #trigger>
              <el-button type="primary">select file</el-button>
              <img :src="require(`@/assets/uploadfile/${spic}`)" width="60" />
            </template>
            <template #tip>
              <div class="el-upload__tip">jpg/png files with a size less than 500KB.</div>
            </template>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="submitForm(Combo)">修改</el-button>
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
    const upload = ref(null)
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    //页面初始化方法
    const data = reactive({
      Combo: {},
      spic: '41-L4n70mfL._AC_UY218_.jpg',
      currPage: 0,
    })

    const login = () => {}

    //实现页面初始化
    onMounted(() => {
      //获得修改套餐
      data.Combo = JSON.parse(window.sessionStorage.getItem('Combo'))

      data.currPage = route.query.currPage
    })
    // 图片替换
    const handleExceed = (files) => {
      upload.value.clearFiles()
      const file = files[0]
      file.uid = genFileId()
      upload.value.handleStart(file)
    }
    // 手动上传图片
    const submitUpload = () => {
      upload.value.submit()
    }

    //实现图上添加
    const submitForm = (Combo) => {
      axios.post('/admin/updateCombo', Combo).then((res) => {
        if (res.data === 'ok') {
          alert('修改成功！')
          router.push('/admin/showCombo?currPage=' + data.currPage)
        } else {
          alert('修改失败！')
        }
      })
    }
    // 所有的变量和方法，需要在return返回，外界才能访问
    return {
      ...toRefs(data),
      login,
      upload,
      handleExceed,
      submitUpload,
      submitForm,
    }
  },
}
</script>
<style scoped lang="less">
.el-form {
  :deep(.el-upload) {
    .el-upload__input {
      display: none !important;
    }
  }
  .cover {
    :deep(.el-form-item__label) {
      font-weight: 700;
    }
  }
}

.panel-heading {
  font-weight: 700;
  font-size: 20px;
}
</style>
