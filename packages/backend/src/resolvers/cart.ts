import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Query: {
    cart(_parent, _params, { userId, dataSources }) {
      if (!userId) {
        throw new Error('No userId provided');
      }
      return dataSources.shopCarts.getUserShopCart(userId);
    },
  },

  Mutation: {
    async addProductToCart(_parent, params, { userId, dataSources }) {
      if (!userId) {
        throw new Error('No userId provided');
      }
      const product = await dataSources.products.getProductDetail(params.cartItem.productId);
      const updatedShopCart = await dataSources.shopCarts.addProduct(product, userId);

      return updatedShopCart;
    }
  },

  Subscription: {
    productAddedToCart: {
      subscribe(_, _params, { pubSub }) {
        // return pubSub.subscribe('productAddedToCart', params.shopCartId);
        return pubSub.subscribe('productAddedToCart');
      },
      resolve(payload) {
        return payload;
      }
    }
  }
}

export default resolvers;
