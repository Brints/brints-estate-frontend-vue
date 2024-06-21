import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useUserStore = defineStore("user", () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const successMessage = ref("");
  const statusCode = ref(0);
  const user = ref<any>({});
  const phoneNumber = ref("");
  const userEmail = ref("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const signup = async (data: any) => {
    loading.value = true;
    error.value = null;

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
      phoneNumber.value = `${data.value.code}${data.value.phone}`;
      userEmail.value = data.value.email;
      user.value = payload;
      statusCode.value = response.status;

      if (payload) {
        // Save phone number to local storage
        localStorage.setItem("phone", `${data.value.code}${data.value.phone}`);
        // localStorage.setItem("user", JSON.stringify(payload));
        localStorage.setItem("email", data.value.email);
      }

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

      successMessage.value = userData.message;
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
    error.value = null;

    try {
      const response = await axios.post(`${backendUrl}/user/forgot-password`, {
        email,
      });

      const { status } = response;
      const { message } = response.data;
      successMessage.value = message;
      statusCode.value = status;
    } catch (err) {
      const { response } = err;

      const { message } = response.data.error;
      error.value = message;
    } finally {
      loading.value = false;
    }
  };

  const resendOTP = async (email: string) => {
    loading.value = true;
    error.value = null;

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

  const resendEmailToken = async (email: string) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`${backendUrl}/user/resend-verification-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      const data = await response.json();
      successMessage.value = data.message;
    } catch (err) {
      const errorData = JSON.parse(err.message);
      const { message } = errorData.error;
      statusCode.value = errorData.error.statusCode;
      error.value = message;
    } finally {
      loading.value = false;
    }
  };

  const resetPassword = async (token: string, email: string, newPassword: string, confirmPassword: string) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`${backendUrl}/user/reset-password/${token}/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword, confirmPassword }),
      });

      if (newPassword !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      const data = await response.json();
      statusCode.value = data.statusCode;
      successMessage.value = "Password reset successful. Redirecting to login page...";
    } catch (err) {
      const errorData = JSON.parse(err.message);
      const { message } = errorData.error;
      statusCode.value = errorData.error.statusCode;
      error.value = message;
    } finally {
      loading.value = false;
    }
  };

  const loadPhoneNumberFromLocalStorage = () => {
    const storedPhone = localStorage.getItem("phone");
    const storedEmail = localStorage.getItem("email");
    if (storedPhone) {
      phoneNumber.value = storedPhone;
    }
    if (storedEmail) {
      userEmail.value = storedEmail;
    }
  };

  const clearPhoneNumberFromLocalStorage = () => {
    phoneNumber.value = "";
    userEmail.value = "";
    localStorage.removeItem("phone");
    localStorage.removeItem("email");
  };

  const handleError = () => {
    error.value = null;
  };

  return {
    phoneNumber,
    userEmail,
    user,
    statusCode,
    successMessage,
    loading,
    error,
    signup,
    forgotPassword,
    resendOTP,
    handleError,
    resendEmailToken,
    loadPhoneNumberFromLocalStorage,
    clearPhoneNumberFromLocalStorage,
    resetPassword,
  };
});
