<template>
  <v-container>
    <v-card class="mx-auto">
      <v-card-text>
        <v-row justify="space-around">
          <PlaybackButton action="play" />
          <PlaybackButton action="stop" />
          <LoopButton />
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="mx-auto mt-4">
      <v-card-text>
        <v-row justify="center">
          <h1 class="display-1 text--primary">Sequences</h1>
        </v-row>
        <v-row justify="center">
          <v-col>
            <SequenceButton
              v-for="s in sequences"
              :key="s.id"
              :name="s.name"
              :id="s.id"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import PlaybackButton from '../components/PlaybackButton'
import LoopButton from '../components/LoopButton'
import SequenceButton from '../components/SequenceButton'

export default {
  name: 'Controls',
  components: {
    PlaybackButton,
    LoopButton,
    SequenceButton,
  },
  data: () => ({
    sequences: [],
  }),
  created() {
    this.fetchSequences()
  },
  methods: {
    async fetchSequences() {
      const res = await fetch(`${process.env.VUE_APP_SERVER_URL}/api/sequences`)
      this.sequences = await res.json()
    },
  },
}
</script>

<style lang="scss" scoped>
.sequence {
  margin: 10px 0;
}
</style>
