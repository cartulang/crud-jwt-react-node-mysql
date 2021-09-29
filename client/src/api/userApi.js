import axios from "axios";

const baseUrl = "http://localhost:3001";

export const signup = async user => {
  try {
    return await axios.post(`${baseUrl}/user/signup`, user);
  } catch (error) {
    return error.response;
  }
};

export const login = async user => {
  try {
    return await axios.post(`${baseUrl}/user/login`, user, {
      withCredentials: true,
    });
  } catch (error) {
    return error.response;
  }
};
