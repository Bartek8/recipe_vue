<template>
  <div class="mb-5">
    <nav class="navbar navbar-expand-lg navbar-light bg-light pl-5 pr-5 fixed-top">
      <router-link to="/" exact class="title">Recipe Website</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <div v-if="token === null">
          <router-link to="/register" class="btn-register">
            <button type="button" class="btn-register btn btn-warning mr-3">Create a profile</button>
          </router-link>
          <router-link to="/login" class="btn-login">
            <button type="button" class="btn btn-outline-warning">Log in</button>
          </router-link>
        </div>
        <div v-else>
          <router-link to="/account" class="btn-register">
            <button type="button" class="btn-register btn btn-warning mr-3">Account</button>
          </router-link>
          <button @click="logout" type="button" class="btn-login btn btn-outline-warning">Log out</button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Header",
  computed: {
    token() {
      return this.$store.getters.token;
    }
  },
  methods: {
    logout(e) {
      e.preventDefault();
      axios
        .get("http://localhost:4000/auth/logout")
        .then(() => {
          window.location.reload();
          window.localStorage.removeItem("jwt-token");
          this.$router.push("/");
        })
        .catch(function(error) {
          console.error(error);
        });
    }
  }
};
</script>

<style>
.btn-register {
  color: #f8f9fa;
}

.btn-login {
  color: #ffc107;
}

.title {
  color: black;
  font-size: 1.5em;
}

.title:hover {
  text-decoration: none;
  color: black;
}

.dropdown {
  cursor: pointer;
}
</style>