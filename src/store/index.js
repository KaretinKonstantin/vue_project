import Vue from 'vue'
import Vuex from 'vuex'
import router from "../router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
    AUTHENTICATEUSER(state, res){
      localStorage.setItem('token', res.token);
      router.push({path: '/'});
    }
  },
  actions: {
    async authenticateUser({commit}, payload){
      try {
        let loginData = {
          email: payload.email,
          password: payload.password,
        }
        const req = await fetch('http://test.atwinta.ru/api/v1/auth/login',{
          method: 'POST',
          mode: 'cors',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginData)
        });
        const responseData = await req.json();
        if (req.status === 200){
          commit('AUTHENTICATEUSER', responseData);
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
})
