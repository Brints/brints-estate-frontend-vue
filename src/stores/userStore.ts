import {defineStore} from "pinia";
import {ref} from "vue";
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
  const errorObject = ref<any | null>(null);
  const successMessage = ref("");
  const statusCode = ref(0);
  const user = ref<any>({});
  const phoneNumber = ref("");
  const userEmail = ref("");

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const signup = async (data: FormData) => {
    loading.value = true;
    errorObject.value = null;

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
        statusCode.value = userData.statusCode;
        user.value = payload;

      if (payload) {
        // Save phone number to local storage
        localStorage.setItem("phone", payload.phone);
        localStorage.setItem("email", payload.email);
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
    } catch (error) {
      const response = error.response.data;
      errorObject.value = response.error;
    } finally {
      loading.value = false;
    }
  };

  const verifyPhone = async (otp: string, phone: string) => {
    loading.value = true;

    try {
      const response = await axios.post(`${BASE_URL}/user/verify-phone`, {
        otp,
        phone
      });

      const { data } = response;
      statusCode.value = data.statusCode;
      successMessage.value = data.message
    } catch (error) {
      const response = error.response;
      const { data } = response;
      errorObject.value = data.error;
    } finally {
      loading.value = false;
    }
  }

  const forgotPassword = async (email: string) => {
    loading.value = true;
    errorObject.value = null;

    try {
      const response = await axios.post(`${BASE_URL}/user/forgot-password`, {
        email,
      });

      const { status } = response;
      const { message } = response.data;
      successMessage.value = message;
      statusCode.value = status;
    } catch (error) {
      const response = error.response.data;
      errorObject.value = response.error;
    } finally {
      loading.value = false;
    }
  };

  const resendOTP = async (email: string) => {
    loading.value = true;
    errorObject.value = null;

    try {
      const response = await axios.post(`${BASE_URL}/user/resend-otp`, {
        email,
      });

      const { data } = response;
      successMessage.value = data.message;
      statusCode.value = data.statusCode;
    } catch (error) {
      const response = error.response.data;
      errorObject.value = response.error;
    } finally {
      loading.value = false;
    }
  };

  const resendEmailToken = async (email: string) => {
    loading.value = true;
    errorObject.value = null;

    try {
      const response = await axios.post(`${BASE_URL}/user/resend-verification-token`, {
        email
      });

      const { data } = response
      statusCode.value = data.statusCode;
      successMessage.value = data.message;
    } catch (error) {
      const response = error.response.data;
      errorObject.value = response.error;
    } finally {
      loading.value = false;
    }
  };

  const resetPassword = async (token: string, email: string, newPassword: string, confirmPassword: string) => {
    loading.value = true;
    errorObject.value = null;

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
    } catch (error) {
      const response = error.response;
      const { data } = response;
      errorObject.value = data.error;
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
    errorObject.value = null;

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${BASE_URL}/user/change-password`,
        {
          oldPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { status, data } = response;
      statusCode.value = status;
      successMessage.value = data.message;
    } catch (error) {
      const response = error.response;
      const { data } = response;
      errorObject.value = data.error;
    } finally {
      loading.value = false;
    }
  };

  const VerifyEmail = async (token: string, email: string) =>{
    const url = `${BASE_URL}/user/verify-email?token=${token}&email=${email}`;

    try {
      const response = await axios.get(url, { email });

      const { data } = response;
      statusCode.value = data.statusCode;
      successMessage.value = data.message;

    } catch (error) {
      const response = error.response;
      const { data } = response;
      errorObject.value = data.error;
    } finally {
      loading.value = false;
    }
  }

  const handleError = () => {
    errorObject.value = null;
  };

  return {
    phoneNumber,
    userEmail,
    user,
    loading,
    errorObject,
      statusCode,
      successMessage,
    signup,
    forgotPassword,
    resendOTP,
    handleError,
    resendEmailToken,
    loadPhoneNumberFromLocalStorage,
    clearPhoneNumberFromLocalStorage,
    resetPassword,
    changePassword,
    verifyPhone,
    VerifyEmail
  };
});
