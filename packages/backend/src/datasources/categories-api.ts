import { RESTDataSource } from "@apollo/datasource-rest";
import { Category } from "../types";

class CategoriesAPI extends RESTDataSource {

  constructor(baseUrl: string) {
    super();
    this.baseURL = baseUrl;
  }

  async getAll(): Promise<Category[]> {
    const apiCategories = await this.get<string[]>('/products/categories');
    return apiCategories.map(categoryCode => ({
      code: categoryCode,
      products: []
    }))
  }

  async getCategory(categoryCode: string): Promise<Category> {
    const allCategories = await this.getAll();
    return allCategories.find(category => category.code === categoryCode);
  }

}

export default CategoriesAPI;
