<template>
  <div class="nodeConfig">
    <!-- 菜单 -->
    <a-menu
            mode="horizontal"
    >
      <a-menu-item>
        <label class="menu-item">节点配置</label>
      </a-menu-item>
    </a-menu>
    <!-- 表单 -->
    <a-form layout="inline">
      <a-form-item>
        <label>节点名称: </label>
      </a-form-item>
      <a-form-item>
        <a-input placeholder="模糊匹配"></a-input>
      </a-form-item>
      <a-form-item>
        <label>节点类型: </label>
      </a-form-item>
      <a-form-item>
        <a-input placeholder="模糊匹配"></a-input>
      </a-form-item>
      <a-form-item>
        <label>xx: </label>
      </a-form-item>
      <a-form-item>
        <a-select defaultValue="" >
          <a-select-option value="">监控中</a-select-option>
          <a-select-option value="">已停卡</a-select-option>
          <a-select-option value="">已删除</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button class="formOptBut" size="large">查询</a-button>
      </a-form-item>
      <a-form-item>
        <a-button class="formOptBut" size="large">重置</a-button>
      </a-form-item>
      <a-form-item>
        <a-button class="formOptBut" size="large">新增</a-button>
      </a-form-item>
    </a-form>

    <!-- 表格 -->
    <el-table
            :data="tableData"
            border
            style="width: 100%">
      <el-table-column
              prop="id"
              label="序号"
              width="180">
      </el-table-column>
      <el-table-column
              label="操作"
              width="180">
        <template slot-scope="scope">
          <a-href>详情</a-href>
          <href>修改</href>
          <href>删除</href>
          <href>打标签</href>
        </template>
      </el-table-column>
      <el-table-column
              prop="address"
              label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

    import AFormItem from "ant-design-vue/es/form/FormItem";
    export default {
        name: "nodeConfig",
        components: {AFormItem},
        data() {
            return {
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        }
    }
</script>

<style scoped>
  .nodeConfig {
    background-color: white;
    width: 60%;
    border: 2px solid darkgrey;
    padding: 20px;
  }
  .formOptBut {
    background-color: #249aff;
  }
</style>