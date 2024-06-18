import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(null);
  const user = ref<any>(null);
  const errorMessage = ref<string | null>(null);
  const loading = ref(false);

  const isLoggedIn = computed(() => !!token.value);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const login = async (email: string, password: string) => {
    loading.value = true;
    try {
      const response = await axios.post(`${backendUrl}/user/login`, {
        email,
        password,
      });
      const { payload } = response.data;

      if (payload) {
        token.value = payload.token;
        user.value = payload;

        // Save token to local storage
        localStorage.setItem("token", token.value);
        localStorage.setItem("user", JSON.stringify(payload));
      }
    } catch (error) {
      const response = error.response;
      const { message } = response.data.error;
      errorMessage.value = message;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const loadTokenFromLocalStorage = () => {
    const storageToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storageToken && storedUser) {
      token.value = storageToken;
      user.value = JSON.parse(storedUser);
    }
  };

  const handleError = () => {
    errorMessage.value = null;
  };

  return {
    token,
    user,
    loading,
    errorMessage,
    isLoggedIn,
    login,
    logout,
    loadTokenFromLocalStorage,
    handleError,
  };
});
