<template>
  <div class="all-cards-container">
    <div class="all-cards">
      <div class="user-card" v-for="(worker, workerIdx) in workersList" v-bind:key="workerIdx">
        <img :src="worker.image" alt="prof_picture">
        <div>{{ worker.name }}</div>
        <div class="user-card-profile" @click.stop="openProfile(worker.id)">Открыть профиль</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainPage",
  computed: {
    workersList: {
      get(){
        return this.$store.getters.WORKERSLIST;
      }
    }
  },
  methods: {
    openProfile(id){
      this.$store.dispatch("openProfile", id);
    },
  },
  created() {
    this.$store.dispatch("getUsersCards");
  }
}
</script>

<style scoped lang="scss">
.all-cards{
  display: flex;
  flex-wrap: wrap;
  width: 1560px;
  &-container{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
}

.user-card{
  margin-right: 20px;
  margin-bottom: 20px;
  height: 600px;
  width: 500px;
  padding: 20px;
  background: #A9A9A9;
  border: 1px solid white;
  box-sizing: border-box;
  &-profile{
    color: red;
    cursor: pointer;
  }
  img{
    width: 100%;
  }
}
</style>