<template>
  <div :class="$style.spinner">
    <div :class="$style.lds_roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style module>
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
