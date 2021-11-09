<template>
  <div class="profile-container">
    <div class="profile">
      <div class="profile-name"> {{ getProfileInfo.name }} </div>
      <div class="profile-info">
        <img :src="getProfileInfo.image" alt="">
        <div class="profile-info-user">
          <div class="profile-info-user-login">
            <span>Логин: </span>
            <span>{{ getProfileInfo.login }}</span>
          </div>
          <div class="profile-info-user-email">
            <span>E-mail: </span>
            <span>{{ getProfileInfo.email }}</span>
          </div>
          <div class="profile-info-user-position">
            <span>Должность: </span>
            <span>{{ getProfileInfo.worker.position }}</span>
          </div>
          <div class="profile-info-user-department">
            <span>Отдел: </span>
            <span>{{ getProfileInfo.worker.position }}</span>
          </div>
          <div class="profile-info-user-enrolled">
            <span>Зачислен: </span>
            <span>{{ getFormattedDate(getProfileInfo.worker.adopted_at) }}</span>
          </div>
          <div class="profile-info-user-about">
            <span>О себе: </span>
            <span>{{ getProfileInfo.about }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WorkerPage",
  computed:{
    getProfileInfo: {
      get(){
        return this.$store.getters.USERPROFILE;
      }
    }
  },
  methods: {
    getFormattedDate(date){
      let splittedDate = date.toString().split(' ')[0];
      return new Date(splittedDate).toLocaleDateString('ru');
    },

    getCurrentProfileData(id){
      this.$store.dispatch("getUserProfileData", id);
    }
  },
  created() {
    let currentRoute = this.$route.path;
    currentRoute = currentRoute.toString().split('/');
    let currentUserId = currentRoute[currentRoute.length - 1];
    this.getCurrentProfileData(currentUserId);
  }
}
</script>

<style scoped lang="scss">
.profile{
  margin-top: 20px;
  font-size: 16px;

  &-name{
    font-size: 18px;
    font-weight: bold;
  }

  &-container{
    width: 50%;
    height: 100%;
    margin: auto;
  }

  &-info{
    display: flex;
    justify-content: space-between;
    text-align: left;
    margin-top: 50px;
    img{
      width: 260px;
      height: 260px;
    }
    &-user{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 20px 0 20px;
      &-login{
        margin-bottom: 10px;
        span:first-child{
          font-weight: bold;
        }
      }
      &-email{
        margin-bottom: 10px;
        span:first-child{
          font-weight: bold;
        }
      }
      &-position{
        margin-bottom: 10px;
        span:first-child{
          font-weight: bold;
        }
      }
      &-department{
        margin-bottom: 10px;
        span:first-child{
          font-weight: bold;
        }
      }
      &-enrolled{
        margin-bottom: 10px;
        span:first-child{
          font-weight: bold;
        }
      }
      &-about{
        margin-bottom: 10px;
        span:first-child{
          font-weight: bold;
        }
      }
    }
  }
}
</style>