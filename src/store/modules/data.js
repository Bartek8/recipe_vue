const state = {
    recipes: null,
    my_recipes: null,
    my_reviews: null,
    reviews: null
};

const mutations = {
    'SET_RECIPES'(state, recipes) {
        state.recipes = recipes;
    },
    'SET_REVIEWS'(state, reviews) {
        state.reviews = reviews;
    },
    'SET_MY_RECIPES'(state, my_recipes) {
        state.my_recipes = my_recipes
    },
    'SET_MY_REVIEWS'(state, my_reviews) {
        state.my_reviews = my_reviews
    }
}

const getters = {
    recipes: state => {
        return state.recipes;
    },
    reviews: state => {
        return state.reviews;
    },
    my_recipes: state => {
        return state.my_recipes;
    },
    my_reviews: state => {
        return state.my_reviews;
    }
};

export default {
    state,
    mutations,
    getters
};