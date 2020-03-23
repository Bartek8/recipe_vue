<template>
  <div class="container p-5 w-50">
    <form>
      <h1 class="text-uppercase text-center p-5">sign up!</h1>
      <small v-show="error !== ''" class="text-danger">{{error}}</small>
      <div class="form-group">
        <label for="Name">Name*</label>
        <input
          v-model="name"
          name="name"
          type="text"
          class="form-control p-4"
          id="Name"
          placeholder="Enter your name"
        />
      </div>

      <div class="form-group">
        <label for="Email">Email address*</label>
        <input
          v-model="email"
          name="email"
          type="text"
          class="form-control p-4"
          id="Email"
          placeholder="Email address"
        />
      </div>
      <div class="form-group">
        <label for="Password">Password*</label>
        <input
          v-model="pass"
          name="pass"
          type="password"
          class="form-control p-4"
          id="Password"
          placeholder="Password"
        />
      </div>
      <div class="form-group form-check">
        <input
          v-model="terms"
          name="terms"
          type="checkbox"
          class="form-check-input"
          id="exampleCheck1"
        />
        <label class="form-check-label" for="terms">I have read and accept</label>
        <a href="/register/terms" target="_blank">Terms of service.*</a>
        <small class="text-danger"></small>
      </div>
      <small>* This fields are required</small>
      <button type="submit" @click="handleSubmit" class="btn btn-warning w-100 mt-3 p-3">Register!</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "register",
  data: function() {
    return {
      email: "",
      pass: "",
      name: "",
      terms: false,
      error: ""
    };
  },
  methods: {
    handleSubmit(e) {
      const nThis = this;
      e.preventDefault();
      axios
        .post("http://localhost:4000/auth/register", {
          name: this.name,
          password: this.pass,
          email: this.email,
          terms: this.terms,
          role: "user"
        })
        .then(res => {
          window.localStorage.setItem("jwt-token", res.data.token);
          this.$store.dispatch("setToken", res.data.token);
        })
        .then(() => {
          this.$router.push("/account");
        })
        .catch(function(error) {
          nThis.error = error.response.data.error;
        });
    }
  }
};
</script>

<style scoped>
a {
  color: black;
}

a:hover {
  text-decoration: none;
  color: black;
}
</style>