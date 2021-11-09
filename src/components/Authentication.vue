<template>
  <div class="authentication">
    <div class="auth-login">
      <div class="auth-login-title">Введите логин:</div>
      <div class="auth-login-email">
        <input type="email" v-model="login">
      </div>
    </div>
    <div class="auth-pass">
      <div class="auth-pass-title">Введите пароль:</div>
      <div class="auth-pass-password">
        <input type="password" v-model="password">
      </div>
    </div>
    <input type="button" value="Войти" class="authentication-button" @click.stop="authenticate">

  </div>
</template>

<script>
export default {
  name: "Authentication",
  data(){
    return{
      login: '',
      password: '',
    }
  },
  methods: {
    authenticate(){
      this.$store.dispatch('authenticateUser', {email: this.login, password: this.password});
    }
  }
}
</script>

<style scoped lang="scss">
  .authentication{
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 400px;
    background: #A9A9A9;
    border: 1px solid black;
    border-radius: 10px;
    &-button{
      height: 49px;
      width: 75%;
      color: white;
      margin-top: 50px;
      background: #66b1ff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .auth{
    &-login{
      width: 80%;
      margin-bottom: 60px;
      &-title{
        text-align: left;
        margin-bottom: 25px;
      }
      &-email{
        input{
          border: none;
          border-radius: 4px;
          height: 32px;
          width: 100%;
        }
        input:focus{
          outline: 3px solid black;
        }
      }
    }
    &-pass{
      width: 80%;
      &-title{
        text-align: left;
        margin-bottom: 25px;
      }
      &-password{
        input{
          border: none;
          border-radius: 4px;
          height: 32px;
          width: 100%;
        }
        input:focus{
          outline: 3px solid black;
        }
      }
    }
  }
</style>