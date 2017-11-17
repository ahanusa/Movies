Vue.component('moviesList', {
  template: `<div>
                <div class="movie" v-for="movie in movies">
                  <i class="action-button fa fa-minus"
                     v-if="movie.canDelete"
                     v-bind:id="movie.id"
                     v-on:click="deleteMovie($event.target)"
                     aria-hidden="true">
                  </i>
                  <i class="action-button right fa fa-plus"
                     v-bind:id="movie.id"
                     v-on:click="addMovie($event.target)"
                     aria-hidden="true">
                  </i>
                  <img v-bind:alt="movie.title"
                      v-bind:id="movie.id"
                      v-bind:class="{ noImage: !movie.imageUrl, selected: movie.isSelected }"
                      v-bind:src="movie.imageUrl"
                      v-on:click="selectMovie($event.target)" />
                </div>
            </div>`,
  props: ['movies'],
  methods: {
    selectMovie: function(movie) {
      this.$emit('movie-selected', movie.id);
    },
    addMovie: function(movie) {
      this.$emit('add-request', movie.id);
    },
    deleteMovie: function(movie) {
      this.$emit('delete-request', movie.id);
    }
  }
});