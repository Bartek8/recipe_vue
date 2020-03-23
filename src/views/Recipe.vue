<template>
  <div class="container">
    <br />
    <div>
      <div class="row">
        <h1 class="p-3">name</h1>
      </div>
      <div class="row">
        <p class="p-3">
          <strong>Description:</strong>description
        </p>
      </div>
      <div class="row">
        <img src id="img" class="rounded float-left m-auto" alt="{data.name}" />
        <div class="col">
          <ul class="list-group">
            <li class="list-group-item list-group-item-primary">Calories: data.calories</li>
            <li class="list-group-item list-group-item-info">Serving: data.serving</li>
            <li class="list-group-item list-group-item-warning">Cousine: data.cousine</li>
            <li class="list-group-item list-group-item-light">Time: data.time</li>
            <li>Contains meat: yes</li>
          </ul>
          <div class="stars-outer">
            <div class="stars-inner"></div>
          </div>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col">
          <ul class="list-group list-group-flush p-3"></ul>
        </div>
        <div class="col">
          <p>
            <strong>Instruction:</strong>data.instructions
          </p>
        </div>
      </div>
      <hr />

      <div class="card p-3 mb-2" key="{review._id}">
        <div class="card-body">
          <h3>review.title</h3>
          <p>review.text</p>
          <div class="stars-outer">
            <div class="stars-inner"></div>
          </div>
          <br />
          <small>Created at: review.createdAt.slice(0, 10)</small>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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