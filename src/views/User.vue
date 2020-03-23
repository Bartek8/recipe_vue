<template>
  <div class="container">
    <h3 class="text-center">Hello, {{user === null ? "" : user.data.data.name }}</h3>
    <div class="accordion mt-5" id="accordionExample">
      <app-recipes v-bind:recipes="recipes"></app-recipes>
      <app-reviews v-bind:reviews="reviews"></app-reviews>
      <app-new-recipe></app-new-recipe>
    </div>
  </div>
</template>

<script>
import Recipes from "../components/userComponents/Recipes.vue";
import Reviews from "../components/userComponents/Reviews.vue";
import NewRecipe from "../components/userComponents/NewRecipe.vue";
import jwt_decode from "jwt-decode";

export default {
  name: "User",
  components: {
    appRecipes: Recipes,
    appReviews: Reviews,
    appNewRecipe: NewRecipe
  },
  data() {
    return {
      id: jwt_decode(window.localStorage.getItem("jwt-token")).id,
      token: window.localStorage.getItem("jwt-token")
    };
  },
  created() {
    this.$store.dispatch(
      "fetchMyRecipes",
      `http://localhost:4000/recipe?user=${this.id}`
    );
    this.$store.dispatch(
      "fetchMyReviews",
      `http://localhost:4000/user/${this.id}/reviews`
    );
    this.$store.dispatch("getUser", this.token);
  },
  computed: {
    recipes() {
      return this.$store.getters.my_recipes;
    },
    reviews() {
      return this.$store.getters.my_reviews;
    },
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>

<style>
.container {
  margin-top: 10vh;
}
</style>