<template>
  <div>
    <div class="row justify-content-md-center">
      <div v-if="recipes === null" class="d-flex justify-content-center">
        <div class="spinner-border" :style="{ width: '3rem', height: '3rem'}" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div v-else v-for="item in recipes.data.data" v-bind:key="item._id" class="col mt-6 p-3">
        <div class="card m-auto" :style="{ width: '15rem' }">
          <router-link :to="`recipe/${item._id}`">
            <img
              :src="'http://localhost:4000/uploads/' + item.photo"
              class="card-img-top"
              :style="{ height: '16rem' }"
              :alt="item.name"
            />
          </router-link>
          <div class="card-body">
            <router-link :to="`recipe/${item._id}`">
              <h5 class="card-title">{{item.name}}</h5>
            </router-link>
            <div class="stars-outer">
              <div class="stars-inner" :style="{ width: stars(item.averageRating) }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div v-if="len.length==0" class="row mt-4" style="font-size: 36px ">
        <p class="m-auto">Unfortunately: 0 results</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recipes",
  props: ["recipes"],
  computed: {
    data: function() {
      return {
        recipes: this.recipes
      };
    },
    len: function() {
      return {
        length: this.recipes === null ? -1 : this.recipes.data.count
      };
    }
  },
  methods: {
    stars(rating) {
      let rate = rating * 20;
      return `${rate}%`;
    }
  }
};
</script>

<style>
.container {
  margin-top: 10vh;
}

#img {
  width: 50%;
  height: 50%;
}

.stars-outer {
  font-size: 33px;
  position: relative;
  display: inline-block;
}

.stars-inner {
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow: hidden;
}

.stars-outer::before {
  content: "\f005 \f005 \f005 \f005 \f005";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  color: #ccc;
}

.stars-inner::before {
  content: "\f005 \f005 \f005 \f005 \f005";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  color: #f8ce0b;
}
</style>