<script setup>
import HeaderBar from "@/components/layout/HeaderBar.vue";
import CountriesData from "@/lookup/country-codes.json";

const countries = CountriesData.countries;
const url = "https://emojicdn.elk.sh/";
</script>

<template>
  <div class="nav-links">
    <HeaderBar></HeaderBar>
  </div>
  <div :class="$style.container">
    <h1>Login Page</h1>
    <ul>
      <li v-for="country in countries" :key="country.code">
        {{ country.name }} <span class="mr-5"><img :src="`${url}${country.flag}`" /></span> {{ country.zipcode }}
      </li>
    </ul>
  </div>
</template>

<style module>
ul {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1rem;
  list-style: none;
  padding: 1rem;
}

ul li {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid #ccc;
}

/* ul li img {
  width: 30px;
  height: 30px;
} */
</style>
