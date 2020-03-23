<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="name">Name</label>
      <input
        v-model="name"
        :required="true"
        :minLength="1"
        :maxLength="30"
        type="text"
        class="form-control"
        id="name"
        placeholder="Name of the dish"
      />
    </div>
    <app-ingredients v-on:setIng="updateIng($event)"></app-ingredients>
    <div class="form-group">
      <label for="description">Description (between 30 and 500 characters)</label>
      <textarea
        v-model="desc"
        :required="true"
        :minLength="30"
        :maxLength="500"
        class="form-control"
        id="description"
        rows="3"
      ></textarea>
    </div>
    <div class="form-group">
      <label for="instructions">Instructions (between 30 and 800 characters)</label>
      <textarea
        v-model="instructions"
        :required="true"
        :minLength="30"
        :maxLength="800"
        class="form-control"
        id="instructions"
        rows="3"
      ></textarea>
    </div>
    <div class="form-check">
      <input v-model="meat" class="form-check-input" type="checkbox" id="meat" />
      <label class="form-check-label" for="meat">Does the dish contain meat?</label>
    </div>
    <br />
    <app-dropdown v-on:setCousine="updateCousine($event)"></app-dropdown>
    <div class="form-group">
      <label for="serving">Serving (between 1 and 20 characters)</label>
      <input
        v-model="serving"
        :required="true"
        :min="1"
        :max="20"
        type="number"
        class="form-control"
        id="serving"
        placeholder="Amount of ready portions"
      />
    </div>

    <div class="form-group">
      <label for="calories">Calories</label>
      <input
        v-model="calories"
        :required="true"
        :min="1"
        type="number"
        class="form-control"
        id="calories"
        placeholder="Number of calories"
      />
    </div>

    <div class="form-group">
      <label for="time">Time (time in minutes)</label>
      <input
        v-model="time"
        :required="true"
        :min="1"
        type="number"
        class="form-control"
        id="time"
        placeholder="How long will it take to cook?"
      />
    </div>
    <button class="btn-outline-warning btn h-100 w-100" type="submit">Add recipe!</button>
  </form>
</template>

<script>
import axios from "axios";
import Dropdown from "./Dropdown.vue";
import Ingredients from "./Ingredients.vue";

export default {
  data: function() {
    return {
      name: "",
      ingredients: [],
      desc: "",
      instructions: "",
      meat: true,
      serving: "",
      calories: "",
      cousine: "",
      time: ""
    };
  },
  components: {
    appDropdown: Dropdown,
    appIngredients: Ingredients
  },
  methods: {
    updateIng(data) {
      let ingredients = [];
      data.map(i => {
        return ingredients.push(i.text);
      });
      this.ingredients = ingredients;
    },
    updateCousine(data) {
      this.cousine = data;
    },
    handleSubmit() {
      const token = window.localStorage.getItem("jwt-token");
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const body = {
        name: this.name,
        ingredients: this.ingredients,
        instructions: this.instructions,
        serving: this.serving,
        calories: this.calories,
        cousine: this.cousine,
        meat: this.meat,
        time: this.time,
        description: this.desc,
        photo: "no_photo.jpg"
      };
      let result = window.confirm("Last click before publication :)");
      if (result) {
        axios
          .post("http://localhost:4000/recipe", body, config)
          .then(res => {
            if (res.status === 201) {
              window.location.reload();
            }
          })
          .catch(err => console.error(err.response));
      } else {
        return;
      }
    }
  }
};
</script>
