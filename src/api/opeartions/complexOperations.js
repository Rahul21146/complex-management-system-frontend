import { apiConnector } from "../apiConnecter";
import { api } from "../api";

/*
==================================================
CREATE COMPLEX
==================================================
*/

export const createComplex = async (data, setLoading) => {
  setLoading(true);

  try {
    const response = await apiConnector(
      "POST",
      api.complex.create,
      data
    );

    return response;
  } catch (error) {
    console.error(
      "Create Complex API Error:",
      error.response?.data || error.message
    );

    throw error;
  } finally {
    setLoading(false);
  }
};


/*
==================================================
GET MY COMPLEXES
==================================================
*/

export const getMyComplexes = async (setLoading) => {
  setLoading(true);

  try {
    const response = await apiConnector(
      "GET",
      api.complex.getMyComplexes
    );

    return response;
  } catch (error) {
    console.error(
      "Get My Complexes API Error:",
      error.response?.data || error.message
    );

    throw error;
  } finally {
    setLoading(false);
  }
};


/*
==================================================
UPDATE COMPLEX
==================================================
*/

export const updateComplex = async (id, data, setLoading) => {
  setLoading(true);

  try {
    const response = await apiConnector(
      "PUT",
      api.complex.update(id),
      data
    );

    return response;
  } catch (error) {
    console.error(
      "Update Complex API Error:",
      error.response?.data || error.message
    );

    throw error;
  } finally {
    setLoading(false);
  }
};


/*
==================================================
MAKE COMPLEX INACTIVE
==================================================
*/

export const inactiveComplex = async (id, setLoading) => {
  setLoading(true);

  try {
    const response = await apiConnector(
      "PATCH",
      api.complex.inactive(id)
    );

    return response;
  } catch (error) {
    console.error(
      "Inactive Complex API Error:",
      error.response?.data || error.message
    );

    throw error;
  } finally {
    setLoading(false);
  }
};