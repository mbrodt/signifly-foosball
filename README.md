# signifly-foosball

> A Foosball tournament system to keep track of results

## TODO

- Setup Hasura and get the data through subscriptions
- Send each change back to hasura
- Make responsive
- Animations
- Clear data / refresh tournament
- Setup purge CSS
- Clean code, change naming, remove logs etc

## Assumptions/Limitations:

- There can only be 1 active tournament
- Every team is part of the active tournament
- Each team has 2 players
- Everyone can edit the scores
- A game is considered won if one of the teams has 10 goals

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
