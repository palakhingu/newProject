import axios from "axios";
const ApiService = {
  baseURL: "http://192.168.1.25:8010/Api/PDMS",
  get(endPoint, params) {
    return axios.get(`${this.baseURL}/${endPoint}`, { params });
  },
  post(endPoint, data) {
    return axios.post(`${this.baseURL}/${endPoint}`, data);
  },
  put(endPoint, data) {
    return axios.put(`${this.baseURL}/${endPoint}`, data);
  },
  delete(endPoint) {
    return axios.delete(`${this.baseURL}/${endPoint}`);
  },
};
export default ApiService;
