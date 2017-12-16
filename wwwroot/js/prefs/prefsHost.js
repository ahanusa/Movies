var app = new Vue({
  el: "#app",
  data: {
    preferences: ''
  },
  created: function() {
    let endpoint = "/api/categories";
    axios.get(endpoint).then(response => {
      let prefs = window.localStorage.getItem('preferences');
      this.preferences = JSON.parse(prefs) || {};
      this.preferences.categories = response.data;
    });
  },
  methods: {
    savePreferences: function(key, value) {
      if (key) {
        this.preferences[key] = value;
        window.localStorage.setItem('preferences', JSON.stringify(this.preferences));
      }
    },
    addCategory: function(value) {
      let endpoint = `/api/categories/`;
      axios.post(endpoint, { name: value }).then(response => {
        this.preferences.categories.push(response.data);
      });
    },
    deleteCategory: function(categoryName) {
      let cat = this.preferences.categories.find(c => c.name === categoryName);
      let endpoint = `/api/categories/${cat.id}`;
      axios.delete(endpoint).then(response => {
        this.preferences.categories.splice(this.preferences.categories.indexOf(cat), 1);
      });
    }
  }
});