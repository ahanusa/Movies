var app = new Vue({
  el: '#app',
  data: {
    movies: [],
    queuedMovies: []
  },
  created: function() {
    let endpoint = "/api/movies";
    axios.get(endpoint).then(response => app.movies = response.data.map(mapData));
  },
  methods: {
    search: function(searchText) {
      // TODO filter against existing movies
      if (searchText && searchText.trim().length > 0) {
        return this.queuedMovies.filter(m => m.startsWith(searchText));
      } else {
        return this.queuedMovies;
      }
    },
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
