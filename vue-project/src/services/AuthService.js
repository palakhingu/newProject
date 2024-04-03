class AuthService {
  logout() {
    localStorage.clear();
  }

  getUserInfo() {
    return localStorage.getItem("token");
  }
}

export default new AuthService();
