<template>
  <div>
    <v-card class="upload-form">
      <v-card-text>
      <p>
        You can find replay files in ~/Documents/Starcraft 2/{username}/Replays
      </p>
      <v-file-input class="upload-form__input"
        label="Upload a Replay"
        v-model="files"
        color="#d3cc65"
        outlined
        chips
        multiple
        :value="files"></v-file-input>
      <v-btn
        color="#7f428b"
        class="upload-form__btn submit ma-2"
        @click="upload(files)">
        {{ uploadBtnText }}
      </v-btn>
      </v-card-text>
    </v-card>
    <p class="logout"
      @click="$store.commit('RESET_STATE')">
      Logout
    </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UploadForm',
  data () {
    return {
      files: null,
      uploadBtnText: 'Upload'
    }
  },
  methods: {
    upload(files) {
      const formData = new FormData();
      for (let file of files) {
        formData.append('files', file);
      }
      const config = {
        headers: { 
          Authorization: `Bearer ${this.$store.getters.getToken}`,
          'content-type': 'multipart/form-data',
        }
      }
      axios.post(
        'https://ladder-hero-api.honnold.me/files/upload',
        formData,
        config
      )
      .then(res => {
        if (res.status === 200) {
          this.files = null;
          this.$emit('close');
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.upload-form {
  &__btn {
    margin-top: 0!important;
  }
}
.logout {
  margin-top: 15px;
  color: rgba(255, 255, 255, .6);
  cursor: pointer;
  transition: all .3s ease;
  display: inline-block;
  &:hover {
    color: rgba(211, 204, 101, .9);
  }
}
</style>