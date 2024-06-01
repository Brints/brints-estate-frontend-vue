import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useUserStore = defineStore("user", () => {
  const phoneNumber = ref("");
  const loading = ref(false);
  const error = ref(null);

  const url = import.meta.env.VITE_BACKEND_URL;

  const signup = async (data: any) => {
    const formData = new FormData();
    formData.append("fullname", data.value.fullname);
    formData.append("email", data.value.email);
    formData.append("password", data.value.password);
    formData.append("phone", data.value.phone);
    formData.append("gender", data.value.gender);
    formData.append("avatar", data.value.avatar);
    formData.append("confirmPassword", data.value.confirmPassword);
    formData.append("code", data.value.code);
    loading.value = true;
    try {
      loading.value = true;

      // Call your API here
      // const response = await fetch(`${url}/user/register`, {
      //   method: "POST",
      //   body: formData,
      //   headers: {
      //     Accept: "multipart/form-data"
      //   }
      // })

      // const responseData = await response.json();

      const response = await axios.post(`${url}/user/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const userData = response.data;
      const payload = userData.payload;
      phoneNumber.value = payload.phone;

      // Reset the form data
      if (userData.statusCode === 201) {
        data.value.fullname = "";
        data.value.email = "";
        data.value.password = "";
        data.value.phone = "";
        data.value.gender = "";
        data.value.avatar = null;
        data.value.confirmPassword = "";
        data.value.code = "";
      }
    } catch (error) {
      console.error(error);
      const response = error.response.data;
      error.value = response.error.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    phoneNumber,
    loading,
    error,
    signup,
  };
});
