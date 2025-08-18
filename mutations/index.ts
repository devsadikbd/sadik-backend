import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';
import addToCart from './addToCart';

const graphQl = String.raw;
export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphQl`
    type Mutation {
      addToCart(productId: ID!): CartItem
    }
  `,
  resolvers: {
    Mutation: {
      addToCart,
    },
  },
});
