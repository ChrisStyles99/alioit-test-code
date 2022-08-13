import { useEffect, useState } from 'react'
import { baseInstance } from '../utils/axiosInstance';

export const useAxiosGet = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getData = async() => {
      try {
        const apiData = await baseInstance.get(url, options);
        setData(apiData.data);
      } catch (error) {
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  //eslint-disable-next-line
  }, []);

  return {
    data, isLoading, isError
  }
}
