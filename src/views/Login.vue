<template>
  <v-form @submit.prevent="login" class="login">
    <v-card class="mx-auto" max-width="344">
      <v-card-text>
        <v-text-field
          label="Password"
          v-model="password"
          :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
          :type="show ? 'text' : 'password'"
          :error="snackbar"
          @click:append="show = !show"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit" color="success">Login</v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="snackbar" color="error">
      Wrong password
      <v-btn text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-form>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    password: '',
    show: false,
    snackbar: false,
  }),
  methods: {
    login() {
      if (this.password === process.env.VUE_APP_PASSWORD) {
        this.$emit('authenticated', true)
        this.$router.replace({ name: 'controls' })
      } else {
        this.snackbar = true
        console.log(this.snackbar)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.login {
  margin-top: 30px;
}
</style>
