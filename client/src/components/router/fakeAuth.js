const fakeAuth = {
  isAuthenticated: false,
  signIn() {
    this.isAuthenticated = true
  },
  signOut() {
    this.isAuthenticated = false
  }
}

export default fakeAuth
