<script setup>
import { computed, onMounted } from "vue";
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
} from "@fortawesome/free-solid-svg-icons";

const authStore = useAuthStore();
const router = useRouter();

library.add(faUser, faKey, faUserCog, faUserShield, faEnvelope, faTrashAlt, faSignOutAlt);

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
  return authStore.user.role === "user" ? true : false;
});

onMounted(() => {
  authStore.loadTokenFromLocalStorage();
});
</script>

<template>
  <div :class="$style.wrapper" v-if="isVisible">
    <ul :class="$style.menu">
      <li>
        <font-awesome-icon :icon="['fas', 'user']" />
        <router-link :to="{ name: 'profile' }">Profile</router-link>
      </li>
      <li>
        <font-awesome-icon :icon="['fas', 'key']" />
        <RouterLink :to="{ name: 'change-password' }">Change Password</RouterLink>
      </li>
      <li>
        <font-awesome-icon :icon="['fas', 'user-cog']" />
        <router-link :to="{ name: 'edit-profile' }">Edit Profile</router-link>
      </li>
      <li v-if="userRole">
        <div>
          <font-awesome-icon :icon="['fas', 'user-shield']" />
          <router-link :to="{ name: 'upgrade-to-realtor' }">Become a Realtor</router-link>
        </div>
      </li>
      <li>
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
