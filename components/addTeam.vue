<template>
  <div>
    <h2>Add team form</h2>
    <form class="flex space-x-4 items-end" @submit.prevent="addTeam">
      <div>
        <label class="block text-gray-700 text-sm font-bold mb-1" for="name">
          Team name
        </label>
        <input
          class="form-input"
          id="name"
          v-model="name"
          type="text"
          placeholder="Team name"
        />
      </div>
      <div>
        <label class="block text-gray-700 text-sm font-bold mb-1" for="player1">
          First player
        </label>
        <input
          class="form-input"
          id="player1"
          v-model="player1"
          type="text"
          placeholder="Player 1"
        />
      </div>
      <div>
        <label class="block text-gray-700 text-sm font-bold mb-1" for="player2">
          Second player
        </label>
        <input
          class="form-input"
          id="player2"
          v-model="player2"
          type="text"
          placeholder="Player 2"
        />
      </div>
      <button
        class="text-center rounded  bg-gray-800 px-4 py-2 font-semibold text-white hover:bg-gray-700 focus:outline-none focus:shadow-outline transition ease-in-out duration-150 -mt-1"
      >
        Add team
      </button>
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
      this.name = ''
      this.player1 = ''
      this.player2 = ''
      this.$emit('addTeam', newTeam)
    }
  }
}
</script>
