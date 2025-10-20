import { AxiosInstance } from 'axios';

export class CleanupController {
  constructor(private client: AxiosInstance, private projectId: string) {}

  async createCleanupTask(cleanupData: any): Promise<any> {
    const response = await this.client.post(`/api/rs/cleanup`, { ...cleanupData, projectId: this.projectId });
    return response.data;
  }

  async getCleanupTask(id: number): Promise<any> {
    const response = await this.client.get(`/api/rs/cleanup/${id}`);
    return response.data;
  }

  async getCleanupTasks(params?: any): Promise<any> {
    const response = await this.client.get(`/api/rs/cleanup`, { params: { ...params, projectId: this.projectId } });
    return response.data;
  }

  async deleteCleanupTask(id: number): Promise<void> {
    await this.client.delete(`/api/rs/cleanup/${id}`);
  }

  async executeCleanupTask(id: number): Promise<any> {
    const response = await this.client.post(`/api/rs/cleanup/${id}/execute`);
    return response.data;
  }
}
