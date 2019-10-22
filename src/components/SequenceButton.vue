<template>
  <div class="my-3">
    <v-btn block x-large color="primary" dark @click="click">
      <v-icon left>mdi-play</v-icon> {{ name }}
    </v-btn>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SequenceButton',
  props: ['name', 'id'],
  computed: {
    ...mapState({
      loop: state => state.loop,
    }),
  },
  mounted() {
    console.log(this.loop)
  },
  methods: {
    async click() {
      console.log(`sequence: ${this.id}, loop: ${this.loop}`)
      await fetch(`${process.env.VUE_APP_SERVER_URL}/api/sequence/${this.id}/${this.loop ? 1 : 0}`)
    },
  },
}
</script>
