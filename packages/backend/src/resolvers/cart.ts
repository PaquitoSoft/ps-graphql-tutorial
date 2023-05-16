import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Query: {
    cart(_parent, _params, { userId, dataSources }) {
      return dataSources.shopCarts.getUserShopCart(userId);
    },
  },

  Mutation: {
    async addProductToCart(_parent, params, { userId, dataSources }) {
      // await new Promise(resolve => setTimeout(resolve, 3000));
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
