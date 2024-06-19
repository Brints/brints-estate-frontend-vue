<script setup>
import ListingsHeader from "@/components/layout/ListingsHeader.vue";
import DisplayUserName from "@/components/UI/DisplayUserName.vue";
import GreetingUser from "@/components/UI/GreetingUser.vue";
import CurrentTime from "@/components/UI/CurrentTime.vue";
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
          <span>Your Time: </span>
          <span><CurrentTime></CurrentTime></span>
        </div>
      </div>

      <div :class="$style.trending">
        <h1>Trending Listings</h1>
      </div>

      <div :class="$style.recommended">
        <h1>Recommended Listings</h1>
      </div>

      <div :class="$style.listings">
        <h1>All Listings</h1>
      </div>
    </section>
  </div>
</template>

<style module>
.container {
  width: 100%;
  height: 100vh;
}

.main {
  padding: 0 1rem;
}

.greeting {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}
</style>
