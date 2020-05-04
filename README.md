# signifly-foosball

> A Foosball tournament system to keep track of results

## Assumptions/Limitations:

- There can only be 1 active tournament
- Every team is part of the active tournament
- Each team has 2 players
- Everyone can edit the scores
- A game is considered won by the team with the highest score (doesn't matter what it is)
- The scores are refreshed based on a set interval (to keep different screens mostly up-to-date without websockets)

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```
