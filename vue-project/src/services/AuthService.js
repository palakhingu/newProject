class AuthService {
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("UserId");
  }

  getUserInfo() {
    return localStorage.getItem("token");
  }
}

export default new AuthService();
