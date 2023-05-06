import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Query: {
    product(_parent, params, { dataSources }) {
      return dataSources.products.getProductDetail(params.productId);
    }
  }
}

export default resolvers;

