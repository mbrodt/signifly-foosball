export const getResult = matchString => {
  const split = matchString.split('-')
  if (split[0] === '10') {
    return 'win'
  } else if (split[1] === '10') {
    return 'loss'
  } else {
    return 'unfinished'
  }
}
