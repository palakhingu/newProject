import axios from "axios";

const API_URL = "http://192.168.1.25:8010/Api/PDMS";

class AuthService {
  login(credentials) {
    return axios.post(`${API_URL}/Login`, credentials);
  }

  logout() {
    localStorage.clear();
  }

  getUserInfo() {
    return localStorage.getItem("token");
  }
}

export default new AuthService();
