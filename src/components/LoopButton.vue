<template>
  <v-switch v-model="active" label="Loop" @change="click()"></v-switch>
</template>

<script>
export default {
  name: 'LoopButton',
  data: () => ({
    active: true,
  }),
  methods: {
    async click() {
      console.log(`loop: ${this.active}`)
      this.$store.commit('TOGGLE_LOOP')
    },
  },
}
</script>
