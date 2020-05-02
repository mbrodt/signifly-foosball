<template>
  <div>
    <div class="flex justify-between items-center">
      <div>
        <span class="text-gray-600 text tracking-wide uppercase">Points</span>
        <p class="font-bold text-4xl leading-none">
          {{ results.points }}
        </p>
      </div>
      <div>
        <span class="text-gray-600 text tracking-wide uppercase">Wins</span>
        <p class="font-bold text-4xl leading-none text-green-400">
          {{ results.wins }}
        </p>
      </div>
      <div>
        <span class="text-gray-600 text tracking-wide uppercase">Losses</span>
        <p class="font-bold text-4xl leading-none text-red-400">
          {{ results.losses }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    results: Object
  }
}
</script>
