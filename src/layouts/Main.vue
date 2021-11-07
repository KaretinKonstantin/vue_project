<template>
  <div id="main-layout">
    <div class="navbar"></div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Main"
}
</script>

<style scoped lang="scss">
#main-layout {
  width: 100%;
  height: 100%;
}

.navbar{
  height: 60px;
  background: rgb(51, 51, 51);
}
</style>