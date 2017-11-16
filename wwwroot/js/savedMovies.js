var app = new Vue({
  el: '#app',
  data: {
    movies: [],
    queuedMovies: [],
    searchText: ''
  },
  created: function() {
    let endpoint = "/api/movies";
    axios.get(endpoint).then(response => app.movies = _.sortBy(response.data.map(mapData), "title"));
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
    deleteMovie: function(movieId) {
      let endpoint = `/api/movies/${movieId}`;
      axios.delete(endpoint).then(response => {
        var movie = this.movies.find(m => m.id == movieId);
        this.movies.splice(this.movies.indexOf(movie), 1);
      });
    }
  },
  computed: {
    filteredMovies: function() {
      if (!this.searchText) { return this.movies }
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
