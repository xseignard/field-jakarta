<template>
  <v-btn :color="color" fab x-large dark @click="click">
    <v-icon>{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'PlaybackButton',
  props: ['action'],
  computed: {
    icon() {
      return this.action === 'play' ? 'mdi-play' : 'mdi-stop'
    },
    color() {
      return this.action === 'play' ? 'success' : 'error'
    },
  },
  methods: {
    async click() {
      console.log(this.action)
      await fetch(`${process.env.VUE_APP_SERVER_URL}/api/${this.action}`)
    },
  },
}
</script>
