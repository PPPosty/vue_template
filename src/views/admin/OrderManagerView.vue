<template>

  <div>
      {{}}
    <div>
    </div>
      <div class="panel-body">
        <el-table
          :data="OrderList"
          @selection-change="handleSelectionChange"
          table-layout="auto"
          :header-cell-style="{
            backgroundColor: '#eef5ff',
            textAlign: 'center',
          }"
          :cell-style="{ textAlign: 'center' }"
        >

          <el-table-column type="index" label="序号" width="80" />
          <el-table-column label="订单号" prop="onumber" />
          <el-table-column label="订单状态" prop="ostate" />
          <el-table-column label="日期" prop="odate" />
          <el-table-column label="总价" prop="count"/>
          <el-table-column>
            <template #header><span>操作</span> </template>
            <template #default="scope">
              <el-popconfirm
                title="确定要删除吗？"
                @confirm="handleDelete(scope.$index, scope.row.oid)">
                <template #reference>
                  <el-button size="small" type="danger">删除</el-button>
                </template>
              </el-popconfirm>
              <el-button size="small" type="danger" @click="getOrderDetail(scope.$index, scope.row.oid)">详情</el-button>
              <el-button size="small" type="danger" @click="handleUpdate(scope.$index, scope.row.oid)">审批</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div
          style="
            margin-top: 40px;
            display: flex;
            justify-content: space-around;
            flex-grow: 1;
          "
        >


        </div>
      </div>
    </div>

</template>
<script>
import headView from "@/components/HeaderView.vue";
import { reactive, toRefs, onMounted, computed, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";

import axios from "axios";
import { useStore } from "vuex"
export default {
  name: "Order",
  components: {
    headView,
  },
  setup() {
    // 定义数据
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const data = reactive({
      OrderList: [],
      user: {},
      totalPrice: 0,
      totalNum: 0,
      OrderChoise: [],
      OrderData:[]
    });

    // 初始化
    onMounted(() => {


       axios
          .get("/admin/getOrderByPage" )
          .then((res) => {
            data.OrderList = res.data.OrderList;
          })
          .catch((error) => {
            console.log("error", error);
          });

    });

    //  删除订单
    const handleDelete = (index, oid) => {

      data.OrderList.splice(index, 1);
      axios
        .get("/shop/deleteOrderByOid?oid=" + oid)
        .then((res) => {
          console.log("res", res.data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };
    //订单审批
    const  handleUpdate= (index, oid) => {

           axios.post("/admin/updateOrder?oid=" + oid)
          .then((res) => {
            router.go(0);
          })
          .catch((error) => {
            console.log("error", error);
          });
    };
    const getOrderDetail = (index, oid) => {
      // 查看详情

      router.push("/admin/showOrderDetail?oid="+oid);
    };

    // 多选

    // 所有的变量和方法，需要在return返回，外界才能访问
    return {
      ...toRefs(data),
      handleDelete,
      handleUpdate,
      getOrderDetail
    };
  },
};
</script>
<style scoped>
</style>



