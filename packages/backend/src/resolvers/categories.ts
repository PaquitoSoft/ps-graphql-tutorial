import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Category: {
    products: (parent, _params, { dataSources }) => {
      return dataSources.products.getProductsByCategory(parent.code);
    }
  },

  Query: {
    category(_, params, { dataSources }) {
      return dataSources.categories.getCategory(params.categoryCode);
    },
    categories(_, __, { dataSources }) {
      return dataSources.categories.getAll();
    },
  }
}

export default resolvers;
