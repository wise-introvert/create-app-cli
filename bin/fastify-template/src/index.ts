import fastify, { FastifyRequest } from 'fastify'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { Type } from '@sinclair/typebox'

const server = fastify().withTypeProvider<TypeBoxTypeProvider>()

server.get('/ping', {
    schema: {
        querystring: Type.Object({
            foo: Type.Number()
        })
    }
}, async (request: FastifyRequest<{ Querystring: { foo: number } }>, _) => {
  return `${request.query.foo} - pong\n`
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
