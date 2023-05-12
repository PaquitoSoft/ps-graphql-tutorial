import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Product: {
    isPopular: () => false,
  },
  Query: {
    product(_parent, params, { dataSources }) {
      return dataSources.products.getProductDetail(params.productId);
    }
  }
}

export default resolvers;

