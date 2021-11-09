<template>
  <div class="profile-page">
    <div class="profile-container">
      <div class="profile-header">Профиль</div>
      <div class="profile-name">
        <div class="profile-name-title">Ваше имя</div>
        <input type="text" v-model="currentUser.name">
      </div>
      <div class="profile-contacts">
        <div class="profile-contacts-email">
          <div>Email</div>
          <input type="email" disabled v-model="currentUser.email">
        </div>
        <div class="profile-contacts-phone">
          <div>Телефон</div>
          <input type="text" v-model="currentUser.phone">
        </div>
      </div>
      <div class="profile-info">
        <div class="profile-info-city">
          <div>Город</div>
          <input type="text" v-model="currentUser.city">
        </div>
        <div class="profile-info-birthday">
          <div>Год рождения</div>
          <input type="text" maxlength="4" v-model="currentUser.birthday" @input="checkNumber(currentUser.birthday)">
        </div>
      </div>
      <div class="profile-task">
        <div>Тип задания</div>
        <input type="text" :value="currentUser.type === 'front' ? 'Frontend' : 'Backend'" disabled>
      </div>
      <div class="profile-git">
        <div>Ссылка на проект github</div>
        <input type="text" v-model="currentUser.github">
      </div>
      <div class="profile-about">
        <div>Дополнительно</div>
        <textarea v-model="currentUser.about"></textarea>
      </div>
      <div class="profile-buttons">
        <div class="profile-buttons-save" @click.stop="saveProfile">Сохранить</div>
        <div class="profile-buttons-exit" @click.stop="exitProfile">Выйти</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyProfile",
  data() {
    return {}
  },
  computed: {
    currentUser() {
      let user = JSON.parse(JSON.stringify(this.user));
      user.birthday = new Date(user.birthday).getFullYear();
      return user
    },

    user: {
      get() {
        return this.$store.getters.CURRENTUSER;
      },
    }
  },
  methods: {
    exitProfile() {
      localStorage.removeItem('token');
      this.$router.push('/');
    },
    saveProfile() {
      this.$store.dispatch('saveProfile', this.currentUser);
    },
  },
}
</script>

<style scoped lang="scss">
.profile {
  &-header {
    text-align: center;
    font-size: 26px;
    font-weight: bold;
  }

  &-page {
    display: flex;
    justify-content: center;
    padding-top: 50px;
    width: 100%;
    height: 100%;
  }

  &-container {
    width: 40%;
    height: 100%;
    text-align: left;
  }

  &-name {
    margin-top: 20px;

    &-title {

    }

    input {
      padding-left: 10px;
      margin-top: 10px;
      width: 100%;
      height: 40px;
      box-sizing: border-box;
    }
  }

  &-contacts {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;

    &-email {
      width: 40%;

      input {
        cursor: not-allowed;
      }
    }

    &-phone {
      width: 40%;
    }

    input {
      padding-left: 10px;
      margin-top: 10px;
      width: 100%;
      height: 40px;
      box-sizing: border-box;
    }
  }

  &-info {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;

    &-city {
      width: 40%;
    }

    &-birthday {
      width: 40%;
    }

    input {
      padding-left: 10px;
      margin-top: 10px;
      width: 100%;
      height: 40px;
      box-sizing: border-box;
    }
  }

  &-task {
    margin-top: 20px;

    input {
      cursor: not-allowed;
      padding-left: 10px;
      margin-top: 10px;
      width: 100%;
      height: 40px;
      box-sizing: border-box;
    }
  }

  &-git {
    margin-top: 20px;

    input {
      padding-left: 10px;
      margin-top: 10px;
      width: 100%;
      height: 40px;
      box-sizing: border-box;
    }
  }

  &-about {
    margin-top: 20px;

    textarea {
      padding-top: 10px;
      padding-left: 10px;
      margin-top: 10px;
      width: 100%;
      height: 120px;
      box-sizing: border-box;
    }
  }

  &-buttons {
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;

    &-save {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 112px;
      height: 40px;
      border-radius: 4px;
      background: #42b983;
      color: white;
      cursor: pointer;
    }

    &-exit {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 112px;
      height: 40px;
      border-radius: 4px;
      background: tomato;
      color: white;
      cursor: pointer;
    }
  }
}
</style>