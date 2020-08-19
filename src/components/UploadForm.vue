<template>
  <v-card class="upload-form">
    <v-card-text>
    <p>
      You can find replay files in ~/Documents/Starcraft 2/{username}/Replays
    </p>
    <v-file-input class="upload-form__input"
      label="Upload a Replay"
      v-model="file"
      color="#d3cc65"
      outlined
      clearable
      chips
      :value="file"></v-file-input>
    <v-btn
      color="#7f428b"
      class="token-form__register submit ma-2"
      :disabled="invalid"
      @click="upload(file)">
      {{ uploadBtnText }}
    </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UploadForm',
  data () {
    return {
      file: '',
      uploadBtnText: 'Upload'
    }
  },
  methods: {
    upload(file) {
      axios.post('https://ladder-hero-api.honnold.me/files/upload', {
        replay: file
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err);

      });
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-form {
  &__input > .v-input__prepend-outer {
    display: none!important;
  }
}
</style>