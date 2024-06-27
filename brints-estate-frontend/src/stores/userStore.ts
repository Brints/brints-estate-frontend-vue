import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

interface FormData {
  fullname: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
  avatar?: File;
  confirmPassword: string;
  code: string;
}

export const useUserStore = defineStore("user", () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const successMessage = ref("");
  const statusCode = ref(0);
  const user = ref<any>({});
  const phoneNumber = ref("");
  const userEmail = ref("");

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const signup = async (data: FormData) => {
    loading.value = true;
    error.value = null;

    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    formData.append("gender", data.gender);
    formData.append("avatar", data.avatar);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("code", data.code);

    try {
      const response = await axios.post(`${BASE_URL}/user/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const userData = response.data;
      const payload = userData.payload;
      phoneNumber.value = `${data.code}${data.phone}`;
      userEmail.value = data.email;
      user.value = payload;
      statusCode.value = response.status;

      if (payload) {
        // Save phone number to local storage
        localStorage.setItem("phone", `${data.code}${data.phone}`);
        // localStorage.setItem("user", JSON.stringify(payload));
        localStorage.setItem("email", data.email);
      }

      // Reset the form data
      if (userData.statusCode === 201) {
        data.fullname = "";
        data.email = "";
        data.password = "";
        data.phone = "";
        data.gender = "";
        data.avatar = null;
        data.confirmPassword = "";
        data.code = "";
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
      const response = await axios.post(`${BASE_URL}/user/forgot-password`, {
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
      const response = await axios.post(`${BASE_URL}/user/resend-otp`, {
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
      const response = await fetch(`${BASE_URL}/user/resend-verification-token`, {
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

    if (newPassword !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    try {
      const response = await fetch(`${BASE_URL}/user/reset-password/${token}/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword, confirmPassword }),
      });

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

  const changePassword = async (oldPassword: string, newPassword: string, confirmPassword: string) => {
    loading.value = true;
    error.value = null;

    if (newPassword !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    if (newPassword.length < 10) {
      throw new Error("Password must be at least 10 characters");
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    if (!regex.test(newPassword)) {
      throw new Error(
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      );
    }

    try {
      const response = await axios.post(`${BASE_URL}/user/change-password`, {
        oldPassword,
        newPassword,
        confirmPassword,
      });

      const { status } = response;
      statusCode.value = status;
      successMessage.value = response.data;
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
    changePassword,
  };
});
