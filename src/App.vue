<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>

    export default {
        name: "App",
        data() {
            return {}
        }
    }
</script>

<style>
  body{
    overflow: hidden;
  }
  #app {
    height: 100%;
  }
</style>
