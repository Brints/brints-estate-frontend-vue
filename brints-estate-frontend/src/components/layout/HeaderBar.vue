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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2rem 5rem;
  background-color: #3a0061;
}
</style>
