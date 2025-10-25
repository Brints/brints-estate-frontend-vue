<script setup>
import { computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faUser,
  faKey,
  faUserCog,
  faUserShield,
  faEnvelope,
  faTrashAlt,
  faSignOutAlt,
  faTachometerAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const authStore = useAuthStore();
const router = useRouter();

library.add(faUser, faKey, faUserCog, faUserShield, faEnvelope, faTrashAlt, faSignOutAlt, faTachometerAlt, faPlus);

defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
});

const handleLogout = () => {
  authStore.logout();

  router.push({ name: "login" });
};

const deleteAccount = () => {
  console.log("Your Account has been deleted.");
};

const isLoggedIn = computed(() => {
  return authStore.isLoggedIn;
});

const userRole = computed(() => {
  return authStore.user.role;
});

const loadDashboard = () => {
  if (userRole.value === "admin") {
    router.push({ name: "admin-dashboard" });
  } else {
    router.push({ name: "realtor-dashboard" });
  }
};

const loadChangePassword = () => {
  if (userRole.value === "admin") {
    router.push({ name: "admin-change-password" });
  } else if (userRole.value === "user") {
    router.push({ name: "change-password" });
  } else {
    router.push({ name: "realtor-change-password" });
  }
};

onMounted(() => {
  authStore.loadTokenFromLocalStorage();
});

onUnmounted(() => {
  authStore.error = null;
  authStore.successMessage = null;
  localStorage.removeItem("token");
  localStorage.removeItem("user");
});
</script>

<template>
  <div :class="$style.wrapper" v-if="isVisible">
    <ul :class="$style.menu">
      <li v-if="userRole !== 'user'">
        <font-awesome-icon :icon="['fas', 'tachometer-alt']" />
        <!-- <router-link :to="{ name: 'profile' }">Dashboard</router-link> -->
        <button type="button" @click="loadDashboard">Dashboard</button>
      </li>
      <li>
        <font-awesome-icon :icon="['fas', 'user']" />
        <router-link :to="{ name: 'profile' }">Profile</router-link>
      </li>
      <li v-if="userRole !== 'user'">
        <font-awesome-icon :icon="['fas', 'plus']" />
        <router-link :to="{ name: 'add-listing' }">New Listing</router-link>
      </li>
      <li>
        <font-awesome-icon :icon="['fas', 'key']" />
        <button type="button" @click="loadChangePassword">Change Password</button>
      </li>
      <li>
        <font-awesome-icon :icon="['fas', 'user-cog']" />
        <router-link :to="{ name: 'edit-profile' }">Edit Profile</router-link>
      </li>
      <li v-if="userRole === 'user'">
        <font-awesome-icon :icon="['fas', 'user-shield']" />
        <router-link :to="{ name: 'upgrade-to-realtor' }">Become a Realtor</router-link>
      </li>
      <li v-if="userRole !== 'admin'">
        <font-awesome-icon :icon="['fas', 'envelope']" />
        <router-link :to="{ name: 'contact-admin' }">Contact Admin</router-link>
      </li>
    </ul>

    <ul :class="[$style.menu, 'signout']">
      <li className="text-red-600">
        <font-awesome-icon :icon="['fas', 'trash-alt']" />
        <button type="button" @click="deleteAccount" v-if="isLoggedIn">Delete Account</button>
      </li>
      <li className="rounded bg-('hsl(211, 100%, 50%)')">
        <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
        <button type="button" @click="handleLogout" v-if="isLoggedIn">Logout</button>
      </li>
    </ul>
  </div>
</template>

<style module>
.wrapper {
  position: absolute;
  top: 115px;
  right: 0;
  width: 20rem;
  background-color: white;
  color: hsl(0, 5%, 34%);
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
  z-index: 100;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu li {
  padding: 1rem;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  display: flex;
  gap: 1rem;
  align-items: center;
}

.menu li:hover {
  background-color: #f4f4f4;
}

.signout {
  border-top: 1px solid #ccc;
}
</style>
