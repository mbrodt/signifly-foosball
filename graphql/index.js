import gql from 'graphql-tag'

export const GET_TEAMS = gql`
  query GET_TEAMS {
    teams {
      allTeams
    }
  }
`

export const RESET_TOURNAMENT = gql`
  mutation RESET_TOURNAMENT($allTeams: jsonb = "") {
    update_teams_by_pk(pk_columns: { id: 2 }, _set: { allTeams: $allTeams }) {
      allTeams
    }
  }
`

export const UPDATE_TEAMS = gql`
  mutation UPDATE_TEAMS($allTeams: jsonb = "") {
    update_teams_by_pk(pk_columns: { id: 2 }, _set: { allTeams: $allTeams }) {
      allTeams
    }
  }
`
