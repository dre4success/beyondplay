export const typeDefs = `#graphql
    type AccessLog {
        timestamp: String!
        userId: ID!
        operation: String!
    }

    type Query {
        accessLogs: [AccessLog]
    }
    type Mutation {
        login(username: String!, password: String!): String
        register(username: String!, password: String!): String
    }
`