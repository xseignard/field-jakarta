<template>
  <v-container>
    <v-card class="mx-auto">
      <v-card-text>
        <v-row justify="space-around">
          <PlaybackButton action="play" />
          <PlaybackButton action="stop" />
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
import SequenceButton from '../components/SequenceButton'

export default {
  name: 'Controls',
  components: {
    PlaybackButton,
    SequenceButton,
  },
  data: () => ({
    sequences: [
      { name: 'Breathe', id: 1 },
      { name: 'Boom', id: 2 },
      { name: 'Stuff', id: 3 },
      { name: 'Other', id: 4 },
      { name: 'Again', id: 5 },
      { name: 'Debug', id: 6 },
    ],
  }),
}
</script>

<style lang="scss" scoped>
.sequence {
  margin: 10px 0;
}
</style>
