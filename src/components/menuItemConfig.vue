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
              <a-button type="primary" html-type="submit">提交</a-button>
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
    import {menuItemQueryList} from "../api/requestManage.js";

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
            }
        },
        methods: {
            // 提交表单
            handleSubmit(e) {
                e.preventDefault();
                this.menuItemForm.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                    }
                });
            },
            // 渲染树形菜单
            renderContent(h, { node, data, store }) {
                // 当节点为自定义菜单时
                if (data.id === 'customMenuItems') {
                    return (
                        <span class="custom-tree-node">
                        <a-popover trigger="click">
                        <template slot="content">
                        <a-button on-click={()=> this.insertMenuItem()}>新增</a-button>
                        </template>
                        <span>{node.label}</span>
                        </a-popover>
                        </span>);
                }else if (data.type !== 'sys'){ //当节点为非系统菜单时
                    return (
                        <span class="custom-tree-node">
                        <a-popover trigger="click">
                        <template slot="content">
                        <p on-click={() => this.updateMenuItem(data.id)}>修改</p>
                        <p on-click={() => this.deleteMenuItem(data.id)}>删除</p>
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
            insertMenuItem() {
                alert("insert")
            },
            updateMenuItem(id) {
                alert("update: " + id)
            },
            deleteMenuItem(id) {
                alert("delete: " + id)
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