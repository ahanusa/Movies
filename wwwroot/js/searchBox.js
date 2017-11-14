Vue.component('searchBox', {
  template: `<div class="searchBox" for="search">
              <label for="search" class="fa fa-search fa-3" aria-hidden="true"></label>
              <input id="search"
                     type="text"
                     v-on:keyup="onTextEntered($event)"
                     v-on:click="onSelectAllText($event)" />
             </div>`,
  methods: {
    onSelectAllText: function(event) {
      event.target.select();
    },
    onTextEntered: function(event) {
      this.$emit('text-entered', event.target.value);
    },
    onKeyEntered: function(event) {
      this.$emit('key-entered', event.target.value);
    }
  }
});