<template>
  <v-card>
    <v-card-text>
      <p>
        You must register before uploading any replays.
      </p>
      <v-form class="token-form"
        ref="form">
        <v-text-field
          v-model="username"
          required
          label="Username"
          color="#d3cc65"
          name="username"
          outlined
          :rules="[rules.required]"
          :value="username"></v-text-field>
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
          @click:append="show = !show"></v-text-field>
        <transition name="slide-fade">
          <v-card-text
            class="token-form__text"
            v-show="validationText">
            {{ validationText }}
          </v-card-text>
        </transition>
        <v-btn
          color="#7f428b"
          class="token-form__register submit ma-2"
          :disabled="invalid"
          @click="handleClick(username, password, 'register')">
          Register
        </v-btn>
        <v-btn
          color="#7f428b"
          name="login"
          class="token-form__login ma-2"
          :disabled="invalid"
          @click="handleClick(username, password, 'login')">
          Login
        </v-btn>
        <transition name="slide-fade">
          <v-card-text class="token-form__text token-form__auth"
            v-show="unauthorized">
            {{ unauthorizedText }}
          </v-card-text>
        </transition>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'MainForm',
  data() {
    return {
      username: '',
      password: '',
      show: false,
      unauthorized: false,
      validationText: '',
      invalid: false,
      unauthorizedText: '',
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
      } else if (username && !password) {
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
          this.$store.dispatch('login', {username, password})
            .then(res => {
              if (!res) {
                this.unauthorizedText = "There's a problem with your login info. Please double check your username and password.";
                this.unauthorized = true;
              } else {
                this.$emit('close');
              }
            });
        } else if (event === 'register') {
          this.$store.dispatch('register', {username, password})
            .then(res => {
              if (!res) {
                this.unauthorizedText = "Someone is using that username.";
                this.unauthorized = true;
              } else {
                this.$emit('close');
              }
            });
        }
      }
    },
  },
  beforeDestroy() {
    this.registerBtnText = 'Register';
    this.loginBtnText = 'Login';
    this.password = '';
    this.username = '';
  }
}
</script>

<style lang="scss" scoped>
.token-form {
  &__login, &__register {
    letter-spacing: .05em;
  }
  &__register {
    margin-left: 0!important;
  }
  &__text {
    padding-left: 0;
  }
  &__unauthorized {
    color: red;
  }
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