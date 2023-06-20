import { login as loginApi } from '@/api/login'
import router from '@/router'
export default {
  namespace: true,
  state: () => ({
    token: localStorage.getItem('token') || '',
    perms: localStorage.getItem('perms') || ''
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    setPerm(state, perms) {
      state.perms = perms
      localStorage.setItem('perms', perms)
    }
  },
  actions: {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginApi(userInfo)
          .then((res) => {
            commit('setToken', 'userID_' + res.data.user.userId)
            commit('setPerm', res.data.permissions)
            router.replace('/')
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      }).catch((e) => {})
    },
    logout({ commit }) {
      commit('setToken', '')
      commit('setPerm', '')
      router.replace('/login')
    }
  }
}
