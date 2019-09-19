<!--
Author: liu.guangyao
Date: 2019/9/18 9:55
-->

<template>
  <div class="menuConfig">
    <!-- 菜单 -->
    <div>
      <a-tabs default-active-key="1">
        <a-tab-pane tab="菜单管理" key="1"></a-tab-pane>
      </a-tabs>
    </div>
    <!-- 页面内容 -->
    <a-row>
      <a-col :span="8">
        <!-- 树形组件 -->
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
        <a-row>
          <!-- 搜索表单 -->
          <a-form layout="inline" :form="insertFrom" @submit="handleSubmit">
            <a-form-item label="菜单类型">
              <a-input disabled placeholder="空白区域/节点/连线"  v-decorator="['type']"></a-input>
            </a-form-item>
            <a-form-item label="对象分类">
              <a-select defaultValue="默认" style="width: 120px" >
                <a-select-option v-for="objClass in objClassData" :key="objClass">{{objClass}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-form>
        </a-row>
        <a-row>
          <!-- 穿梭框 -->
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
    import ARow from "ant-design-vue/es/grid/Row";
    import {getMenuTree} from "../api/requestManage.js";
    import AFormItem from "ant-design-vue/es/form/FormItem";

    export default {
        name: "menuConfig",
        components: {AFormItem, ARow},
        created() {
          getMenuTree().then(res => {
              if (res.data.code === 0) {
                  this.treeData = res.data.data;
              } else {
                  this.$message.error("加载菜单树时发生异常");
              }
          });
        },
        data () {
            return {
                treeData: [],
                insertFrom: this.$form.createForm(this),
                objClassData:['默认'],
            }
        },
        methods: {
            renderContent(h, { node, data, store }) {
                if (data.id === 'blankAreaMenu' || data.id === 'nodeRightClickMenu' || data.id === 'lineRightClickMenu') {
                    return (
                        <span class="custom-tree-node">
                        <a-popover trigger="hover">
                        <template slot="content">
                        <a-button size="small" on-click={()=> this.insertMenu(data.id)}>新增</a-button>
                    </template>
                    <span>{node.label}</span>
                    </a-popover>
                    </span>);
                } else if (data.objClass === '默认'){
                    return (
                        <span class="custom-tree-node">
                        <a-popover trigger="hover">
                        <template slot="content">
                        <a-button size="small" on-click={()=> this.insertMenuItem()}>修改</a-button>
                    </template>
                    <span>{node.label}</span>
                    </a-popover>
                    </span>);
                } else {
                    return (
                        <span class="custom-tree-node">
                        <a-popover trigger="hover">
                        <template slot="content">
                        <a-button size="small" on-click={()=> this.insertMenuItem()}>修改</a-button>
                        <a-button size="small" on-click={()=> this.insertMenuItem()}>删除</a-button>
                    </template>
                    <span>{node.label}</span>
                    </a-popover>
                    </span>);
                }
            },
            insertMenu(id){
                if (id === 'blankAreaMenu') {
                  this.insertFrom.setFieldsValue({
                      type: '空白区域菜单'
                  })
                } else if (id === 'nodeRightClickMenu') {
                    this.insertFrom.setFieldsValue({
                        type: '节点右键菜单'
                    })
                } else if (id === 'lineRightClickMenu') {
                    this.insertFrom.setFieldsValue({
                        type: '连线右键菜单'
                    })
                }
            },
            handleSubmit(){},

        }
    }
</script>

<style scoped>
  .menuConfig {
    background-color: white;
    width: 100%;
    height: 100%;
    border: 1px solid rgba(169, 169, 169, 0.25);
    padding: 20px;
  }
</style>