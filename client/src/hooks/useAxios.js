import axios from 'axios';

const baseInstance = axios.create({
  baseURL: 'http://localhost:5000'
});

export const useAxios = (url, options) => {
  const postData = async(dataPost) => {
    let data = null;
    let isError = false;
    let isLoading = true;

    try {
      data = await baseInstance.post(url, dataPost, options);
    } catch (error) {
      console.log(error);
      isError = error;
    } finally {
      isLoading = false;
    }

    return {
      data, isError, isLoading
    }
  }

  return {
    postData
  }
}