import { baseInstance } from '../utils/axiosInstance';

export const useAxiosPost = (url, options) => {
  const postData = async(dataPost) => {
    let data = null;
    let isError = false;
    let isLoading = true;

    try {
      data = await baseInstance.post(url, dataPost, options);
    } catch (error) {
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