import { jwtDecode } from "jwt-decode";

const auth = {
  isAuthenticated() {
    if (typeof window == "undefined")
      return false

    if (sessionStorage.getItem('user'))
      if(this.isTokenExpired()) {
        return false;
      } else {
        return JSON.parse(sessionStorage.getItem('user')!)
      }
    else
      return false
  },

  isTokenExpired() {
    const user = JSON.parse(sessionStorage.getItem('user')!)['data'];
    const token = user['authToken'];
    if(jwtDecode(token).exp! < Date.now() / 1000) {
      sessionStorage.clear();
      return true;
    }
    return false;
  },

  clearJWT(cb: Function) {
    if (typeof window !== "undefined"){
      sessionStorage.removeItem('user');
      cb();
    }
  },

}

export default auth;
