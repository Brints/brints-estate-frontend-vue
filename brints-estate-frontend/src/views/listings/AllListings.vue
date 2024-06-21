<script setup>
import { onMounted, computed } from "vue";

import { useListingsStore } from "@/stores/listingsStore";
import { useAuthStore } from "@/stores/authStore";

import ListingsHeader from "@/components/layout/ListingsHeader.vue";
import DisplayUserName from "@/components/UI/DisplayUserName.vue";
import GreetingUser from "@/components/UI/GreetingUser.vue";
import CurrentTime from "@/components/UI/CurrentTime.vue";
import HorizontalRule from "@/components/UI/HorizontalRule.vue";
import BaseFooter from "@/components/layout/BaseFooter.vue";

const listingsStore = useListingsStore();
const authStore = useAuthStore();

const listings = computed(() => {
  return listingsStore.listings;
});

onMounted(() => {
  listingsStore.fetchListings(authStore.token);
  authStore.loadTokenFromLocalStorage();
});
</script>

<template>
  <div :class="$style.container">
    <div class="header">
      <ListingsHeader></ListingsHeader>
    </div>

    <section :class="$style.main">
      <div className="flex justify-between items-center mb-4">
        <div :class="$style.greeting">
          <span><GreetingUser></GreetingUser></span>
          <span className="items-center"><DisplayUserName></DisplayUserName></span>
        </div>
        <div className="flex gap-1 items-center">
          <span className="text-rose-700 font-bold">Your Time: </span>
          <span><CurrentTime></CurrentTime></span>
        </div>
      </div>

      <div :class="$style.trending">
        <h1 className="text-2xl">Trending Listings</h1>
        <HorizontalRule></HorizontalRule>
        <p>Coming Soon. Watch this space!</p>
      </div>

      <div :class="$style.recommended">
        <h1 className="text-2xl">Recommended Listings</h1>
        <HorizontalRule></HorizontalRule>
        <p>Coming Soon. Watch this space!</p>
      </div>

      <div :class="$style.listings_container">
        <h1 className="text-2xl">All Listings</h1>
        <HorizontalRule></HorizontalRule>
        <p className="text-center" v-if="listings.length === 0">No Listings available yet.</p>
        <div else>
          <ul :class="$style.listings">
            <li className="list-none bg-slate-600 p-2" v-for="listing in listings" :key="listing._id">
              <h2 className="text-center">{{ listing.title }}</h2>
              <div :class="image" v-for="image in listing.images" :key="image._id">
                <img :src="image.url" :alt="image.filename" />
              </div>
              <p>{{ listing.description }}</p>
              <p>{{ listing.amenities }}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <div :class="$style.footer">
      <BaseFooter></BaseFooter>
    </div>
  </div>
</template>

<style module>
.container {
  width: 100%;
  height: 100vh;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0 1rem;
  margin: 2rem 0;
}

.greeting {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.listings {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); */
  gap: 1rem;
}
</style>
