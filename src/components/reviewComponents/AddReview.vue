<template>
  <div class="card border-dark mb-3">
    <h3 class="card-header">Rate and review!</h3>
    <div class="card-body text-dark">
      <form class="w-100 p-3" @submit="handleSubmit">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            required
            data-type="title"
            v-model="title"
            type="text"
            class="form-control"
            id="title"
          />
        </div>
        <div class="form-group">
          <label for="rating">Rate</label>
          <select required data-type="rating " v-model="rate" class="form-control" id="rating">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div class="form-group">
          <label for="text">Text</label>
          <textarea
            minlength="10"
            maxlength="800"
            required
            data-type="text"
            v-model="text"
            class="form-control"
            id="text"
            rows="5"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-outline-warning w-100">
          <strong>Submit</strong>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["data"],
  data: function() {
    return {
      title: "",
      rate: "1",
      text: ""
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      const body = {
        title: this.title,
        rating: this.rate,
        text: this.text
      };
      const token = window.localStorage.getItem("jwt-token");
      if (!token) {
        return alert("Only registered user! Create an account");
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      };
      axios
        .post(`http://localhost:4000/recipe/${this.data}/reviews`, body, config)
        .then(res => {
          if (res.status === 201) {
            window.location.reload();
          }
        })
        .catch(err => {
          console.log(err.response);
          if (
            err.response.data.error === "Duplicate field value entered (email)"
          ) {
            return alert("You can add one review to one recipe");
          }
        });
    }
  }
};
</script>

<style>
</style>