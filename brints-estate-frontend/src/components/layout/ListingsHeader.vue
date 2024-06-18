<script setup>
import { computed, onMounted } from "vue";
import BaseLogo from "@/components/layout/BaseLogo.vue";

import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();

  router.push({ name: "login" });
};

const displayName = computed(() => {
  return authStore.user.fullname;
});
const isLoggedIn = computed(() => {
  return authStore.isLoggedIn;
});
const displayProfilePic = computed(() => {
  if (authStore.user.avatar.length > 0) {
    return authStore.user.avatar[0].url;
  } else {
    return "";
  }
});
const displayInitials = computed(() => {
  const fullname = authStore.user.fullname.split(" ");
  return `${fullname[0].charAt(0).toUpperCase()}${fullname[1].charAt(0).toUpperCase()}`;
});
const displayAvatarAlt = computed(() => {
  if (authStore.user.avatar.length > 0) {
    return authStore.user.avatar[0];
  } else {
    return authStore.user.fullname;
  }
});

onMounted(() => {
  authStore.loadTokenFromLocalStorage();
});
</script>

<template>
  <div>
    <header class="main-heading">
      <div>
        <BaseLogo></BaseLogo>
      </div>

      <div class="container justify-center">
        <nav className="flex justify-between items-center">
          <div className="flex justify-center">
            <router-link to="/">Home</router-link>
            <router-link to="/listings">Listings</router-link>
          </div>

          <div class="flex gap-4 items-center overflow-hidden">
            <div :class="['profile-picture', 'bg-sky-900 flex gap-4 items-center justify-center overflow-hidden']">
              <img
                v-if="displayProfilePic"
                :src="displayProfilePic"
                :alt="displayAvatarAlt"
                class="rounded-full object-cover h-full w-full"
              />

              <div v-else class="rounded-full flex justify-center items-center">
                {{ displayInitials }}
              </div>
            </div>

            <div>
              <p>{{ displayName }}</p>
            </div>
            <button @click="handleLogout" v-if="isLoggedIn">Logout</button>
          </div>
        </nav>
      </div>
    </header>
  </div>
</template>

<style scoped>
.main-heading {
  background-color: #333;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 5rem;
  margin-bottom: 1rem;
}

.profile-picture {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.profile-picture img {
  width: 100%;
  height: 100%;
}

button {
  background-color: #007bff;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}

a {
  color: #fff;
  text-decoration: none;
  padding: 0 1rem;
}
</style>
