class AuthService {
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("Userid");
  }

  getUserInfo() {
    return localStorage.getItem("token");
  }
}

export default new AuthService();
