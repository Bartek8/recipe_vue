<template>
  <div>
    <div class="form-group">
      <div class="row">
        <div class="col">
          <label for="ingredient">Ingredients</label>
          <input type="text" class="form-control" id="ingredient" v-model="text" />
        </div>
        <div class="col">
          <button class="btn-outline-warning btn h-100 w-50" @click="handleAdd">Add</button>
        </div>
      </div>
    </div>
    <div class="list-group" v-for="item in ingredients" :key="item.id">
      <button
        :id="item.id"
        type="button"
        @click="handleDelete"
        class="list-group-item list-group-item-warning"
      >{{item.text}}</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: this.ingredients
  },
  data: function() {
    return {
      counter: 0,
      ingredients: [],
      ingredient: {},
      text: ""
    };
  },
  methods: {
    handleDelete(e) {
      console.log(e.target.id);
      const elements = [...this.ingredients];
      const ingredients = elements.filter(
        id => id.id.toString() !== e.target.id
      );
      this.ingredients = ingredients;
    },
    handleAdd(e) {
      e.preventDefault();
      if (this.text.length < 2) {
        return;
      }
      if (this.text.length > 50) {
        return;
      }
      const ingredient = {
        id: this.counter,
        text: this.text
      };
      this.counter = this.counter + 1;
      this.ingredients = [...this.ingredients, ingredient];
      this.text = "";
    }
  }
};
</script>

<style>
</style>