<template>
  <div class="my-3">
    <v-btn block x-large color="primary" dark @click="click">{{ name }}</v-btn>
  </div>
</template>

<script>
export default {
  name: 'SequenceButton',
  props: ['name', 'id'],
  methods: {
    async click() {
      console.log(`sequence ${this.id}`)
      await fetch(`${process.env.VUE_APP_SERVER_URL}/api/sequence/${this.id}`)
    },
  },
}
</script>
