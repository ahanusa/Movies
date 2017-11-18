Vue.component('modal', {
  template: `<transition name="modal">
  <div class="modal-mask" v-show="show">
      <div class="modal-container">
          <div class="modal-header">
              <h3>Are you sure?</h3>
          </div>
          <div class="modal-footer">
              <button class="default-button" @click="close(true)">
                  YES
              </button>
              <button class="default-button" @click="close(false)">
                  NO
              </button>
          </div>
      </div>
  </div>
</transition>`,
  props: ['show'],
  methods: {
    close: function (accept) {
      this.$emit('close', accept);
    }
  }
});