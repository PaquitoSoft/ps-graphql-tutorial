import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Query: {
    categories(_, __, { dataSources }) {
      return dataSources.categories.getAll();
    },
  }
}

export default resolvers;

