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
      <a-form-item label="节点名称">
        <a-input v-model="tableAttribute.name" placeholder="模糊匹配"></a-input>
      </a-form-item>
      <a-form-item label="节点编码">
        <a-input v-model="tableAttribute.code" placeholder="模糊匹配"></a-input>
      </a-form-item>
      <a-form-item label="节点类型">
        <a-input v-model="tableAttribute.type" placeholder="默认节点/交换机/路由器......"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button @click="queryNodePage" class="formOptBut"><span class="formOptSpan">查询</span></a-button>
      </a-form-item>
      <a-form-item>
        <a-button @click="resetQuery" class="formOptBut"><span class="formOptSpan">重置</span></a-button>
      </a-form-item>
      <a-form-item>
        <a-button class="formOptBut" @click="openInsertView"><span class="formOptSpan">新增</span></a-button>
      </a-form-item>
    </a-form>

    <!-- 新增的浮窗及表单 -->
    <!-- TODO: 设置表单的格式,单元框对齐 -->
    <a-modal title="节点配置" width="600px"
             :visible="visible" @ok="insertNodeSubmit"
             okText="确定"
             cancelText="取消"
             :confirmLoading="confirmLoading"
             @cancel="closeInsertView">
      <a-form layout="inline" :form="insertNodeForm">
        <a-form-item label="节点名称">
          <a-input
                  v-decorator="['name', {rules: [{ required: true, message: '请输入节点名称!' }]}]"
                  placeholder="用户输入"></a-input>
        </a-form-item>
        <a-form-item label="节点类型">
          <a-input
                  v-decorator="['type', {rules: [{ required: true, message: '请输入节点类型!' }]}]"
                  placeholder="默认/交换机/路由器"></a-input>
        </a-form-item>
        <a-form-item label="图标">
          <a-input
                  v-decorator="['iconUrl', {rules: [{ required: true, message: '请输入节点图标地址!' }]}]"
                  placeholder="图标选择或上传"></a-input>
        </a-form-item>
        <a-form-item label="图标大小">
          <a-input
                  v-decorator="['nodeImgSize']"
                  placeholder="64*64"></a-input>
        </a-form-item>
        <a-form-item label="字体大小">
          <a-input
                  v-decorator="['fontSize']"
                  placeholder="14"></a-input>
        </a-form-item>
        <a-form-item label="字体颜色">
          <a-input
                  v-decorator="['fontColor']"
                  placeholder="颜色选择"></a-input>
        </a-form-item>
        <a-form-item label="互斥组">
          <a-input
                  v-decorator="['mutex']"
                  placeholder=""></a-input>
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
        <template slot-scope="optScope">
          <a class="tableOpt">详情</a>
          <a class="tableOpt">修改</a>
          <a @click.prevent="doNodeDelete(optScope.row)" class="tableOpt">删除</a>
          <a class="tableOpt">打标签</a>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="节点名称"></el-table-column>
      <el-table-column prop="label" label="标签" width="100"></el-table-column>
      <el-table-column prop="code" label="节点编码"></el-table-column>
      <el-table-column prop="type" label="节点类型"></el-table-column>
      <el-table-column prop="iconUrl" label="图标"></el-table-column>
      <el-table-column prop="size" label="大小"></el-table-column>
      <el-table-column prop="mutex" label="所属互斥组"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
    </el-table>
    <el-pagination
            style="padding-top: 20px"
            background
            :page-size="tableAttribute.pageSize"
            :total="tableAttribute.total"
            :current-page="tableAttribute.currentPage"
            @current-change="handleCurrentChange"
            layout="prev, pager, next, total, jumper">
    </el-pagination>
  </div>
</template>

<script>

    import AFormItem from "ant-design-vue/es/form/FormItem";
    import {nodeInsert, nodeQueryList, nodeDelete} from "../api/requestManage.js";

    export default {
        name: "nodeConfig",
        components: {AFormItem},
        data() {
            return {
                tableData: [],
                tableAttribute: {pageSize: 5, currentPage: 1, total: 10, name: null, code: null, type: null, sort: null, filed: null,},
                optFlag: null,
                visible: false,
                confirmLoading: false,
                insertNodeForm: this.$form.createForm(this),
            }
        },
        created() {
            // 当页面加载时获取表格数据
            nodeQueryList({page: 1, perpage: this.tableAttribute.pageSize,}).then(res => {
                this.tableData = res.data.data.content;
                this.tableAttribute.total = res.data.data.totalElements;
            });
        },
        methods: {
            openInsertView() {
                this.visible = true;
            },
            closeInsertView() {
                this.visible = false;
            },
            // 提交新增节点表单
            insertNodeSubmit() {
                this.insertNodeForm.validateFields((err, values) => {
                    if (!err) {
                        nodeInsert(values).then((res) => {
                            this.closeInsertView();
                            this.$message.success(res.data.desc);
                            this.insertNodeForm.resetFields();
                            this.queryNodePage();
                        });
                    }
                });
            },
            // 重置查询条件
            resetQuery() {
                this.tableAttribute.name = null;
                this.tableAttribute.code = null;
                this.tableAttribute.type = null;
                this.queryNodePage();
            },
            // 点击查询按钮或分页按钮的方法
            queryNodePage() {
                nodeQueryList({
                    page: this.tableAttribute.currentPage, // 页码
                    perpage: this.tableAttribute.pageSize, // 页面容量
                    sort: this.tableAttribute.sort, // 排序方式(desc/asc)
                    filed: this.tableAttribute.filed, // 排序字段名
                    name: this.tableAttribute.name, // 节点名,查询
                    code: this.tableAttribute.code, // 节点编码,查询
                    type: this.tableAttribute.type // 节点类型,查询
                }).then(res => {
                    this.tableData = res.data.data.content;
                    this.tableAttribute.total = res.data.data.totalElements;
                });
            },
            // 处理选择的页码
            handleCurrentChange(val) {
                this.tableAttribute.currentPage = val;
                this.queryNodePage();
            },
            // 删除节点的方法
            doNodeDelete(row) {
                this.$confirm("节点Id: " + row.id + ",  节点名: " + row.name, '确定要删除节点?', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    nodeDelete({id: row.id}).then(res => this.queryNodePage());
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
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