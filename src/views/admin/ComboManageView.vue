<template>
  <div>
    <el-table
      :data="ComboList"
      style="width: 100%"
      border
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ backgroundColor: '#eef5ff', textAlign: 'center' }"
    >
      <el-table-column type="index" width="60" label="序号" :index="indexMethod((currPage - 1) * 5 + 1)">
      </el-table-column>
      <el-table-column prop="sname" label="套餐名称" width="120" />
      <el-table-column label="图片" width="100">
        <template #default="scope">
          <div v-if="scope.row.spic != null">
            <img :src="require(`@/assets/uploadfile/${scope.row.spic}`)" width="80" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="saleprice" label="单价" width="80" />
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-popconfirm title="确定要删除吗？" @confirm="handleDelete(scope.$index, scope.row)">
            <template #reference>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <span v-if="currPage > 1"
        ><button @click="getPre" class="btn btn-primary" round style="margin-right: 16px">上一页</button></span
      >
      <span v-if="hasNext == 'yes'"><button @click="getNext" class="btn btn-primary" round>下一页</button></span>
    </div>
  </div>
</template>
<script>
import router from '@/router'
import axios from 'axios'
import { onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'type',
  setup() {
    //页面初始化方法
    const route = useRoute()
    const data = reactive({
      ComboList: [],
      currPage: 1,
      hasNext: '',
      ComboMulti: [],
    })

    // 初始化获得景点信息
    onMounted(() => {
      if (route.query.currPage != null) {
        data.currPage = route.query.currPage
      } else {
        console.log('B')
      }
      axios.get('/admin/getComboByPage?currPage=' + data.currPage).then((res) => {
        data.ComboList = res.data.ComboList
        data.hasNext = res.data.hasNext
      })
    })
    //上一页
    const getPre = () => {
      data.currPage = data.currPage - 1
      axios.get('/admin/getComboByPage?currPage=' + data.currPage).then((res) => {
        data.ComboList = res.data.ComboList
        data.hasNext = res.data.hasNext
      })
    }
    //下一页
    const getNext = () => {
      data.currPage = data.currPage + 1
      axios.get('/admin/getComboByPage?currPage=' + data.currPage).then((res) => {
        data.ComboList = res.data.ComboList
        data.hasNext = res.data.hasNext
      })
    }
    //设置序号
    const indexMethod = (index) => {
      return index
    }
    //  实现删除
    const handleDelete = (index, row) => {
      console.log('删除', index, row)
      axios.get('/admin/deleteComboByID?sid=' + row.sid).then((res) => {
        if (res.data === 'ok') {
          alert('删除成功！')
          //********刷新页面********************************* */
          axios.get('/admin/getComboByPage?currPage=' + data.currPage).then((res) => {
            data.ComboList = res.data.ComboList
            data.hasNext = res.data.hasNext
          })
          //************************************************** */
        } else {
          alert('删除失败！')
        }
      })
    }
    // 实现多选
    const handleSelectionChange = (val) => {
      console.log('多选', val)
      data.ComboMulti = val
    }

    //  实现批量删除
    const handMultiDelete = () => {
      axios.post('/admin/deleteComboMulti', data.ComboMulti).then((res) => {
        if (res.data === 'ok') {
          alert('删除成功！')
          //********刷新页面********************************* */
          axios.get('/admin/getComboByPage?currPage=' + data.currPage).then((res) => {
            data.ComboList = res.data.ComboList
            data.hasNext = res.data.hasNext
          })
          //************************************************** */
        } else {
          alert('删除失败！')
        }
      })
    }
    // 实现修页面跳转
    const handleEdit = (index, row) => {
      window.sessionStorage.setItem('Combo', JSON.stringify(row))
      router.push('/admin/updateCombo?currPage=' + data.currPage)
    }
    const login = () => {}

    // 所有的变量和方法，需要在return返回，外界才能访问
    return {
      ...toRefs(data),
      login,
      getNext,
      getPre,
      indexMethod,
      handleDelete,
      handleSelectionChange,
      handMultiDelete,
      handleEdit,
    }
  },
}
</script>
<style scoped></style>
