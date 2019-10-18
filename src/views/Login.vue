<template>
  <v-form @submit.prevent="login" class="login">
    <v-card class="mx-auto" max-width="344">
      <v-card-text>
        <v-text-field
          label="Password"
          v-model="password"
          :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit" color="success">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    password: '',
    show: false,
  }),
  methods: {
    login() {
      if (this.password === 'test') {
        this.$emit('authenticated', true)
        this.$router.replace({ name: 'controls' })
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
