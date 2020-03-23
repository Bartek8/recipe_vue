<template>
  <div class="container">
    <div class="row">
      <div class="col-sm m-2"></div>
      <div class="col-sm m-2">
        <form class="form-inline my-auto my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Find a recipe..."
            aria-label="Search"
          />
          <button class="btn btn-outline-dark my-2 my-sm-0 mr-sm-2" type="submit">
            <i class="fas fa-search"></i>
          </button>
        </form>
      </div>
      <div class="col-sm"></div>
    </div>
    <div class="container">
      <app-recipes v-bind:recipes="recipes"></app-recipes>
    </div>
  </div>
</template>

<script>
import Recipes from "../components/homeComponents/Recipes.vue";
export default {
  created() {
    this.$store.dispatch("fetchRecipes");
  },
  computed: {
    recipes() {
      return this.$store.getters.recipes;
    }
  },
  components: {
    appRecipes: Recipes
  }
};
</script>

<style scoped>
.container {
  margin-top: 10vh;
}
</style>