# signifly-foosball

> A Foosball tournament system to keep track of results

## TODO

- Make responsive
- Animations
- Clean code, change naming, remove logs etc

## Assumptions/Limitations:

- There can only be 1 active tournament
- Every team is part of the active tournament
- Each team has 2 players
- Everyone can edit the scores
- A game is considered won if one of the teams has 10 goals
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
