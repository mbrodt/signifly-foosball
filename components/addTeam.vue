<template>
  <div>
    <h2>Add team form</h2>
    <form @submit.prevent="addTeam">
      <input v-model="name" type="text" placeholder="Team name" />
      <input v-model="player1" type="text" placeholder="Player 1" />
      <input v-model="player2" type="text" placeholder="Player 2" />
      <button>Add team</button>
    </form>
    {{ name }} {{ player1 }} {{ player2 }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      player1: '',
      player2: ''
    }
  },
  methods: {
    addTeam() {
      const newTeam = {
        name: this.name,
        players: [this.player1, this.player2]
      }
      this.$emit('addTeam', newTeam)
    }
  }
}
</script>
