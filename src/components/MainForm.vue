<template>
  <v-card>
    <v-card-text>
      <p>
        You must register before uploading any replays.
      </p>
      <v-form
        ref="form">
        <v-text-field
          v-model="username"
          required
          label="Username"
          color="#d3cc65"
          name="username"
          outlined
          :value="username">
        </v-text-field>
        <v-text-field
          v-model="password"
          color="#d3cc65"
          label="Password"
          hint="At least 8 characters"
          name="password"
          counter
          outlined
          :value="password"
          :type="show ? 'test': 'password'"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show = !show">
        </v-text-field>
        <v-btn
          color="#7f428b"
          class="submit"
          :loading="loading"
          :disabled="loading"
          @click="sendRegistrationRequest(username, password)">
          Register
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MainForm',
  data() {
    return {
      show: false,
      password: '',
      username: '',
      loading: false,
      loader: null
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      console.log(this.password, this.username);
    },
    sendRegistrationRequest(username, password) {
      axios.post('https://ladder-hero-api.honnold.me/auth/register', {
        username: username,
        password: password
      });
    }
  },
  watch: {
    loader () {
      const load = this.loader;
      this[load] = !this[load];
    }
  }
}
</script>

<style scoped>
.submit {
  letter-spacing: .05em;
}
</style>