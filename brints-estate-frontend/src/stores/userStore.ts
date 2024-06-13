import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useUserStore = defineStore("user", () => {
  // const phoneNumber = ref("");
  const loading = ref(false);
  const error = ref<string | null>(null);
  const successMessage = ref("");
  const statusCode = ref(0);
  // const userEmail = ref("");
  const user = ref<any>({});

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const signup = async (data: any) => {
    loading.value = true;

    const formData = new FormData();
    formData.append("fullname", data.value.fullname);
    formData.append("email", data.value.email);
    formData.append("password", data.value.password);
    formData.append("phone", data.value.phone);
    formData.append("gender", data.value.gender);
    formData.append("avatar", data.value.avatar);
    formData.append("confirmPassword", data.value.confirmPassword);
    formData.append("code", data.value.code);

    try {
      const response = await axios.post(`${backendUrl}/user/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const userData = response.data;
      const payload = userData.payload;
      user.value = payload;
      statusCode.value = response.status;

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
    } catch (e) {
      const response = e.response.data;
      error.value = response.error.message;
      statusCode.value = response.error.statusCode;
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

  const resendOTP = async (email: string) => {
    loading.value = true;

    try {
      const response = await axios.post(`${backendUrl}/user/resend-otp`, {
        email,
      });

      const { status } = response;
      const userData = response.data;
      const payload = userData.payload;
      user.value = payload;
      successMessage.value = userData.message;
      statusCode.value = status;
    } catch (e) {
      const response = e.response;
      const { message } = response.data.error;
      error.value = message;
    } finally {
      loading.value = false;
    }
  };

  const handleError = () => {
    error.value = null;
  };

  return {
    user,
    statusCode,
    successMessage,
    loading,
    error,
    signup,
    forgotPassword,
    resendOTP,
    handleError,
  };
});
