<!--
Author: liu.guangyao
Date: 2019/9/10 09:00
-->

<template>
  <div style="padding: 50px">
    <div>
      <a-button @click="open('/nodeConfig')">节点配置</a-button>
      <a-button @click="open('/lineConfig')">连线配置</a-button>
      <a-button @click="open('/menuItemConfig')">菜单项配置</a-button>
      <a-button @click="open('/menuConfig')">菜单配置</a-button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

    export default {
        methods:{
            open(page){
                this.$router.push(page);
            }
        }
    }
</script>

<style scoped>

</style>
