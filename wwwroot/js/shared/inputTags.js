Vue.component("inputTag", InputTag);

Vue.component('inputTags', {
  template: `<input-tag :on-change="tagChanged" :tags="tags"></input-tag>`,
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
  },
  watch: {
    tags: function(previous, next) {
      if (this.tags.length === this.currentTags.length) {
        console.log("THINGS ARE EQUAL");
        console.log("TAGS", this.tags.length);
        console.log("CURRENT", this.currentTags.length);
        return;
      }
      this.tagChanged(this.tags);

      console.log("PREVIOUS", previous.length);
      console.log("NEXT", next.length);
      console.log("TAGS", this.tags.length);
      console.log("CURRENT", this.currentTags.length);
      // this.tagChanged(previous);
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
