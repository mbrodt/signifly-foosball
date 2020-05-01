<template>
  <div>
    <scoreboard :teams="teams" :scores="scores" @updateScores="updateScores" />
    <teams :teams="teams" @addTeam="addTeam" />
    <leaderboard />
  </div>
</template>

<script>
import scoreboard from '@/components/scoreboard'
import teams from '@/components/teams'
import leaderboard from '@/components/leaderboard'
export default {
  components: {
    scoreboard,
    teams,
    leaderboard
  },
  data() {
    return {
      teams: [
        {
          name: 'Team A',
          players: ['Mads', 'Tore']
        },
        {
          name: 'Team B',
          players: ['Morten', 'Mark']
        },
        {
          name: 'Team C',
          players: ['Jaja', 'Ro']
        },
        {
          name: 'Team D',
          players: ['Phillip', 'Matthias']
        }
      ],
      scores: [
        {
          name: 'Team A',
          'Team A': '-',
          'Team B': '4-10',
          'Team C': '10-5',
          'Team D': '7-10'
        },
        {
          name: 'Team B',
          'Team A': '10-4',
          'Team B': '-',
          'Team C': '6-10',
          'Team D': '10-3'
        },
        {
          name: 'Team C',
          'Team A': '5-10',
          'Team B': '10-6',
          'Team C': '-',
          'Team D': '10-1'
        },
        {
          name: 'Team D',
          'Team A': '10-7',
          'Team B': '3-10',
          'Team C': '1-10',
          'Team D': '-'
        }
      ]
    }
  },
  methods: {
    updateScores(newScores) {
      this.scores = newScores
    },
    addTeam(newTeam) {
      const updatedTeams = [...this.teams, newTeam]
      let newScore = {
        name: newTeam.name
      }
      this.teams.forEach(team => {
        newScore = {
          ...newScore,
          [team.name]: '0-0'
        }
      })

      const updatedScores = this.scores.map(score => {
        return {
          ...score,
          [newTeam.name]: '0-0'
        }
      })
      console.log('newScore:', newScore)
      updatedScores.push(newScore)
      this.scores = updatedScores
      this.teams = updatedTeams
    }
  }
}
</script>
