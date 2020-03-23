<template>
  <div class="card">
    <div class="card-header" id="headingOne">
      <h2 class="mb-0">
        <button
          :style="{color: 'black' }"
          class="btn btn-link"
          type="button"
          data-toggle="collapse"
          data-target="#collapseOne"
          aria-expanded="true"
          aria-controls="collapseOne"
          data-type="recipe"
        >Show all my recipes</button>
      </h2>
    </div>

    <div
      id="collapseOne"
      class="collapse show"
      aria-labelledby="headingOne"
      data-parent="#accordionExample"
    >
      <div class="text-monospace" v-if="recipes === null">Click the button above.</div>
      <div
        v-else-if="recipes.data.data.length === 0"
        class="text-monospace p-3"
      >You don't have any recipes</div>
      <div v-else class="row justify-content-md-center">
        <div class="col mt-6 p-3" v-for="item in recipes.data.data" v-bind:key="item._id">
          <div class="card m-auto" :style="{ width: '15rem' }">
            <router-link :to="'recipe/'+item._id">
              <img
                :src="'http://localhost:4000/uploads/'+ item.photo"
                class="card-img-top"
                :style="{ height: '16rem' }"
                :alt="item.name"
              />
            </router-link>
            <div class="card-body">
              <router-link :to="'recipe/' + item._id">
                <h5 class="card-title">{{item.name}}</h5>
              </router-link>
              <div class="stars-outer">
                <div class="stars-inner" :style="{ width: stars(item.averageRating) }"></div>
              </div>
              <form class="custom-file">
                <input
                  @change="handleUploadPhoto(item._id,$event)"
                  id="file"
                  type="file"
                  class="custom-file-input"
                />
                <label class="custom-file-label" for="file">Upload photo</label>
              </form>
              <div
                class="btn btn-danger w-100"
                @click="handleDelete(item._id,$event)"
                role="button"
              >Delete!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["recipes"],
  methods: {
    stars(rating) {
      let rate = rating * 20;
      return `${rate}%`;
    },
    handleDelete(id, e) {
      e.preventDefault(e);
      const token = window.localStorage.getItem("jwt-token");
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      let result = window.confirm("Are you sure ? Changes cannot be undone.");
      if (result) {
        axios
          .delete(`http://localhost:4000/recipe/${id}`, config)
          .then(alert("Successfully removed"))
          .then(window.location.reload())
          .catch(err => alert(err.response.data.error));
      } else {
        return;
      }
    },
    handleUploadPhoto(id, e) {
      e.preventDefault();
      let formData = new FormData();

      formData.append("file", e.target.files[0]);

      const token = window.localStorage.getItem("jwt-token");
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      axios
        .put(`http://localhost:4000/recipe/${id}/photo`, formData, config)
        .then(data => {
          if (data.status === 200) {
            window.location.reload();
          }
        })
        .catch(err => alert(err.response.data.error));
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