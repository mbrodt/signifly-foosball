<template>
  <div>
    I am the teams
    <div v-for="team in teams" :key="team.name">
      <h2>{{ team.name }}</h2>
      <ul>
        <li v-for="player in team.players" :key="player.id">
          {{ player }}
        </li>
      </ul>
    </div>
    <add-team @addTeam="addTeam" />
  </div>
</template>

<script>
import addTeam from '@/components/addTeam'
export default {
  components: {
    addTeam
  },
  props: {
    teams: Array
  },
  methods: {
    addTeam(newTeam) {
      console.log('add team in teams', newTeam)
      this.$emit('addTeam', newTeam)
    }
  }
}
</script>

<style scoped></style>
