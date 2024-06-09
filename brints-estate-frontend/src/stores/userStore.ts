import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { stat } from "fs";

export const useUserStore = defineStore("user", () => {
  const phoneNumber = ref("");
  const loading = ref(false);
  const error = ref(null);
  const successMessage = ref("");
  const statusCode = ref(0);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

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

      const response = await axios.post(`${backendUrl}/user/register`, formData, {
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

  const forgotPassword = async (email: string) => {
    loading.value = true;

    try {
      const response = await axios.post(`${backendUrl}/user/forgot-password`, {
        email,
      });

      const { status } = response;
      const { message } = response.data;
      successMessage.value = message;
      statusCode.value = status;
    } catch (e) {
      // const response = e.response;
      // const { message } = response.data.error;
      // error.value = message;
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  return {
    statusCode,
    successMessage,
    phoneNumber,
    loading,
    error,
    signup,
    forgotPassword,
  };
});
