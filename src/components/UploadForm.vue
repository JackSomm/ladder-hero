<template>
  <div>
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
        chips
        :value="file"></v-file-input>
      <v-btn
        color="#7f428b"
        class="upload-form__btn submit ma-2"
        @click="upload(file)">
        {{ uploadBtnText }}
      </v-btn>
      </v-card-text>
    </v-card>
    <p class="logout"
      @click="logout()">
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
      file: null,
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
    },
    logout() {
      this.$store.commit('RESET_STATE');
      // location.reload();
    }
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