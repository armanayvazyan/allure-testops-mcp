import { AxiosInstance } from 'axios';

export interface BusinessMetric {
  id?: number;
  name: string;
  description?: string;
  type: string;
}

export class BusinessMetricController {
  constructor(private client: AxiosInstance, private projectId: string) {}

  async getAll(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/business-metric`, { params: { ...params, projectId: this.projectId } });
    return response.data;
  }

  async get(id: number): Promise<any> {
    const response = await this.client.get(`/api/rs/business-metric/${id}`);
    return response.data;
  }

  async create(metric: BusinessMetric): Promise<any> {
    const response = await this.client.post(`/api/rs/business-metric`, { ...metric, projectId: this.projectId });
    return response.data;
  }

  async update(id: number, metric: Partial<BusinessMetric>): Promise<any> {
    const response = await this.client.patch(`/api/rs/business-metric/${id}`, metric);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await this.client.delete(`/api/rs/business-metric/${id}`);
  }
}
