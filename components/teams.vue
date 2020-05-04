<template>
  <div>
    <h2 class="text-4xl text-blue-500">Teams</h2>
    <transition-group name="flip-list" tag="div" class="grid grid-cols-3 gap-8">
      <div v-for="(team, index) in orderedTeams" :key="team.name">
        <div
          class="border-b-2 border-gray-500 w-8 text-center text-xl font-bold text-gray-700 leading-snug mb-2"
        >
          #{{ index + 1 }}
        </div>
        <div class="bg-white py-8 px-8 shadow-2xl rounded">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-3xl font-semibold">{{ team.name }}</h3>
            <ul class="flex space-x-4">
              <li
                class="text-xl flex items-center"
                v-for="player in team.players"
                :key="player"
              >
                <svg
                  class="w-5 h-5 mr-1 text-gray-600"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
                <span> {{ player }}</span>
              </li>
            </ul>
          </div>
          <results :results="getTeamResults(team).results" />
        </div>
      </div>
    </transition-group>
    <add-team @addTeam="addTeam" />
  </div>
</template>

<script>
import addTeam from '@/components/addTeam'
import results from '@/components/results'
export default {
  components: {
    addTeam,
    results
  },
  props: {
    teams: Array,
    scores: Array
  },
  computed: {
    orderedTeams() {
      const mapped = this.teams.map(team => {
        const results = this.getTeamResults(team)
        return results
      })
      const sorted = mapped.sort((team1, team2) => {
        return team1.results.points < team2.results.points ? 1 : -1
      })
      return sorted
    }
  },
  methods: {
    addTeam(newTeam) {
      this.$emit('addTeam', newTeam)
    },
    getTeamResults(team) {
      const teamScores = this.scores.find(score => score.name === team.name)
      const { name, ...scores } = teamScores

      let wins = 0
      let losses = 0

      Object.values(scores).forEach(score => {
        const split = score.split('-')
        if (split[0] === '10') {
          wins += 1
        } else if (split[1] === '10') {
          losses += 1
        }
      })

      const points = wins * 3

      const results = {
        wins,
        losses,
        points
      }

      return { ...team, results }
    }
  }
}
</script>

<style>
.flip-list-move {
  transition: transform 2s;
}
</style>
