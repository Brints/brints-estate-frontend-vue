<script setup>
import { computed, onMounted, ref } from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import BaseLogo from "@/components/layout/BaseLogo.vue";
import UserDropDownMenu from "@/components/UI/UserDropDownMenu.vue";

const isVisible = ref(false);
library.add(faBars, faTimes);

import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();

const toggleDropDown = () => {
  isVisible.value = !isVisible.value;
};

const dropDownMenu = computed(() => {
  return isVisible.value ? "fas fa-times" : "fas fa-bars";
});

const displayName = computed(() => {
  return authStore.user.fullname;
});

const showRole = computed(() => {
  return authStore.user.role;
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

            <div class="display">
              <div className="flex flex-col justify-center items-center m-0 p-0">
                <p>{{ displayName }}</p>
                <small className="text-green-400 font-bold">({{ showRole }})</small>
              </div>

              <div @click="toggleDropDown">
                <font-awesome-icon class="menu-icon" :icon="dropDownMenu" />
                <UserDropDownMenu :isVisible="isVisible" />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  </div>
</template>

<style scoped>
.main-heading {
  position: relative;
  background-color: #333;
  color: #fff;
  display: flex;
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

a {
  color: #fff;
  text-decoration: none;
  padding: 0 1rem;
}

.menu-icon {
  font-size: 1.5rem;
  cursor: pointer;
  border: 1px solid #8762db;
  border-radius: 5px;
  padding: 0.5rem;
}

.display {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}
</style>
