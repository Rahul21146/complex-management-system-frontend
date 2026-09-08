const API_URL = import.meta.env.VITE_API_URL;

export const api = {
  auth: {
    register: `${API_URL}/register`,
    sendOTP: `${API_URL}/auth/send-otp`,
    verifyOTP: `${API_URL}/auth/verify-otp`,
    login: `${API_URL}/auth/login`,
    forgotPassword: `${API_URL}/auth/forgot-password`,
    resetPassword: `${API_URL}/auth/reset-password`,
    changePassword: `${API_URL}/auth/change-password`,
  },

  complex: {
    create: `${API_URL}/createcomplex`,
    getMyComplexes: `${API_URL}/getcomplex`,
    update: (id) => `${API_URL}/updatecomplex/${id}`,
    inactive: (id) => `${API_URL}/complex/${id}/inactive`,
  },
};