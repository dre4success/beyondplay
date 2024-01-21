import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { buildHTTPExecutor } from '@graphql-tools/executor-http'
import { stitchSchemas } from '@graphql-tools/stitch'
import { schemaFromExecutor } from '@graphql-tools/wrap'

const spaceXExecutor = buildHTTPExecutor({
  endpoint: 'https://api.spacex.land/graphql/',
})

const countryExecutor = buildHTTPExecutor({
  endpoint: 'https://countries.trevorblades.com/',
})

async function createRemoteSchema(url: string) {
  try {
    const executor = buildHTTPExecutor({ endpoint: url })
    const schema = await schemaFromExecutor(executor)
    return { schema, executor }
  } catch (error) {
    console.error(`Error fetching schema from ${url}:`, error)
    throw new Error(`Failed to fetch schema from ${url}`)
  }
}

async function createStitchedSchema() {
  try {
    const starWarsSchema = await createRemoteSchema(
      'https://swapi-graphql.netlify.app/.netlify/functions/index'
    )
    const countrySchema = await createRemoteSchema(
      'https://countries.trevorblades.com/'
    )

    return stitchSchemas({
      subschemas: [starWarsSchema, countrySchema],
    })
  } catch (error) {
    console.error('Error stitching schemas:', error)
    throw error
  }
}

async function startServer() {
  const schema = await createStitchedSchema()

  const server = new ApolloServer({ schema })

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  })

  console.log(`🚀  Server ready at: ${url}`)
}

startServer()
