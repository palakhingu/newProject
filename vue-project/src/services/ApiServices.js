import axios from "axios";
const ApiService = {
  baseURL: "http://192.168.1.25:8010/Api/PDMS",
  get(endPoint, auth) {
    return axios.get(`${this.baseURL}/${endPoint}`, auth);
  },
  post(endPoint, data, auth) {
    return axios.post(`${this.baseURL}/${endPoint}`, data, auth);
  },
  put(endPoint, data) {
    return axios.put(`${this.baseURL}/${endPoint}`, data);
  },
  delete(endPoint,auth) {
    return axios.delete(`${this.baseURL}/${endPoint}`, auth);
  },
};
export default ApiService;
