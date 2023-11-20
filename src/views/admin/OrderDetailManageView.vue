<template>
  <div>
    <div  style="width: 90vw; margin: auto;">
      <div >订单详情</div>
      {{}}
      <div class="panel-body">
        <el-table
            :data="OrderDetailList"
            @selection-change="handleSelectionChange"
            table-layout="auto"
            :header-cell-style="{

            textAlign: 'center',
          }"
            :cell-style="{ textAlign: 'center' }">

          <el-table-column type="index" label="序号" width="80" />
          <el-table-column label="景点名称" prop="sname" />
          <el-table-column label="数量" prop="num"/>
        </el-table>

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
  name: "OrderDetail",
  components: {
    headView,
  },
  setup() {
    // 定义数据
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const data = reactive({
      OrderDetailList: [],
      user: {},
      oid:route.query.oid,
      totalPrice: 0,
      totalNum: 0,
      OrderDetailChoise: [],
      OrderDetailData:[]
    });

    // 初始化
    onMounted(() => {

      axios
          .get("/shop/getOrderDetailByOid?oid=" + data.oid)
          .then((res) => {
            data.OrderDetailList = res.data.OrderDetailList;
          })
          .catch((error) => {
            console.log("error", error);
          });

    });


    // 所有的变量和方法，需要在return返回，外界才能访问
    return {
      ...toRefs(data)

    };
  },
};
</script>
<style scoped>
</style>



