<template>
  <div style="width: 60vw; margin: 40px auto">
    <div class="panel-heading">景点类型添加</div>
    <div class="panel-body">
      <el-form ref="ruleFormRef" :model="Type" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="景点类型名:" prop="tname">
          <el-input v-model="Type.tname" autocomplete="off" />
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="submitForm(Type)">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive, toRefs, ref } from 'vue'
import axios from 'axios'
import { genFileId } from 'element-plus'
export default {
  name: 'typeadd',
  setup() {
    const data = reactive({
      Type: {},
    })

    //实现图上添加
    const submitForm = (Type) => {
      axios.post('/admin/addType', Type).then((res) => {
        if (res.data === 'ok') {
          alert('添加成功！')
          data.Type = { rec: 1 }
        } else {
          alert('添加失败！')
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
