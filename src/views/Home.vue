<template>
  <div class="container">
    <div class="row">
      <div class="col-sm m-2">
        <form class="form-inline my-auto my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Find a recipe..."
            aria-label="Search"
            v-model="nameOfRecipe"
          />
          <button
            class="btn btn-outline-dark my-2 my-sm-0 mr-sm-2"
            type="button"
            v-on:click="searchRecipe($event)"
          >
            <i class="fas fa-search"></i>
          </button>
        </form>
      </div>
    </div>
    <div class="container">
      <app-recipes v-bind:recipes="recipes"></app-recipes>
    </div>
    <div class="row mt-4" style="font-size: 36px">
      <i
        class="ml-auto fas fa-arrow-circle-left m-2 text-secondary"
        style="cursor: pointer"
        v-on:click="handleClickPrev()"
      ></i>

      <i
        class="mr-auto fas fa-arrow-circle-right m-2 text-secondary"
        style="cursor: pointer"
        v-on:click="handleClickNext()"
      ></i>
    </div>
  </div>
</template>

<script>
import Recipes from "../components/homeComponents/Recipes.vue";
export default {
  created() {
    this.fetchData();
  },
  data: function() {
    return {
      url: "",
      nameOfRecipe: "",
      page: 1
    };
  },
  computed: {
    recipes() {
      return this.$store.getters.recipes;
    }
  },
  components: {
    appRecipes: Recipes
  },
  methods: {
    searchRecipe(event) {
      event.preventDefault();
      this.page = 1;
      if (this.nameOfRecipe == "") {
        this.url = "";
      } else {
        this.url = `&arrayOfName[in]=${this.nameOfRecipe}`;
      }

      this.fetchData();
    },
    fetchData() {
      this.$store.dispatch(
        "fetchRecipes",
        "http://localhost:4000/recipe" +
          `?limit=${4}&page=${this.page}` +
          this.url
      );
    },
    handleClickNext() {
      let data_recipes = this.$store.getters.recipes;
      if (data_recipes === null) return;
      const page = data_recipes.data.pagination;
      const data = data_recipes.data.data;
      console.log(page);
      console.log(data);
      if (page.next === undefined) {
        return;
      } else if (data.length !== page.next.limit) {
        return;
      } else {
        this.page = page.next.page;
        this.fetchData();
      }
    },
    handleClickPrev() {
      let data_recipes = this.$store.getters.recipes;
      if (data_recipes === null) return;
      const page = data_recipes.data.pagination;
      if (page.prev === undefined) {
        return;
      } else {
        this.page = page.prev.page;
        this.fetchData();
      }
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 10vh;
}
</style>