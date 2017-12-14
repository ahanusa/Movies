Vue.component("inputTag", InputTag);

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
                 <input-tag :on-change="categoryChanged" :tags="preferences.categories"></input-tag>
               </div>
             </div>`,
  props: ['preferences'],
  methods: {
    propChanged: function(event) {
      this.$emit('pref-changed', event.target.id, event.target.value);
    },
    categoryChanged: function(values) {
      this.$emit('pref-changed', 'categories', values);
    }
  }
});