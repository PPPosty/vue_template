<template>
  <div style="width: 60vw; color: black; margin: 40px auto">
    <div class="panel-heading">套餐添加</div>
    <div class="panel-body">
      <el-form ref="ruleFormRef" :model="Spot" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="套餐名:" prop="sname">
          <el-input v-model="Spot.sname" autocomplete="off" placeholder="请输入套餐名称：" />
        </el-form-item>
        <el-form-item label="套餐价格:" prop="saleprice">
          <el-input v-model="Spot.saleprice" type="number" autocomplete="off" />
        </el-form-item>
        <el-form-item class="cover" label="封面:">
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
            </template>
            <template #tip>
              <div class="el-upload__tip">jpg/png files with a size less than 500KB.</div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm(Spot)">添加</el-button>
          <el-button @click="resetForm(Spot)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, ref } from 'vue'
import axios from 'axios'
import { genFileId } from 'element-plus'
export default {
  name: 'type',
  setup() {
    const upload = ref(null)
    //页面初始化方法
    const data = reactive({
      Spot: {
        rec: 1,
      },
    })

    const login = () => {}
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
    const submitForm = (Spot) => {
      axios.post('/admin/addCombo', Spot).then((res) => {
        if (res.data === 'ok') {
          alert('添加成功！')
          data.Spot = { rec: 1 }
        } else {
          alert('添加失败！')
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
