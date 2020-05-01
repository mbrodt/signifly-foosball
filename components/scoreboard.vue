<template>
  <div>
    <p>Note: the scores should be read from the perspective of the row</p>
    <table>
      <tr>
        <th></th>
        <th
          class="text-2xl"
          v-for="header in headers"
          :key="header"
          :id="header"
        >
          {{ header }}
        </th>
      </tr>
      <tr v-for="team in teams" :key="team.name">
        <td>{{ team.name }}</td>
        <td
          class="text-right"
          v-for="value in getTeamScores(team.name)"
          :key="value.id"
        >
          <input
            @change="updateScores(team.name, $event)"
            type="text"
            :value="value"
          />
        </td>
      </tr>
    </table>
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
    }
  }
}
</script>
