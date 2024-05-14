import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const phoneNumber = ref("");

  return {
    phoneNumber,
  };
});
