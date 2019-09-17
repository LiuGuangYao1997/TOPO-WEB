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
            <a-tree
                    :treeData="treeData"
            />
          </div>
        </a-col>
        <a-col :span="16">
          <a-form>
            <a-form-item></a-form-item>
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
    const treeData = [{key:'1', title:'自定义菜单项', children:customTreeData},
        {key:'2', title:'系统菜单', children:sysTreeData}
    ];
    export default {
        name: "menuItemConfig",
        components: {AFormItem, ACol, ARow},
        created () {
            menuItemQueryList({page:1, perpage:100}).then(res => {
                for (let item of res.data.data.content){
                    let menuItem = {key:item.id, title: item.name};
                    sysTreeData.push(menuItem);
                }
            })
        },
        data () {
            return {
                treeData,
            }
        },
        methods: {
            onSelect (selectedKeys, info) {
                this.selectedKeys = selectedKeys
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