<template>
  <div class="container">
    <br />
    <div v-if="recipe === []" class="d-flex justify-content-center">
      <div class="spinner-border" :style="{ width: '3rem', height: '3rem' }" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else>
      <div class="row">
        <h1 class="p-3">{{recipe.name}}</h1>
      </div>
      <div class="row">
        <p class="p-3">
          <strong>Description:</strong>
          {{recipe.description}}
        </p>
      </div>
      <div class="row">
        <img
          :src="'http://localhost:4000/uploads/' + recipe.photo"
          :style="{width: '50%', height: '50%'}"
          class="rounded float-left m-auto"
          :alt="recipe.name"
        />
        <div class="col">
          <ul class="list-group">
            <li class="list-group-item list-group-item-primary">Calories: {{recipe.calories}}</li>
            <li class="list-group-item list-group-item-info">Serving: {{recipe.serving}}</li>
            <li class="list-group-item list-group-item-warning">Cousine: {{recipe.cousine[0]}}</li>
            <li class="list-group-item list-group-item-light">Time: {{recipe.time}}</li>
          </ul>
          <div class="stars-outer">
            <div class="stars-inner" :style="{ width: stars(recipe.averageRating) }"></div>
          </div>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col">
          <ul
            class="list-group list-group-flush p-3"
            v-for="item in recipe.ingredients"
            :key="item"
          >
            <li class="list-group-item">{{item}}</li>
          </ul>
        </div>
        <div class="col">
          <p>
            <strong>Instruction:</strong>
            {{recipe.instructions}}
          </p>
        </div>
      </div>
      <hr />
      <div v-if="reviews === []">loading...</div>
      <div v-else>
        <h3>Reviews ({{reviews.length}})</h3>
        <div
          class="card p-3 mb-2"
          v-for="review in reviews.sort((a, b) => {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    })"
          :key="review._id"
        >
          <div class="card-body">
            <h3>{{review.title}}</h3>
            <p>{{review.text}}</p>
            <div class="stars-outer">
              <div class="stars-inner" :style="{ width: stars(review.rating) }"></div>
            </div>
            <br />
            <small>Created at: {{review.createdAt.slice(0, 10)}}</small>
            <hr />
          </div>
        </div>
      </div>
    </div>
    <hr />
    <br />
    <app-add-review v-bind:data="recipe._id"></app-add-review>
  </div>
</template>

<script>
import axios from "axios";
import AddReview from "../components/reviewComponents/AddReview.vue";

export default {
  data: function() {
    return {
      recipe: [],
      reviews: []
    };
  },
  created() {
    this.fetchRecipe();
    this.fetchReview();
  },
  methods: {
    stars(rating) {
      let rate = rating * 20;
      return `${rate}%`;
    },
    fetchRecipe: async function() {
      await axios
        .get(`http://localhost:4000/recipe/${this.$route.params.id}`)
        .then(data => {
          console.log("render1");
          this.recipe = data.data.data;
        })
        .catch(err => console.log(err));
    },
    fetchReview: async function() {
      await axios
        .get(`http://localhost:4000/recipe/${this.$route.params.id}/reviews`)
        .then(data => {
          console.log("render2");
          this.reviews = data.data.data;
        })
        .catch(err => console.log(err));
    }
  },
  components: {
    appAddReview: AddReview
  }
};
</script>

<style scoped>
.container {
  margin-top: 10vh;
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