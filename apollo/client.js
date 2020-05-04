import ApolloClient from 'apollo-client'
import { WebSocketLink } from 'apollo-link-ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import { HttpLink } from 'apollo-link-http'

import { InMemoryCache } from 'apollo-cache-inmemory'
import ws from 'ws'
import fetch from 'isomorphic-fetch'

const subscriptionClient__ = new SubscriptionClient(
  'ws://signifly-foosball.herokuapp.com/v1/graphql',
  {
    reconnect: true
  }
)

const wsLink = process.browser ? new WebSocketLink(subscriptionClient__) : null

// const wsLink = process.browser
//   ? new WebSocketLink({
//       uri: 'wss://signifly-foosball.herokuapp.com/v1/graphql',
//       options: {
//         reconnect: true,
//         timeout: 30000
//         // headers: {
//         //   'x-hasura-admin-secret': 'coolsecret'
//         // }
//       },
//       webSocketImpl: ws
//     })
//   : null

const httplink = new HttpLink({
  uri: 'https://signifly-foosball.herokuapp.com/v1/graphql',
  fetch: fetch
})

const link = process.browser ? wsLink : httplink

const apolloOptions = {
  link: link
}
// const client = new ApolloClient({
//   link: link,
//   cache: new InMemoryCache({
//     addTypename: true
//   })
// })

export default apolloOptions
