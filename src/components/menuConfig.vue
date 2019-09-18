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
      <a-col>
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
      <a-col>
        <a-row>
          <!-- 搜索表单 -->
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
    export default {
        name: "menuConfig",
        components: {ARow},
        created() {

        },
        data () {
            return {
                treeData: [],
            }
        },
        methods: {
            renderContent(){

            },

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