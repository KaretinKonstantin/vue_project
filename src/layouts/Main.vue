<template>
  <div id="main-layout">
    <div class="navbar">
      <div class="navbar-links">
        <router-link class="navbar-links-item" to="/">Главная</router-link>
        <router-link class="navbar-links-item" to="/my-profile">Профиль</router-link>
      </div>
    </div>
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  background: rgb(51, 51, 51);
  &-links{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 75%;
    height: 100%;
    font-size: 18px;
    font-weight: bold;
    &-item{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100px;
      height: 100%;
      text-decoration: none;
      color: #fff;
      box-sizing: border-box;
      &:hover{
        background: rgb(41, 41, 41);
      }
    }
  }
}

.router-link-exact-active{
  color: gold;
  border-bottom: 2px solid gold;
  background: rgb(41, 41, 41);
  padding-bottom: 1px;
}
</style>