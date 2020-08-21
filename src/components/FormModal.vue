<template>
  <transition name="modal">
    <div class="modal__mask">
      <div class="modal__wrapper">
        <v-container class="modal__container">
          <button
            type="button"
            class="modal__close"
            @click="close">
            x
          </button>
          <component :is="currentForm"
            @close="close"></component>
        </v-container>
      </div>
    </div>
  </transition>
</template>

<script>
import TokenForm from '@/components/TokenForm.vue';
import UploadForm from '@/components/UploadForm.vue';

export default {
  name: 'FormModal',
  components: {
    TokenForm,
    UploadForm
  },
  props: [
    'currentForm'
  ],
  data () {
    return {}
  },
  methods: {
    close () {
      this.$emit('close');
    }
  }
}
</script>

<style lang="scss" scoped>
.modal__mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal__close {
  font-size: 2em;
}
.modal__container {
  width: 40rem;
}
.modal__wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal__container,
.modal-leave-active .modal__container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
  transition: all .5s ease;
}
</style>