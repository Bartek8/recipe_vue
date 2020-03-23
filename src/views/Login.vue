<template>
  <div class="container p-5 w-50">
    <form>
      <h1 class="text-uppercase text-center p-5">welcome back!</h1>
      <div class="form-group">
        <input
          v-model="email"
          name="email"
          type="email"
          class="form-control p-4"
          id="Email"
          aria-describedby="emailHelp"
          placeholder="Email address"
        />
      </div>
      <div class="form-group">
        <input
          v-model="pass"
          name="pass"
          type="password"
          class="form-control p-4"
          id="Password"
          placeholder="Password"
        />
      </div>
      <small class="text-danger" v-show="error !== false">{{error}}</small>
      <button @click="handleSubmit" type="submit" class="btn btn-warning w-100 mt-3 p-3">Login</button>
      <div class="row mt-3" style="{cursor: pointer }">
        <router-link class="col" to="/register">Forgot your password?</router-link>
        <router-link class="col text-right" to="/register">
          Don't have an account?
          <strong>Get Started!</strong>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "login",
  data: function() {
    return {
      email: "",
      pass: "",
      error: false
    };
  },
  methods: {
    handleSubmit(e) {
      const nThis = this;
      e.preventDefault();
      axios
        .post("http://localhost:4000/auth/login", {
          password: this.pass,
          email: this.email
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