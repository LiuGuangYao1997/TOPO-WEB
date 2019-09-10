<template>
  <div class="nodeConfig">
    <!-- 菜单 -->
    <a-tabs default-active-key="1">
      <a-tab-pane tab="节点配置" key="1"></a-tab-pane>
    </a-tabs>
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
        <a-select defaultValue="1" >
          <a-select-option value="1">请选择</a-select-option>
          <a-select-option value="2">监控中</a-select-option>
          <a-select-option value="3">已停卡</a-select-option>
          <a-select-option value="4">已删除</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button class="formOptBut">查询</a-button>
      </a-form-item>
      <a-form-item>
        <a-button class="formOptBut">重置</a-button>
      </a-form-item>
      <a-form-item>
        <a-button class="formOptBut">新增</a-button>
      </a-form-item>
    </a-form>

    <!-- 表格 -->
    <el-table
            :data="tableData"
            border
    >
      <el-table-column
              prop="id"
              label="序号"
              width="50">
      </el-table-column>
      <el-table-column
              label="操作"
              width="160">
        <template slot-scope="scope">
          <a>详情</a>
          <a>修改</a>
          <a>删除</a>
          <a>打标签</a>
        </template>
      </el-table-column>
      <el-table-column
              prop="nodeName"
              label="节点名称">
      </el-table-column>
      <el-table-column
              prop="label"
              label="标签">
      </el-table-column>
      <el-table-column
              prop="nodeCode"
              label="节点编码">
      </el-table-column>
      <el-table-column
              prop="nodeType"
              label="节点类型">
      </el-table-column>
      <el-table-column
              prop="img"
              label="图标">
      </el-table-column>
      <el-table-column
              prop="size"
              label="大小">
      </el-table-column>
      <el-table-column
              prop="mutualExclusionGroup"
              label="所属互斥组">
      </el-table-column>
      <el-table-column
              prop="createTime"
              label="创建时间">
      </el-table-column>
    </el-table>
    <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
    </el-pagination>
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
                    id: '1',
                    nodeName: '默认节点',
                    label: '无',
                    nodeCode: 'BASENODE',
                    nodeType: '默认节点',
                    img: '',
                    size: '64*64',
                    mutualExclusionGroup: '',
                    createTime: '2019-03-26 09:00:01'
                }, {
                    id: '2',
                    nodeName: '华为交换机',
                    label: '华为',
                    nodeCode: 'HWSWITCHNODE',
                    nodeType: '交换机',
                    img: '',
                    size: '32*32',
                    mutualExclusionGroup: '华为云',
                    createTime: '2019-03-26 09:00:01'
                }]
            }
        }
    }
</script>

<style scoped>
  .nodeConfig {
    background-color: white;
    width: 85%;
    height: 100%;
    border: 1px solid rgba(169, 169, 169, 0.25);
    padding: 20px;
  }
  .formOptBut {
    background-color: rgba(22, 155, 213, 1);
  }
</style>