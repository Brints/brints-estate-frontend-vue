import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const error = ref(null);

  const isAuthenticated = computed(() => !!user.value);

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        user.value = await response.json();
      } else {
        error.value = await response.json();
      }
    } catch (e) {
      error.value = e.response ? e.response.data.message : "An error occurred";
      user.value = null;
    }
  };

  const logout = () => {
    user.value = null;
    error.value = null;
  };

  return {
    user,
    error,
    isAuthenticated,
    login,
    logout,
  };
});
