<template>
  <div class="overflow-x-auto" v-if="teams.length > 0">
    <table>
      <tr class="border-b border-gray-400">
        <th></th>
        <th
          class="px-6 py-3 text-left text-base leading-4 font-medium text-gray-600 uppercase tracking-wider"
          v-for="header in headers"
          :key="header"
          :id="header"
        >
          {{ header }}
        </th>
      </tr>
      <tr
        class="border-b border-gray-400"
        v-for="team in teams"
        :key="team.name"
      >
        <td
          class="px-6 py-6 text-left text-base leading-4 font-medium text-gray-600 uppercase tracking-wider"
        >
          {{ team.name }}
        </td>
        <td
          class="text-center"
          v-for="matchString in getTeamScores(team)"
          :key="matchString.id"
        >
          <input
            class="w-12 font-semibold text-xl bg-transparent focus:outline-none focus:shadow-outline"
            :class="getInputColors(matchString)"
            @change="updateTeams(team.name, $event)"
            type="text"
            :value="matchString"
          />
        </td>
      </tr>
    </table>

    <p class="text-gray-600 mt-4">
      Note: the scores should be read from the perspective of the row
    </p>
  </div>
</template>

<script>
import { getResult } from '@/utilities/helpers'
export default {
  props: {
    teams: Array
  },
  computed: {
    headers() {
      return this.teams.map(team => team.name)
    }
  },
  methods: {
    updateTeams(teamToUpdate, event) {
      // Get the header of this table data field, since this is the opponent of the team being updated
      const cellIndex = event.target.parentNode.cellIndex
      const opponentName = this.headers[cellIndex - 1]

      // The new score after the change
      const updatedScore = event.target.value

      // A reversed version of the score, used to update the corresponding opponent field in the table
      const reversedScore = updatedScore
        .split('-')
        .reverse()
        .join('-')

      const updatedTeams = this.teams.map(team => {
        // If the score is for the team currently being updated, update the score on the opponent key.
        if (team.name === teamToUpdate) {
          return {
            ...team,
            [opponentName]: updatedScore
          }

          // If the score is for the opponent, update their score with the reversed result
        } else if (team.name === opponentName) {
          return {
            ...team,
            [teamToUpdate]: reversedScore
          }
          // Otherwise, return the unedited score
        } else {
          return team
        }
      })
      this.$emit('updateTeams', updatedTeams)
    },
    getTeamScores(team) {
      let scores = []

      // Loop through all the teams. If the looped team is the same as the one we're getting the score for, add a "-"
      // Otherwise, get the result value of the match between the team we're getting the score for, and the looped team
      this.teams.forEach(loopTeam => {
        if (loopTeam.name === team.name) {
          scores.push('-')
        } else {
          scores.push(team[loopTeam.name])
        }
      })
      return scores
    },
    getInputColors(matchString) {
      const result = getResult(matchString)
      return {
        'text-red-400': result === 'loss',
        'text-green-400': result === 'win',
        'text-gray-700': result === 'unfinished'
      }
    }
  }
}
</script>
