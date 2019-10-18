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
      await fetch(`http://localhost:3000/api/sequence/${this.id}`)
    },
  },
}
</script>
