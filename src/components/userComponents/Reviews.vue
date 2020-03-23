<template>
  <div class="card">
    <div class="card-header" id="headingTwo">
      <h2 class="mb-0">
        <button
          :style="{ color: 'black' }"
          class="btn btn-link collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#collapseTwo"
          aria-expanded="false"
          aria-controls="collapseTwo"
          data-type="review"
        >Show all my review</button>
      </h2>
    </div>
    <div
      id="collapseTwo"
      class="collapse"
      aria-labelledby="headingTwo"
      data-parent="#accordionExample"
    >
      <div class="card-body">
        <div class="text-monospace" v-if="reviews === null">Click the button above.</div>
        <div
          v-else-if="reviews.data.data.length === 0"
          class="text-monospace p-3"
        >You don't have any recipes</div>
        <div v-else class="card p-3" v-for="review in reviews.data.data" v-bind:key="review._id">
          <div class="card-body">
            <h3>{{review.title}}</h3>
            <p>{{review.text}}</p>
            <div class="stars-outer">
              <div class="stars-inner" :style="{ width: stars(review.rating) }"></div>
            </div>
            <br />
            <small>Created at: {{review.createdAt.slice(0, 10)}}</small>
            <div class="container">
              <div class="row">
                <button @click="handleClick(item._id,$event)" class="btn btn-danger m-2">Delete!</button>
                <!-- <UpdateReview id='review._id' /> -->
                <button class="btn btn-light m-2">
                  <router-link :to="'/recipe/'+review.recipe">Go to recipe!</router-link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["reviews"],
  methods: {
    stars(rating) {
      let rate = rating * 20;
      return `${rate}%`;
    }
  }
};
</script>

<style>
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
