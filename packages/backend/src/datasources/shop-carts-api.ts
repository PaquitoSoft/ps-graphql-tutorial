// import { RESTDataSource } from "@apollo/datasource-rest";
import { Product, ShopCart } from "../types";
import { Model } from "mongoose";
import { TDBShopCart } from "../db/models/shop-cart.model";

// class _ShopCartsAPI extends RESTDataSource {

//   constructor(baseUrl: string) {
//     super();
//     this.baseURL = baseUrl;
//   }

//   getUserShopCart(userId: number) {
//     return this.get<ShopCart>(`/carts/user/${userId}`, {
//       params: {
//         sort: 'desc',
//         limit: '1'
//       }
//     });
//   }

//   addProduct(userId: number, shopCartItem: ShopCartItem, shopCartId?: number,) {
//     const httpMethod = shopCartId ? 'put' : 'post';
//     console.log(
//       'ShopCartsAPI::addProduct# Date for the cart:',
//       (new Date()).toISOString().split('T')[0]
//     );

//     return this[httpMethod]<ShopCart>(`/carts`, {
//       body: {
//         userId,
//         date: (new Date()).toISOString().split('T')[0],
//         products: [shopCartItem]
//       }
//     });
//   }

// }
class ShopCartsAPI {
  #model: Model<TDBShopCart>;
  constructor(shopCartSchema: Model<TDBShopCart>) {
    this.#model = shopCartSchema;
  }

  async #findOrCreateUserCart(userId: string) {
    let shopCart = await this.#model.findOne({ userId });
    if (!shopCart) {
      shopCart = new this.#model({
        userId,
        items: [],
      });
      shopCart = await shopCart.save();
    }
    return shopCart;
  }

  async getUserShopCart(userId: string): Promise<ShopCart> {
    const shopCart = await this.#findOrCreateUserCart(userId);
    return {
      id: shopCart.id,
      userId,
      items: shopCart.items.map(item => ({
        quantity: item.quantity,
        product: item.product,
      })),
      totalAmount: shopCart.totalAmount,
      totalUnits: shopCart.totalUnits
    };
  }

  async addProduct(product: Product, userId: string): Promise<ShopCart> {
    const shopCart = await this.#findOrCreateUserCart(userId);
    const shopCartItem = shopCart.items.find(item => item.product.id === product.id);

    if (!shopCartItem) {
      shopCart.items.push({
        quantity: 1,
        product: {
          id: product.id,
          image: product.image,
          price: parseInt(product.price, 10),
          title: product.title
        }
      });
    } else {
      shopCartItem.quantity += 1;
    }

    return (new this.#model(shopCart)).save();
  }
}

export default ShopCartsAPI;
