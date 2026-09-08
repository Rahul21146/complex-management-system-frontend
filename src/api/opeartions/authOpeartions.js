import { apiConnector } from "../apiConnecter";
import { api } from "../api";

/*
==================================================
REGISTER
==================================================
*/

export const register = async (data, setLoading) => {
  setLoading(true);

  try {
    const response = await apiConnector(
      "POST",
      api.auth.register,
      data
    );

    return response;
  } catch (error) {
    console.error(
      "Register API Error:",
      error.response?.data || error.message
    );

    throw error;
  } finally {
    setLoading(false);
  }
};


/*
==================================================
SEND OTP
==================================================
*/

export const sendOTP = async (data, setLoading) => {
  setLoading(true);

  try {
    const response = await apiConnector(
      "POST",
      api.auth.sendOTP,
      data
    );

    return response;
  } catch (error) {
    console.error(
      "Send OTP API Error:",
      error.response?.data || error.message
    );

    throw error;
  } finally {
    setLoading(false);
  }
};


/*
==================================================
VERIFY OTP
==================================================
*/

export const verifyOTP = async (data, setLoading) => {
  setLoading(true);

  try {
    const response = await apiConnector(
      "POST",
      api.auth.verifyOTP,
      data
    );

    return response;
  } catch (error) {
    console.error(
      "Verify OTP API Error:",
      error.response?.data || error.message
    );

    throw error;
  } finally {
    setLoading(false);
  }
};


/*
==================================================
LOGIN
==================================================
*/

export const login = async (data, setLoading) => {
  setLoading(true);

  try {
    const response = await apiConnector(
      "POST",
      api.auth.login,
      data
    );

    return response;
  } catch (error) {
    console.error(
      "Login API Error:",
      error.response?.data || error.message
    );

    throw error;
  } finally {
    setLoading(false);
  }
};


/*
==================================================
FORGOT PASSWORD
==================================================
*/

export const forgotPassword = async (data, setLoading) => {
  setLoading(true);

  try {
    const response = await apiConnector(
      "POST",
      api.auth.forgotPassword,
      data
    );

    return response;
  } catch (error) {
    console.error(
      "Forgot Password API Error:",
      error.response?.data || error.message
    );

    throw error;
  } finally {
    setLoading(false);
  }
};


/*
==================================================
RESET PASSWORD
==================================================
*/

export const resetPassword = async (data, setLoading) => {
  setLoading(true);

  try {
    const response = await apiConnector(
      "POST",
      api.auth.resetPassword,
      data
    );

    return response;
  } catch (error) {
    console.error(
      "Reset Password API Error:",
      error.response?.data || error.message
    );

    throw error;
  } finally {
    setLoading(false);
  }
};


/*
==================================================
CHANGE PASSWORD
==================================================
*/

export const changePassword = async (data, token, setLoading) => {
  setLoading(true);

  try {
    const response = await apiConnector(
      "POST",
      api.auth.changePassword,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    return response;
  } catch (error) {
    console.error(
      "Change Password API Error:",
      error.response?.data || error.message
    );

    throw error;
  } finally {
    setLoading(false);
  }
};