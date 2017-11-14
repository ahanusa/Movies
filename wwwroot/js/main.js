var app = new Vue({
  el: '#app',
  data: {
    movies: [],
    selectedMovie: null,
  },
  methods: {
    search: function(searchText) {
      if (searchText && searchText.trim().length > 0) {
        let prefs = JSON.parse(window.localStorage.getItem('preferences'));
        let endpoint = url(searchText, prefs.apiKey);
        axios.get(endpoint).then(response => app.movies = response.data.results.map(mapData));
      } else {
        app.movies = [];
        app.selectedId = null;
      }
    },
    setMovie: function(movieId) {
      var movie = this.movies.find(m => m.id == movieId);
      movie.isSelected = true;
      this.selectedMovie = movie;
      this.movies.filter(m => m.id != movieId).forEach(m => m.isSelected = false);
    },
    addMovie: function(movieId) {
      var movie = this.movies.find(m => m.id == movieId);
      var endpoint = "/api/movies";
      axios.post(endpoint, movie)
        .then(() => alertify.success("Movie Saved"));
    },
  }
});

function url(movie, apiKey) {
  return `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movie}&page=1&include_adult=false`;
}

function imageUrl(image) {
  if (!image) return null;
  return `https://image.tmdb.org/t/p/w154/${image}`;
}

function mapData(movie) {
  return {
    id: movie.id,
    imageUrl: imageUrl(movie.poster_path),
    title: movie.title,
    releaseDate: movie.release_date,
    overview: movie.overview,
    isSelected: false
  };
}
