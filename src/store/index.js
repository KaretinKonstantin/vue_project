import Vue from 'vue'
import Vuex from 'vuex'
import router from "../router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    workers: {},
    chosenUserProfile: {
      about: "",
      birthday: null,
      city: null,
      email: "",
      github: null,
      id: null,
      image: "",
      is_finished: 0,
      login: "",
      name: "",
      phone: null,
      telegram: null,
      type: null,
      worker: {
        department: "",
        position: "",
        adopted_at: "",
      }
    },
    user: {
      id: 0,
      login: "",
      name: "",
      email: "",
      about: "",
      type: "",
      github: "",
      city: "",
      phone: "",
      birthday: ""
    },
    pages: 0,
  },

  mutations: {

    /**
     * Метод аутентификации пользователя(записывает токен в локалстор) и переход на главную страницу
     * @param state
     * @param res
     */
    AUTHENTICATEUSER(state, res){
      localStorage.setItem('token', res.token);
      state.user = res.user;
      router.push({path: '/'});
    },

    /**
     * Метод записи данных всех сотрудников
     * @param state
     * @param res
     */
    WORKERSLIST(state, res){
      state.pages = res.last_page;
      state.workers = res.data;
    },

    /**
     * Метод записи данных сотрудника, чью карточку открываем
     * @param state
     * @param res
     */
    CHANGEUSERPROFILEDATA(state, res){
      state.chosenUserProfile = res;
    },

    /**
     * Метод записи данных текущего пользователя
     * @param state
     * @param res
     */
    SETCURRENTUSER(state, res){
      state.user = res;
    },

    /**
     * Метод открытия карточки сотрудника
     * @param state
     * @param id
     */
    OPENPROFILE(state, id){
      router.push({path: `/profile/${id}`});
    },

  },

  actions: {
    /**
     * Отправка запроса на аутентификацию
     * @param commit
     * @param user
     */
    async saveProfile({commit}, user){
      try {
        const req = await fetch('http://test.atwinta.ru/api/v1/user',{
          method: 'POST',
          mode: 'cors',
          credentials: 'same-origin',
          headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
          body: JSON.stringify({
            "show_name": user.name,
            "about": user.about,
            "github": user.github,
            "city": user.city,
            "is_finished": user.is_finished,
            "telegram": user.telegram,
            "phone": user.phone,
            "birthday": user.birthday.toString()
          })
        });

        const responseData = await req.json();
        console.log('responseData', responseData);
        if (req.status === 200){
          commit('SETCURRENTUSER', responseData);
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Отправка запроса на аутентификацию
     * @param commit
     * @param payload
     */
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
    },

    /**
     * Отправка запроса на получение данных о всех сотрудниках
     * @param commit
     */
    async getUsersCards({commit}, page){
      try {
        const req = await fetch(`http://test.atwinta.ru/api/v1/workers?page=${page}&per_page=12`,{
          method: 'GET',
          mode: 'cors',
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
        });
        const responseData = await req.json();
        if (req.status === 200){
          commit('WORKERSLIST', responseData);
        }

      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Отправка запроса на получение данных сотрудника
     * @param commit
     * @param id - id сотрудника,чью карточку открываем
     */
    async getUserProfileData({commit}, id){
      try {
        const req = await fetch(`http://test.atwinta.ru/api/v1/workers/${id}`,{
          method: 'GET',
          mode: 'cors',
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
        });
        const responseData = await req.json();
        if (req.status === 200){
          commit('CHANGEUSERPROFILEDATA', responseData);
        }

      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Отправка запроса на получение данных пользователя
     * @param commit
     * @param id - id сотрудника,чью карточку открываем
     */
    async getCurrentUserData({commit}){
      try {
        const req = await fetch(`http://test.atwinta.ru/api/v1/user`,{
          method: 'GET',
          mode: 'cors',
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
        });
        const responseData = await req.json();
        if (req.status === 200){
          commit('SETCURRENTUSER', responseData);
        }

      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Открытие страницы с карточкой сотрудника
     * @param commit
     * @param id - id сотрудника,чью карточку открываем
     */
    openProfile({commit}, id){
      commit('OPENPROFILE', id);
    }
  },
  getters: {
    WORKERSLIST: state => state.workers,
    USERPROFILE: state => state.chosenUserProfile,
    PAGES: state => state.pages,
    CURRENTUSER: state => state.user,
  }
})
