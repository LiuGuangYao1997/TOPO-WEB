<template>
  <a-layout class="height-all">
    <a-layout-sider width="80px" class="height-all left-side">
      <a-menu>
        <a-menu-item class="left-side-item">PAGES</a-menu-item>
        <a-menu-item class="left-side-item">NOTES</a-menu-item>
        <a-menu-item class="left-side-item">CONSOLE</a-menu-item>
      </a-menu>
    </a-layout-sider>
  </a-layout>
</template>

<script>
    import ALayoutSider from "ant-design-vue/es/layout/Sider";
    export default {
        name: "base",
        components: {ALayoutSider}
    }
</script>

<style scoped>
  .height-all {
    height: 100%;
  }
  .left-side {
    background-color: #8f949a;
    width: 50px;
  }
  .left-side-item {
    background-color: #8f949a;
    font-size: small;
    padding-bottom: 0px;
    padding-top: 0px;
  }
</style>