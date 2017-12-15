Vue.component("inputTag", InputTag);

Vue.component('inputTags', {
  template: `<div>
               <input-tag :on-change="tagChanged" :tags="tags"></input-tag>
             </div>`,
  data: function() {
    return {
      currentTags: []
    }
  },
  props: ['tags'],
  created: function() {
    this.tags.forEach(t => this.currentTags.push(t));
  },
  methods: {
    tagChanged: function (tags) {
      if (tags.length < this.currentTags.length) {
        var deleted = getDeletedTag(this.currentTags, tags);
        this.currentTags.splice(this.currentTags.indexOf(deleted), 1)
        return this.$emit('tag-deleted', deleted);
      }
      var added = getAddedTag(this.currentTags, tags);
      this.currentTags.push(added);
      this.$emit('tag-added', added);
    }
  }
});

function getDeletedTag(current, changed) {
  for (var tag of current) {
    if (changed.indexOf(tag) === -1) {
      return tag;
    }
  }
}

function getAddedTag(current, changed) {
  for (var tag of changed) {
    if (current.indexOf(tag) === -1) {
      return tag;
    }
  }
}
