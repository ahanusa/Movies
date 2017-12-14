Vue.component('prefs', {
  template: `<div class='prefs'>
               <div>
                 <label>API Key</label>
                 <input type='text'
                   id="apiKey"
                   v-on:change=propChanged($event)
                   v-bind:value=preferences.apiKey />
               </div>
               <div>
                 <label>Categories</label>
                 <input-tags
                   v-bind:tags="getCategories()"
                   v-on:tag-added="categoryAdded"
                   v-on:tag-deleted="categoryDeleted" >
                 </input-tags>
               </div>
             </div>`,
  props: ['preferences'],
  methods: {
    getCategories: function() {
      return this.preferences.categories.map(c => c.name);
    },
    propChanged: function(event) {
      this.$emit('pref-changed', event.target.id, event.target.value);
    },
    categoryAdded: function(value) {
      this.$emit('category-added', value);
    },
    categoryDeleted: function(value) {
      this.$emit('category-deleted', value);
    }
  }
});
