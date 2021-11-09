<template>
  <div>
    <div class="all-cards-container">
      <div class="all-cards">
        <div class="user-card" v-for="(worker, workerIdx) in workersList" v-bind:key="workerIdx">
          <img :src="worker.image" alt="prof_picture">
          <div class="user-card-profile-name">{{ worker.name }}</div>
          <span class="user-card-profile" @click.stop="openProfile(worker.id)">Открыть профиль</span>
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
  width: 50%;
  padding-top: 50px;
  grid-gap: 20px;
  &-container{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
}

.user-card{
  display: flex;
  flex-direction: column;
  height: 400px;
  width: 300px;
  padding: 20px;
  background: #E6E6E6;
  box-sizing: border-box;
  color: #303133;
  box-shadow: 8px 5px 5px #E6E6E6;
  span{
    margin-top: 24px;
  }
  &-profile{
    color: #409eff;;
    cursor: pointer;
    &-name{
      text-align: left;
      padding-top: 20px;
      word-break: break-word;
    }
    &:hover{
      color: #66b1ff;
    }
  }
  img{
    width: 100%;
  }
}

.pagination{
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
  height: 40px;
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