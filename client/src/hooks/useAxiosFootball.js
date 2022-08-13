import axios from 'axios';
import { useEffect, useState } from 'react';

const footballInstance = axios.create({
  baseURL: 'https://api-football-standings.azharimm.site'
});

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