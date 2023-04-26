import { RESTDataSource } from "@apollo/datasource-rest";
import { Product } from "../types";

class ProductsAPI extends RESTDataSource {

  constructor(baseUrl: string) {
    super();
    this.baseURL = baseUrl;
  }

  getProductsByCategory(categoryCode: string) {
    return this.get<Product[]>(`/products/category/${categoryCode}`);
  }

  getProductDetail(productId: number) {
    return this.get<Product>(`/products/${productId}`);
  }

}

export default ProductsAPI;
