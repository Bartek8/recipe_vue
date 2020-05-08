import axios from 'axios'

export const fetchRecipes = ({ commit }, url) => {

    axios.get(url)
        .then((data) =>
            commit('SET_RECIPES', data))
        .catch(err => console.error(err))

};

export const fetchReviews = ({ commit }, id) => {

    axios.get(`http://localhost:4000/recipe/${id}/reviews`)
        .then((data) =>
            commit('SET_RECIPES', data))
        .catch(err => console.error(err))

};

export const fetchMyRecipes = ({ commit }, url) => {

    axios.get(url)
        .then((data) =>
            commit('SET_MY_RECIPES', data))
        .catch(err => console.error(err))

};

export const fetchMyReviews = ({ commit }, url) => {

    axios.get(url)
        .then((data) =>
            commit('SET_MY_REVIEWS', data))
        .catch(err => console.error(err))

};

export const setToken = ({ commit }, token) => {

    commit('SET_TOKEN', token)

};

export const getUser = ({ commit }, token) => {

    axios.get(`http://localhost:4000/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
        .then((data) =>
            commit('GET_USER', data))
        .catch(err => console.error(err))
}