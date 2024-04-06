<script></script>

<template>
  <div :class="$style.logo">
    <img src="../../public/logo.png" alt="Brints Estate Logo" />
    <h1>Brints <span className="border-y">Estate</span></h1>
  </div>
</template>

<style module>
.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 66%;
}

.logo img {
  display: block;
  width: 50px;
  height: 50px;
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: 700;
}

.logo span {
  /* color: var(--emerald-700); */
  color: teal;
}
</style>
