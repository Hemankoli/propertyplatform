import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const getLogin = async (data) => {
  try {
    const res = await axios.get(`${API_URL}/login`, data);
    return res.data;
  } catch (error) {
    console.error("Error while login user:", error);
  }
};

export const getRegister = async (data) => {
  try {
    const res = await axios.get(`${API_URL}/register`, data);
    return res.data;
  } catch (error) {
    console.error("Error while registering user:", error);
  }
};

export const createProperty = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/create-property`, data);
    return res.data;
  } catch (error) {
    console.error("Error while creating property:", error);
  }
};

export const editProperty = async (propertyId, data) => {
  try {
    const res = await axios.put(`${API_URL}/edit-property/${propertyId}`, data);
    return res.data;
  } catch (error) {
    console.error("Error while creating property:", error);
  }
};

export const deleteProperty = async (propertyId) => {
  try {
    const res = await axios.delete(`${API_URL}/delete-property/${propertyId}`);
    return res.data;
  } catch (error) {
    console.error("Error while deleting property:", error);
  }
};

export const bookingProperty = async (amount) => {
  try {
    const res = await axios.post(`${API_URL}/make-payment`, { amount });
    return res;
  } catch (error) {
    console.error("Error while creating property:", error);
  }
};

export const verifyPayment = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/verify-payment`, { data });
    return res.data;
  } catch (error) {
    console.error("Error while verifying payment:", error);
  }
};