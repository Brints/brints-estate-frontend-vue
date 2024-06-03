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

.lds_roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.lds_roller div {
  animation: lds_roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
</style>
