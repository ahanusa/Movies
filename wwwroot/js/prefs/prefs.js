Vue.component('prefs', {
  template: `<div class='prefs'>
               <label>API Key</label>
               <input type='text'
                 id="apiKey"
                 v-on:change=propChanged($event)
                 v-bind:value=preferences.apiKey />
             </div>`,
  props: ['preferences'],
  methods: {
    propChanged: function(event) {
      this.$emit('pref-changed', event.target.id, event.target.value);
    }
  }
});