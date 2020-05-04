<template>
  <div class="max-w-8xl mx-auto pb-24">
    <logo />
    <button
      class="bg-blue-500 rounded text-white px-2 py-1"
      @click="resetTournament"
    >
      Clear tournament data
    </button>
    <div v-if="$apollo.loading">Loading...</div>

    <div v-else>
      <scoreboard
        :teams="teams"
        :scores="scores"
        @updateScores="updateScores"
      />
      <teams :teams="teams" :scores="scores" @addTeam="addTeam" />
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

import logo from '@/components/logo'
import scoreboard from '@/components/scoreboard'
import teams from '@/components/teams'
export default {
  components: {
    logo,
    scoreboard,
    teams
  },
  apollo: {
    teams: {
      query: gql`
        query Get_Teams {
          teams {
            allTeams
          }
        }
      `,
      update: data => {
        console.log('data in apollo', data)
        return data.teams[0].allTeams.teams
      }
    },
    scores: {
      query: gql`
        query Get_Scores {
          scores {
            allScores
          }
        }
      `,
      update: data => {
        console.log('scores data', data)
        return data.scores[0].allScores.scores
      }
    }
  },
  mounted() {
    console.log('mounted')
    console.log('teams', this.teams)
  },
  data() {
    return {
      teams: [],
      // teams: [
      // {
      //   name: 'Team A',
      //   players: ['Mads', 'Tore']
      // },
      // {
      //   name: 'Team B',
      //   players: ['Morten', 'Mark']
      // },
      // {
      //   name: 'Team C',
      //   players: ['Jaja', 'Ro']
      // },
      // {
      //   name: 'Team D',
      //   players: ['Phillip', 'Matthias']
      // }
      // ],
      scores: [
        // {
        //   "name": "Team A",
        //   "Team A": "-",
        //   "Team B": "4-10",
        //   "Team C": "10-5",
        //   "Team D": "7-10"
        // },
        // {
        //   "name": "Team B",
        //   "Team A": "10-4",
        //   "Team B": "-",
        //   "Team C": "6-10",
        //   "Team D": "10-3"
        // },
        // {
        //   "name": "Team C",
        //   "Team A": "5-10",
        //   "Team B": "10-6",
        //   "Team C": "-",
        //   "Team D": "10-1"
        // },
        // {
        //   "name": "Team D",
        //   "Team A": "10-7",
        //   "Team B": "3-10",
        //   "Team C": "1-10",
        //   "Team D": "-"
        // }
      ]
    }
  },
  methods: {
    resetTournament() {
      this.teams = []
      this.scores = []
      this.$apollo.mutate({
        mutation: gql`
          mutation ResetTeams($allTeams: jsonb = "") {
            update_teams_by_pk(
              pk_columns: { id: 2 }
              _set: { allTeams: $allTeams }
            ) {
              allTeams
            }
          }
        `,
        variables: {
          allTeams: {
            teams: []
          }
        }
      })
      this.$apollo.mutate({
        mutation: gql`
          mutation ResetScores($allScores: jsonb = "") {
            update_scores_by_pk(
              pk_columns: { id: 1 }
              _set: { allScores: $allScores }
            ) {
              allScores
            }
          }
        `,
        variables: {
          allScores: {
            scores: []
          }
        }
      })
    },

    updateScores(newScores) {
      this.scores = newScores
      const dataToSave = {
        scores: newScores
      }
      console.log('UPDATE BACKEND SCORES', dataToSave)
      this.$apollo.mutate({
        mutation: gql`
          mutation UpdateScores($allScores: jsonb = "") {
            update_scores_by_pk(
              pk_columns: { id: 1 }
              _set: { allScores: $allScores }
            ) {
              allScores
            }
          }
        `,
        variables: {
          allScores: dataToSave
        }
      })
    },

    addTeam(newTeam) {
      const updatedTeams = [...this.teams, newTeam]
      let mapScores = new Map()
      mapScores.set('name', newTeam.name)
      let newScore = {
        name: newTeam.name
      }
      this.teams.forEach(team => {
        newScore = {
          ...newScore,
          [team.name]: '0-0'
        }
        mapScores.set(team.name, '0-0')
      })
      mapScores.set(newTeam.name, '-')
      newScore[newTeam.name] = '-'
      console.log('newScore:', newScore)
      console.log('mapScores:', mapScores)

      const updatedScores = this.scores.map(score => {
        return {
          ...score,
          [newTeam.name]: '0-0'
        }
      })
      updatedScores.push(newScore)
      this.updateScores(updatedScores)
      this.teams = updatedTeams

      const dataToSave = {
        teams: updatedTeams
      }

      console.log('data to send', JSON.stringify(dataToSave))

      this.$apollo.mutate({
        mutation: gql`
          mutation UpdateTeams($allTeams: jsonb = "") {
            update_teams_by_pk(
              pk_columns: { id: 2 }
              _set: { allTeams: $allTeams }
            ) {
              allTeams
            }
          }
        `,
        variables: {
          allTeams: dataToSave
        }
      })
    }
  }
}
</script>
