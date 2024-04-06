<script setup></script>

<template>
  <div :class="$style.card">
    <slot></slot>
  </div>
</template>

<style module>
.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
}

.card + .card {
  margin-top: 16px;
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
