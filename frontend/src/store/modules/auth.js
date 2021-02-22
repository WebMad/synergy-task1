const state = {
    user: {},
}

const mutations = {
    SET_USER: (state, user) => {
        state.user = user
    },
}

const getters = {
    getUser: (state) => {
        return state.user
    },
    getToken: (state) => {
        return state.user.token
    },
    isAuth: (state) => {
        return !!state.user
    }
}

const actions = {

}

export default {
    namespaced: true,
    state: state,
    mutations: mutations,
    getters: getters,
    actions: actions
}