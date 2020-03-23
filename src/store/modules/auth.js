const state = {
    token: window.localStorage.getItem('jwt-token'),
    user: null
};

const mutations = {
    'SET_TOKEN'(state, token) {
        state.token = token;
    },
    'GET_USER'(state, user) {
        state.user = user
    }
}

const getters = {
    token: state => {
        return state.token;
    },
    user: state => {
        return state.user
    }
};

export default {
    state,
    mutations,
    getters
};