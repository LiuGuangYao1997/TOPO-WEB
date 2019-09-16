<!--
Author: liu.guangyao
Date: 2019/9/16 14:45
-->

<template>
  <div class="menuItemConfig">
    <!-- 菜单 -->
    <a-tabs default-active-key="1">
      <a-tab-pane tab="菜单项管理" key="1"></a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
    export default {
        name: "menuItemConfig"
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