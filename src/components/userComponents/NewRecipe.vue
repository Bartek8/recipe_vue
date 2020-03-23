<template>
  <div class="card">
    <div class="card-header" id="headingThree">
      <h2 class="mb-0">
        <button
          :style="{ color: 'black' }"
          class="btn btn-link collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#collapseThree"
          aria-expanded="false"
          aria-controls="collapseThree"
        >Create new recipe</button>
      </h2>
    </div>
    <div
      id="collapseThree"
      class="collapse"
      aria-labelledby="headingThree"
      data-parent="#accordionExample"
    >
      <div class="card-body">
        <app-new-recipe-form></app-new-recipe-form>
      </div>
    </div>
  </div>
</template>

<script>
import NewRecipeForm from "./NewRecipeForm";
export default {
  components: {
    appNewRecipeForm: NewRecipeForm
  }
};
</script>
