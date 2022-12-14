import { useEffect, useState } from 'react';
import { footballInstance } from '../utils/axiosInstance';

export const useAxiosFootball = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getData = async() => {
      try {
        const apiData = await footballInstance.get(url, options);
        setData(apiData.data.data);
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