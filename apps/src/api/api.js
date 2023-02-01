import Axios from 'axios';

const BASE_URL = 'http://localhost:5001/api'; // Jean Luc
// const BASE_URL = 'http://localhost:3001/api'; // Ralison
const axios = Axios.create({ baseURL: BASE_URL });

const handleError = async (result) => {
  if (result.data.status === 'success') {
    return result.data;
  } else if (result.data.status === 'error') {
    return result.data;
  } else {
    throw Error(result.data.error);
  }
};
const options = {
    headers: {
      Accept: 'application/json'
    },
  };

export const getAll = async (url) => {
  const result = await axios.get(url, options);
  return  handleError(result)
};

export const addOne = async (url, data) => {
  const result = await axios.post(url, data, options);
  return handleError(result);
};
export const editOne = async (url, data) => {
  const result = await axios.put(url, data, options);
  return handleError(result);
};
export const deleteOne = async (url) => {
  const result = await axios.delete(url, options);
  return handleError(result);
};