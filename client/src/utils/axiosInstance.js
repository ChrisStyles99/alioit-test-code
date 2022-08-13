import axios from 'axios';

export const footballInstance = axios.create({
  baseURL: 'https://api-football-standings.azharimm.site'
});

export const baseInstance = axios.create({
  baseURL: 'http://localhost:5000'
});