var app = new Vue({
  el: '#app',
  data: {
    movies: [],
    categories: [],
    movieCategories: [],
    queuedMovies: [],
    searchText: '',
    showModal: false,
    deleteId: null,
    selectedMovies: new Map(),
    selectedCategories: []
  },
  created: function() {
    let moviesEndpoint = "/api/movies";
    let categoriesEndpoint = "/api/categories";
    let movieCategoriesEndpoint = "/api/movieCategories";
    axios.get(moviesEndpoint).then(response => app.movies = _.sortBy(response.data.map(mapData), "title"));
    axios.get(categoriesEndpoint).then(response => app.categories = _.sortBy(response.data, "name"));
    axios.get(movieCategoriesEndpoint).then(response => {
      app.movieCategories = response.data;
      console.log("MOVIE CATS", app.movieCategories);
    });
  },
  methods: {
    addToQueue: function(movieId) {
      var movie = this.movies.find(m => m.id == movieId);
      if (this.queuedMovies.indexOf(movie) === -1) {
        this.queuedMovies.push(movie);
      }
    },
    removeFromQueue: function(movieId) {
      var movie = this.queuedMovies.find(m => m.id == movieId);
      this.queuedMovies.splice(this.queuedMovies.indexOf(movie), 1);
    },
    confirmDelete: function(movieId) {
      this.deleteId = movieId;
      this.showModal = true;
    },
    selectMovie: function(movieId) {
      var movie = this.movies.find(m => m.id == movieId);
      movie.isSelected = !movie.isSelected;
      this.getSelectedMovies();
    },
    getSelectedMovies: function() {
      console.log("SELECTED: ", this.movies.filter(m => m.isSelected));
    },
    getSelectedCategories: function() {
      return this.selectedCategories.map(c => c.name);
    },
    categorySelected: function(e) {
      var category = this.categories.find(c => c.id == e.target.value);
      this.selectedCategories.push(category);
    },
    removeSelectedTag: function(category) {
      var cat = this.categories.find(c => c.name == category);
      this.selectedCategories.splice(this.selectedCategories.indexOf(cat), 1);
    },
    deleteMovie: function(result) {
      this.showModal = false;
      if (result) {
        let movieId = this.deleteId;
        let endpoint = `/api/movies/${movieId}`;
        axios.delete(endpoint).then(response => {
          var movie = this.movies.find(m => m.id == movieId);
          this.movies.splice(this.movies.indexOf(movie), 1);
        });
      }
    }
  },
  computed: {
    filteredMovies: function() {
      if (!this.searchText) { return this.movies }
      if (this.searchText.length === 1) {
        return this.movies.filter(movie => {
          return movie.title.toLowerCase().replace("the ", "").startsWith(this.searchText.toLowerCase());
        });
      }
      return this.movies.filter(movie => {
        return movie.title.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
      });
    }
  }
});

function mapData(movie) {
  return {
    id: movie.id,
    imageUrl: movie.imageUrl,
    title: movie.title,
    releaseDate: movie.releaseDate,
    overview: movie.overview,
    isSelected: false,
    canDelete: true
  };
}
