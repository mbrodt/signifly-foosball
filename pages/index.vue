<template>
  <div class="max-w-5xl lg:max-w-8xl mx-auto pb-24 px-8 lg:px-24 xl:px-8">
    <logo />
    <div v-if="$apollo.loading" class="my-8">
    Loading...
    </div>
    <div v-if="teams.length === 0 && !$apollo.loading">
      <empty />
    </div>

    <div>
      <scoreboard :teams="teams" @updateTeams="updateTeams" />
      <teams :teams="teams" @addTeam="addTeam" />
    </div>
    <button
      v-if="teams.length > 0"
      class="mt-12 text-center rounded text-red-400 px-4 py-2 font-semibold text-white hover:bg-red-400 hover:text-white focus:outline-none focus:shadow-outline transition ease-in-out duration-150 border border-red-400"
      @click="resetTournament"
    >
      Clear tournament data
    </button>
  </div>
</template>

<script>
import { GET_TEAMS, RESET_TOURNAMENT, UPDATE_TEAMS } from '@/graphql/index'
import logo from '@/components/logo'
import scoreboard from '@/components/scoreboard'
import teams from '@/components/teams'
import empty from '@/components/empty'
export default {
  components: {
    logo,
    scoreboard,
    teams,
    empty
  },
  apollo: {
    teams: {
      query: GET_TEAMS,
      update: data => {
        // The backend data is in a different format, so we clean it up here
        return data.teams[0].allTeams.teams
      },
      pollInterval: 20000
    }
  },
  data() {
    return {
      teams: []
    }
  },
  methods: {
    resetTournament() {
      this.teams = []
      this.$apollo.mutate({
        mutation: RESET_TOURNAMENT,
        variables: {
          allTeams: {
            teams: []
          }
        }
      })
    },

    updateTeams(allTeams) {
      // Update the local teams, until they get refreshed by the backend
      this.teams = allTeams

      const dataToSave = {
        teams: allTeams
      }

      this.$apollo.mutate({
        mutation: UPDATE_TEAMS,
        variables: {
          allTeams: dataToSave
        }
      })
    },

    addTeam(newTeam) {
      const teams = this.teams.map(team => {
        return {
          ...team,
          [newTeam.name]: '0-0'
        }
      })

      const allTeams = [...teams, newTeam]

      this.updateTeams(allTeams)
    }
  }
}
</script>
