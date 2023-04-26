import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Query: {
    productsByCategory(_parent, params, { dataSources }) {
      return dataSources.products.getProductsByCategory(params.categoryCode);
    },

    product(_parent, params, { dataSources }) {
      return dataSources.products.getProductDetail(params.productId);
    }
  }
}

export default resolvers;
