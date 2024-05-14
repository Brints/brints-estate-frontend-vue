<script setup>
// import { ref } from "vue";

// const message = ref("");

// const setMessage = (msg) => {
//   message.value = msg;
// };
</script>

<template>
  <div class="alert alert-success">
    <p><slot></slot></p>
  </div>
</template>

<style scoped>
.alert {
  padding: 20px;
  background-color: #4caf50;
  color: white;
  margin-bottom: 15px;
}

.closebtn {
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.closebtn:hover {
  color: black;
}
</style>
