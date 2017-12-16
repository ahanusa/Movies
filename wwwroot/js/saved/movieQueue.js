let arrowUp = "fa fa-arrow-circle-up";
let arrowDown = "fa fa-arrow-circle-down";
let queueDown = "queued-movies down";
let queueUp = "queued-movies up";

Vue.component('movieQueue', {
  template: `<div>
               <div class="toggle-view" v-on:click="toggleView">
                 <i v-bind:class="directionSymbol" aria-hidden="true"></i>
               </div>
               <div v-bind:class="queueClass">
                 <div class="queued-movie loaded" v-for="movie in movies">
                   <i class="action-button right fa fa-remove"
                      v-bind:id="movie.id"
                      v-on:click="removeMovie($event.target)"
                      aria-hidden="true">
                   </i>
                   <img v-bind:alt="movie.title"
                        v-bind:id="movie.id"
                        v-bind:class="{ noImage: !movie.imageUrl, queued : true }"
                        v-bind:src="movie.imageUrl" />
                 </div>
               </div>
             </div>`,
  data: function() {
    return {
      directionSymbol: arrowUp,
      queueClass: queueDown,
      isExpanded: false
    };
  },
  props: ['movies'],
  methods: {
    removeMovie: function(movie) {
      this.$emit("delete-request", movie.id);
    },
    toggleView: function() {
      if (this.isExpanded) return this.collapse();
      this.expand();
    },
    collapse: function() {
      this.isExpanded = false;
      this.directionSymbol = arrowUp;
      this.queueClass = queueDown;
    },
    expand: function() {
      this.isExpanded = true;
      this.directionSymbol = arrowDown;
      this.queueClass = queueUp;
    }
  },
  watch: {
    movies: function(previous, next) {
      if (this.movies.length) return this.expand();
      this.collapse();
    }
  }
});