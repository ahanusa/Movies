Vue.component("inputTag", InputTag);

Vue.component('prefs', {
  template: `<div class='prefs'>
               <label>API Key</label>
               <input type='text'
                 id="apiKey"
                 v-on:change=propChanged($event)
                 v-bind:value=preferences.apiKey />
               <label>Categories</label>
               <input-tag :on-change="callbackMethod" :tags="preferences.categories"></input-tag>
             </div>`,
  props: ['preferences'],
  methods: {
    propChanged: function(event) {
      this.$emit('pref-changed', event.target.id, event.target.value);
    }
  }
});