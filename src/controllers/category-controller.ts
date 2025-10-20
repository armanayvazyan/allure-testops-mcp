import { AxiosInstance } from 'axios';

export interface Category {
  id?: number;
  name: string;
  description?: string;
}

export class CategoryController {
  constructor(
    private client: AxiosInstance,
    private projectId: string
  ) {}

  async getCategories(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/category`, {
      params: { projectId: this.projectId, ...params },
    });
    return response.data;
  }

  async getCategory(id: number): Promise<any> {
    const response = await this.client.get(`/api/rs/category/${id}`);
    return response.data;
  }

  async createCategory(category: Category): Promise<any> {
    const response = await this.client.post(`/api/rs/category`, {
      ...category,
      projectId: parseInt(this.projectId),
    });
    return response.data;
  }

  async updateCategory(id: number, category: Partial<Category>): Promise<any> {
    const response = await this.client.patch(`/api/rs/category/${id}`, category);
    return response.data;
  }

  async deleteCategory(id: number): Promise<void> {
    await this.client.delete(`/api/rs/category/${id}`);
  }
}
