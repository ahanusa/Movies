var app = new Vue({
  el: "#app",
  data: {
    preferences: ''
  },
  created: function() {
    let prefs = window.localStorage.getItem('preferences');
    this.preferences = JSON.parse(prefs) || {};
  },
  methods: {
    savePreferences: function(key, value) {
      if (key) {
        this.preferences[key] = value;
        window.localStorage.setItem('preferences', JSON.stringify(this.preferences));
      }
    }
  }
});