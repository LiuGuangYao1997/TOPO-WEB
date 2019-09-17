<!--
Author: liu.guangyao
Date: 2019/9/16 14:45
-->

<template>
  <div class="menuItemConfig">
    <!-- 菜单 -->
    <div>
      <a-tabs default-active-key="1">
        <a-tab-pane tab="菜单项管理" key="1"></a-tab-pane>
      </a-tabs>
    </div>
    <div>
      <a-row>
        <a-col :span="8">
          <!-- 菜单项-树形控件 -->
          <div class="menuItemTree">
            <el-tree
                    :expand-on-click-node=false
                    defaultExpandAll
                    :data="treeData"
                    :render-content="renderContent">
            </el-tree>
          </div>
        </a-col>
        <a-col :span="16">
          <a-form :form="menuItemForm" layout="horizontal" @submit="handleSubmit">
            <a-form-item label="菜单名称" :labelCol="{span: 6}" :wrapperCol="{span: 10, offset: 1}">
              <a-input placeholder="模糊匹配" v-decorator="['name']"></a-input>
            </a-form-item>
            <a-form-item label="菜单编码" :labelCol="{span: 6}" :wrapperCol="{span: 10, offset: 1}">
              <a-input placeholder="编码" v-decorator="['code']"></a-input>
            </a-form-item>
            <a-form-item label="URL" :labelCol="{span: 6}" :wrapperCol="{span: 10, offset: 1}">
              <a-input placeholder="http://xxxxx" v-decorator="['url']"></a-input>
            </a-form-item>
            <a-form-item label="打开方式" :labelCol="{span: 6}" :wrapperCol="{span: 10, offset: 1}">
              <a-input placeholder="弹窗/新窗口/二次开发" v-decorator="['exeType']"></a-input>
            </a-form-item>
            <a-form-item label="弹窗高" :labelCol="{span: 6}" :wrapperCol="{span: 10, offset: 1}">
              <a-input v-decorator="['winHeight']"></a-input>
            </a-form-item>
            <a-form-item label="弹窗宽" :labelCol="{span: 6}" :wrapperCol="{span: 10, offset: 1}">
              <a-input v-decorator="['winWidth']"></a-input>
            </a-form-item>
            <a-form-item :wrapperCol="{span: 10, offset: 8}">
              <a-button type="primary" html-type="submit">保存</a-button>
              <a-button html-type="reset">重置</a-button>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </div>

    <div></div>
  </div>
</template>
<script>
    import ARow from "ant-design-vue/es/grid/Row";
    import ACol from "ant-design-vue/es/grid/Col";
    import AFormItem from "ant-design-vue/es/form/FormItem";
    import {menuItemQueryList, menuItemInsert, menuItemDelete, menuItemUpdate} from "../api/requestManage.js";

    const customTreeData = [];
    const sysTreeData = [];
    const treeData = [{id: 'customMenuItems', label: '自定义菜单项', children: customTreeData},
        {id: 'sysMenuItems', label: '系统菜单', children: sysTreeData}
    ];
    export default {
        name: "menuItemConfig",
        components: {AFormItem, ACol, ARow},
        created() {
            menuItemQueryList({page: 1, perpage: 100}).then(res => {
                for (let item of res.data.data.content) {
                    let menuItem = {id: item.id, label: item.name, type: item.type};
                    if (item.type === 'sys') {
                        sysTreeData.push(menuItem);
                    } else {
                        customTreeData.push(menuItem);
                    }
                }
            })
        },
        data() {
            return {
                treeData,
                menuItemForm: this.$form.createForm(this),
                selectMenuItemId:null
            }
        },
        methods: {
            //重新加载树形菜单内容
            getMenuItemTree(){
                menuItemQueryList({page: 1, perpage: 100}).then(res => {
                    customTreeData.length=0;
                    for (let item of res.data.data.content) {
                        let menuItem = {id: item.id, label: item.name, type: item.type};
                        if (item.type !== 'sys') {
                            customTreeData.push(menuItem);
                        }
                    }
                })
            },
            // 渲染树形菜单
            renderContent(h, { node, data, store }) {
                // 当节点为自定义菜单时
                if (data.id === 'customMenuItems') {
                    return (
                        <span class="custom-tree-node">
                        <a-popover trigger="hover">
                        <template slot="content">
                        <a-button size="small" on-click={()=> this.insertMenuItem()}>新增</a-button>
                        </template>
                        <span>{node.label}</span>
                        </a-popover>
                        </span>);
                }else if (data.type !== 'sys'){ //当节点为非系统菜单时
                    return (
                        <span class="custom-tree-node">
                        <a-popover trigger="hover">
                        <template slot="content">
                          <a-row>
                            <a-button size="small" on-click={() => this.updateMenuItem(data.id)}>修改</a-button>
                          </a-row>
                          <a-row>
                            <a-button size="small" on-click={() => this.deleteMenuItem(data.id, data.label)}>删除</a-button>
                          </a-row>
                        </template>
                        <span>{node.label}</span>
                        </a-popover>
                        </span>);
                }else { //当节点为系统菜单时
                    return (
                        <span class="custom-tree-node">
                        <span>{node.label}</span>
                        </span>);
                }
            },
            // 当点击新增按钮时,清空表单,清空selectMenuItemId的值
            insertMenuItem() {
                this.menuItemForm.resetFields();
                this.selectMenuItemId = null;
            },
            // 提交表单
            handleSubmit(e) {
                e.preventDefault();
                this.menuItemForm.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                        if (this.selectMenuItemId == null){
                            menuItemInsert(values).then((res) => {
                                if (res.data.code != 0){
                                    this.$message.error(res.data.desc);
                                }else {
                                    this.$message.success(res.data.desc);
                                    this.menuItemForm.resetFields();
                                    this.getMenuItemTree();
                                }
                            });
                        }
                    }
                });
            },
            updateMenuItem(id) {
                alert("update: " + id)
            },
            deleteMenuItem(id, label) {
                this.$confirm("菜单项Id: " + id + ",  菜单项名: " + label, '确定要删除菜单项?', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    menuItemDelete({id: id}).then(res => {
                        if(res.data.code === 0){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getMenuItemTree();
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
        },
    }
</script>

<style scoped>
  .menuItemConfig {
    background-color: white;
    width: 100%;
    height: 100%;
    border: 1px solid rgba(169, 169, 169, 0.25);
    padding: 20px;
  }
</style>