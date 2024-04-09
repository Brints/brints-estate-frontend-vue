<script>
import BaseLogo from "@/components/layout/BaseLogo.vue";
import HeaderBarLinks from "@/components/layout/HeaderBarLinks.vue";
export default {
  components: {
    BaseLogo,
    HeaderBarLinks,
  },
  data() {
    return {};
  },
};
</script>

<template>
  <header :class="$style.wrapper">
    <BaseLogo></BaseLogo>
    <HeaderBarLinks></HeaderBarLinks>
  </header>
</template>

<style module>
.wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5rem;
  padding: 0 2rem;
  /* background-color: #101011; */
  background-color: #3a0061;
}
</style>
