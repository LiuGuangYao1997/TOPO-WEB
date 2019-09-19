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
              <a-select style="width: 120px" v-decorator="['objClass']">
                <a-select-option v-for="objClass in objClassData" :key="objClass">{{objClass}}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit">保存</a-button>
            </a-form-item>
          </a-form>
        </a-row>
        <a-row>
          <!-- 穿梭框 -->
          <a-transfer
            :dataSource="menuItemList"
            :targetKeys="selectMenuItemList"
            :render="item=>item.title"
            @change="handleChange"
            :listStyle="{width:'300px', height: '400px'}"
          ></a-transfer>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
    import ARow from "ant-design-vue/es/grid/Row";
    import {
        getMenuTree,
        getNodeTypeList,
        getLineTypeList,
        deleteMenuConfig,
        getMenuItemMapList,
        getMenuItemsByMenuId,
        delMenuRelation,
        saveMenuRelation,
    } from "../api/requestManage.js";
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
          getMenuItemMapList().then(res => {
              if (res.data.code === 0) {
                  this.menuItemList = res.data.data;
              } else {
                  this.$message.error("加载菜单项列表时发生异常");
              }
          });
        },
        data () {
            return {
                treeData: [],
                insertFrom: this.$form.createForm(this),
                objClassData:[],
                menuItemList: [],
                selectMenuItemList:[],
                selectMenuId:null,
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
                        <a-button size="small" on-click={()=> this.getSelectMenuItem(data.id)}>修改</a-button>
                    </template>
                    <span>{node.label}</span>
                    </a-popover>
                    </span>);
                } else {
                    return (
                        <span class="custom-tree-node">
                        <a-popover trigger="hover">
                        <template slot="content">
                        <a-button size="small" on-click={()=> this.getSelectMenuItem(data.id)}>修改</a-button>
                        <a-button size="small" on-click={()=> this.deleteMenu(data.id, data.label)}>删除</a-button>
                    </template>
                    <span>{node.label}</span>
                    </a-popover>
                    </span>);
                }
            },
            insertMenu(id){
                if (id === 'blankAreaMenu') {
                  this.insertFrom.setFieldsValue({type: '空白区域菜单', objClass: ''});
                  this.objClassData= ['默认'];
                } else if (id === 'nodeRightClickMenu') {
                    this.insertFrom.setFieldsValue({type: '节点右键菜单', objClass: ''});
                    getNodeTypeList().then(res => {
                        if (res.data.code != 0){
                            this.$message.error(res.data.desc);
                        } else {
                            this.objClassData = res.data.data;
                        }
                    });
                } else if (id === 'lineRightClickMenu') {
                    this.insertFrom.setFieldsValue({type: '连线右键菜单', objClass: ''});
                    getLineTypeList().then(res => {
                        if (res.data.code != 0){
                            this.$message.error(res.data.desc);
                        } else {
                            this.objClassData = res.data.data;
                        }
                    });
                }
            },
            refreshMenuTree() {
                getMenuTree().then(res => {
                    if (res.data.code === 0) {
                        this.treeData = res.data.data;
                    } else {
                        this.$message.error(res.data.desc);
                    }
                });
            },
            deleteMenu(id, label) {
                this.$confirm("菜单Id: " + id + ",  菜单名: " + label, '确定要删除菜单?', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteMenuConfig({id: id}).then(res => {
                        if(res.data.code === 0){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.refreshMenuTree();
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
            getSelectMenuItem(id) {
              getMenuItemsByMenuId({id: id}).then(res =>{
                  if (res.data.code === 0) {
                      this.selectMenuItemList = res.data.data;
                      this.selectMenuId = id;
                  } else {
                      this.$message.error(res.data.desc);
                  }
              });
            },
            handleChange(targetKeys, direction, moveKeys) {
                let menuId = this.selectMenuId;
                let menuItemId = moveKeys;
                let index = targetKeys.length;
                // 将移动的菜单项增加/删除
                if (direction === 'left'){
                    //执行删除操作
                    delMenuRelation({menuId: menuId, menuItemId: menuItemId}).then(res => {
                        if (res.data.code === 0) {
                            this.$message.success(res.data.desc);
                            this.selectMenuItemList = targetKeys;
                        } else {
                            this.$message.error(res.data.desc);
                        }
                    })
                } else if (direction === 'right'){
                    //执行新增操作
                    saveMenuRelation({menuId: menuId, menuItemId: menuItemId, index: index}).then(res => {
                        if (res.data.code === 0) {
                            this.$message.success(res.data.desc);
                            this.selectMenuItemList = targetKeys;
                        } else {
                            this.$message.error(res.data.desc);
                        }
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