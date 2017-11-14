Vue.component('movie-details', {
  template: `<div>
               <h3>{{ movie.title }} ({{ new Date(movie.releaseDate).getFullYear() }})</h3>
               <p>{{ movie.overview }}</p>
             </div>`,
  props: ['movie']
});