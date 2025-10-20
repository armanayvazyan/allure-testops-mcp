import { AxiosInstance } from 'axios';

export interface CategoryMatcher {
  id?: number;
  name: string;
  pattern: string;
  categoryId: number;
}

export class CategoryMatcherController {
  constructor(private client: AxiosInstance, private projectId: string) {}

  async getAll(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/categorymatcher`, { params: { ...params, projectId: this.projectId } });
    return response.data;
  }

  async get(id: number): Promise<any> {
    const response = await this.client.get(`/api/rs/categorymatcher/${id}`);
    return response.data;
  }

  async create(matcher: CategoryMatcher): Promise<any> {
    const response = await this.client.post(`/api/rs/categorymatcher`, { ...matcher, projectId: this.projectId });
    return response.data;
  }

  async update(id: number, matcher: Partial<CategoryMatcher>): Promise<any> {
    const response = await this.client.patch(`/api/rs/categorymatcher/${id}`, matcher);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await this.client.delete(`/api/rs/categorymatcher/${id}`);
  }
}
