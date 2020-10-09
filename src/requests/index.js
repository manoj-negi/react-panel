import axios from 'axios';

const API = axios.create({
  baseURL: "https://erp-jserver.herokuapp.com",
})

export default API;
