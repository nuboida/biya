const auth = {
  isAuthenticated() {
    if (typeof window == "undefined")
      return false
    if (sessionStorage.getItem('user')){
        return JSON.parse(sessionStorage.getItem('user')!)
      }
    else
      return false
  },
  clearJWT(cb: Function) {
    if (typeof window !== "undefined"){
      sessionStorage.removeItem('user');
      cb();
    }
  },

}

export default auth;
