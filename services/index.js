const axios = require("axios");

export const makeGetRequest = async (url) => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const response = await axios.get(url, {
        headers: { Authorization: token },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
};

export const makePostRequest = async (url, body) => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const response = await axios.post(url, body, {
        headers: { Authorization: token },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
};
