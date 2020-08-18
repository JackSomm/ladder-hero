<template>
  <transition name="fade">
    <v-card
      v-show="!registered">
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
            :rules="[rules.required]"
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
            :rules="[rules.required]"
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
            {{ btnText }}
          </v-btn>
          <v-card-text
            class="no-pad"
            v-show="btnText === 'Uh Oh!'">
            There was a problem registering you. Please try again in a few minutes.
          </v-card-text>
        </v-form>
      </v-card-text>
    </v-card>
  </transition>
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
      btnText: 'Register',
      registered: false,
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },
  methods: {
    sendRegistrationRequest(username, password) {
      axios.post('https://ladder-hero-api.honnold.me/auth/register', {
        username: username,
        password: password
      })
      .then(res => {
        if (res.status === 200) {
          this.btnText = 'Registered';
          this.registered = true;
        } else {
          this.btnText = 'Uh Oh!';
        }
      })
      .catch(err => console.log(err));
    }
  },
}
</script>

<style scoped>
.submit {
  letter-spacing: .05em;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
  transition-delay: 2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.no-pad {
  padding-left: 0;
}
</style>