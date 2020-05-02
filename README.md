# signifly-foosball

> A Foosball tournament system to keep track of results

## TODO

- Setup Hasura and get the data through subscriptions
- Send each change back to hasura
- Clear add team form inputs on submission
- Empty scoreboard input field on click, and update without having to enter
- Style add team form
- Make responsive
- Animations
- Setup purge CSS
- Deploy to Netlify
- Clear data / refresh tournament

Assumptions/Limitations:
There can only be 1 active tournament
Every team is part of the active tournament
Each team has 2 players
Everyone can edit the scores

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
