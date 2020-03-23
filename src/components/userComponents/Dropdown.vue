<template>
  <div class="dropdown my-auto">
    <div class="row">
      <div class="col">
        <a
          href="/"
          class="btn btn-outline-warning nav-link dropdown-toggle"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >Browse</a>
        <div
          class="dropdown-menu scrollable-menu"
          :style="{ height: '40vh', overflowY: 'scroll' }"
          data-boundary="scrollParent"
          role="menu"
          aria-labelledby="navbarDropdown"
        >
          <button
            v-for="item in data"
            :key="item"
            @click="handleClick"
            class="dropdown-item"
            type="button"
          >{{item}}</button>
        </div>
      </div>
      <div class="col">
        <div
          v-show="cousine !== ''"
          class="text-center alert alert-warning"
          role="alert"
        >{{cousine}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { arrayOfCousine } from "../../data/cousine";
export default {
  data: function() {
    return {
      data: arrayOfCousine,
      cousine: ""
    };
  },
  methods: {
    handleClick(e) {
      const data = e.target.innerText;
      this.cousine = data;
      this.$emit("setCousine", data);
    }
  }
};
</script>

<style>
</style>