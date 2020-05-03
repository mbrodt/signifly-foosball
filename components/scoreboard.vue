<template>
  <div>
    <h2>Scoreboard</h2>
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
          v-for="value in getTeamScores(team.name)"
          :key="value.id"
        >
          <input
            class="w-10 font-semibold text-xl bg-transparent focus:outline-none focus:shadow-outline"
            :class="getInputColors(value)"
            @change="updateScores(team.name, $event)"
            type="text"
            :value="value"
          />
        </td>
      </tr>
    </table>

    <p class="text-gray-600">
      Note: the scores should be read from the perspective of the row
    </p>
  </div>
</template>

<script>
export default {
  props: {
    teams: Array,
    scores: Array
  },
  computed: {
    headers() {
      return this.teams.map(team => team.name)
    }
  },
  methods: {
    updateScores(team, event) {
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

      const newScores = this.scores.map(score => {
        // If the score is for the team currently being updated, update the score on the opponent key.
        if (score.name === team) {
          return {
            ...score,
            [opponentName]: updatedScore
          }

          // If the score is for the opponent, update their score with the reversed result
        } else if (score.name === opponentName) {
          return {
            ...score,
            [team]: reversedScore
          }

          // Otherwise, return the unedited score
        } else {
          return score
        }
      })
      this.$emit('updateScores', newScores)
    },
    getTeamScores(team) {
      const teamScores = this.scores.find(score => score.name === team)
      const { name, ...scores } = teamScores
      return scores
    },
    getInputColors(result) {
      let res = 'unfinished'

      const split = result.split('-')
      if (split[0] === '10') {
        res = 'win'
      } else if (split[1] === '10') {
        res = 'loss'
      }
      return {
        'text-red-400': res === 'loss',
        'text-green-400': res === 'win',
        'text-gray-700': res === 'unfinished'
      }
    }
  }
}
</script>
