import { AxiosInstance } from 'axios';

export class ImportController {
  constructor(private client: AxiosInstance, private projectId: string) {}

  async createImportRequest(importData: any): Promise<any> {
    const response = await this.client.post(`/api/rs/importrequest`, { ...importData, projectId: this.projectId });
    return response.data;
  }

  async getImportRequest(id: number): Promise<any> {
    const response = await this.client.get(`/api/rs/importrequest/${id}`);
    return response.data;
  }

  async getImportRequests(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/importrequest`, { params: { ...params, projectId: this.projectId } });
    return response.data;
  }

  async deleteImportRequest(id: number): Promise<void> {
    await this.client.delete(`/api/rs/importrequest/${id}`);
  }
}
