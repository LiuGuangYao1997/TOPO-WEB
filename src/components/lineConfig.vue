<!--
Author: liu.guangyao
Date: 2019/9/16 9:34
-->
<template>
  <div class="lineConfig">
    <!-- 菜单 -->
    <a-tabs default-active-key="1">
      <a-tab-pane tab="连线配置" key="1"></a-tab-pane>
    </a-tabs>
    <!-- 表单 -->
    <a-form layout="inline" style="padding-bottom: 20px">
      <a-form-item label="连线名称">
        <a-input v-model="tableAttribute.name" placeholder="模糊匹配"></a-input>
      </a-form-item>
      <a-form-item label="连线类型">
        <a-input v-model="tableAttribute.type" placeholder="模糊匹配"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button @click="queryLinePage" class="formOptBut"><span class="formOptSpan">查询</span></a-button>
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
    <a-modal title="连线配置" width="600px"
             :visible="visible" @ok="insertLineSubmit"
             okText="确定"
             cancelText="取消"
             :confirmLoading="confirmLoading"
             @cancel="closeInsertView">
      <a-form layout="inline" :form="insertLineForm">
        <a-form-item label="连线名称">
          <a-input
                  v-decorator="['name', {rules: [{ required: true, message: '请输入连线名称!' }]}]"
                  placeholder="用户输入"></a-input>
        </a-form-item>
        <a-form-item label="连线类型">
          <a-input
                  v-decorator="['type', {rules: [{ required: true, message: '请输入连线类型!' }]}]"
                  placeholder="默认/链路"></a-input>
        </a-form-item>
        <a-form-item label="曲直线">
          <a-input
                  v-decorator="['straightLine']"
                  placeholder="曲线/直线/折线"></a-input>
        </a-form-item>
        <a-form-item label="虚实线">
          <a-input
                  v-decorator="['solidLine']"
                  placeholder="虚线/实线"></a-input>
        </a-form-item>
        <a-form-item label="大小">
          <a-input
                  v-decorator="['size']"
                  placeholder="14"></a-input>
        </a-form-item>
        <a-form-item label="颜色">
          <a-input
                  v-decorator="['color']"
                  placeholder="颜色选择"></a-input>
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
          <a @click.prevent="doLineDelete(optScope.row)" class="tableOpt">删除</a>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="连线名称"></el-table-column>
      <el-table-column prop="type" label="连线类型"></el-table-column>
      <el-table-column prop="straightLine" label="曲直线"></el-table-column>
      <el-table-column prop="solidLine" label="虚实线"></el-table-column>
      <el-table-column prop="size" label="大小"></el-table-column>
      <el-table-column prop="color" label="连线颜色"></el-table-column>
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
    import {lineInsert, lineQueryList, lineDelete} from "../api/requestManage.js";

    export default {
        name: "lineConfig",
        components: {AFormItem},
        data() {
            return {
                tableData: [],
                tableAttribute: {pageSize: 5, currentPage: 1, total: 10, name: null, type: null, sort: null, filed: null,},
                optFlag: null,
                visible: false,
                confirmLoading: false,
                insertLineForm: this.$form.createForm(this),
            }
        },
        created() {
            // 当页面加载时获取表格数据
            lineQueryList({page: 1, perpage: this.tableAttribute.pageSize,}).then(res => {
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
            // 提交新增表单
            insertLineSubmit() {
                this.insertLineForm.validateFields((err, values) => {
                    if (!err) {
                        lineInsert(values).then((res) => {
                            this.closeInsertView();
                            this.$message.success(res.data.desc);
                            this.insertLineForm.resetFields();
                            this.queryLinePage();
                        });
                    }
                });
            },
            // 重置查询条件
            resetQuery() {
                this.tableAttribute.name = null;
                this.tableAttribute.type = null;
                this.queryLinePage();
            },
            // 点击查询按钮或分页按钮的方法
            queryLinePage() {
                lineQueryList({
                    page: this.tableAttribute.currentPage, // 页码
                    perpage: this.tableAttribute.pageSize, // 页面容量
                    sort: this.tableAttribute.sort, // 排序方式(desc/asc)
                    filed: this.tableAttribute.filed, // 排序字段名
                    name: this.tableAttribute.name, // 连线名,查询
                    type: this.tableAttribute.type // 连线类型,查询
                }).then(res => {
                    this.tableData = res.data.data.content;
                    this.tableAttribute.total = res.data.data.totalElements;
                });
            },
            // 处理选择的页码
            handleCurrentChange(val) {
                this.tableAttribute.currentPage = val;
                this.queryLinePage();
            },
            // 删除的方法
            doLineDelete(row) {
                this.$confirm("连线Id: " + row.id + ",  连线名: " + row.name, '确定要删除连线?', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    lineDelete({id: row.id}).then(res => {
                        if(res.data.code === 0){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.queryLinePage();
                        }else {
                            this.$message({
                                type: 'error',
                                message: res.data.desc
                            });
                        }
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
  .lineConfig {
    background-color: white;
    width: 100%;
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