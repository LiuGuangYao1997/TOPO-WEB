<!--
Author: liu.guangyao
Date: 2019/9/10 09:00
-->
<template>
  <div class="nodeConfig">
    <!-- 菜单 -->
    <a-tabs default-active-key="1">
      <a-tab-pane tab="节点配置" key="1"></a-tab-pane>
    </a-tabs>
    <!-- 表单 -->
    <a-form layout="inline" style="padding-bottom: 20px">
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
      <a-form-item style="padding-left: 50px">
        <label>xx: </label>
      </a-form-item>
      <a-form-item>
        <a-select defaultValue="1">
          <a-select-option value="1">请选择</a-select-option>
          <a-select-option value="2">监控中</a-select-option>
          <a-select-option value="3">已停卡</a-select-option>
          <a-select-option value="4">已删除</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button class="formOptBut"><span class="formOptSpan">查询</span></a-button>
      </a-form-item>
      <a-form-item>
        <a-button class="formOptBut"><span class="formOptSpan">重置</span></a-button>
      </a-form-item>
      <a-form-item>
        <a-button class="formOptBut" @click="doInsert"><span class="formOptSpan">新增</span></a-button>
      </a-form-item>
    </a-form>

    <!-- 新增的浮窗及表单 -->
    <a-modal title="节点配置" width="600px"
             :visible="visible" @ok="handleOk"
             okText="确定"
             cancelText="取消"
             :confirmLoading="confirmLoading"
             @cancel="handleCancel">
      <a-form layout="inline">
        <a-form-item label="节点名称">
          <a-input placeholder="用户输入"></a-input>
        </a-form-item>
        <a-form-item label="节点类型">
          <a-input placeholder="默认/交换机/路由器"></a-input>
        </a-form-item>
        <a-form-item label="图标">
          <a-input placeholder="图标选择或上传"></a-input>
        </a-form-item>
        <a-form-item label="图标大小">
          <a-input placeholder="64*64"></a-input>
        </a-form-item>
        <a-form-item label="字体大小">
          <a-input placeholder="14"></a-input>
        </a-form-item>
        <a-form-item label="字体颜色">
          <a-input placeholder="颜色选择"></a-input>
        </a-form-item>
        <a-form-item label="互斥组">
          <a-input placeholder=""></a-input>
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 表格 -->
    <el-table
            :data="tableData"
            size="small"
            border
            :header-cell-style="{background:'#eef1f6',color:'#606266',textAlign:'center'}"
            :cell-style="{textAlign:'center'}">
      <el-table-column prop="id" label="序号" width="50">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template>
          <a class="tableOpt">详情</a>
          <a class="tableOpt">修改</a>
          <a class="tableOpt">删除</a>
          <a class="tableOpt">打标签</a>
        </template>
      </el-table-column>
      <el-table-column
              prop="nodeName"
              label="节点名称">
      </el-table-column>
      <el-table-column
              prop="label"
              label="标签"
              width="100">
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
            style="padding-top: 20px"
            background
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
                }],
                visible: false,
                confirmLoading: false
            }
        },
        methods: {
            doInsert() {
                this.visible = true;
            },
            handleCancel() {
                this.visible = false;
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

  .formOptSpan {
    color: white;
    font-size: 13px;
  }

  a-form-item {
    padding-left: 20px;
  }

  .tableOpt {
    padding-left: 10px;
  }
</style>