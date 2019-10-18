<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase fw">
        <div class="d-flex justify-space-between align-end">
          <span>Wok Hei</span>
          <div class="subtitle-1 font-weight-light">
            <span>Field</span>
            <span class="caption font-weight-thin"> x </span>
            <span>Hakkasan</span>
          </div>
        </div>
      </v-toolbar-title>
    </v-app-bar>
    <v-content>
      <router-view @authenticated="setAuthenticated"></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    authenticated: false,
  }),
  mounted() {
    // if (!this.authenticated) this.$router.replace({ name: 'login' })
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status
    },
  },
}
</script>

<style lang="scss" scoped>
.fw {
  width: 100%;
}
</style>
