export default {
  save (key, val) {
    localStorage.setItem(key, JSON.stringify(val))
  },
  fetch (key) {
    return JSON.parse(localStorage.getItem(key)) || []
  }
}
