<template>
  <div>
    <div class="all-cards-container">
      <div class="all-cards">
        <div class="user-card" v-for="(worker, workerIdx) in workersList" v-bind:key="workerIdx">
          <img :src="worker.image" alt="prof_picture">
          <div>{{ worker.name }}</div>
          <div class="user-card-profile" @click.stop="openProfile(worker.id)">Открыть профиль</div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <div class="pagination-item" :class="pageNumber === currentPage ? 'active' : ''"
           v-for="pageNumber in countPages"
           v-bind:key="'page'+pageNumber"
           @click.stop="openPage(pageNumber)">
        <span>{{pageNumber}}</span>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "MainPage",
  data(){
    return{
      currentPage: 1,
    }
  },
  computed: {
    workersList: {
      get(){
        return this.$store.getters.WORKERSLIST;
      }
    },
    countPages: {
      get(){
        return this.$store.getters.PAGES;
      }
    }
  },
  methods: {
    openProfile(id){
      this.$store.dispatch("openProfile", id);
    },
    openPage(pageNumber){
      if (pageNumber !== this.currentPage){
        this.currentPage = pageNumber;
        this.$store.dispatch("getUsersCards", pageNumber);
      }
    },
  },
  created() {
    this.$store.dispatch("getUsersCards", this.currentPage);
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

.pagination{
  display: flex;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  &-item{
    width: 24px;
    height: 24px;
  }
}

.active{
  background: green;
  color: white;
}
</style>