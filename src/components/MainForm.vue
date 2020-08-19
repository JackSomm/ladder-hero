<template>
  <transition name="fade">
    <v-card
      v-show="!getLoggedIn">
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
            :value="username"
            @input="validate(username, password)">
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
            @click:append="show = !show"
            @input="validate(username, password)">
          </v-text-field>
          <transition name="slide-fade">
            <v-card-text
              class="no-pad"
              v-show="validationText">
              {{ validationText }}
            </v-card-text>
          </transition>
          <transition name="slide-fade">
            <div
              v-show="!error">
              <v-btn
                color="#7f428b"
                class="register submit ma-2"
                :disabled="invalid"
                @click="handleClick(username, password, 'register')">
                {{ registerBtnText }}
              </v-btn>
              <v-btn
                color="#7f428b"
                name="login"
                class="submit ma-2"
                :disabled="invalid"
                @click="handleClick(username, password, 'login')">
                {{ loginBtnText }}
              </v-btn>
            </div>
          </transition>
          <transition name="slide-fade">
            <v-card-text
              class="no-pad"
              v-show="error">
              There was a problem submitting your information. Please try again in a few minutes.
            </v-card-text>
          </transition>
        </v-form>
      </v-card-text>
    </v-card>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MainForm',
  data() {
    return {
      username: '',
      password: '',
      show: false,
      registerBtnText: 'Register',
      loginBtnText: 'Login',
      success: false,
      error: false,
      validationText: '',
      invalid: false,
      rules: {
        required: value => !!value || 'Required.'
      },
    }
  },
  methods: {
    validate(username, password) {
      if (username && password) {
        this.invalid = false;
        this.validationText = '';
        return true;
      }  else if (username && !password) {
        this.validationText = 'Please enter a password.';
      } else if (!username && password) {
        this.validationText = 'Please enter a username.';
      } else {
        this.validationText = 'At least enter something.';
      }
      return false;
    },
    handleClick(username, password, event) {
      if (this.validate(username, password)) {
        if (event === 'login') {
          console.log('login');
          this.$store.dispatch('login', {username, password})
            .then(res => {
              if (res === true) {
                this.loginBtnText = 'Logged In';
              } else {
                this.error = true;
              }
            });
        } else if (event === 'register') {
          console.log('register');
          this.$store.dispatch('register', {username, password})
            .then(res => {
              if (res === true) {
                this.registerBtnText = 'Registered';
              } else {
                this.error = true;
              }
            });
        }
      }
    }
  },
  computed: mapGetters(['getLoggedIn'])
}
</script>

<style scoped>
.submit {
  letter-spacing: .05em;
}
.v-application .register {
  margin-left: 0!important;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
  transition-delay: .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.no-pad {
  padding-left: 0;
}
.slide-fade-enter-active {
  transition: all .3s ease;
  transition-delay: .5s;
}
.slide-fade-leave-active {
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>