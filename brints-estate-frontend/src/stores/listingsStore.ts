import { defineStore } from "pinia";
import { ref } from "vue";

export const useListingsStore = defineStore("listings", () => {
  const loading = ref(false);
  const errorMessage = ref<string | null>(null);
  const listings = ref<any[]>([]);
  const selectedListing = ref<any | null>(null);
  const statusCode = ref(0);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchListings = (token: string) => {
    loading.value = true;

    fetch(`${backendUrl}/listing/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          const errorData = response.json();
          throw new Error(JSON.stringify(errorData));
        }
        return response.json();
      })
      .then((data) => {
        listings.value.push(...data.payload);
      })
      .catch((error: Error) => {
        const errorData = JSON.parse(error.message);
        const { message } = errorData.error;
        statusCode.value = errorData.error.statusCode;
        errorMessage.value = message;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  return {
    loading,
    errorMessage,
    listings,
    selectedListing,
    fetchListings,
  };
});
