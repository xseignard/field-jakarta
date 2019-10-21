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
      console.log(`loop active: ${this.active}`)
      await fetch(
        `${process.env.VUE_APP_SERVER_URL}/api/loop/${this.active ? 1 : 0}`
      )
    },
  },
}
</script>
