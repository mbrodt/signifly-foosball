export const getResult = matchString => {
  const split = matchString.split('-')
  const left = Number(split[0])
  const right = Number(split[1])
  if (left > right) {
    return 'win'
  } else if (right > left) {
    return 'loss'
  } else {
    return 'unfinished'
  }
}
