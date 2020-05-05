# Signifly Foosball

> A Foosball tournament system to keep track of results

Demo: [https://signifly-foosball.netlify.app/](https://signifly-foosball.netlify.app/)

## Instructions

Begin a tournament by adding a team with the "Add Team" form. Once a team has been added, a new scoreboard and list of teams will show up.
The scoreboard has the results of all the matches between the teams. Add another team, and the table will update with a 0-0 score between the teams.
To update a result, click inside the cell. The first digit is the score of the team in the current _row_, while the second score is of the team in the _column_. When updating a score, clear the "0-0" result and write a new one in the same format (eg. "10-3" or "2-5"). When done, hit enter, and the scores will update. The team with the higher digit is considered the winning team, and is awarded points.

The tournament standing can be seen below in the list of teams. Whenever a score is updated, the teams re-order to their new position in the list.

Whenever a change is made, the data is saved to the backend. Other instances of the app will re-fetch the data every 30 seconds.

To start a new tournament, press the "Clear tournament data" button to reset all data (including teams) and start fresh.

## Tech

The frontend is built with Nuxt, using Vue for functionality and Tailwind CSS for styling. The frontend app is hosted on netlify at [https://signifly-foosball.netlify.app/](https://signifly-foosball.netlify.app/)

The backend is made with Hasura and hosted on Heroku. The database has a single table, "teams", with just 1 row and 1 column. This field contains all the team data and results. In the future, this could definitely be optimized.

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
