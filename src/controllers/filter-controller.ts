import { AxiosInstance } from 'axios';

export interface Filter {
  id?: number;
  name: string;
  query?: string;
  type?: string;
}

export class FilterController {
  constructor(
    private client: AxiosInstance,
    private projectId: string
  ) {}

  async getFilters(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/filter`, {
      params: { projectId: this.projectId, ...params },
    });
    return response.data;
  }

  async getFilter(id: number): Promise<any> {
    const response = await this.client.get(`/api/rs/filter/${id}`);
    return response.data;
  }

  async createFilter(filter: Filter): Promise<any> {
    const response = await this.client.post(`/api/rs/filter`, {
      ...filter,
      projectId: parseInt(this.projectId),
    });
    return response.data;
  }

  async updateFilter(id: number, filter: Partial<Filter>): Promise<any> {
    const response = await this.client.patch(`/api/rs/filter/${id}`, filter);
    return response.data;
  }

  async deleteFilter(id: number): Promise<void> {
    await this.client.delete(`/api/rs/filter/${id}`);
  }
}
