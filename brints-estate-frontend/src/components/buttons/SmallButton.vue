<script></script>

<template>
  <button type="submit" :class="$style.small_button">
    <slot></slot>
  </button>
</template>

<style module>
.small_button {
  background-color: #363333;
  /* border: 1px solid #130f0f; */
  padding: 3px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
}

.small_button:hover {
  filter: brightness(160%);
  border-bottom: 2px solid #0ae90a;
  transition: all 1s ease-in-out;
}
</style>
