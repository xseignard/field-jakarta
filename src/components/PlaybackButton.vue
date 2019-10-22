<template>
  <v-btn block x-large :color="color" dark @click="click">
    <v-icon left>{{ icon }}</v-icon> {{ text }}
  </v-btn>
</template>

<script>
import { mapState } from 'vuex'

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
    text() {
      return this.action === 'play' ? 'All sequences' : 'Stop'
    },
    ...mapState({
      loop: state => state.loop,
    }),
  },
  mounted() {
    console.log(this.loop)
  },
  methods: {
    async click() {
      console.log(`action: ${this.action}, loop: ${this.loop}`)
      await fetch(`${process.env.VUE_APP_SERVER_URL}/api/${this.action}/${this.loop ? 1 : 0}`)
    },
  },
}
</script>
