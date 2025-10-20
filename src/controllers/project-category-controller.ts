import { AxiosInstance } from 'axios';

export interface ProjectCategory {
  id?: number;
  name: string;
  description?: string;
}

export class ProjectCategoryController {
  constructor(
    private client: AxiosInstance,
    private projectId: string
  ) {}

  async getCategories(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/project/${this.projectId}/category`, {
      params,
    });
    return response.data;
  }

  async getCategory(categoryId: number): Promise<any> {
    const response = await this.client.get(
      `/api/rs/project/${this.projectId}/category/${categoryId}`
    );
    return response.data;
  }

  async createCategory(category: ProjectCategory): Promise<any> {
    const response = await this.client.post(
      `/api/rs/project/${this.projectId}/category`,
      category
    );
    return response.data;
  }

  async updateCategory(categoryId: number, category: Partial<ProjectCategory>): Promise<any> {
    const response = await this.client.patch(
      `/api/rs/project/${this.projectId}/category/${categoryId}`,
      category
    );
    return response.data;
  }

  async deleteCategory(categoryId: number): Promise<void> {
    await this.client.delete(`/api/rs/project/${this.projectId}/category/${categoryId}`);
  }
}
